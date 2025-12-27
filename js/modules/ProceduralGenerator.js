// ProceduralGenerator.js - Generate unique level variations using seeded random
export class ProceduralGenerator {
    constructor(seed) {
        this.seed = seed;
        this.rng = this.createSeededRandom(seed);
    }

    // Seeded random number generator (Mulberry32)
    createSeededRandom(seed) {
        return function() {
            let t = seed += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    // Random integer between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(this.rng() * (max - min + 1)) + min;
    }

    // Random float between min and max
    randomFloat(min, max) {
        return this.rng() * (max - min) + min;
    }

    // Shuffle array using Fisher-Yates
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(this.rng() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Pick random element from array
    pickRandom(array) {
        return array[Math.floor(this.rng() * array.length)];
    }

    // Generate procedural puzzle variation
    generatePuzzleVariation(basePuzzle, difficulty) {
        const variations = {
            'pattern-memory': () => this.generatePatternMemory(difficulty),
            'cipher-decode': () => this.generateCipher(difficulty),
            'moral-choice': () => this.generateMoralChoice(difficulty),
            'memory-sequence': () => this.generateMemorySequence(difficulty),
            'fragment-assembly': () => this.generateFragmentAssembly(difficulty),
            'philosophical-choice': () => this.generatePhilosophicalChoice(difficulty),
            'spatial-pattern': () => this.generateSpatialPattern(difficulty),
            'logic-riddle': () => this.generateLogicRiddle(difficulty),
            'mirror-puzzle': () => this.generateMirrorPuzzle(difficulty),
            'sequence-identification': () => this.generateSequenceIdentification(difficulty),
            'stealth-strategy': () => this.generateStealthStrategy(difficulty),
            'temporal-paradox': () => this.generateTemporalParadox(difficulty),
            'timeline-mapping': () => this.generateTimelineMapping(difficulty),
            'paradox-puzzle': () => this.generateParadoxPuzzle(difficulty),
            'creative-solution': () => this.generateCreativeSolution(difficulty),
            'temporal-influence': () => this.generateTemporalInfluence(difficulty),
            'synchronization': () => this.generateSynchronization(difficulty),
            'emotional-navigation': () => this.generateEmotionalNavigation(difficulty),
            'dialogue-tree': () => this.generateDialogueTree(difficulty),
            'trust-coordination': () => this.generateTrustCoordination(difficulty),
            'rhythm-synchronization': () => this.generateRhythmSync(difficulty),
            'final-choice': () => this.generateFinalChoice(difficulty)
        };

        const generator = variations[basePuzzle] || variations['pattern-memory'];
        return generator();
    }

    // Pattern Memory Puzzle
    generatePatternMemory(difficulty) {
        const sequences = {
            easy: 4,
            medium: 6,
            hard: 8
        };

        const length = sequences[difficulty] || 6;
        const symbols = ['🎄', '⛄', '🎁', '❄️', '🔔', '⭐', '🕯️', '🎅'];
        const pattern = [];

        for (let i = 0; i < length; i++) {
            pattern.push(this.pickRandom(symbols));
        }

        return {
            type: 'pattern-memory',
            pattern: pattern,
            displayTime: difficulty === 'easy' ? 5000 : difficulty === 'medium' ? 3000 : 2000,
            maxAttempts: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 2
        };
    }

    // Cipher Decode Puzzle
    generateCipher(difficulty) {
        const messages = [
            "THE FLAME BURNS IN THE OLDEST TREE",
            "FOLLOW THE NORTH STAR TO SALVATION",
            "WARMTH LIES BENEATH THE FROZEN LAKE",
            "THE SEEKER COMES AT MIDNIGHT",
            "BREAK THE CYCLE WITH PARADOX"
        ];

        const message = this.pickRandom(messages);
        const shift = this.randomInt(1, 25);

        // Caesar cipher
        const encrypted = message.split('').map(char => {
            if (char.match(/[A-Z]/)) {
                return String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
            }
            return char;
        }).join('');

        return {
            type: 'cipher-decode',
            encrypted: encrypted,
            original: message,
            shift: shift,
            hint: difficulty === 'easy' ? `Shift by ${shift}` : difficulty === 'medium' ? 'Caesar cipher' : null,
            maxAttempts: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 1
        };
    }

    // Memory Sequence Puzzle
    generateMemorySequence(difficulty) {
        const complexities = {
            easy: 3,
            medium: 5,
            hard: 7
        };

        const count = complexities[difficulty] || 5;
        const memoryFragments = [
            { icon: '🏠', text: 'A warm cottage' },
            { icon: '👥', text: 'Laughing faces' },
            { icon: '🔥', text: 'A hearth fire' },
            { icon: '❄️', text: 'First snowfall' },
            { icon: '🎵', text: 'A lullaby' },
            { icon: '🌙', text: 'Moonlight on ice' },
            { icon: '⭐', text: 'Wishing on stars' },
            { icon: '🎁', text: 'A precious gift' }
        ];

        const selected = this.shuffle(memoryFragments).slice(0, count);

        return {
            type: 'memory-sequence',
            fragments: selected,
            correctOrder: this.shuffle([...Array(count).keys()]),
            timeLimit: difficulty === 'easy' ? 60000 : difficulty === 'medium' ? 45000 : 30000
        };
    }

    // Spatial Pattern Puzzle
    generateSpatialPattern(difficulty) {
        const gridSizes = {
            easy: 3,
            medium: 4,
            hard: 5
        };

        const size = gridSizes[difficulty] || 4;
        const grid = Array(size).fill(null).map(() => Array(size).fill(0));

        // Create a path through the grid
        let x = 0, y = 0;
        const path = [[x, y]];
        grid[y][x] = 1;

        const pathLength = this.randomInt(size * 2, size * 3);

        for (let i = 0; i < pathLength; i++) {
            const directions = [];
            if (x > 0) directions.push([-1, 0]);
            if (x < size - 1) directions.push([1, 0]);
            if (y > 0) directions.push([0, -1]);
            if (y < size - 1) directions.push([0, 1]);

            if (directions.length === 0) break;

            const [dx, dy] = this.pickRandom(directions);
            x += dx;
            y += dy;

            if (grid[y][x] === 0) {
                grid[y][x] = path.length + 1;
                path.push([x, y]);
            }
        }

        return {
            type: 'spatial-pattern',
            grid: grid,
            path: path,
            size: size,
            timeLimit: difficulty === 'easy' ? 120000 : difficulty === 'medium' ? 90000 : 60000
        };
    }

    // Logic Riddle Puzzle
    generateLogicRiddle(difficulty) {
        const riddles = {
            easy: [
                { question: "I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?", answer: "echo" },
                { question: "What gets wetter as it dries?", answer: "towel" },
                { question: "I'm light as a feather, yet the strongest person can't hold me for five minutes. What am I?", answer: "breath" }
            ],
            medium: [
                { question: "Forward I'm heavy, backward I'm not. What am I?", answer: "ton" },
                { question: "I have cities but no houses, forests but no trees, water but no fish. What am I?", answer: "map" },
                { question: "The more you take, the more you leave behind. What am I?", answer: "footsteps" }
            ],
            hard: [
                { question: "I am the beginning of everything, the end of everywhere. I'm the beginning of eternity, the end of time and space. What am I?", answer: "e" },
                { question: "What has roots that nobody sees, is taller than trees, up up it goes, yet never grows?", answer: "mountain" },
                { question: "Alive without breath, cold as death, never thirsty, always drinking. What am I?", answer: "fish" }
            ]
        };

        const riddle = this.pickRandom(riddles[difficulty] || riddles.medium);

        return {
            type: 'logic-riddle',
            question: riddle.question,
            answer: riddle.answer.toLowerCase(),
            maxAttempts: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 2
        };
    }

    // Mirror Puzzle
    generateMirrorPuzzle(difficulty) {
        const symbols = ['▲', '▼', '◀', '▶', '★', '●', '■', '◆'];
        const complexities = {
            easy: 4,
            medium: 6,
            hard: 8
        };

        const count = complexities[difficulty] || 6;
        const original = [];
        const mirrored = [];

        for (let i = 0; i < count; i++) {
            const symbol = this.pickRandom(symbols);
            original.push(symbol);
            // Mirror logic (reverse horizontal orientation)
            const mirrorMap = { '◀': '▶', '▶': '◀' };
            mirrored.push(mirrorMap[symbol] || symbol);
        }

        return {
            type: 'mirror-puzzle',
            original: original,
            mirrored: mirrored.reverse(),
            timeLimit: difficulty === 'easy' ? 90000 : difficulty === 'medium' ? 60000 : 45000
        };
    }

    // Temporal Paradox Puzzle
    generateTemporalParadox(difficulty) {
        const scenarios = [
            {
                question: "If you prevent your past self from entering the forest, you never gain the knowledge to travel back. What happens?",
                options: ["Timeline splits", "Paradox resolves itself", "You cease to exist", "Time loops infinitely"],
                correct: 0
            },
            {
                question: "The Seeker is your future. If you change the future, are you still you?",
                options: ["Yes, identity is continuous", "No, you become someone new", "Both simultaneously", "Identity is an illusion"],
                correct: 2
            },
            {
                question: "Can an effect precede its cause if both exist outside time?",
                options: ["No, causality is absolute", "Yes, in non-linear time", "The question is meaningless", "Causality itself is the illusion"],
                correct: 1
            }
        ];

        const scenario = this.pickRandom(scenarios);

        return {
            type: 'temporal-paradox',
            question: scenario.question,
            options: difficulty === 'easy' ? scenario.options : this.shuffle(scenario.options),
            correct: scenario.correct,
            timeLimit: difficulty === 'easy' ? 120000 : difficulty === 'medium' ? 90000 : 60000
        };
    }

    // Synchronization Puzzle (rhythm-based)
    generateRhythmSync(difficulty) {
        const beats = {
            easy: 4,
            medium: 6,
            hard: 8
        };

        const count = beats[difficulty] || 6;
        const sequence = [];
        const intervals = [500, 750, 1000, 1250];

        for (let i = 0; i < count; i++) {
            sequence.push(this.pickRandom(intervals));
        }

        return {
            type: 'rhythm-synchronization',
            sequence: sequence,
            tolerance: difficulty === 'easy' ? 200 : difficulty === 'medium' ? 150 : 100,
            maxAttempts: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 2
        };
    }

    // Generate environmental variations
    generateEnvironment(chapter, level) {
        const weatherTypes = ['light-snow', 'heavy-snow', 'blizzard', 'clear-frost', 'aurora'];
        const timeOfDay = ['dusk', 'midnight', 'pre-dawn', 'eternal-twilight'];
        const atmospheres = ['peaceful', 'eerie', 'mystical', 'tense', 'melancholic'];

        return {
            weather: this.pickRandom(weatherTypes),
            time: this.pickRandom(timeOfDay),
            atmosphere: this.pickRandom(atmospheres),
            snowfallIntensity: this.randomFloat(0.3, 1.0),
            windSpeed: this.randomFloat(0, 1),
            visibility: this.randomFloat(0.5, 1.0),
            ambientLight: this.randomFloat(0.3, 0.8)
        };
    }

    // Generate random decorative elements
    generateDecorativeElements() {
        const elements = [];
        const types = ['icicle', 'frost-pattern', 'snowdrift', 'frozen-branch', 'ice-crystal'];

        const count = this.randomInt(5, 15);

        for (let i = 0; i < count; i++) {
            elements.push({
                type: this.pickRandom(types),
                x: this.randomFloat(0, 100),
                y: this.randomFloat(0, 100),
                size: this.randomFloat(0.5, 2),
                rotation: this.randomFloat(0, 360),
                opacity: this.randomFloat(0.3, 1)
            });
        }

        return elements;
    }

    // Generate NPC dialogue variations
    generateDialogueVariation(baseDialogue) {
        const prefixes = [
            "Listen well: ",
            "I must tell you: ",
            "Pay attention: ",
            "Heed my words: ",
            "Mark this: "
        ];

        const suffixes = [
            "...or so the old tales say.",
            "...though I may be mistaken.",
            "...if my memory serves.",
            "...as it has always been.",
            "...make of that what you will."
        ];

        if (this.rng() > 0.5) {
            return this.pickRandom(prefixes) + baseDialogue;
        } else {
            return baseDialogue + " " + this.pickRandom(suffixes);
        }
    }

    // Final choice variations
    generateFinalChoice(difficulty) {
        return {
            type: 'final-choice',
            timeToDecide: difficulty === 'easy' ? null : difficulty === 'medium' ? 60000 : 30000,
            showConsequences: difficulty === 'easy',
            allowUndo: difficulty !== 'hard'
        };
    }

    // Helper methods for other puzzle types
    generateMoralChoice(difficulty) {
        return { type: 'moral-choice', showConsequences: difficulty === 'easy' };
    }

    generateFragmentAssembly(difficulty) {
        const pieces = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 9;
        return { type: 'fragment-assembly', pieces: pieces, rotatable: difficulty !== 'easy' };
    }

    generatePhilosophicalChoice(difficulty) {
        return { type: 'philosophical-choice', timeLimit: difficulty === 'hard' ? 90000 : null };
    }

    generateSequenceIdentification(difficulty) {
        const length = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 9;
        return { type: 'sequence-identification', sequenceLength: length };
    }

    generateStealthStrategy(difficulty) {
        return { type: 'stealth-strategy', detectionRange: difficulty === 'hard' ? 1.5 : 1.0 };
    }

    generateTimelineMapping(difficulty) {
        const events = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 12;
        return { type: 'timeline-mapping', eventCount: events };
    }

    generateParadoxPuzzle(difficulty) {
        return { type: 'paradox-puzzle', complexity: difficulty };
    }

    generateCreativeSolution(difficulty) {
        return { type: 'creative-solution', acceptMultipleSolutions: difficulty === 'easy' };
    }

    generateTemporalInfluence(difficulty) {
        return { type: 'temporal-influence', influenceStrength: difficulty === 'hard' ? 0.5 : 1.0 };
    }

    generateSynchronization(difficulty) {
        return { type: 'synchronization', syncTolerance: difficulty === 'easy' ? 500 : difficulty === 'medium' ? 300 : 150 };
    }

    generateEmotionalNavigation(difficulty) {
        return { type: 'emotional-navigation', emotionCount: difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7 };
    }

    generateDialogueTree(difficulty) {
        const depth = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
        return { type: 'dialogue-tree', maxDepth: depth };
    }

    generateTrustCoordination(difficulty) {
        return { type: 'trust-coordination', failureConsequence: difficulty === 'hard' ? 'severe' : 'moderate' };
    }

    // Additional Puzzle Variations

    // Word Association Puzzle
    generateWordAssociation(difficulty) {
        const wordSets = {
            easy: [
                { words: ['snow', 'cold', 'winter', 'ice'], answer: 'frost' },
                { words: ['gift', 'wrap', 'bow', 'surprise'], answer: 'present' },
                { words: ['fire', 'warmth', 'light', 'burn'], answer: 'flame' }
            ],
            medium: [
                { words: ['memory', 'forget', 'past', 'nostalgia'], answer: 'remember' },
                { words: ['cycle', 'repeat', 'loop', 'again'], answer: 'eternal' },
                { words: ['choice', 'path', 'decision', 'fork'], answer: 'crossroads' }
            ],
            hard: [
                { words: ['paradox', 'time', 'loop', 'contradiction'], answer: 'causality' },
                { words: ['soul', 'essence', 'self', 'identity'], answer: 'consciousness' },
                { words: ['sacrifice', 'give', 'offer', 'surrender'], answer: 'devotion' }
            ]
        };

        const set = this.pickRandom(wordSets[difficulty] || wordSets.medium);
        return {
            type: 'word-association',
            words: difficulty === 'easy' ? set.words : this.shuffle(set.words),
            answer: set.answer.toLowerCase(),
            maxAttempts: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 2
        };
    }

    // Color Matching Puzzle
    generateColorMatching(difficulty) {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'white', 'silver'];
        const count = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;

        const sequence = [];
        for (let i = 0; i < count; i++) {
            sequence.push(this.pickRandom(colors));
        }

        return {
            type: 'color-matching',
            sequence: sequence,
            displayTime: difficulty === 'easy' ? 6000 : difficulty === 'medium' ? 4000 : 3000,
            maxAttempts: difficulty === 'easy' ? 4 : difficulty === 'medium' ? 3 : 2
        };
    }

    // Math Sequence Puzzle
    generateMathSequence(difficulty) {
        const patterns = {
            easy: [
                { sequence: [2, 4, 6, 8], next: 10, rule: 'add 2' },
                { sequence: [5, 10, 15, 20], next: 25, rule: 'add 5' },
                { sequence: [1, 2, 4, 8], next: 16, rule: 'multiply by 2' }
            ],
            medium: [
                { sequence: [1, 1, 2, 3, 5], next: 8, rule: 'fibonacci' },
                { sequence: [1, 4, 9, 16], next: 25, rule: 'squares' },
                { sequence: [2, 6, 12, 20], next: 30, rule: 'n*(n+1)' }
            ],
            hard: [
                { sequence: [1, 2, 6, 24], next: 120, rule: 'factorial' },
                { sequence: [2, 3, 5, 7, 11], next: 13, rule: 'primes' },
                { sequence: [1, 8, 27, 64], next: 125, rule: 'cubes' }
            ]
        };

        const pattern = this.pickRandom(patterns[difficulty] || patterns.medium);
        return {
            type: 'math-sequence',
            sequence: pattern.sequence,
            answer: pattern.next,
            hint: difficulty === 'easy' ? pattern.rule : null,
            tolerance: difficulty === 'easy' ? 1 : 0,
            maxAttempts: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 2
        };
    }

    // Symbol Substitution Puzzle
    generateSymbolSubstitution(difficulty) {
        const symbols = {
            '🔥': 'A', '❄️': 'E', '⭐': 'I', '🎄': 'O',
            '🎁': 'T', '🔔': 'S', '🕯️': 'N', '⛄': 'R'
        };

        const words = {
            easy: ['FIRE', 'STAR', 'TREE'],
            medium: ['WINTER', 'FROST', 'SEEKER'],
            hard: ['KINDLING', 'ETERNITY', 'TRANSFORMATION']
        };

        const word = this.pickRandom(words[difficulty] || words.medium);
        const symbolWord = word.split('').map(letter => {
            for (const [symbol, char] of Object.entries(symbols)) {
                if (char === letter) return symbol;
            }
            return letter;
        }).join('');

        return {
            type: 'symbol-substitution',
            symbolWord: symbolWord,
            answer: word,
            key: difficulty === 'easy' ? symbols : null,
            maxAttempts: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 2
        };
    }

    // Maze Navigation Puzzle
    generateMazeNavigation(difficulty) {
        const sizes = {
            easy: 5,
            medium: 7,
            hard: 9
        };

        const size = sizes[difficulty] || 7;
        const maze = this.generateMaze(size);

        return {
            type: 'maze-navigation',
            maze: maze,
            size: size,
            timeLimit: difficulty === 'easy' ? 180000 : difficulty === 'medium' ? 120000 : 90000
        };
    }

    // Helper to generate a simple maze
    generateMaze(size) {
        const maze = Array(size).fill(null).map(() => Array(size).fill(1)); // 1 = wall

        // Simple path generation
        let x = 1, y = 1;
        maze[y][x] = 0; // 0 = path

        const directions = [[0, 2], [2, 0], [0, -2], [-2, 0]];

        const carve = (x, y) => {
            const dirs = this.shuffle([...directions]);

            for (const [dx, dy] of dirs) {
                const nx = x + dx;
                const ny = y + dy;

                if (nx > 0 && nx < size - 1 && ny > 0 && ny < size - 1 && maze[ny][nx] === 1) {
                    maze[ny][nx] = 0;
                    maze[y + dy / 2][x + dx / 2] = 0;
                    carve(nx, ny);
                }
            }
        };

        carve(1, 1);

        // Set start and end
        maze[1][1] = 2; // Start
        maze[size - 2][size - 2] = 3; // End

        return maze;
    }

    // Sliding Tile Puzzle
    generateSlidingTile(difficulty) {
        const sizes = {
            easy: 3,
            medium: 4,
            hard: 5
        };

        const size = sizes[difficulty] || 3;
        const tiles = [];

        for (let i = 1; i < size * size; i++) {
            tiles.push(i);
        }
        tiles.push(0); // Empty space

        // Shuffle
        const shuffled = this.shuffleTiles(tiles, size, 50);

        return {
            type: 'sliding-tile',
            tiles: shuffled,
            size: size,
            moves: 0,
            maxMoves: difficulty === 'easy' ? 100 : difficulty === 'medium' ? 75 : 50
        };
    }

    // Helper to shuffle tiles properly (solvable state)
    shuffleTiles(tiles, size, shuffleCount) {
        let current = [...tiles];
        const emptyIndex = current.indexOf(0);
        let emptyRow = Math.floor(emptyIndex / size);
        let emptyCol = emptyIndex % size;

        for (let i = 0; i < shuffleCount; i++) {
            const validMoves = [];

            if (emptyRow > 0) validMoves.push([-1, 0]);
            if (emptyRow < size - 1) validMoves.push([1, 0]);
            if (emptyCol > 0) validMoves.push([0, -1]);
            if (emptyCol < size - 1) validMoves.push([0, 1]);

            const [dr, dc] = this.pickRandom(validMoves);
            const newRow = emptyRow + dr;
            const newCol = emptyCol + dc;

            const newIndex = newRow * size + newCol;
            const oldIndex = emptyRow * size + emptyCol;

            [current[newIndex], current[oldIndex]] = [current[oldIndex], current[newIndex]];

            emptyRow = newRow;
            emptyCol = newCol;
        }

        return current;
    }

    // Anagram Puzzle
    generateAnagram(difficulty) {
        const words = {
            easy: ['FLAME', 'WINTER', 'FROST', 'MAGIC'],
            medium: ['KINDLING', 'SEEKER', 'GIVER', 'SPIRIT'],
            hard: ['TRANSFORMATION', 'PARADOX', 'ETERNITY', 'CONSCIOUSNESS']
        };

        const word = this.pickRandom(words[difficulty] || words.medium);
        const scrambled = this.shuffle(word.split('')).join('');

        return {
            type: 'anagram',
            scrambled: scrambled,
            answer: word,
            hint: difficulty === 'easy' ? `${word.length} letters` : null,
            maxAttempts: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 2
        };
    }
}

export default ProceduralGenerator;
