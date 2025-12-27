// VoiceNarration.js - Text-to-speech narration using Web Speech API
export class VoiceNarration {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.voice = null;
        this.enabled = false;
        this.rate = 0.9; // Slightly slower for dramatic effect
        this.pitch = 1.0;
        this.volume = 0.8;
        this.currentUtterance = null;
        this.voiceQueue = [];
        this.isInitialized = false;
    }

    init() {
        if (!this.synthesis) {
            console.warn('Speech synthesis not supported in this browser');
            return false;
        }

        // Load voices
        this.loadVoices();

        // Voice change event (needed for some browsers)
        if (this.synthesis.onvoiceschanged !== undefined) {
            this.synthesis.onvoiceschanged = () => this.loadVoices();
        }

        this.isInitialized = true;
        return true;
    }

    loadVoices() {
        const voices = this.synthesis.getVoices();

        // Prefer specific voices for better narration
        const preferredVoices = [
            'Google UK English Male',
            'Google UK English Female',
            'Microsoft David Desktop',
            'Microsoft Zira Desktop',
            'Alex',
            'Samantha',
            'Daniel',
            'Karen'
        ];

        // Try to find a preferred voice
        for (const preferred of preferredVoices) {
            const found = voices.find(v => v.name === preferred);
            if (found) {
                this.voice = found;
                break;
            }
        }

        // Fallback to first English voice
        if (!this.voice) {
            this.voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        }

        console.log('Voice narration using:', this.voice?.name || 'default');
    }

    // Speak text
    speak(text, options = {}) {
        if (!this.enabled || !this.synthesis || !text) {
            return;
        }

        // Cancel current speech if interrupting
        if (options.interrupt) {
            this.stop();
        }

        const utterance = new SpeechSynthesisUtterance(text);

        // Set voice properties
        utterance.voice = this.voice;
        utterance.rate = options.rate || this.rate;
        utterance.pitch = options.pitch || this.pitch;
        utterance.volume = options.volume || this.volume;

        // Event handlers
        utterance.onstart = () => {
            this.currentUtterance = utterance;
            if (options.onStart) options.onStart();
        };

        utterance.onend = () => {
            this.currentUtterance = null;
            if (options.onEnd) options.onEnd();

            // Process queue
            if (this.voiceQueue.length > 0) {
                const next = this.voiceQueue.shift();
                this.speak(next.text, next.options);
            }
        };

        utterance.onerror = (error) => {
            console.error('Speech synthesis error:', error);
            this.currentUtterance = null;
        };

        // Speak or queue
        if (this.currentUtterance && !options.interrupt) {
            this.voiceQueue.push({ text, options });
        } else {
            this.synthesis.speak(utterance);
        }
    }

    // Narrate with dramatic pauses
    narrateStory(text, options = {}) {
        if (!this.enabled) return;

        // Split by sentences for natural pauses
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

        sentences.forEach((sentence, index) => {
            setTimeout(() => {
                this.speak(sentence.trim(), {
                    ...options,
                    rate: 0.85, // Slower for story
                    pitch: 1.1   // Slightly higher for narrative
                });
            }, index * 500); // Pause between sentences
        });
    }

    // Narrate character dialogue
    narrateDialogue(speaker, text, characterType = 'giver') {
        if (!this.enabled) return;

        // Different vocal characteristics for different characters
        const voiceSettings = {
            giver: { rate: 0.9, pitch: 1.0 },
            seeker: { rate: 0.8, pitch: 0.9 },
            keeper: { rate: 0.7, pitch: 0.8 },
            narrator: { rate: 0.85, pitch: 1.1 }
        };

        const settings = voiceSettings[characterType] || voiceSettings.narrator;

        // Announce speaker
        this.speak(`${speaker} says:`, {
            ...settings,
            rate: settings.rate * 1.1
        });

        // Speak dialogue
        setTimeout(() => {
            this.speak(text, settings);
        }, 800);
    }

    // Quick announcement
    announce(text, urgent = false) {
        if (!this.enabled) return;

        this.speak(text, {
            interrupt: urgent,
            rate: urgent ? 1.2 : 1.0,
            pitch: urgent ? 1.2 : 1.0
        });
    }

    // Narrate choices
    narrateChoices(choices) {
        if (!this.enabled) return;

        this.speak("You have several choices:", { rate: 1.0 });

        choices.forEach((choice, index) => {
            setTimeout(() => {
                this.speak(`Option ${index + 1}: ${choice.text}`, {
                    rate: 1.0
                });
            }, (index + 1) * 1500);
        });
    }

    // Atmospheric narration with effects
    narrateAtmosphere(description) {
        if (!this.enabled) return;

        // Whisper effect (lower volume and pitch)
        this.speak(description, {
            rate: 0.7,
            pitch: 0.8,
            volume: 0.5
        });
    }

    // Stop current narration
    stop() {
        if (this.synthesis) {
            this.synthesis.cancel();
            this.currentUtterance = null;
            this.voiceQueue = [];
        }
    }

    // Pause narration
    pause() {
        if (this.synthesis && this.synthesis.speaking) {
            this.synthesis.pause();
        }
    }

    // Resume narration
    resume() {
        if (this.synthesis && this.synthesis.paused) {
            this.synthesis.resume();
        }
    }

    // Toggle narration on/off
    toggle() {
        this.enabled = !this.enabled;

        if (!this.enabled) {
            this.stop();
        }

        return this.enabled;
    }

    // Set voice properties
    setRate(rate) {
        this.rate = Math.max(0.1, Math.min(2.0, rate));
    }

    setPitch(pitch) {
        this.pitch = Math.max(0, Math.min(2, pitch));
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    // Get available voices
    getVoices() {
        return this.synthesis ? this.synthesis.getVoices() : [];
    }

    // Change voice
    setVoice(voiceName) {
        const voices = this.getVoices();
        const voice = voices.find(v => v.name === voiceName);
        if (voice) {
            this.voice = voice;
            return true;
        }
        return false;
    }

    // Check if narration is available
    isAvailable() {
        return this.isInitialized && this.synthesis !== null;
    }

    // Check if currently speaking
    isSpeaking() {
        return this.synthesis && this.synthesis.speaking;
    }
}

export default VoiceNarration;
