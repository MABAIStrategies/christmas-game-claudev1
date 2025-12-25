// AudioManager.js - Handle background music and sound effects
export class AudioManager {
    constructor() {
        this.bgMusic = null;
        this.sfxMap = new Map();
        this.musicEnabled = true;
        this.sfxEnabled = true;
        this.currentTrack = null;
        this.audioContext = null;
        this.musicVolume = 0.4;
        this.sfxVolume = 0.6;

        this.initAudioContext();
    }

    initAudioContext() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (e) {
            console.warn('Web Audio API not supported, falling back to HTML5 audio');
        }
    }

    // Initialize audio elements
    init() {
        // Background music element
        this.bgMusic = document.getElementById('background-music');
        if (this.bgMusic) {
            this.bgMusic.volume = this.musicVolume;
            this.bgMusic.loop = true;
        }

        // Sound effect elements
        this.sfxMap.set('success', document.getElementById('sfx-success'));
        this.sfxMap.set('error', document.getElementById('sfx-error'));
        this.sfxMap.set('mystery', document.getElementById('sfx-mystery'));

        // Set SFX volumes
        this.sfxMap.forEach(sfx => {
            if (sfx) sfx.volume = this.sfxVolume;
        });

        // Resume audio context on user interaction (required by browsers)
        document.addEventListener('click', () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        }, { once: true });
    }

    // Play background music based on chapter/mood
    playBackgroundMusic(chapter, role) {
        if (!this.musicEnabled || !this.bgMusic) return;

        // Generate appropriate music based on chapter and role
        // In production, these would be actual audio files
        // For now, we'll use royalty-free URLs or procedural audio

        const musicTracks = this.getMusicTrack(chapter, role);

        if (musicTracks.url !== this.currentTrack) {
            this.fadeOutMusic(() => {
                this.currentTrack = musicTracks.url;
                this.bgMusic.src = musicTracks.url;
                this.bgMusic.play().catch(e => console.warn('Audio playback failed:', e));
                this.fadeInMusic();
            });
        }
    }

    // Get appropriate music track
    getMusicTrack(chapter, role) {
        // Map chapters and roles to music moods
        // These would be actual audio file URLs in production
        // For now, returning placeholder structure

        const tracks = {
            1: {
                giver: {
                    url: this.generateAudioDataURL('peaceful'),
                    mood: 'peaceful',
                    description: 'Gentle workshop ambience with subtle bells'
                },
                seeker: {
                    url: this.generateAudioDataURL('mysterious'),
                    mood: 'mysterious',
                    description: 'Ethereal winds and distant echoes'
                }
            },
            2: {
                giver: {
                    url: this.generateAudioDataURL('tension'),
                    mood: 'tense',
                    description: 'Echoing footsteps in ice halls'
                },
                seeker: {
                    url: this.generateAudioDataURL('melancholic'),
                    mood: 'melancholic',
                    description: 'Lonely violin over frost'
                }
            },
            3: {
                giver: {
                    url: this.generateAudioDataURL('revelation'),
                    mood: 'dramatic',
                    description: 'Building orchestral revelation'
                },
                seeker: {
                    url: this.generateAudioDataURL('revelation'),
                    mood: 'dramatic',
                    description: 'Dual timelines converging'
                }
            },
            4: {
                giver: {
                    url: this.generateAudioDataURL('mystical'),
                    mood: 'mystical',
                    description: 'Choir of wishes and flames'
                },
                seeker: {
                    url: this.generateAudioDataURL('mystical'),
                    mood: 'mystical',
                    description: 'Ancient memories stirring'
                }
            },
            5: {
                giver: {
                    url: this.generateAudioDataURL('epic'),
                    mood: 'epic',
                    description: 'Final choice orchestration'
                },
                seeker: {
                    url: this.generateAudioDataURL('epic'),
                    mood: 'epic',
                    description: 'Liberation symphony'
                }
            }
        };

        return tracks[chapter]?.[role] || tracks[1].giver;
    }

    // Generate simple procedural audio (placeholder for actual music files)
    generateAudioDataURL(mood) {
        // In production, return actual audio file URLs
        // For demo purposes, returning a silent audio data URL
        // You would replace this with links to your audio files

        // Example of where music files would be:
        const musicPaths = {
            peaceful: './audio/peaceful_workshop.mp3',
            mysterious: './audio/mysterious_wind.mp3',
            tension: './audio/tense_labyrinth.mp3',
            melancholic: './audio/melancholic_memories.mp3',
            revelation: './audio/dramatic_revelation.mp3',
            mystical: './audio/mystical_flame.mp3',
            epic: './audio/epic_finale.mp3'
        };

        // Return the path (even if file doesn't exist yet, it won't break the game)
        return musicPaths[mood] || '';
    }

    // Play sound effect
    playSFX(sfxName) {
        if (!this.sfxEnabled) return;

        const sfx = this.sfxMap.get(sfxName);
        if (sfx) {
            sfx.currentTime = 0;
            sfx.play().catch(e => console.warn('SFX playback failed:', e));
        } else {
            // Use Web Audio API to generate simple tones for missing SFX
            this.playProceduralSFX(sfxName);
        }
    }

    // Generate procedural sound effects using Web Audio API
    playProceduralSFX(type) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        switch (type) {
            case 'success':
                oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
                oscillator.frequency.exponentialRampToValueAtTime(783.99, this.audioContext.currentTime + 0.2); // G5
                gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.3);
                break;

            case 'error':
                oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.2);
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.2);
                break;

            case 'mystery':
                oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.5);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.5);
                break;

            case 'kindling':
                // Warm, glowing sound
                oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
                oscillator.type = 'triangle';
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.4);
                break;

            case 'transition':
                // Whoosh sound
                oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.3);
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.3);
                break;
        }
    }

    // Fade in music
    fadeInMusic(duration = 2000) {
        if (!this.bgMusic) return;

        this.bgMusic.volume = 0;
        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = this.musicVolume / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(interval);
                this.bgMusic.volume = this.musicVolume;
                return;
            }

            this.bgMusic.volume = volumeStep * currentStep;
            currentStep++;
        }, stepDuration);
    }

    // Fade out music
    fadeOutMusic(callback, duration = 2000) {
        if (!this.bgMusic) {
            if (callback) callback();
            return;
        }

        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = this.bgMusic.volume / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(interval);
                this.bgMusic.pause();
                this.bgMusic.volume = this.musicVolume;
                if (callback) callback();
                return;
            }

            this.bgMusic.volume = this.musicVolume - (volumeStep * currentStep);
            currentStep++;
        }, stepDuration);
    }

    // Stop all audio
    stopAll() {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }

        this.sfxMap.forEach(sfx => {
            if (sfx) {
                sfx.pause();
                sfx.currentTime = 0;
            }
        });
    }

    // Toggle music on/off
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;

        if (!this.musicEnabled && this.bgMusic) {
            this.fadeOutMusic();
        } else if (this.musicEnabled && this.bgMusic) {
            this.bgMusic.play().catch(e => console.warn('Music playback failed:', e));
            this.fadeInMusic();
        }

        return this.musicEnabled;
    }

    // Toggle SFX on/off
    toggleSFX() {
        this.sfxEnabled = !this.sfxEnabled;
        return this.sfxEnabled;
    }

    // Set music volume
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.bgMusic) {
            this.bgMusic.volume = this.musicVolume;
        }
    }

    // Set SFX volume
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        this.sfxMap.forEach(sfx => {
            if (sfx) sfx.volume = this.sfxVolume;
        });
    }

    // Play ambient sounds based on environment
    playAmbience(environment) {
        // Could layer ambient sounds like wind, crackling fire, etc.
        // For now, this is handled through the main background music
    }

    // Cleanup
    destroy() {
        this.stopAll();
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

export default AudioManager;
