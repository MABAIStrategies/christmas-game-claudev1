// MultiplayerManager.js - Simple multiplayer using Firebase or LocalStorage
export class MultiplayerManager {
    constructor(gameState) {
        this.gameState = gameState;
        this.isHost = false;
        this.isConnected = false;
        this.roomCode = null;
        this.playerRole = null;
        this.otherPlayerRole = null;
        this.useLocalStorage = true; // Fallback to localStorage for same-device testing
        this.syncInterval = null;
        this.listeners = new Map();
    }

    // Initialize multiplayer
    init() {
        // Check if Firebase is available (would be loaded from CDN)
        if (typeof firebase !== 'undefined' && firebase.database) {
            this.useLocalStorage = false;
            this.database = firebase.database();
            console.log('Multiplayer using Firebase');
        } else {
            console.log('Multiplayer using LocalStorage (same-device only)');
        }
    }

    // Create a new room
    async createRoom(playerRole) {
        this.roomCode = this.generateRoomCode();
        this.isHost = true;
        this.playerRole = playerRole;
        this.otherPlayerRole = playerRole === 'giver' ? 'seeker' : 'giver';

        const roomData = {
            host: {
                role: this.playerRole,
                ready: false,
                timestamp: Date.now()
            },
            guest: null,
            gameState: null,
            sharedData: {
                currentChapter: 1,
                currentLevel: 1,
                combinedKindling: 0
            },
            created: Date.now()
        };

        if (this.useLocalStorage) {
            localStorage.setItem(`mp_room_${this.roomCode}`, JSON.stringify(roomData));
        } else {
            await this.database.ref(`rooms/${this.roomCode}`).set(roomData);
        }

        this.isConnected = true;
        this.startSyncLoop();

        return this.roomCode;
    }

    // Join existing room
    async joinRoom(roomCode, playerRole) {
        this.roomCode = roomCode;
        this.isHost = false;
        this.playerRole = playerRole;

        if (this.useLocalStorage) {
            const roomData = JSON.parse(localStorage.getItem(`mp_room_${roomCode}`));
            if (!roomData) {
                throw new Error('Room not found');
            }

            if (roomData.guest) {
                throw new Error('Room is full');
            }

            this.otherPlayerRole = roomData.host.role;

            // Validate roles are different
            if (this.playerRole === this.otherPlayerRole) {
                throw new Error('Both players cannot have the same role');
            }

            roomData.guest = {
                role: this.playerRole,
                ready: false,
                timestamp: Date.now()
            };

            localStorage.setItem(`mp_room_${roomCode}`, JSON.stringify(roomData));
        } else {
            const snapshot = await this.database.ref(`rooms/${roomCode}`).once('value');
            const roomData = snapshot.val();

            if (!roomData) {
                throw new Error('Room not found');
            }

            if (roomData.guest) {
                throw new Error('Room is full');
            }

            this.otherPlayerRole = roomData.host.role;

            if (this.playerRole === this.otherPlayerRole) {
                throw new Error('Both players cannot have the same role');
            }

            await this.database.ref(`rooms/${roomCode}/guest`).set({
                role: this.playerRole,
                ready: false,
                timestamp: Date.now()
            });
        }

        this.isConnected = true;
        this.startSyncLoop();

        this.emit('playerJoined', { role: this.otherPlayerRole });

        return true;
    }

    // Mark player as ready
    async setReady(ready = true) {
        const path = this.isHost ? 'host' : 'guest';

        if (this.useLocalStorage) {
            const roomData = JSON.parse(localStorage.getItem(`mp_room_${this.roomCode}`));
            roomData[path].ready = ready;
            localStorage.setItem(`mp_room_${this.roomCode}`, JSON.stringify(roomData));
        } else {
            await this.database.ref(`rooms/${this.roomCode}/${path}/ready`).set(ready);
        }

        // Check if both players ready
        const bothReady = await this.checkBothReady();
        if (bothReady) {
            this.emit('gameStart', {});
        }
    }

    // Check if both players are ready
    async checkBothReady() {
        if (this.useLocalStorage) {
            const roomData = JSON.parse(localStorage.getItem(`mp_room_${this.roomCode}`));
            return roomData.host?.ready && roomData.guest?.ready;
        } else {
            const snapshot = await this.database.ref(`rooms/${this.roomCode}`).once('value');
            const roomData = snapshot.val();
            return roomData.host?.ready && roomData.guest?.ready;
        }
    }

    // Sync game progress
    async syncProgress(chapter, level, kindling) {
        const sharedData = {
            currentChapter: chapter,
            currentLevel: level,
            combinedKindling: kindling
        };

        if (this.useLocalStorage) {
            const roomData = JSON.parse(localStorage.getItem(`mp_room_${this.roomCode}`));
            roomData.sharedData = sharedData;
            localStorage.setItem(`mp_room_${this.roomCode}`, JSON.stringify(roomData));
        } else {
            await this.database.ref(`rooms/${this.roomCode}/sharedData`).update(sharedData);
        }
    }

    // Get shared progress
    async getSharedProgress() {
        if (this.useLocalStorage) {
            const roomData = JSON.parse(localStorage.getItem(`mp_room_${this.roomCode}`));
            return roomData?.sharedData || null;
        } else {
            const snapshot = await this.database.ref(`rooms/${this.roomCode}/sharedData`).once('value');
            return snapshot.val();
        }
    }

    // Send choice to other player
    async sendChoice(choice) {
        const path = this.isHost ? 'hostChoice' : 'guestChoice';

        if (this.useLocalStorage) {
            const roomData = JSON.parse(localStorage.getItem(`mp_room_${this.roomCode}`));
            roomData[path] = {
                choice: choice,
                timestamp: Date.now()
            };
            localStorage.setItem(`mp_room_${this.roomCode}`, JSON.stringify(roomData));
        } else {
            await this.database.ref(`rooms/${this.roomCode}/${path}`).set({
                choice: choice,
                timestamp: Date.now()
            });
        }

        this.emit('choiceSent', { choice });
    }

    // Get other player's choice
    async getOtherPlayerChoice() {
        const path = this.isHost ? 'guestChoice' : 'hostChoice';

        if (this.useLocalStorage) {
            const roomData = JSON.parse(localStorage.getItem(`mp_room_${this.roomCode}`));
            return roomData?.[path]?.choice || null;
        } else {
            const snapshot = await this.database.ref(`rooms/${this.roomCode}/${path}`).once('value');
            const data = snapshot.val();
            return data?.choice || null;
        }
    }

    // Wait for both players to make choices
    async waitForBothChoices() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(async () => {
                const myChoice = this.isHost ? 'hostChoice' : 'guestChoice';
                const theirChoice = this.isHost ? 'guestChoice' : 'hostChoice';

                if (this.useLocalStorage) {
                    const roomData = JSON.parse(localStorage.getItem(`mp_room_${this.roomCode}`));
                    if (roomData[myChoice] && roomData[theirChoice]) {
                        clearInterval(checkInterval);
                        resolve({
                            myChoice: roomData[myChoice].choice,
                            theirChoice: roomData[theirChoice].choice
                        });
                    }
                } else {
                    const snapshot = await this.database.ref(`rooms/${this.roomCode}`).once('value');
                    const roomData = snapshot.val();
                    if (roomData[myChoice] && roomData[theirChoice]) {
                        clearInterval(checkInterval);
                        resolve({
                            myChoice: roomData[myChoice].choice,
                            theirChoice: roomData[theirChoice].choice
                        });
                    }
                }
            }, 1000);
        });
    }

    // Send message to other player
    async sendMessage(message) {
        const path = `messages/${this.isHost ? 'host' : 'guest'}`;

        const messageData = {
            text: message,
            timestamp: Date.now(),
            from: this.playerRole
        };

        if (this.useLocalStorage) {
            const roomData = JSON.parse(localStorage.getItem(`mp_room_${this.roomCode}`));
            if (!roomData.messages) roomData.messages = {};
            if (!roomData.messages[this.isHost ? 'host' : 'guest']) {
                roomData.messages[this.isHost ? 'host' : 'guest'] = [];
            }
            roomData.messages[this.isHost ? 'host' : 'guest'].push(messageData);
            localStorage.setItem(`mp_room_${this.roomCode}`, JSON.stringify(roomData));
        } else {
            await this.database.ref(`rooms/${this.roomCode}/${path}`).push(messageData);
        }
    }

    // Start sync loop to check for updates
    startSyncLoop() {
        this.syncInterval = setInterval(async () => {
            if (!this.isConnected) return;

            // Check for other player's updates
            const sharedProgress = await this.getSharedProgress();
            if (sharedProgress) {
                this.emit('progressUpdate', sharedProgress);
            }

            // Check for messages
            const otherChoice = await this.getOtherPlayerChoice();
            if (otherChoice) {
                this.emit('choiceReceived', { choice: otherChoice });
            }
        }, 2000); // Check every 2 seconds
    }

    // Stop sync loop
    stopSyncLoop() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
    }

    // Generate room code
    generateRoomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    // Leave room
    async leaveRoom() {
        if (this.useLocalStorage) {
            // Just mark as disconnected
            const roomData = JSON.parse(localStorage.getItem(`mp_room_${this.roomCode}`));
            if (roomData) {
                if (this.isHost) {
                    roomData.host.disconnected = true;
                } else {
                    roomData.guest.disconnected = true;
                }
                localStorage.setItem(`mp_room_${this.roomCode}`, JSON.stringify(roomData));
            }
        } else {
            const path = this.isHost ? 'host' : 'guest';
            await this.database.ref(`rooms/${this.roomCode}/${path}/disconnected`).set(true);
        }

        this.stopSyncLoop();
        this.isConnected = false;
        this.emit('disconnected', {});
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

    // Check connection status
    isActive() {
        return this.isConnected;
    }

    // Get room info
    getRoomInfo() {
        return {
            code: this.roomCode,
            isHost: this.isHost,
            playerRole: this.playerRole,
            otherPlayerRole: this.otherPlayerRole,
            isConnected: this.isConnected
        };
    }
}

export default MultiplayerManager;
