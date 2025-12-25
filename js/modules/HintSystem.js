// HintSystem.js - Provide context-aware hints for puzzles and levels
export class HintSystem {
    constructor(gameState) {
        this.gameState = gameState;
        this.hintsUsedThisLevel = 0;
        this.hintCooldown = false;
        this.hintData = this.initializeHintData();
    }

    initializeHintData() {
        return {
            // Chapter 1 hints
            '1-1': {
                puzzle: [
                    "Watch the pattern carefully. The symbols appear in a specific order.",
                    "Try focusing on the rhythm of the sequence, not just the symbols themselves.",
                    "The pattern always starts with the same symbol. Use that as your anchor."
                ],
                story: [
                    "The music box might hold more than melodies. What does Master Frost's journal say about listening?",
                    "Wooden toys whisper secrets to those who truly listen. What are they trying to tell you?"
                ]
            },
            '1-2': {
                puzzle: [
                    "Caesar ciphers shift letters by a fixed amount. Try different shift values.",
                    "Look for common words like 'THE' or 'FLAME' to find the shift amount.",
                    "The difficulty setting affects whether you get the shift number as a hint."
                ],
                story: [
                    "Master Frost's journal speaks of 'old ways.' What traditions involve winter and flames?",
                    "The map shows compass directions. North is always toward the ancient forest."
                ]
            },
            '1-3': {
                puzzle: [
                    "This is a choice-based puzzle. There's no single 'correct' answer.",
                    "Consider what each choice means for your character's journey.",
                    "Some choices grant more kindling points, but all paths lead forward."
                ],
                story: [
                    "The spectral figure mentions 'surrendering summer.' What does that mean for someone seeking the Winter Kindling?",
                    "Sometimes the bravest choice isn't to fight, but to step forward into the unknown."
                ]
            },

            // Chapter 2 hints
            '2-1': {
                puzzle: [
                    "Spatial puzzles require you to find the correct path through the grid.",
                    "The numbers indicate the order in which tiles should be clicked.",
                    "Start from where ice crystals glow brightest."
                ],
                story: [
                    "The frozen scenes in the walls show your past lives. Pay attention to the patterns.",
                    "Every Giver becomes a Seeker. The labyrinth remembers all of them."
                ]
            },
            '2-2': {
                puzzle: [
                    "Logic riddles often have answers that are simpler than they first appear.",
                    "Think about the literal meaning of the words, not just their implications.",
                    "The answer is usually a single word or short phrase."
                ],
                story: [
                    "The three paths represent fundamental choices: power, preservation, or freedom.",
                    "Ice crystals don't lie—they only show what is and what might be."
                ]
            },
            '2-3': {
                puzzle: [
                    "Mirror puzzles require you to think about reflections and symmetry.",
                    "What's on the left in reality appears on the right in a mirror.",
                    "Some symbols face different directions when mirrored."
                ],
                story: [
                    "The Seeker in the mirror is reaching out to you. What are they trying to communicate?",
                    "You're not just looking at a reflection—you're looking at a possible future."
                ]
            },

            // Chapter 3 hints (Post-twist)
            '3-1': {
                puzzle: [
                    "Timeline puzzles require organizing events in chronological order.",
                    "Pay attention to cause and effect. What must happen first?",
                    "In time loops, the end often connects back to the beginning."
                ],
                story: [
                    "You and Nyx are the same person. How does that change your understanding of the journey?",
                    "The cycle has repeated for a hundred years. What makes this time different?"
                ]
            },
            '3-2': {
                puzzle: [
                    "Paradox puzzles have no 'wrong' answer—they're about exploring logical contradictions.",
                    "Consider: can an effect happen before its cause in a time loop?",
                    "The answer that creates the most interesting paradox might be the 'right' one."
                ],
                story: [
                    "Your future self is trying to help you. Do you trust yourself?",
                    "Breaking a cycle requires doing something that has never been done before."
                ]
            },
            '3-3': {
                puzzle: [
                    "Creative solution puzzles reward thinking outside the box.",
                    "There may be multiple valid solutions. Which one feels right to you?",
                    "Sometimes the best solution is the one that breaks the puzzle itself."
                ],
                story: [
                    "The Winter Kindling offers wishes, but what if you wish for something it can't grant?",
                    "What happens if you refuse to play by the rules the flame has set?"
                ]
            },

            // Chapter 4 hints
            '4-1': {
                puzzle: [
                    "Emotional navigation requires choosing the right emotional response.",
                    "Each choice affects how the story unfolds. Choose with your heart.",
                    "There's no shame in choosing compassion over vengeance."
                ],
                story: [
                    "The wishes burning in the flame are all desperate pleas. What do they have in common?",
                    "Every wish has a cost. Understanding the cost helps you understand the wish."
                ]
            },
            '4-2': {
                puzzle: [
                    "Dialogue trees branch based on your choices. Choose carefully.",
                    "The Keeper has been alone for centuries. How would you feel?",
                    "Sometimes listening is more powerful than speaking."
                ],
                story: [
                    "The first Keeper created the cycle by accident. Can you end it intentionally?",
                    "Forgiveness doesn't mean forgetting. It means choosing to move forward."
                ]
            },
            '4-3': {
                puzzle: [
                    "Moral judgment puzzles ask you to decide the fate of something or someone.",
                    "Consider: is destruction the only form of change?",
                    "Transformation is often more powerful than elimination."
                ],
                story: [
                    "The flame itself may be trapped, just like you. What does freedom mean for it?",
                    "Purification, destruction, transformation—three paths, each with merit."
                ]
            },

            // Chapter 5 hints (Final chapter)
            '5-1': {
                puzzle: [
                    "Trust coordination requires perfect synchronization with your other self.",
                    "In time loops, your past self is watching you right now. What do they need to see?",
                    "Trust is earned through action. What action builds trust with yourself?"
                ],
                story: [
                    "The paradox plan requires absolute faith in your other self. Do you have it?",
                    "You've been alone in the cycle for so long. Can you truly work with yourself?"
                ]
            },
            '5-2': {
                puzzle: [
                    "Rhythm synchronization requires matching a pattern exactly.",
                    "Listen to the beat before trying to replicate it.",
                    "Your device's touch response matters. If struggling, try a different input method."
                ],
                story: [
                    "Inner freedom and external freedom—are they the same thing?",
                    "The flame says you're already free if you believe it. But is that enough?"
                ]
            },
            '5-3': {
                puzzle: [
                    "This is the final choice. Everything you've learned has prepared you for this moment.",
                    "There is no single 'correct' ending. Each path is valid.",
                    "Choose not based on optimal outcome, but on what feels true to your journey."
                ],
                story: [
                    "Paradox liberation, compassion, gratitude, sacrifice, transformation—five paths forward.",
                    "The flame has changed because you've changed. Your choice will shape what it becomes.",
                    "Remember: you and Nyx are one soul, two perspectives. Choose together."
                ]
            },

            // General puzzle type hints
            'pattern-memory': [
                "Focus on one symbol at a time rather than trying to memorize everything at once.",
                "Use mnemonics: create a story or phrase using the symbols.",
                "The pattern always plays at the same speed. Use that rhythm to help remember."
            ],
            'cipher-decode': [
                "Caesar ciphers are simple letter substitutions. A becomes B, B becomes C, etc.",
                "The most common letter in English is 'E'. Look for it in the encrypted text.",
                "Try writing out the alphabet and shifting it to visualize the cipher."
            ],
            'logic-riddle': [
                "Riddles often use wordplay. Think about multiple meanings of words.",
                "The answer is usually something common, not obscure.",
                "If stuck, try answering literally rather than metaphorically."
            ],
            'spatial-pattern': [
                "Look for continuous paths. Dead ends are rare in these puzzles.",
                "The starting point is usually in a corner or edge.",
                "If lost, restart and try a different initial direction."
            ],
            'rhythm-synchronization': [
                "Count the beats out loud. '1, 2, 3, 4...'",
                "Practice makes perfect. Don't be afraid to retry multiple times.",
                "Focus on the intervals between beats, not just the beats themselves."
            ]
        };
    }

    // Get hint for current level
    getHint(chapter, level, puzzleType = null, hintLevel = 0) {
        const state = this.gameState.getState();
        const difficultyMod = this.gameState.getDifficultyModifier();

        // Check cooldown
        if (this.hintCooldown) {
            return {
                success: false,
                message: "Hints are recharging... wait a moment.",
                cooldown: true
            };
        }

        // Get level-specific hints
        const levelKey = `${chapter}-${level}`;
        const levelHints = this.hintData[levelKey];

        let hint = null;

        // Try to get level-specific hint first
        if (levelHints) {
            if (puzzleType && levelHints.puzzle && levelHints.puzzle[hintLevel]) {
                hint = levelHints.puzzle[hintLevel];
            } else if (levelHints.story && levelHints.story[hintLevel]) {
                hint = levelHints.story[hintLevel];
            } else if (levelHints.puzzle && levelHints.puzzle[0]) {
                hint = levelHints.puzzle[0];
            }
        }

        // Fall back to puzzle type hints
        if (!hint && puzzleType && this.hintData[puzzleType]) {
            const typeHints = this.hintData[puzzleType];
            hint = typeHints[hintLevel % typeHints.length];
        }

        // Generic fallback
        if (!hint) {
            hint = "Look carefully at the narrative. Often it contains clues to the solution.";
        }

        // Apply cooldown
        const cooldownTime = 30000 * difficultyMod.hintCooldown; // 30 seconds base
        this.hintCooldown = true;
        setTimeout(() => {
            this.hintCooldown = false;
        }, cooldownTime);

        // Track hint usage
        this.hintsUsedThisLevel++;
        const currentHintsUsed = state.hintsUsed || 0;
        this.gameState.updateState({ hintsUsed: currentHintsUsed + 1 });

        return {
            success: true,
            hint: hint,
            hintsUsedThisLevel: this.hintsUsedThisLevel,
            cooldownTime: cooldownTime
        };
    }

    // Get contextual hint based on player performance
    getContextualHint(attempts, timeSpent, puzzleType) {
        if (attempts > 3) {
            return {
                hint: "You've tried several times. Perhaps try a completely different approach?",
                type: "encouragement"
            };
        }

        if (timeSpent > 300000) { // 5 minutes
            return {
                hint: "Taking your time is good, but don't overthink it. Sometimes the simplest answer is correct.",
                type: "timeout"
            };
        }

        // Puzzle-specific dynamic hints
        const dynamicHints = {
            'pattern-memory': "Struggling with the sequence? Try saying the symbols out loud as they appear.",
            'cipher-decode': "Stuck on the cipher? Remember that common words like THE and AND appear frequently.",
            'logic-riddle': "The riddle's answer is simpler than you think. Try the most obvious interpretation.",
            'spatial-pattern': "Can't find the path? Try starting from a different corner.",
            'rhythm-synchronization': "Having trouble with timing? Try counting out loud: 'One, two, three, four...'"
        };

        return {
            hint: dynamicHints[puzzleType] || "Keep trying! You're making progress.",
            type: "dynamic"
        };
    }

    // Reset hints for new level
    resetLevel() {
        this.hintsUsedThisLevel = 0;
    }

    // Get hint progress
    getHintProgress(chapter, level) {
        const levelKey = `${chapter}-${level}`;
        const levelHints = this.hintData[levelKey];

        if (!levelHints) {
            return { available: 0, used: this.hintsUsedThisLevel };
        }

        const available = (levelHints.puzzle?.length || 0) + (levelHints.story?.length || 0);
        return {
            available: available,
            used: this.hintsUsedThisLevel,
            remaining: Math.max(0, available - this.hintsUsedThisLevel)
        };
    }

    // Check if hints are available
    hasHintsAvailable(chapter, level) {
        const progress = this.getHintProgress(chapter, level);
        return progress.remaining > 0 || progress.available === 0; // Always allow at least one hint
    }
}

export default HintSystem;
