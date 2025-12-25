// UIManager.js - Handle all UI updates and transitions
export class UIManager {
    constructor(gameState) {
        this.gameState = gameState;
        this.screens = {};
        this.modals = {};
        this.currentScreen = null;
    }

    init() {
        // Cache screen elements
        this.screens = {
            start: document.getElementById('start-screen'),
            chapter: document.getElementById('chapter-screen'),
            game: document.getElementById('game-screen'),
            completion: document.getElementById('completion-screen')
        };

        // Cache modal elements
        this.modals = {
            inventory: document.getElementById('inventory-modal'),
            menu: document.getElementById('menu-modal')
        };

        // Cache loading screen
        this.loadingScreen = document.getElementById('loading-screen');

        // Setup modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) this.hideModal(modal);
            });
        });

        // Close modals on outside click
        Object.values(this.modals).forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal);
                }
            });
        });
    }

    // Show a screen
    showScreen(screenName, instant = false) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            if (screen) {
                screen.classList.remove('active');
            }
        });

        // Show requested screen
        const screen = this.screens[screenName];
        if (screen) {
            if (instant) {
                screen.classList.add('active');
            } else {
                setTimeout(() => {
                    screen.classList.add('active');
                }, 100);
            }
            this.currentScreen = screenName;
        }
    }

    // Show loading screen
    showLoading() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('active');
        }
    }

    // Hide loading screen
    hideLoading() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.remove('active');
        }
    }

    // Show modal
    showModal(modal) {
        if (modal) {
            modal.classList.add('active');
        }
    }

    // Hide modal
    hideModal(modal) {
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Update HUD
    updateHUD(data) {
        const state = this.gameState.getState();

        // Update player role
        const roleElement = document.querySelector('.player-role');
        if (roleElement && state.playerRole) {
            roleElement.textContent = state.playerRole === 'giver' ? 'The Giver' : 'The Seeker';
        }

        // Update player number
        const numberElement = document.querySelector('.player-number');
        if (numberElement && state.playerNumber) {
            numberElement.textContent = `Player ${state.playerNumber}`;
        }

        // Update chapter/level
        const chapterElement = document.querySelector('.current-chapter');
        if (chapterElement) {
            chapterElement.textContent = `Chapter ${state.currentChapter}`;
        }

        const levelElement = document.querySelector('.current-level');
        if (levelElement) {
            levelElement.textContent = `Level ${state.currentLevel}`;
        }

        // Update kindling points
        const kindlingElement = document.querySelector('.kindling-value');
        if (kindlingElement) {
            kindlingElement.textContent = state.kindlingPoints;
        }
    }

    // Update narrative text
    updateNarrative(text) {
        const narrativeElement = document.querySelector('.narrative-text');
        if (narrativeElement) {
            // Typewriter effect
            narrativeElement.textContent = '';
            let index = 0;
            const speed = 30;

            const typeWriter = () => {
                if (index < text.length) {
                    narrativeElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, speed);
                }
            };

            typeWriter();
        }
    }

    // Update inventory display
    updateInventory(items) {
        const inventoryGrid = document.getElementById('inventory-grid');
        if (!inventoryGrid) return;

        inventoryGrid.innerHTML = '';

        if (items.length === 0) {
            const empty = document.createElement('p');
            empty.textContent = 'Your gatherings are empty...';
            empty.style.gridColumn = '1 / -1';
            empty.style.textAlign = 'center';
            empty.style.padding = '2rem';
            empty.style.color = 'var(--frost-blue)';
            inventoryGrid.appendChild(empty);
            return;
        }

        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inventory-item';
            itemDiv.title = item.description || item.name;

            const icon = document.createElement('div');
            icon.className = 'inventory-item-icon';
            icon.textContent = item.icon || '📦';
            itemDiv.appendChild(icon);

            const name = document.createElement('div');
            name.className = 'inventory-item-name';
            name.textContent = item.name || 'Unknown';
            itemDiv.appendChild(name);

            inventoryGrid.appendChild(itemDiv);
        });
    }

    // Show chapter intro
    showChapterIntro(chapterData, callback) {
        const titleElement = document.querySelector('.chapter-title');
        const descElement = document.querySelector('.chapter-description');
        const continueBtn = document.querySelector('.chapter-intro .continue-btn');

        if (titleElement) titleElement.textContent = chapterData.title;
        if (descElement) descElement.textContent = chapterData.description;

        if (continueBtn) {
            // Remove old listeners
            const newBtn = continueBtn.cloneNode(true);
            continueBtn.parentNode.replaceChild(newBtn, continueBtn);

            newBtn.addEventListener('click', () => {
                if (callback) callback();
            });
        }

        this.showScreen('chapter');
    }

    // Show choices
    showChoices(choices, callback) {
        const choiceContainer = document.querySelector('.choice-container');
        if (!choiceContainer) return;

        choiceContainer.innerHTML = '';
        choiceContainer.classList.remove('hidden');

        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = `${index + 1}. ${choice.text}`;

            btn.addEventListener('click', () => {
                choiceContainer.classList.add('hidden');
                if (callback) callback(choice);
            });

            choiceContainer.appendChild(btn);
        });
    }

    // Hide choices
    hideChoices() {
        const choiceContainer = document.querySelector('.choice-container');
        if (choiceContainer) {
            choiceContainer.classList.add('hidden');
        }
    }

    // Show completion screen
    showCompletion(data, callback) {
        const titleElement = document.querySelector('.completion-title');
        const textElement = document.querySelector('.completion-text');
        const statsElement = document.querySelector('.completion-stats');
        const nextBtn = document.querySelector('.next-level-btn');

        if (titleElement) {
            titleElement.textContent = data.success ? 'Level Complete!' : 'Level Failed';
        }

        if (textElement) {
            textElement.textContent = data.message || '';
        }

        if (statsElement && data.stats) {
            statsElement.innerHTML = `
                <div style="display: grid; gap: 1rem;">
                    <div>
                        <strong>Kindling Earned:</strong> ${data.stats.kindling || 0}
                    </div>
                    <div>
                        <strong>Time Taken:</strong> ${this.formatTime(data.stats.time || 0)}
                    </div>
                    <div>
                        <strong>Attempts:</strong> ${data.stats.attempts || 1}
                    </div>
                </div>
            `;
        }

        if (nextBtn) {
            const newBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newBtn, nextBtn);

            newBtn.textContent = data.isChapterEnd ? 'Next Chapter' : 'Next Level';
            newBtn.addEventListener('click', () => {
                if (callback) callback();
            });
        }

        this.showScreen('completion');
    }

    // Format time in MM:SS
    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Show notification
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '10px';
        notification.style.zIndex = '10000';
        notification.style.animation = 'fadeIn 0.3s ease';
        notification.style.maxWidth = '300px';
        notification.style.boxShadow = 'var(--shadow-hard)';

        const colors = {
            info: 'var(--ice-blue)',
            success: 'var(--secondary-green)',
            error: 'var(--secondary-red)',
            warning: 'var(--amber-glow)'
        };

        notification.style.background = `rgba(0, 0, 0, 0.8)`;
        notification.style.border = `2px solid ${colors[type] || colors.info}`;
        notification.style.color = 'white';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }

    // Animate kindling change
    animateKindlingChange(amount) {
        const kindlingElement = document.querySelector('.kindling-value');
        if (!kindlingElement) return;

        const change = document.createElement('span');
        change.textContent = `+${amount}`;
        change.style.position = 'absolute';
        change.style.color = 'var(--gold)';
        change.style.fontSize = '1.5rem';
        change.style.fontWeight = 'bold';
        change.style.animation = 'float 1s ease-out';
        change.style.pointerEvents = 'none';

        kindlingElement.parentElement.style.position = 'relative';
        kindlingElement.parentElement.appendChild(change);

        setTimeout(() => {
            kindlingElement.parentElement.removeChild(change);
        }, 1000);
    }

    // Transition between screens with effect
    transitionTo(screenName, effect = 'fade') {
        this.showLoading();

        setTimeout(() => {
            this.showScreen(screenName);
            this.hideLoading();
        }, 500);
    }

    // Clear all UI
    reset() {
        this.showScreen('start', true);
        this.hideChoices();
        Object.values(this.modals).forEach(modal => this.hideModal(modal));
    }
}

export default UIManager;
