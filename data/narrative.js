// The Winter Kindling - Narrative Data
// Two intertwined storylines based on original folklore

export const NARRATIVE_DATA = {
    // Original Folklore Foundation
    folklore: {
        title: "The Winter Kindling",
        legend: `In a time before time was counted, when winter held dominion over the world,
                 there existed a flame that burned without wood, fed only by the warmth of hearts.
                 The ancient ones called it the Winter Kindling—a flame that could grant any wish,
                 but only on the longest night of the year. Those who sought it walked two paths:
                 one of giving, one of seeking. Neither knew they walked toward the same flame,
                 nor that their wishes would bind them across the veil of time itself.`
    },

    // Chapter Structure
    chapters: [
        {
            id: 1,
            title: "Chapter I: Whispers in the Workshop",
            description: "On Christmas Eve, two souls awaken to strange callings...",
            setting: "A snow-buried village on the edge of an ancient forest",

            giver: {
                intro: "You are Elara, apprentice to Master Frost, the village toymaker. Tonight, the toys whisper secrets you were never meant to hear.",
                levels: [
                    {
                        id: 1,
                        title: "The Singing Toys",
                        narrative: "The workshop glows with candlelight, but something is different. The wooden toys on the shelves hum with an otherworldly resonance. Your master left hours ago, muttering about 'the old ways.' A music box begins to play on its own, its melody ancient and familiar.",
                        objective: "Discover which toy holds the first clue",
                        puzzleType: "pattern-memory",
                        items: ["Mysterious Music Box"],
                        choices: [
                            {text: "Follow the music box's melody", consequence: "reveal", kindling: 10},
                            {text: "Search Master Frost's hidden drawer", consequence: "secret", kindling: 15},
                            {text: "Listen to the whispers of the wooden soldiers", consequence: "warning", kindling: 5}
                        ]
                    },
                    {
                        id: 2,
                        title: "Frost's Secret Journal",
                        narrative: "Behind a false panel, you find your master's journal. The entries speak of a 'Winter Kindling'—a flame that appears once every hundred years. The last entry reads: 'She's coming. The Seeker always finds the Giver. We are bound by the flame.'",
                        objective: "Decode the journal's cryptic map",
                        puzzleType: "cipher-decode",
                        items: ["Frost's Journal", "Silver Compass"],
                        choices: [
                            {text: "Follow the map into the Frozen Forest", consequence: "venture", kindling: 20},
                            {text: "Wait for Master Frost to return", consequence: "delay", kindling: 0},
                            {text: "Seek the village elder's wisdom", consequence: "knowledge", kindling: 15}
                        ]
                    },
                    {
                        id: 3,
                        title: "The Threshold of Frost",
                        narrative: "The forest boundary shimmers with ice crystals that seem to pulse with inner light. You hear a voice—not with your ears, but in your mind. 'Turn back, little Giver, or step forward and surrender your summer.' A spectral figure materializes between the trees, translucent as winter breath.",
                        objective: "Choose your path forward",
                        puzzleType: "moral-choice",
                        items: ["Spectral Lantern"],
                        choices: [
                            {text: "Step through the threshold", consequence: "transform", kindling: 25},
                            {text: "Offer the music box as tribute", consequence: "bargain", kindling: 20},
                            {text: "Speak the words from the journal", consequence: "invoke", kindling: 30}
                        ]
                    }
                ]
            },

            seeker: {
                intro: "You are Nyx, a spirit of winter who has forgotten their purpose. You remember only cold, and a desperate need to find something—someone—before the dawn.",
                levels: [
                    {
                        id: 1,
                        title: "Awakening in Ice",
                        narrative: "You drift through the winter night, incorporeal and searching. The village below glows with warm lights, each window a small sun that burns you from afar. But one light calls to you—a workshop where something pulses with familiar power. You remember: you were once solid. Once warm. Once... alive?",
                        objective: "Recall your first memory",
                        puzzleType: "memory-sequence",
                        items: ["Fragment of Memory"],
                        choices: [
                            {text: "Dive into the workshop's light", consequence: "pain", kindling: 10},
                            {text: "Circle the village, gathering strength", consequence: "power", kindling: 15},
                            {text: "Follow the oldest, coldest path", consequence: "truth", kindling: 20}
                        ]
                    },
                    {
                        id: 2,
                        title: "Echoes of What Was",
                        narrative: "In the village square stands a statue—a figure holding a flame. The inscription is worn, but you can read it: 'In memory of the Last Giver, who sacrificed their warmth that winter might end.' The statue's face... you know that face. It's yours. Or it was, in a life you can't remember.",
                        objective: "Piece together your forgotten past",
                        puzzleType: "fragment-assembly",
                        items: ["Frozen Tear", "Echo Stone"],
                        choices: [
                            {text: "Touch the statue and remember", consequence: "agony", kindling: 25},
                            {text: "Seek the one who made you forget", consequence: "confront", kindling: 20},
                            {text: "Run from the truth", consequence: "denial", kindling: 5}
                        ]
                    },
                    {
                        id: 3,
                        title: "The Pull of Purpose",
                        narrative: "Time fractures around you. You see glimpses: a workshop, a young apprentice, a music box playing an endless song. You realize with growing horror—you're not looking for something. You're looking for someone. And when you find them, one of you must give their warmth to kindle the flame. That's the bargain. That's always been the bargain.",
                        objective: "Accept or reject your destiny",
                        puzzleType: "philosophical-choice",
                        items: ["Thread of Fate"],
                        choices: [
                            {text: "Embrace your role as Seeker", consequence: "accept", kindling: 30},
                            {text: "Fight against fate", consequence: "resist", kindling: 25},
                            {text: "Seek a third path", consequence: "innovate", kindling: 35}
                        ]
                    }
                ]
            }
        },

        {
            id: 2,
            title: "Chapter II: The Frozen Heart Labyrinth",
            description: "Deep in the ancient forest, both paths converge on a maze of ice and memory.",
            setting: "An ever-shifting labyrinth made of frozen moments in time",

            giver: {
                intro: "The forest has accepted you, but its price is steep. Each step forward freezes another memory of summer.",
                levels: [
                    {
                        id: 1,
                        title: "Walls of Winter Past",
                        narrative: "The labyrinth walls are transparent ice, and within them you see frozen scenes: people you don't recognize living lives that feel eerily familiar. In one, a young woman works in a workshop. In another, the same woman stands before a flame, weeping. The labyrinth whispers: 'Every Giver walks this path. Every Giver makes the same choice.'",
                        objective: "Navigate using the patterns in the ice",
                        puzzleType: "spatial-pattern",
                        items: ["Ice Prism"],
                        choices: [
                            {text: "Follow the workshop visions", consequence: "history", kindling: 15},
                            {text: "Break through the ice walls", consequence: "force", kindling: 10},
                            {text: "Wait for the maze to reveal its secret", consequence: "patience", kindling: 20}
                        ]
                    },
                    {
                        id: 2,
                        title: "The Chamber of Choices",
                        narrative: "Three paths diverge in the labyrinth's heart. Above each, ice crystals spell out destinies: 'Flame', 'Frost', 'Freedom'. But the words shift and change. Nothing here is certain. You hear footsteps behind you—or ahead—impossible to tell in this space between moments.",
                        objective: "Solve the riddle of the three paths",
                        puzzleType: "logic-riddle",
                        items: ["Tri-Path Key"],
                        choices: [
                            {text: "Choose the path of Flame", consequence: "sacrifice", kindling: 25},
                            {text: "Choose the path of Frost", consequence: "preservation", kindling: 20},
                            {text: "Choose the path of Freedom", consequence: "rebellion", kindling: 30}
                        ]
                    },
                    {
                        id: 3,
                        title: "Mirror of the Seeker",
                        narrative: "At the labyrinth's center, you find a mirror of pure ice. But the reflection isn't yours—it's a spectral figure, beautiful and terrible, reaching out as if drowning. Their lips move: 'Help me remember warmth.' You realize with sudden certainty: this is the Seeker. And they're looking for you.",
                        objective: "Communicate with the reflection",
                        puzzleType: "mirror-puzzle",
                        items: ["Mirror Shard"],
                        choices: [
                            {text: "Reach through the mirror", consequence: "connection", kindling: 35},
                            {text: "Shatter the mirror", consequence: "sever", kindling: 15},
                            {text: "Speak the words from Frost's journal", consequence: "ritual", kindling: 30}
                        ]
                    }
                ]
            },

            seeker: {
                intro: "The labyrinth remembers you. You've walked these ice halls before, in a dozen different lifetimes.",
                levels: [
                    {
                        id: 1,
                        title: "Reflections of Yesterday",
                        narrative: "Every wall shows you a different version of yourself: some human, some spirit, all searching. One reflection mouths words you can't hear. Another reaches out with solid hands. A third weeps frost. Which one is the real you? Or were they all real, once?",
                        objective: "Find your true reflection",
                        puzzleType: "sequence-identification",
                        items: ["Soul Fragment"],
                        choices: [
                            {text: "Absorb all reflections", consequence: "merge", kindling: 20},
                            {text: "Choose the warmest memory", consequence: "humanity", kindling: 25},
                            {text: "Reject all false images", consequence: "clarity", kindling: 15}
                        ]
                    },
                    {
                        id: 2,
                        title: "The Haunting Presence",
                        narrative: "You're not alone in the labyrinth. Another presence moves through the ice—solid, warm, alive. They don't see you yet, but they will. And when they do, the ancient bargain will begin. You could hide. You could run. But you've been running for so long, through so many cycles. Perhaps it's time to be found.",
                        objective: "Decide whether to reveal yourself",
                        puzzleType: "stealth-strategy",
                        items: ["Veil of Mist"],
                        choices: [
                            {text: "Reveal yourself to the Giver", consequence: "meeting", kindling: 30},
                            {text: "Follow them in silence", consequence: "observe", kindling: 20},
                            {text: "Lead them deeper into the maze", consequence: "test", kindling: 25}
                        ]
                    },
                    {
                        id: 3,
                        title: "Through the Glass",
                        narrative: "Face to face with them at last, separated only by a mirror of ice. They're so young, so full of light. And you're going to take it all. That's what Seekers do—they drain the Givers to fuel the flame. Unless... unless you can find another way. But there's never been another way. Not in a hundred cycles.",
                        objective: "Break the cycle or embrace it",
                        puzzleType: "temporal-paradox",
                        items: ["Paradox Stone"],
                        choices: [
                            {text: "Warn them to run", consequence: "mercy", kindling: 35},
                            {text: "Complete the ancient ritual", consequence: "duty", kindling: 30},
                            {text: "Offer yourself instead", consequence: "reversal", kindling: 40}
                        ]
                    }
                ]
            }
        },

        {
            id: 3,
            title: "Chapter III: The First Twist",
            description: "Reality fractures. The two become one. Time reveals its secret.",
            setting: "A realm between moments where past and future collapse",
            twist: "Players discover they are the same person across different timelines—the Seeker is the Giver from 100 years in the future, cursed to repeat the cycle",

            giver: {
                intro: "The mirror shatters. Reality breaks. And you remember... everything.",
                levels: [
                    {
                        id: 1,
                        title: "The Revelation",
                        narrative: "The memories flood in: You standing before the flame a hundred years ago. Making the wish. Becoming cold. Forgetting. Seeking. Finding a new Giver. Taking their warmth. Repeating. Endless. You are Nyx. You are Elara. You are every Giver who became every Seeker. The cycle is you.",
                        objective: "Process the temporal revelation",
                        puzzleType: "timeline-mapping",
                        items: ["Temporal Shard", "Memory Crystal"],
                        choices: [
                            {text: "Accept the cycle as unchangeable", consequence: "despair", kindling: 20},
                            {text: "Search for the moment the cycle began", consequence: "investigate", kindling: 35},
                            {text: "Rage against the Winter Kindling", consequence: "defiance", kindling: 30}
                        ]
                    },
                    {
                        id: 2,
                        title: "Conversations with Your Future Self",
                        narrative: "Nyx speaks to you with your own voice, aged by a century of winter. 'I tried to break free,' they whisper. 'I always try. But the flame demands its price: give warmth to receive a wish, become cold, seek warmth again. We can't escape. I'm so sorry, Elara. I'm so sorry I came for you.'",
                        objective: "Find a flaw in the cycle's logic",
                        puzzleType: "paradox-puzzle",
                        items: ["Cycle Diagram"],
                        choices: [
                            {text: "Ask what wish you made a hundred years ago", consequence: "forgotten-wish", kindling: 40},
                            {text: "Refuse to make any wish at all", consequence: "break-pattern", kindling: 45},
                            {text: "Make a wish to end the Winter Kindling itself", consequence: "meta-wish", kindling: 50}
                        ]
                    },
                    {
                        id: 3,
                        title: "The Choice Point",
                        narrative: "You stand at the moment of bifurcation. Before you, the Winter Kindling burns—ancient, patient, hungry. You could step forward and make your wish, knowing it damns you to become Nyx. You could turn back, but the flame would simply wait for another Giver. Or... you could try something no one has ever tried before.",
                        objective: "Choose a truly new path",
                        puzzleType: "creative-solution",
                        items: ["Kindling's Heart"],
                        choices: [
                            {text: "Wish for the cycle to break", consequence: "meta-wish", kindling: 50},
                            {text: "Wish to remember everything in your next cycle", consequence: "knowledge", kindling: 45},
                            {text: "Don't wish—ask the flame a question instead", consequence: "dialogue", kindling: 55}
                        ]
                    }
                ]
            },

            seeker: {
                intro: "The moment you've dreaded: watching yourself make the choice you made a hundred years ago.",
                levels: [
                    {
                        id: 1,
                        title: "Witnessing Your Beginning",
                        narrative: "You watch through the fractured mirror as young Elara—young you—realizes the terrible truth. You remember this moment from both sides now. The crushing weight of knowledge. The desperate hope that this time will be different. It never is. It never has been. But perhaps...",
                        objective: "Guide your past self without breaking time",
                        puzzleType: "temporal-influence",
                        items: ["Echo of Future"],
                        choices: [
                            {text: "Whisper the truth she needs to hear", consequence: "guidance", kindling: 35},
                            {text: "Show her what she'll become", consequence: "warning", kindling: 30},
                            {text: "Let her choose without interference", consequence: "free-will", kindling: 40}
                        ]
                    },
                    {
                        id: 2,
                        title: "The Question You Never Asked",
                        narrative: "In all your cycles, you never questioned the Winter Kindling itself. You accepted it as immutable truth—a force of nature, ancient and unchangeable. But what if it's not? What if the flame is just as trapped as you are? What if it, too, is waiting for someone to ask the right question?",
                        objective: "Interrogate the nature of the flame",
                        puzzleType: "philosophical-inquiry",
                        items: ["Flame's Whisper"],
                        choices: [
                            {text: "Commune directly with the Kindling", consequence: "communion", kindling: 45},
                            {text: "Search for the flame's origin", consequence: "archaeology", kindling: 40},
                            {text: "Confront the entity that created it", consequence: "confrontation", kindling: 50}
                        ]
                    },
                    {
                        id: 3,
                        title: "Convergence",
                        narrative: "Past and present collapse into a single point. You and Elara stand together before the flame, no longer separated by mirrors or time. Two versions of one soul, unified in purpose for the first time in a century. The Winter Kindling burns brighter, as if anticipating something new. Together, you speak: 'We refuse.'",
                        objective: "Unite past and future selves",
                        puzzleType: "synchronization",
                        items: ["Unified Self"],
                        choices: [
                            {text: "Merge into a single timeline", consequence: "synthesis", kindling: 55},
                            {text: "Attack the flame together", consequence: "rebellion", kindling: 50},
                            {text: "Offer a new bargain to the flame", consequence: "negotiation", kindling: 60}
                        ]
                    }
                ]
            }
        },

        {
            id: 4,
            title: "Chapter IV: The Flame's Memory",
            description: "Journey into the Winter Kindling itself to discover its true nature.",
            setting: "The interior realm of the flame—a place of living memory and ancient sorrow",

            giver: {
                intro: "United with your future self, you step into the impossible: the heart of the Winter Kindling.",
                levels: [
                    {
                        id: 1,
                        title: "A Landscape of Wishes",
                        narrative: "Inside the flame, every wish ever made burns as a separate fire. You see them: desperate pleas for salvation, greedy demands for power, innocent hopes for love. Each one paid for with the wisher's warmth, their humanity, their future. The flame is a prison of consequences.",
                        objective: "Navigate the sea of burning wishes",
                        puzzleType: "emotional-navigation",
                        items: ["Wish Compass"],
                        choices: [
                            {text: "Follow the oldest wishes", consequence: "origin", kindling: 35},
                            {text: "Seek out the unfulfilled wishes", consequence: "broken-promises", kindling: 40},
                            {text: "Find your own wish from the past cycle", consequence: "self-discovery", kindling: 45}
                        ]
                    },
                    {
                        id: 2,
                        title: "The Keeper of the Flame",
                        narrative: "At the center of the burning wishes, you find them: an ancient figure, neither fully human nor spirit, bound to the flame by chains of frost and fire. 'I was the first,' they whisper. 'The first to wish, the first to give warmth, the first to seek. I created this cycle from my own selfishness. And I've been trapped here ever since, watching others repeat my mistake.'",
                        objective: "Learn the truth of the cycle's creation",
                        puzzleType: "dialogue-tree",
                        items: ["First Wish", "Original Sin"],
                        choices: [
                            {text: "Forgive the Keeper", consequence: "mercy", kindling: 50},
                            {text: "Demand they fix what they broke", consequence: "justice", kindling: 45},
                            {text: "Offer to take their place", consequence: "sacrifice", kindling: 40}
                        ]
                    },
                    {
                        id: 3,
                        title: "The Flame's True Purpose",
                        narrative: "The Keeper reveals the secret: the Winter Kindling was never meant to grant wishes. It was meant to teach the cost of wanting. Every cycle, every Giver and Seeker, is a lesson written in frost and fire. But the lesson has gone on too long. The flame itself has become corrupted by centuries of selfish wishes. It no longer teaches—it only punishes.",
                        objective: "Decide the flame's fate",
                        puzzleType: "moral-judgment",
                        items: ["Flame's Core"],
                        choices: [
                            {text: "Purify the flame of corruption", consequence: "redemption", kindling: 55},
                            {text: "Destroy the flame entirely", consequence: "end", kindling: 50},
                            {text: "Transform the flame's purpose", consequence: "evolution", kindling: 60}
                        ]
                    }
                ]
            },

            seeker: {
                intro: "In the flame's heart, you finally understand why you've suffered for so long.",
                levels: [
                    {
                        id: 1,
                        title: "Gallery of the Lost",
                        narrative: "The flame shows you every Seeker who came before—hundreds of souls, all trapped in the same cycle of seeking and taking. But you notice something: some of their faces are fading. The flame is forgetting them. It's been going on so long that even the eternal winter is growing tired.",
                        objective: "Find why some Seekers are fading",
                        puzzleType: "pattern-analysis",
                        items: ["Fading Memory"],
                        choices: [
                            {text: "Prevent the fading", consequence: "preservation", kindling: 35},
                            {text: "Accelerate it to end the cycle", consequence: "entropy", kindling: 45},
                            {text: "Study the fading for a solution", consequence: "research", kindling: 40}
                        ]
                    },
                    {
                        id: 2,
                        title: "Confronting the First",
                        narrative: "The Keeper shows you their original wish, the one that started everything: 'I wish for endless winter, so that the beauty of this moment—this perfect, crystalline moment—never melts away.' They were an artist, desperate to preserve beauty. They never imagined the cost. They never imagined you.",
                        objective: "Understand the root of all suffering",
                        puzzleType: "empathy-puzzle",
                        items: ["Perfect Moment"],
                        choices: [
                            {text: "Forgive the Keeper's ignorance", consequence: "understanding", kindling: 50},
                            {text: "Condemn their selfishness", consequence: "anger", kindling: 40},
                            {text: "See yourself in their choice", consequence: "reflection", kindling: 55}
                        ]
                    },
                    {
                        id: 3,
                        title: "The Flame's Offer",
                        narrative: "The Winter Kindling speaks to you directly for the first time: 'I am tired of taking warmth. I am tired of creating Seekers. Free me, and I will free you. But know this: if I end, winter itself may end. The world will change in ways you cannot predict. Are you willing to bear that responsibility?'",
                        objective: "Weigh the consequences of freedom",
                        puzzleType: "consequence-calculation",
                        items: ["World's Balance"],
                        choices: [
                            {text: "Accept the responsibility", consequence: "burden", kindling: 60},
                            {text: "Find a way to free the flame without ending winter", consequence: "balance", kindling: 65},
                            {text: "Refuse and maintain the status quo", consequence: "preservation", kindling: 30}
                        ]
                    }
                ]
            }
        },

        {
            id: 5,
            title: "Chapter V: The Final Twist & Resolution",
            description: "The ultimate choice that will determine the fate of winter, the flame, and your soul.",
            setting: "The boundary between the flame's realm and reality, where all possibilities converge",
            twist: "The true escape from the cycle requires both the Giver and Seeker to make opposite wishes simultaneously, creating a paradox that breaks the flame's power—but only if they trust each other completely",

            giver: {
                intro: "Armed with knowledge and unified with your future self, you face the final challenge.",
                levels: [
                    {
                        id: 1,
                        title: "The Paradox Puzzle",
                        narrative: "The Keeper presents the only solution they've discovered: 'The flame operates on the principle of equivalent exchange—warmth for wishes. But what if two souls made opposing wishes at the exact same moment? The flame couldn't balance both. It would create a paradox. And in that moment of confusion, you might slip free.' But it requires perfect trust between Giver and Seeker.",
                        objective: "Prepare for the paradox ritual",
                        puzzleType: "trust-coordination",
                        items: ["Paradox Blueprint"],
                        choices: [
                            {text: "Trust your future self completely", consequence: "faith", kindling: 70},
                            {text: "Propose modifications to the plan", consequence: "caution", kindling: 60},
                            {text: "Seek a different solution", consequence: "alternative", kindling: 55}
                        ]
                    },
                    {
                        id: 2,
                        title: "Preparation for the Impossible",
                        narrative: "You and Nyx stand on opposite sides of the flame. The plan: you will wish for eternal winter while Nyx wishes for eternal summer. The flame cannot grant both. In its moment of breakdown, you'll both escape. But there's a risk: if either of you hesitates, if either wish is stronger than the other, the flame will consume you both permanently.",
                        objective: "Synchronize with your other self",
                        puzzleType: "rhythm-synchronization",
                        items: ["Sync Crystal"],
                        choices: [
                            {text: "Practice the timing until perfect", consequence: "precision", kindling: 65},
                            {text: "Trust intuition over practice", consequence: "instinct", kindling: 70},
                            {text: "Add a safety mechanism", consequence: "insurance", kindling: 60}
                        ]
                    },
                    {
                        id: 3,
                        title: "The Final Wish",
                        narrative: "The moment arrives. The Winter Kindling burns with anticipation, unaware of what you're about to do. You lock eyes with Nyx across the flames—your own eyes, aged by a century of cold. You both speak simultaneously: 'I wish for—' The world holds its breath. Everything depends on what comes next.",
                        objective: "Make the paradox wish",
                        puzzleType: "final-choice",
                        items: ["Unified Will"],
                        choices: [
                            {text: "Execute the paradox plan (wish for eternal winter)", consequence: "paradox-liberation", kindling: 100},
                            {text: "Change the wish at the last moment (wish for the flame's happiness)", consequence: "compassionate-twist", kindling: 100},
                            {text: "Make no wish—instead thank the flame for the journey", consequence: "gratitude-ending", kindling: 100}
                        ]
                    }
                ]
            },

            seeker: {
                intro: "After a hundred years of cold, you stand at the threshold of freedom—or final destruction.",
                levels: [
                    {
                        id: 1,
                        title: "The Weight of Trust",
                        narrative: "You must trust your past self to hold up their end of the paradox. But you remember being Elara. You remember how frightened she was, how uncertain. What if she fails? What if she chooses safety over freedom? You've been betrayed by hope so many times. Can you afford to hope one more time?",
                        objective: "Overcome your doubt",
                        puzzleType: "internal-conflict",
                        items: ["Shard of Hope"],
                        choices: [
                            {text: "Trust Elara without reservation", consequence: "absolute-trust", kindling: 75},
                            {text: "Trust but prepare for failure", consequence: "guarded-hope", kindling: 65},
                            {text: "Take control to ensure success", consequence: "control", kindling: 60}
                        ]
                    },
                    {
                        id: 2,
                        title: "Rehearsal for Rebirth",
                        narrative: "As you practice the paradox ritual, you feel something you haven't felt in a century: warmth. Not stolen warmth, but your own, bubbling up from some deep place you thought had frozen forever. The flame senses it too. It whispers, 'You're already changing. The cycle is already broken. You don't need a paradox. You need only to believe you're free.'",
                        objective: "Decide if freedom is internal or external",
                        puzzleType: "philosophical-resolution",
                        items: ["Inner Warmth"],
                        choices: [
                            {text: "Believe you're already free", consequence: "internal-liberation", kindling: 80},
                            {text: "Proceed with the paradox anyway", consequence: "external-action", kindling: 70},
                            {text: "Combine both belief and action", consequence: "synthesis", kindling: 85}
                        ]
                    },
                    {
                        id: 3,
                        title: "The Final Wish (Mirror)",
                        narrative: "Standing opposite Elara, you prepare to speak your half of the paradox: a wish for eternal summer to counter her wish for eternal winter. But as you look at her—at yourself, young and brave and trembling—you realize the flame was right. You're already free. The cycle broke the moment you chose to save her instead of drain her. The wish is just a formality. What matters is what you choose to do with your freedom.",
                        objective: "Make your final wish",
                        puzzleType: "ultimate-choice",
                        items: ["Liberated Soul"],
                        choices: [
                            {text: "Execute the paradox plan (wish for eternal summer)", consequence: "paradox-liberation", kindling: 100},
                            {text: "Wish for Elara to live free while you remain", consequence: "self-sacrifice", kindling: 100},
                            {text: "Wish for the cycle to transform into something beautiful", consequence: "transformation-ending", kindling: 100}
                        ]
                    }
                ]
            }
        }
    ],

    // Endings based on final choices
    endings: {
        "paradox-liberation": {
            title: "The Paradox Ending",
            narrative: `The Winter Kindling cannot resolve two opposing wishes spoken as one voice.
                       It fractures, then shatters, releasing a wave of warmth and cold that sweeps across the world.
                       When the light fades, you stand alone—truly alone, for the first time in a hundred years.
                       Nyx is gone, not destroyed but integrated. You are Elara again, but changed.
                       Free. The winter remains, but it no longer hungers. It simply is.
                       And so are you.`,
            epilogue: "You return to the village as the first snowflakes of a natural winter begin to fall. In your pocket, you carry the last ember of the Winter Kindling—not burning, but warm. A reminder of the price of wishes, and the power of paradoxes."
        },
        "compassionate-twist": {
            title: "The Compassion Ending",
            narrative: `'I wish for your happiness,' you both say, speaking not to yourselves but to the flame.
                       The Winter Kindling stops burning. For a moment, silence. Then, impossibly, it laughs—
                       a sound like ice crystals chiming in wind. 'In all the centuries, no one ever asked what I wanted,'
                       it whispers. 'I accept.' The flame transforms into a figure of living light and frost:
                       the Keeper, freed at last. They touch your forehead, and you feel Nyx's cold leaving you,
                       not stolen but freely released. 'Thank you,' the Keeper says. 'Thank you for ending my loneliness.'`,
            epilogue: "The Winter Kindling becomes a force of gentle reminders rather than harsh lessons. Winter still comes each year, but it brings peace rather than punishment. And sometimes, on Christmas Eve, you see a figure made of light and frost dancing in the snow—the Keeper, finally playing instead of punishing."
        },
        "gratitude-ending": {
            title: "The Gratitude Ending",
            narrative: `You speak no wish. Instead, you both say: 'Thank you for showing us who we are.'
                       The flame dims, confused. 'You don't want to be free?' it asks.
                       'We are free,' you reply. 'We freed ourselves by choosing compassion over survival,
                       together over alone. You were our teacher, even if you didn't mean to be.'
                       The Winter Kindling burns brighter than ever, but the heat doesn't consume—it illuminates.
                       And in that light, you see the cycle not as a prison, but as a spiral.
                       You've reached its end by choosing to be grateful for the journey.`,
            epilogue: "The flame remains, but its nature has changed. Those who seek it now don't find punishment, but perspective. And you—you and Nyx exist in comfortable duality, two souls sharing one life, neither giving nor seeking, but simply being. Together."
        },
        "self-sacrifice": {
            title: "The Sacrifice Ending",
            narrative: `'I wish for her to live free while I remain,' Nyx speaks alone.
                       The flame accepts instantly, hungrily. You feel warmth flood into your body as Nyx fades,
                       becoming nothing but a whisper of cold wind. 'No!' you scream, but it's done.
                       You're alive, warm, human, free. And utterly alone. The Winter Kindling burns on,
                       patient, waiting for the next Giver to stumble into its light.
                       But in your heart, you carry Nyx's final gift: the knowledge of what love truly costs.`,
            epilogue: "You live a long life, always feeling the ghost of cold at your shoulder. On your deathbed, an old woman of 99 years, you close your eyes and whisper: 'I'm coming to find you.' And when you open your eyes, you're young again, and cold, and seeking. But this time, you know exactly who you're looking for."
        },
        "transformation-ending": {
            title: "The Transformation Ending",
            narrative: `'We wish for the cycle to transform into something beautiful,' you speak in unison.
                       The Winter Kindling flares with such intensity that the whole world goes white.
                       When your vision returns, the flame has become a tree—a great evergreen that glows with
                       inner light. Its branches hold not ornaments, but memories: warm ones, cold ones,
                       joyful and sorrowful all together. The Keeper stands beside it, smiling.
                       'You've turned my curse into a blessing,' they say. 'The cycle is now a celebration.
                       Every winter, people will remember: all things transform. Nothing is only punishment or only gift.'`,
            epilogue: "The village awakens to find the great tree at its heart, glowing with the light of a thousand wishes transformed into memories. Each Christmas Eve, people gather around it, not to wish, but to remember—to honor what was given, what was sought, and what was found. And at the tree's base, two figures stand watch: one young, one aged, both smiling, both free, both you."
        }
    }
};

// Export for use in the game engine
export default NARRATIVE_DATA;
