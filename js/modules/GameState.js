// GameState.js - Centralized game state management
export class GameState {
    constructor() {
        this.state = {
            currentScreen: 'start',
            playerRole: null, // 'giver' or 'seeker'
            playerNumber: null, // 1 or 2
            difficulty: null, // 'easy', 'medium', 'hard'
            currentChapter: 1,
            currentLevel: 1,
            kindlingPoints: 0,
            inventory: [],
            choices: [], // Track all choices made
            completedLevels: [],
            gameStartTime: null,
            totalPlayTime: 0,
            hintsUsed: 0,
            seed: null, // For procedural generation
            unlockedEndings: [],
            achievements: []
        };

        this.listeners = new Map();
        this.autoSaveInterval = null;
    }

    // Initialize new game
    initializeGame(playerRole, playerNumber, difficulty) {
        this.state.playerRole = playerRole;
        this.state.playerNumber = playerNumber;
        this.state.difficulty = difficulty;
        this.state.gameStartTime = Date.now();
        this.state.seed = this.generateSeed();
        this.startAutoSave();
        this.emit('gameInitialized', this.state);
    }

    // Generate procedural seed based on timestamp and player choices
    generateSeed() {
        const timestamp = Date.now();
        const random = Math.random() * 1000000;
        return Math.floor(timestamp + random);
    }

    // Get current state
    getState() {
        return { ...this.state };
    }

    // Update state
    updateState(updates) {
        const oldState = { ...this.state };
        this.state = { ...this.state, ...updates };
        this.emit('stateChanged', { oldState, newState: this.state });
        return this.state;
    }

    // Progress to next level
    progressToNextLevel() {
        const levelKey = `ch${this.state.currentChapter}-lv${this.state.currentLevel}`;

        if (!this.state.completedLevels.includes(levelKey)) {
            this.state.completedLevels.push(levelKey);
        }

        // Check if chapter is complete
        if (this.state.currentLevel >= 3) {
            this.state.currentChapter++;
            this.state.currentLevel = 1;
            this.emit('chapterComplete', this.state.currentChapter - 1);
        } else {
            this.state.currentLevel++;
        }

        this.emit('levelProgress', {
            chapter: this.state.currentChapter,
            level: this.state.currentLevel
        });

        return this.state;
    }

    // Add kindling points
    addKindling(points) {
        this.state.kindlingPoints += points;
        this.emit('kindlingChanged', this.state.kindlingPoints);

        // Check for kindling-based achievements
        this.checkAchievements();

        return this.state.kindlingPoints;
    }

    // Add item to inventory
    addToInventory(item) {
        if (!this.state.inventory.find(i => i.id === item.id)) {
            this.state.inventory.push(item);
            this.emit('inventoryChanged', this.state.inventory);
        }
    }

    // Record a choice
    recordChoice(choice) {
        this.state.choices.push({
            chapter: this.state.currentChapter,
            level: this.state.currentLevel,
            choice: choice,
            timestamp: Date.now()
        });
        this.emit('choiceMade', choice);
    }

    // Get difficulty modifiers
    getDifficultyModifier() {
        const modifiers = {
            easy: {
                timeLimit: 1.5,
                hintCooldown: 0.5,
                puzzleComplexity: 0.7,
                enemyStrength: 0.7
            },
            medium: {
                timeLimit: 1.0,
                hintCooldown: 1.0,
                puzzleComplexity: 1.0,
                enemyStrength: 1.0
            },
            hard: {
                timeLimit: 0.7,
                hintCooldown: 1.5,
                puzzleComplexity: 1.3,
                enemyStrength: 1.3
            }
        };

        return modifiers[this.state.difficulty] || modifiers.medium;
    }

    // Check and award achievements
    checkAchievements() {
        const achievements = [
            {
                id: 'kindling_collector',
                name: 'Kindling Collector',
                description: 'Collect 100 kindling points',
                check: () => this.state.kindlingPoints >= 100
            },
            {
                id: 'kindling_master',
                name: 'Kindling Master',
                description: 'Collect 500 kindling points',
                check: () => this.state.kindlingPoints >= 500
            },
            {
                id: 'no_hints',
                name: 'Unaided Journey',
                description: 'Complete a chapter without using hints',
                check: () => this.state.hintsUsed === 0 && this.state.currentLevel === 1
            },
            {
                id: 'speed_runner',
                name: 'Swift as Winter Wind',
                description: 'Complete a level in under 5 minutes',
                check: () => false // Implement timing logic
            }
        ];

        achievements.forEach(achievement => {
            if (achievement.check() && !this.state.achievements.includes(achievement.id)) {
                this.state.achievements.push(achievement.id);
                this.emit('achievementUnlocked', achievement);
            }
        });
    }

    // Event system
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => callback(data));
        }
    }

    // Save system
    save() {
        try {
            const saveData = {
                ...this.state,
                saveDate: new Date().toISOString()
            };
            localStorage.setItem('winterKindling_save', JSON.stringify(saveData));
            this.emit('gameSaved', saveData);
            return true;
        } catch (error) {
            console.error('Failed to save game:', error);
            return false;
        }
    }

    load() {
        try {
            const saveData = localStorage.getItem('winterKindling_save');
            if (saveData) {
                const parsed = JSON.parse(saveData);
                this.state = { ...this.state, ...parsed };
                this.emit('gameLoaded', this.state);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to load game:', error);
            return false;
        }
    }

    startAutoSave() {
        // Auto-save every 2 minutes
        this.autoSaveInterval = setInterval(() => {
            this.save();
        }, 120000);
    }

    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
    }

    // Reset game
    reset() {
        this.stopAutoSave();
        this.state = {
            currentScreen: 'start',
            playerRole: null,
            playerNumber: null,
            difficulty: null,
            currentChapter: 1,
            currentLevel: 1,
            kindlingPoints: 0,
            inventory: [],
            choices: [],
            completedLevels: [],
            gameStartTime: null,
            totalPlayTime: 0,
            hintsUsed: 0,
            seed: null,
            unlockedEndings: [],
            achievements: []
        };
        this.emit('gameReset', this.state);
    }
}

export default GameState;
