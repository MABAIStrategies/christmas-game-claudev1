// PuzzleManager.js - Handle puzzle rendering and interaction
export class PuzzleManager {
    constructor(gameState) {
        this.gameState = gameState;
        this.currentPuzzle = null;
        this.puzzleContainer = null;
        this.onComplete = null;
        this.attempts = 0;
    }

    // Initialize puzzle container
    init(container) {
        this.puzzleContainer = container;
    }

    // Load and render a puzzle
    loadPuzzle(puzzleData, onComplete) {
        this.currentPuzzle = puzzleData;
        this.onComplete = onComplete;
        this.attempts = 0;

        // Clear previous puzzle
        this.puzzleContainer.innerHTML = '';

        // Render based on puzzle type
        const renderMethod = this.getRenderMethod(puzzleData.type);
        if (renderMethod) {
            renderMethod.call(this, puzzleData);
        }
    }

    // Get appropriate render method for puzzle type
    getRenderMethod(type) {
        const methods = {
            'pattern-memory': this.renderPatternMemory,
            'cipher-decode': this.renderCipher,
            'moral-choice': this.renderMoralChoice,
            'memory-sequence': this.renderMemorySequence,
            'fragment-assembly': this.renderFragmentAssembly,
            'spatial-pattern': this.renderSpatialPattern,
            'logic-riddle': this.renderLogicRiddle,
            'mirror-puzzle': this.renderMirrorPuzzle,
            'temporal-paradox': this.renderTemporalParadox,
            'rhythm-synchronization': this.renderRhythmSync,
            'dialogue-tree': this.renderDialogueTree,
            'final-choice': this.renderFinalChoice
        };

        return methods[type] || this.renderDefaultPuzzle;
    }

    // Pattern Memory Puzzle
    renderPatternMemory(puzzle) {
        const container = this.puzzleContainer;

        const title = document.createElement('h3');
        title.className = 'puzzle-title';
        title.textContent = 'Remember the Pattern';
        container.appendChild(title);

        const instruction = document.createElement('p');
        instruction.className = 'puzzle-instruction';
        instruction.textContent = 'Watch carefully and recreate the sequence...';
        container.appendChild(instruction);

        const displayArea = document.createElement('div');
        displayArea.className = 'pattern-display';
        container.appendChild(displayArea);

        const inputArea = document.createElement('div');
        inputArea.className = 'pattern-input';
        inputArea.style.display = 'none';
        container.appendChild(inputArea);

        const userSequence = [];

        // Display pattern
        this.displayPattern(displayArea, puzzle.pattern, puzzle.displayTime, () => {
            displayArea.style.display = 'none';
            inputArea.style.display = 'grid';
            inputArea.style.gridTemplateColumns = 'repeat(4, 1fr)';
            inputArea.style.gap = '10px';

            // Create input buttons
            const symbols = ['🎄', '⛄', '🎁', '❄️', '🔔', '⭐', '🕯️', '🎅'];
            symbols.forEach(symbol => {
                const btn = document.createElement('button');
                btn.className = 'symbol-btn';
                btn.textContent = symbol;
                btn.style.fontSize = '2rem';
                btn.style.padding = '1rem';
                btn.onclick = () => {
                    userSequence.push(symbol);
                    this.updateSequenceDisplay(inputArea, userSequence);

                    if (userSequence.length === puzzle.pattern.length) {
                        this.checkPattern(userSequence, puzzle.pattern);
                    }
                };
                inputArea.appendChild(btn);
            });

            const sequenceDisplay = document.createElement('div');
            sequenceDisplay.className = 'sequence-display';
            sequenceDisplay.style.gridColumn = '1 / -1';
            sequenceDisplay.style.fontSize = '2rem';
            sequenceDisplay.style.textAlign = 'center';
            inputArea.appendChild(sequenceDisplay);
        });
    }

    displayPattern(container, pattern, displayTime, callback) {
        container.style.fontSize = '3rem';
        container.style.textAlign = 'center';
        container.style.padding = '2rem';

        let index = 0;
        const interval = displayTime / pattern.length;

        const showNext = () => {
            if (index < pattern.length) {
                container.textContent = pattern[index];
                index++;
                setTimeout(showNext, interval);
            } else {
                setTimeout(callback, 500);
            }
        };

        showNext();
    }

    updateSequenceDisplay(container, sequence) {
        const display = container.querySelector('.sequence-display');
        if (display) {
            display.textContent = sequence.join(' ');
        }
    }

    checkPattern(userSequence, correctPattern) {
        if (JSON.stringify(userSequence) === JSON.stringify(correctPattern)) {
            this.completePuzzle(true, 'Perfect memory! The pattern reveals its secret.');
        } else {
            this.attempts++;
            if (this.attempts >= (this.currentPuzzle.maxAttempts || 3)) {
                this.completePuzzle(false, 'The pattern fades from memory...');
            } else {
                alert('Not quite right. Try again!');
                this.loadPuzzle(this.currentPuzzle, this.onComplete);
            }
        }
    }

    // Cipher Decode Puzzle
    renderCipher(puzzle) {
        const container = this.puzzleContainer;

        const title = document.createElement('h3');
        title.className = 'puzzle-title';
        title.textContent = 'Decode the Message';
        container.appendChild(title);

        const cipherText = document.createElement('div');
        cipherText.className = 'cipher-text';
        cipherText.style.fontSize = '1.5rem';
        cipherText.style.textAlign = 'center';
        cipherText.style.padding = '2rem';
        cipherText.style.background = 'rgba(255, 255, 255, 0.1)';
        cipherText.style.borderRadius = '10px';
        cipherText.style.marginBottom = '1rem';
        cipherText.style.letterSpacing = '0.2em';
        cipherText.textContent = puzzle.encrypted;
        container.appendChild(cipherText);

        if (puzzle.hint) {
            const hint = document.createElement('p');
            hint.className = 'puzzle-hint';
            hint.textContent = `Hint: ${puzzle.hint}`;
            hint.style.fontStyle = 'italic';
            hint.style.color = 'var(--frost-blue)';
            container.appendChild(hint);
        }

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'cipher-input';
        input.placeholder = 'Enter decoded message...';
        input.style.width = '100%';
        input.style.padding = '1rem';
        input.style.fontSize = '1.2rem';
        input.style.marginBottom = '1rem';
        input.style.borderRadius = '10px';
        input.style.border = '2px solid var(--gold)';
        input.style.background = 'rgba(0, 0, 0, 0.5)';
        input.style.color = 'white';
        container.appendChild(input);

        const submitBtn = document.createElement('button');
        submitBtn.className = 'submit-btn';
        submitBtn.textContent = 'Decode';
        submitBtn.style.padding = '1rem 2rem';
        submitBtn.style.fontSize = '1.2rem';
        submitBtn.onclick = () => {
            if (input.value.trim().toUpperCase() === puzzle.original) {
                this.completePuzzle(true, 'The message is clear! The path forward reveals itself.');
            } else {
                this.attempts++;
                if (this.attempts >= (puzzle.maxAttempts || 3)) {
                    this.completePuzzle(false, 'The cipher remains unbroken...');
                } else {
                    alert(`Incorrect. ${puzzle.maxAttempts - this.attempts} attempts remaining.`);
                }
            }
        };
        container.appendChild(submitBtn);
    }

    // Logic Riddle Puzzle
    renderLogicRiddle(puzzle) {
        const container = this.puzzleContainer;

        const title = document.createElement('h3');
        title.className = 'puzzle-title';
        title.textContent = 'Solve the Riddle';
        container.appendChild(title);

        const riddle = document.createElement('p');
        riddle.className = 'riddle-text';
        riddle.style.fontSize = '1.3rem';
        riddle.style.textAlign = 'center';
        riddle.style.padding = '2rem';
        riddle.style.fontStyle = 'italic';
        riddle.style.lineHeight = '1.8';
        riddle.textContent = puzzle.question;
        container.appendChild(riddle);

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'riddle-input';
        input.placeholder = 'Your answer...';
        input.style.width = '100%';
        input.style.padding = '1rem';
        input.style.fontSize = '1.2rem';
        input.style.marginBottom = '1rem';
        input.style.borderRadius = '10px';
        input.style.border = '2px solid var(--gold)';
        input.style.background = 'rgba(0, 0, 0, 0.5)';
        input.style.color = 'white';
        input.style.textAlign = 'center';
        container.appendChild(input);

        const submitBtn = document.createElement('button');
        submitBtn.className = 'submit-btn';
        submitBtn.textContent = 'Submit Answer';
        submitBtn.style.padding = '1rem 2rem';
        submitBtn.style.fontSize = '1.2rem';
        submitBtn.onclick = () => {
            if (input.value.trim().toLowerCase() === puzzle.answer) {
                this.completePuzzle(true, 'Wisdom guides your path!');
            } else {
                this.attempts++;
                if (this.attempts >= (puzzle.maxAttempts || 3)) {
                    this.completePuzzle(false, `The answer was: ${puzzle.answer}`);
                } else {
                    alert(`Not quite. ${puzzle.maxAttempts - this.attempts} attempts remaining.`);
                }
            }
        };
        container.appendChild(submitBtn);
    }

    // Spatial Pattern Puzzle
    renderSpatialPattern(puzzle) {
        const container = this.puzzleContainer;

        const title = document.createElement('h3');
        title.className = 'puzzle-title';
        title.textContent = 'Find the Path';
        container.appendChild(title);

        const instruction = document.createElement('p');
        instruction.className = 'puzzle-instruction';
        instruction.textContent = 'Click the tiles in the correct order to reveal the path...';
        container.appendChild(instruction);

        const grid = document.createElement('div');
        grid.className = 'spatial-grid';
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${puzzle.size}, 1fr)`;
        grid.style.gap = '5px';
        grid.style.maxWidth = '400px';
        grid.style.margin = '0 auto';
        container.appendChild(grid);

        const userPath = [];

        puzzle.grid.forEach((row, y) => {
            row.forEach((cell, x) => {
                const tile = document.createElement('button');
                tile.className = 'grid-tile';
                tile.style.aspectRatio = '1';
                tile.style.fontSize = '1.5rem';
                tile.style.background = 'rgba(255, 255, 255, 0.1)';
                tile.style.border = '2px solid var(--ice-blue)';
                tile.style.borderRadius = '5px';
                tile.style.cursor = 'pointer';
                tile.dataset.x = x;
                tile.dataset.y = y;

                tile.onclick = () => {
                    userPath.push([x, y]);
                    tile.style.background = 'rgba(255, 215, 0, 0.3)';
                    tile.textContent = userPath.length;
                    tile.disabled = true;

                    if (userPath.length === puzzle.path.length) {
                        this.checkSpatialPath(userPath, puzzle.path);
                    }
                };

                grid.appendChild(tile);
            });
        });

        const resetBtn = document.createElement('button');
        resetBtn.className = 'reset-btn';
        resetBtn.textContent = 'Reset Path';
        resetBtn.style.marginTop = '1rem';
        resetBtn.style.padding = '0.5rem 1rem';
        resetBtn.onclick = () => this.loadPuzzle(puzzle, this.onComplete);
        container.appendChild(resetBtn);
    }

    checkSpatialPath(userPath, correctPath) {
        const isCorrect = userPath.every((point, index) =>
            point[0] === correctPath[index][0] && point[1] === correctPath[index][1]
        );

        if (isCorrect) {
            this.completePuzzle(true, 'The path is clear!');
        } else {
            this.attempts++;
            if (this.attempts >= 3) {
                this.completePuzzle(false, 'Lost in the maze...');
            } else {
                alert('Wrong path. Try again!');
                this.loadPuzzle(this.currentPuzzle, this.onComplete);
            }
        }
    }

    // Rhythm Synchronization Puzzle
    renderRhythmSync(puzzle) {
        const container = this.puzzleContainer;

        const title = document.createElement('h3');
        title.className = 'puzzle-title';
        title.textContent = 'Match the Rhythm';
        container.appendChild(title);

        const instruction = document.createElement('p');
        instruction.className = 'puzzle-instruction';
        instruction.textContent = 'Watch the pattern, then recreate it...';
        container.appendChild(instruction);

        const display = document.createElement('div');
        display.className = 'rhythm-display';
        display.style.width = '200px';
        display.style.height = '200px';
        display.style.borderRadius = '50%';
        display.style.border = '4px solid var(--gold)';
        display.style.margin = '2rem auto';
        display.style.display = 'flex';
        display.style.alignItems = 'center';
        display.style.justifyContent = 'center';
        display.style.fontSize = '4rem';
        container.appendChild(display);

        const tapBtn = document.createElement('button');
        tapBtn.className = 'tap-btn';
        tapBtn.textContent = 'Tap to Start';
        tapBtn.style.width = '200px';
        tapBtn.style.height = '200px';
        tapBtn.style.borderRadius = '50%';
        tapBtn.style.fontSize = '1.5rem';
        tapBtn.style.display = 'block';
        tapBtn.style.margin = '0 auto';
        tapBtn.style.display = 'none';
        container.appendChild(tapBtn);

        // Play pattern
        this.playRhythmPattern(display, puzzle.sequence, () => {
            display.style.display = 'none';
            tapBtn.style.display = 'block';

            const userTaps = [];
            let startTime = null;

            tapBtn.onclick = () => {
                if (!startTime) {
                    startTime = Date.now();
                    tapBtn.textContent = 'Tap the Rhythm';
                    return;
                }

                const tapTime = Date.now() - startTime;
                userTaps.push(tapTime);
                tapBtn.style.background = 'rgba(255, 215, 0, 0.5)';
                setTimeout(() => {
                    tapBtn.style.background = '';
                }, 100);

                if (userTaps.length === puzzle.sequence.length) {
                    this.checkRhythm(userTaps, puzzle.sequence, puzzle.tolerance);
                }
            };
        });
    }

    playRhythmPattern(display, sequence, callback) {
        let index = 0;
        let totalTime = 0;

        const playNext = () => {
            if (index < sequence.length) {
                setTimeout(() => {
                    display.style.background = 'rgba(255, 215, 0, 0.5)';
                    display.textContent = '🔔';

                    setTimeout(() => {
                        display.style.background = '';
                        display.textContent = '';
                        index++;
                        playNext();
                    }, 200);

                    totalTime += sequence[index];
                }, sequence[index] || 0);
            } else {
                setTimeout(callback, 1000);
            }
        };

        playNext();
    }

    checkRhythm(userTaps, correctSequence, tolerance) {
        // Convert to intervals
        const userIntervals = [];
        for (let i = 1; i < userTaps.length; i++) {
            userIntervals.push(userTaps[i] - userTaps[i - 1]);
        }

        const isCorrect = userIntervals.every((interval, index) => {
            return Math.abs(interval - correctSequence[index + 1]) <= tolerance;
        });

        if (isCorrect) {
            this.completePuzzle(true, 'Perfect rhythm! You are in sync.');
        } else {
            this.attempts++;
            if (this.attempts >= (this.currentPuzzle.maxAttempts || 3)) {
                this.completePuzzle(false, 'The rhythm escapes you...');
            } else {
                alert('Off beat. Try again!');
                this.loadPuzzle(this.currentPuzzle, this.onComplete);
            }
        }
    }

    // Default/Simple Puzzle Renderer
    renderDefaultPuzzle(puzzle) {
        const container = this.puzzleContainer;

        const title = document.createElement('h3');
        title.className = 'puzzle-title';
        title.textContent = 'Puzzle Challenge';
        container.appendChild(title);

        const instruction = document.createElement('p');
        instruction.style.textAlign = 'center';
        instruction.style.padding = '2rem';
        instruction.textContent = 'This puzzle type is still being crafted...';
        container.appendChild(instruction);

        const continueBtn = document.createElement('button');
        continueBtn.textContent = 'Continue';
        continueBtn.className = 'submit-btn';
        continueBtn.onclick = () => this.completePuzzle(true, 'You sense a path forward...');
        container.appendChild(continueBtn);
    }

    // Render choice-based "puzzles"
    renderMoralChoice(puzzle) {
        this.renderDefaultPuzzle(puzzle);
    }

    renderMemorySequence(puzzle) {
        this.renderDefaultPuzzle(puzzle);
    }

    renderFragmentAssembly(puzzle) {
        this.renderDefaultPuzzle(puzzle);
    }

    renderMirrorPuzzle(puzzle) {
        this.renderDefaultPuzzle(puzzle);
    }

    renderTemporalParadox(puzzle) {
        this.renderDefaultPuzzle(puzzle);
    }

    renderDialogueTree(puzzle) {
        this.renderDefaultPuzzle(puzzle);
    }

    renderFinalChoice(puzzle) {
        this.renderDefaultPuzzle(puzzle);
    }

    // Complete puzzle
    completePuzzle(success, message) {
        this.puzzleContainer.innerHTML = '';

        const result = document.createElement('div');
        result.className = 'puzzle-result';
        result.style.textAlign = 'center';
        result.style.padding = '2rem';

        const icon = document.createElement('div');
        icon.style.fontSize = '4rem';
        icon.textContent = success ? '✨' : '❄️';
        result.appendChild(icon);

        const msg = document.createElement('p');
        msg.style.fontSize = '1.3rem';
        msg.style.marginTop = '1rem';
        msg.textContent = message;
        result.appendChild(msg);

        this.puzzleContainer.appendChild(result);

        if (this.onComplete) {
            setTimeout(() => {
                this.onComplete(success);
            }, 2000);
        }
    }
}

export default PuzzleManager;
