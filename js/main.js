// main.js - Main game engine
import { GameState } from './modules/GameState.js';
import { UIManager } from './modules/UIManager.js';
import { AudioManager } from './modules/AudioManager.js';
import { PuzzleManager } from './modules/PuzzleManager.js';
import { ProceduralGenerator } from './modules/ProceduralGenerator.js';
import { SnowfallEffect } from './modules/SnowfallEffect.js';
import { NARRATIVE_DATA } from '../data/narrative.js';

class WinterKindlingGame {
    constructor() {
        this.gameState = new GameState();
        this.uiManager = new UIManager(this.gameState);
        this.audioManager = new AudioManager();
        this.puzzleManager = new PuzzleManager(this.gameState);
        this.snowfall = new SnowfallEffect('snowfall');
        this.narrativeData = NARRATIVE_DATA;
        this.proceduralGen = null;
        this.currentLevelStartTime = null;
    }

    init() {
        console.log('🎄 Initializing The Winter Kindling...');

        // Initialize managers
        this.uiManager.init();
        this.audioManager.init();
        this.snowfall.init();

        // Setup event listeners
        this.setupEventListeners();

        // Setup game state listeners
        this.setupGameStateListeners();

        // Show start screen
        this.uiManager.showScreen('start', true);

        console.log('✨ Game initialized successfully!');
    }

    setupEventListeners() {
        // Player selection
        document.querySelectorAll('.select-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.player-card');
                const role = e.target.dataset.role;

                // Deselect all cards
                document.querySelectorAll('.player-card').forEach(c => c.classList.remove('selected'));

                // Select this card
                card.classList.add('selected');

                // Store selection temporarily
                this.tempPlayerRole = role;
                this.tempPlayerNumber = parseInt(card.dataset.player);

                // Show difficulty selection
                document.querySelector('.difficulty-selection').classList.remove('hidden');

                // Play sound
                this.audioManager.playSFX('mystery');
            });
        });

        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Deselect all difficulty buttons
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));

                // Select this button
                e.currentTarget.classList.add('selected');

                // Store selection
                this.tempDifficulty = e.currentTarget.dataset.difficulty;

                // Show start button
                document.getElementById('start-game-btn').classList.remove('hidden');

                // Play sound
                this.audioManager.playSFX('mystery');
            });
        });

        // Start game button
        document.getElementById('start-game-btn').addEventListener('click', () => {
            if (this.tempPlayerRole && this.tempDifficulty) {
                this.startGame(this.tempPlayerRole, this.tempPlayerNumber, this.tempDifficulty);
            }
        });

        // HUD buttons
        const hintBtn = document.querySelector('.hint-btn');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.showHint());
        }

        const menuBtn = document.querySelector('.menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                this.uiManager.showModal(this.uiManager.modals.menu);
            });
        }

        // Action bar buttons
        const inventoryBtn = document.getElementById('inventory-btn');
        if (inventoryBtn) {
            inventoryBtn.addEventListener('click', () => {
                this.uiManager.updateInventory(this.gameState.getState().inventory);
                this.uiManager.showModal(this.uiManager.modals.inventory);
            });
        }

        // Menu options
        document.getElementById('save-game')?.addEventListener('click', () => {
            const saved = this.gameState.save();
            this.uiManager.showNotification(
                saved ? 'Game saved successfully!' : 'Failed to save game',
                saved ? 'success' : 'error'
            );
        });

        document.getElementById('load-game')?.addEventListener('click', () => {
            const loaded = this.gameState.load();
            if (loaded) {
                this.uiManager.showNotification('Game loaded!', 'success');
                this.loadCurrentLevel();
            } else {
                this.uiManager.showNotification('No saved game found', 'error');
            }
        });

        document.getElementById('toggle-music')?.addEventListener('click', (e) => {
            const enabled = this.audioManager.toggleMusic();
            const status = e.currentTarget.querySelector('#music-status');
            if (status) {
                status.textContent = enabled ? 'On' : 'Off';
            }
            this.uiManager.showNotification(`Music ${enabled ? 'enabled' : 'disabled'}`, 'info');
        });

        document.getElementById('restart-level')?.addEventListener('click', () => {
            this.loadCurrentLevel();
            this.uiManager.hideModal(this.uiManager.modals.menu);
        });

        document.getElementById('return-to-menu')?.addEventListener('click', () => {
            if (confirm('Return to main menu? Unsaved progress will be lost.')) {
                this.returnToMenu();
            }
        });
    }

    setupGameStateListeners() {
        this.gameState.on('kindlingChanged', (points) => {
            this.uiManager.updateHUD();
            this.audioManager.playSFX('kindling');
        });

        this.gameState.on('choiceMade', (choice) => {
            console.log('Choice made:', choice);
        });

        this.gameState.on('achievementUnlocked', (achievement) => {
            this.uiManager.showNotification(`Achievement: ${achievement.name}`, 'success', 5000);
            this.audioManager.playSFX('success');
        });
    }

    startGame(playerRole, playerNumber, difficulty) {
        console.log(`Starting game as ${playerRole} (Player ${playerNumber}) on ${difficulty} difficulty`);

        // Initialize game state
        this.gameState.initializeGame(playerRole, playerNumber, difficulty);

        // Create procedural generator with seed
        this.proceduralGen = new ProceduralGenerator(this.gameState.getState().seed);

        // Play appropriate music
        this.audioManager.playBackgroundMusic(1, playerRole);

        // Show loading
        this.uiManager.showLoading();

        // Load first chapter
        setTimeout(() => {
            this.loadChapter(1);
        }, 1000);
    }

    loadChapter(chapterNum) {
        const state = this.gameState.getState();
        const chapter = this.narrativeData.chapters[chapterNum - 1];

        if (!chapter) {
            console.error('Chapter not found:', chapterNum);
            return;
        }

        console.log('Loading chapter:', chapter.title);

        // Update music for chapter
        this.audioManager.playBackgroundMusic(chapterNum, state.playerRole);

        // Show chapter intro
        this.uiManager.showChapterIntro(chapter, () => {
            this.loadLevel(chapterNum, 1);
        });

        this.uiManager.hideLoading();
    }

    loadLevel(chapterNum, levelNum) {
        this.currentLevelStartTime = Date.now();

        const state = this.gameState.getState();
        const chapter = this.narrativeData.chapters[chapterNum - 1];
        const roleData = chapter[state.playerRole];
        const levelData = roleData.levels[levelNum - 1];

        if (!levelData) {
            console.error('Level not found:', chapterNum, levelNum);
            return;
        }

        console.log('Loading level:', levelData.title);

        // Update game state
        this.gameState.updateState({
            currentChapter: chapterNum,
            currentLevel: levelNum
        });

        // Show game screen
        this.uiManager.showScreen('game');
        this.uiManager.updateHUD();

        // Display narrative
        this.uiManager.updateNarrative(levelData.narrative);

        // Wait for narrative to display, then show puzzle
        setTimeout(() => {
            this.loadPuzzle(levelData);
        }, levelData.narrative.length * 30 + 1000); // Wait for typewriter effect
    }

    loadCurrentLevel() {
        const state = this.gameState.getState();
        this.loadLevel(state.currentChapter, state.currentLevel);
    }

    loadPuzzle(levelData) {
        // Generate procedural puzzle variation
        const basePuzzleType = levelData.puzzleType;
        const difficulty = this.gameState.getState().difficulty;

        const puzzleData = this.proceduralGen.generatePuzzleVariation(basePuzzleType, difficulty);

        console.log('Generated puzzle:', puzzleData);

        // Initialize puzzle container
        const puzzleContainer = document.querySelector('.puzzle-container');
        this.puzzleManager.init(puzzleContainer);

        // Load puzzle
        this.puzzleManager.loadPuzzle(puzzleData, (success) => {
            this.onPuzzleComplete(success, levelData);
        });

        // Show choices if available
        if (levelData.choices && levelData.choices.length > 0) {
            setTimeout(() => {
                this.showLevelChoices(levelData.choices);
            }, 2000);
        }
    }

    showLevelChoices(choices) {
        this.uiManager.showChoices(choices, (choice) => {
            console.log('Player chose:', choice.text);

            // Record choice
            this.gameState.recordChoice(choice);

            // Award kindling
            if (choice.kindling) {
                this.gameState.addKindling(choice.kindling);
                this.uiManager.animateKindlingChange(choice.kindling);
            }

            // Play sound
            this.audioManager.playSFX('mystery');

            // Show choice consequence
            this.uiManager.showNotification(
                `Choice recorded: ${choice.consequence}`,
                'info',
                3000
            );
        });
    }

    onPuzzleComplete(success, levelData) {
        const timeTaken = Date.now() - this.currentLevelStartTime;

        if (success) {
            // Award kindling for puzzle completion
            const baseKindling = 20;
            const difficultyMultiplier = this.gameState.getDifficultyModifier().puzzleComplexity;
            const kindling = Math.floor(baseKindling * difficultyMultiplier);

            this.gameState.addKindling(kindling);

            // Add items to inventory
            if (levelData.items) {
                levelData.items.forEach(itemName => {
                    this.gameState.addToInventory({
                        id: itemName.toLowerCase().replace(/\s+/g, '-'),
                        name: itemName,
                        icon: this.getItemIcon(itemName)
                    });
                });
            }

            // Play success sound
            this.audioManager.playSFX('success');

            // Show completion
            const state = this.gameState.getState();
            const isChapterEnd = state.currentLevel >= 3;

            this.uiManager.showCompletion({
                success: true,
                message: 'The path forward is clear...',
                stats: {
                    kindling: kindling,
                    time: timeTaken,
                    attempts: this.puzzleManager.attempts || 1
                },
                isChapterEnd: isChapterEnd
            }, () => {
                this.progressToNext();
            });
        } else {
            // Level failed
            this.audioManager.playSFX('error');

            this.uiManager.showCompletion({
                success: false,
                message: 'The cold claims another attempt...',
                stats: {
                    kindling: 0,
                    time: timeTaken,
                    attempts: this.puzzleManager.attempts || 1
                }
            }, () => {
                this.loadCurrentLevel();
            });
        }
    }

    progressToNext() {
        const oldState = this.gameState.getState();

        // Progress to next level/chapter
        this.gameState.progressToNextLevel();

        const newState = this.gameState.getState();

        // Check if we've completed the game
        if (newState.currentChapter > 5) {
            this.showGameEnding();
            return;
        }

        // Check if we moved to a new chapter
        if (newState.currentChapter !== oldState.currentChapter) {
            // Check for twist chapters
            const chapter = this.narrativeData.chapters[newState.currentChapter - 1];
            if (chapter.twist) {
                this.showTwist(chapter, () => {
                    this.loadChapter(newState.currentChapter);
                });
            } else {
                this.loadChapter(newState.currentChapter);
            }
        } else {
            this.loadLevel(newState.currentChapter, newState.currentLevel);
        }
    }

    showTwist(chapter, callback) {
        console.log('TWIST:', chapter.twist);

        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.background = 'rgba(0, 0, 0, 0.95)';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.zIndex = '10000';
        container.style.padding = '2rem';

        const title = document.createElement('h2');
        title.style.fontFamily = 'var(--font-title)';
        title.style.fontSize = 'clamp(2rem, 6vw, 3rem)';
        title.style.color = 'var(--amber-glow)';
        title.style.marginBottom = '2rem';
        title.textContent = '~ A Revelation ~';
        container.appendChild(title);

        const twist = document.createElement('p');
        twist.style.fontFamily = 'var(--font-body)';
        twist.style.fontSize = 'clamp(1.1rem, 3vw, 1.5rem)';
        twist.style.color = 'var(--frost-blue)';
        twist.style.maxWidth = '800px';
        twist.style.textAlign = 'center';
        twist.style.lineHeight = '1.8';
        twist.style.fontStyle = 'italic';
        twist.textContent = chapter.twist;
        container.appendChild(twist);

        const continueBtn = document.createElement('button');
        continueBtn.textContent = 'Continue';
        continueBtn.style.marginTop = '3rem';
        continueBtn.style.padding = '1rem 3rem';
        continueBtn.style.fontSize = '1.2rem';
        continueBtn.style.background = 'var(--gradient-fire)';
        continueBtn.style.border = '2px solid var(--gold)';
        continueBtn.style.borderRadius = '50px';
        continueBtn.style.color = 'white';
        continueBtn.style.fontFamily = 'var(--font-title)';
        continueBtn.style.cursor = 'pointer';
        continueBtn.addEventListener('click', () => {
            document.body.removeChild(container);
            if (callback) callback();
        });
        container.appendChild(continueBtn);

        document.body.appendChild(container);

        this.audioManager.playSFX('mystery');
    }

    showGameEnding() {
        const state = this.gameState.getState();

        // Determine ending based on choices
        const endingKey = this.determineEnding(state.choices);
        const ending = this.narrativeData.endings[endingKey] || this.narrativeData.endings['gratitude-ending'];

        console.log('Game ending:', ending.title);

        // Create ending screen
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.background = 'radial-gradient(ellipse at center, #2d1f3f 0%, #1a0f0f 100%)';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.zIndex = '10000';
        container.style.padding = '2rem';
        container.style.overflowY = 'auto';

        const title = document.createElement('h1');
        title.style.fontFamily = 'var(--font-title)';
        title.style.fontSize = 'clamp(2rem, 8vw, 4rem)';
        title.style.background = 'var(--gradient-fire)';
        title.style.webkitBackgroundClip = 'text';
        title.style.webkitTextFillColor = 'transparent';
        title.style.marginBottom = '2rem';
        title.textContent = ending.title;
        container.appendChild(title);

        const narrative = document.createElement('p');
        narrative.style.fontFamily = 'var(--font-body)';
        narrative.style.fontSize = 'clamp(1.1rem, 3vw, 1.4rem)';
        narrative.style.color = 'var(--warm-white)';
        narrative.style.maxWidth = '900px';
        narrative.style.textAlign = 'center';
        narrative.style.lineHeight = '1.8';
        narrative.style.marginBottom = '2rem';
        narrative.textContent = ending.narrative;
        container.appendChild(narrative);

        const epilogue = document.createElement('p');
        epilogue.style.fontFamily = 'var(--font-body)';
        epilogue.style.fontSize = 'clamp(1rem, 2.5vw, 1.2rem)';
        epilogue.style.color = 'var(--frost-blue)';
        epilogue.style.maxWidth = '800px';
        epilogue.style.textAlign = 'center';
        epilogue.style.lineHeight = '1.8';
        epilogue.style.fontStyle = 'italic';
        epilogue.style.marginBottom = '3rem';
        epilogue.textContent = epilogue.textContent;
        container.appendChild(epilogue);

        const stats = document.createElement('div');
        stats.style.background = 'rgba(255, 255, 255, 0.05)';
        stats.style.border = '2px solid var(--gold)';
        stats.style.borderRadius = '15px';
        stats.style.padding = '2rem';
        stats.style.marginBottom = '2rem';
        stats.innerHTML = `
            <h3 style="font-family: var(--font-title); color: var(--gold); margin-bottom: 1rem;">Your Journey</h3>
            <div style="display: grid; gap: 1rem; text-align: left;">
                <div><strong>Total Kindling:</strong> ${state.kindlingPoints}</div>
                <div><strong>Choices Made:</strong> ${state.choices.length}</div>
                <div><strong>Items Collected:</strong> ${state.inventory.length}</div>
                <div><strong>Achievements:</strong> ${state.achievements.length}</div>
            </div>
        `;
        container.appendChild(stats);

        const returnBtn = document.createElement('button');
        returnBtn.textContent = 'Return to Menu';
        returnBtn.style.padding = '1rem 3rem';
        returnBtn.style.fontSize = '1.2rem';
        returnBtn.style.background = 'var(--gradient-fire)';
        returnBtn.style.border = '2px solid var(--gold)';
        returnBtn.style.borderRadius = '50px';
        returnBtn.style.color = 'white';
        returnBtn.style.fontFamily = 'var(--font-title)';
        returnBtn.style.cursor = 'pointer';
        returnBtn.addEventListener('click', () => {
            document.body.removeChild(container);
            this.returnToMenu();
        });
        container.appendChild(returnBtn);

        document.body.appendChild(container);

        this.audioManager.fadeOutMusic();
        setTimeout(() => {
            this.audioManager.playBackgroundMusic(5, state.playerRole);
        }, 1000);
    }

    determineEnding(choices) {
        // Simple logic to determine ending based on player choices
        // In a more complex game, this would analyze the choice patterns

        if (choices.length === 0) {
            return 'gratitude-ending';
        }

        const lastChoice = choices[choices.length - 1];

        if (lastChoice.consequence === 'synthesis' || lastChoice.consequence === 'paradox-liberation') {
            return 'paradox-liberation';
        } else if (lastChoice.consequence === 'mercy' || lastChoice.consequence === 'compassionate-twist') {
            return 'compassionate-twist';
        } else if (lastChoice.consequence === 'gratitude' || lastChoice.consequence === 'gratitude-ending') {
            return 'gratitude-ending';
        } else if (lastChoice.consequence === 'self-sacrifice') {
            return 'self-sacrifice';
        } else {
            return 'transformation-ending';
        }
    }

    showHint() {
        const state = this.gameState.getState();
        state.hintsUsed++;

        this.uiManager.showNotification(
            'Hints are still being crafted by the Kindling...',
            'info',
            3000
        );
    }

    getItemIcon(itemName) {
        const icons = {
            'Mysterious Music Box': '🎵',
            "Frost's Journal": '📖',
            'Silver Compass': '🧭',
            'Spectral Lantern': '🏮',
            'Fragment of Memory': '💎',
            'Frozen Tear': '💧',
            'Echo Stone': '🗿',
            'Thread of Fate': '🧵',
            'Ice Prism': '💠',
            'Tri-Path Key': '🗝️',
            'Mirror Shard': '🪞',
            'Soul Fragment': '✨',
            'Veil of Mist': '🌫️',
            'Paradox Stone': '⏳',
            'Temporal Shard': '⌛',
            'Memory Crystal': '🔮',
            'Cycle Diagram': '📊',
            "Kindling's Heart": '🔥'
        };

        return icons[itemName] || '📦';
    }

    returnToMenu() {
        this.gameState.reset();
        this.uiManager.reset();
        this.audioManager.stopAll();
        this.snowfall.setIntensity(1.0);

        // Reset temp selections
        this.tempPlayerRole = null;
        this.tempPlayerNumber = null;
        this.tempDifficulty = null;

        // Reset UI elements
        document.querySelectorAll('.player-card').forEach(c => c.classList.remove('selected'));
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
        document.querySelector('.difficulty-selection')?.classList.add('hidden');
        document.getElementById('start-game-btn')?.classList.add('hidden');
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new WinterKindlingGame();
    game.init();

    // Make game accessible globally for debugging
    window.game = game;
});
