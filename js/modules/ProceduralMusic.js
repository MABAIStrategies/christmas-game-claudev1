// ProceduralMusic.js - Generate procedural background music
export class ProceduralMusic {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.isPlaying = false;
        this.currentNodes = [];
        this.tempo = 120; // BPM
        this.scale = this.getMajorScale(440); // A major scale
    }

    init() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 0.3;
            this.masterGain.connect(this.audioContext.destination);
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    // Get major scale frequencies
    getMajorScale(baseFreq) {
        const intervals = [0, 2, 4, 5, 7, 9, 11, 12]; // Major scale intervals
        return intervals.map(interval => baseFreq * Math.pow(2, interval / 12));
    }

    // Get minor scale for darker moods
    getMinorScale(baseFreq) {
        const intervals = [0, 2, 3, 5, 7, 8, 10, 12]; // Natural minor scale
        return intervals.map(interval => baseFreq * Math.pow(2, interval / 12));
    }

    // Create ambient pad sound
    createPad(frequency, duration, gainValue = 0.1) {
        if (!this.audioContext) return null;

        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const oscillator3 = this.audioContext.createOscillator();

        const gain = this.audioContext.createGain();

        oscillator1.type = 'sine';
        oscillator2.type = 'sine';
        oscillator3.type = 'triangle';

        oscillator1.frequency.value = frequency;
        oscillator2.frequency.value = frequency * 1.01; // Slight detune
        oscillator3.frequency.value = frequency * 0.5; // Octave below

        oscillator1.connect(gain);
        oscillator2.connect(gain);
        oscillator3.connect(gain);
        gain.connect(this.masterGain);

        // Envelope
        const now = this.audioContext.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(gainValue, now + duration * 0.3);
        gain.gain.setValueAtTime(gainValue, now + duration * 0.7);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        oscillator1.start(now);
        oscillator2.start(now);
        oscillator3.start(now);
        oscillator1.stop(now + duration);
        oscillator2.stop(now + duration);
        oscillator3.stop(now + duration);

        return { oscillators: [oscillator1, oscillator2, oscillator3], gain };
    }

    // Create bell-like sound
    createBell(frequency, decay = 3) {
        if (!this.audioContext) return null;

        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;

        filter.type = 'lowpass';
        filter.frequency.value = frequency * 2;
        filter.Q.value = 10;

        oscillator.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        const now = this.audioContext.currentTime;
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

        oscillator.start(now);
        oscillator.stop(now + decay);

        return { oscillator, gain, filter };
    }

    // Play peaceful workshop music
    playPeacefulMusic() {
        if (!this.audioContext) return;

        this.stopAll();
        this.isPlaying = true;

        const beatDuration = 60 / this.tempo;
        const scale = this.getMajorScale(330); // E major

        const playSequence = () => {
            if (!this.isPlaying) return;

            // Pad chord progression
            const chordNotes = [
                [scale[0], scale[2], scale[4]], // I
                [scale[5], scale[0], scale[2]], // vi
                [scale[3], scale[5], scale[0]], // IV
                [scale[4], scale[6], scale[1]]  // V
            ];

            const chordIndex = Math.floor(Math.random() * chordNotes.length);
            chordNotes[chordIndex].forEach(freq => {
                this.createPad(freq, beatDuration * 8, 0.05);
            });

            // Occasional bell melody
            if (Math.random() > 0.7) {
                const note = scale[Math.floor(Math.random() * scale.length)];
                setTimeout(() => {
                    this.createBell(note, 2);
                }, beatDuration * 1000 * Math.random() * 4);
            }

            setTimeout(playSequence, beatDuration * 8000);
        };

        playSequence();
    }

    // Play mysterious music
    playMysteriousMusic() {
        if (!this.audioContext) return;

        this.stopAll();
        this.isPlaying = true;

        const beatDuration = 60 / (this.tempo * 0.7);
        const scale = this.getMinorScale(220); // A minor

        const playSequence = () => {
            if (!this.isPlaying) return;

            // Dark ambient pads
            const baseNote = scale[Math.floor(Math.random() * 5)];
            this.createPad(baseNote, beatDuration * 12, 0.08);
            this.createPad(baseNote * 0.5, beatDuration * 12, 0.04);

            // Random high bells for eeriness
            if (Math.random() > 0.6) {
                const highNote = scale[Math.floor(Math.random() * scale.length)] * 2;
                setTimeout(() => {
                    this.createBell(highNote, 4);
                }, beatDuration * 1000 * Math.random() * 6);
            }

            setTimeout(playSequence, beatDuration * 12000);
        };

        playSequence();
    }

    // Play tense music
    playTenseMusic() {
        if (!this.audioContext) return;

        this.stopAll();
        this.isPlaying = true;

        const beatDuration = 60 / (this.tempo * 1.2);
        const scale = this.getMinorScale(246.94); // B minor

        const playSequence = () => {
            if (!this.isPlaying) return;

            // Dissonant intervals
            const note1 = scale[Math.floor(Math.random() * 7)];
            const note2 = scale[(Math.floor(Math.random() * 7) + 1) % 7];

            this.createPad(note1, beatDuration * 6, 0.06);
            this.createPad(note2, beatDuration * 6, 0.06);

            // Pulsing rhythm
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    if (this.isPlaying) {
                        this.createBell(note1 * 2, 0.5);
                    }
                }, beatDuration * 1000 * i * 1.5);
            }

            setTimeout(playSequence, beatDuration * 6000);
        };

        playSequence();
    }

    // Play epic finale music
    playEpicMusic() {
        if (!this.audioContext) return;

        this.stopAll();
        this.isPlaying = true;

        const beatDuration = 60 / this.tempo;
        const scale = this.getMajorScale(261.63); // C major

        const playSequence = () => {
            if (!this.isPlaying) return;

            // Full chord progressions
            const progression = [
                [scale[0], scale[2], scale[4], scale[7]], // I
                [scale[5], scale[0], scale[2], scale[5]], // vi
                [scale[3], scale[5], scale[0], scale[3]], // IV
                [scale[4], scale[6], scale[1], scale[4]]  // V
            ];

            progression.forEach((chord, index) => {
                setTimeout(() => {
                    if (this.isPlaying) {
                        chord.forEach(freq => {
                            this.createPad(freq, beatDuration * 4, 0.07);
                        });

                        // Add melody on top
                        const melodyNote = scale[Math.floor(Math.random() * 8)] * 2;
                        this.createBell(melodyNote, 1.5);
                    }
                }, beatDuration * 4000 * index);
            });

            setTimeout(playSequence, beatDuration * 16000);
        };

        playSequence();
    }

    // Stop all music
    stopAll() {
        this.isPlaying = false;
        this.currentNodes.forEach(node => {
            try {
                if (node.stop) node.stop();
                if (node.disconnect) node.disconnect();
            } catch (e) {
                // Ignore errors from already stopped nodes
            }
        });
        this.currentNodes = [];
    }

    // Fade out
    fadeOut(duration = 2000) {
        if (!this.masterGain) return;

        const now = this.audioContext.currentTime;
        this.masterGain.gain.linearRampToValueAtTime(0, now + duration / 1000);

        setTimeout(() => {
            this.stopAll();
            this.masterGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        }, duration);
    }

    // Fade in
    fadeIn(duration = 2000) {
        if (!this.masterGain) return;

        this.masterGain.gain.setValueAtTime(0, this.audioContext.currentTime);
        const now = this.audioContext.currentTime;
        this.masterGain.gain.linearRampToValueAtTime(0.3, now + duration / 1000);
    }

    // Set volume
    setVolume(volume) {
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        }
    }
}

export default ProceduralMusic;
