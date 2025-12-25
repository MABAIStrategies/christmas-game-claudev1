// SnowfallEffect.js - Create beautiful snowfall effect on canvas
export class SnowfallEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.snowflakes = [];
        this.animationId = null;
        this.intensity = 1.0;
        this.isRunning = false;
    }

    init() {
        if (!this.canvas || !this.ctx) return;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.createSnowflakes();
        this.start();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createSnowflakes() {
        const count = Math.floor((this.canvas.width * this.canvas.height) / 15000 * this.intensity);

        this.snowflakes = [];

        for (let i = 0; i < count; i++) {
            this.snowflakes.push(this.createSnowflake());
        }
    }

    createSnowflake() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 1 + 0.5,
            drift: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.3,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.02 + 0.01
        };
    }

    update() {
        if (!this.canvas) return;

        this.snowflakes.forEach(flake => {
            // Update position
            flake.y += flake.speed;
            flake.wobble += flake.wobbleSpeed;
            flake.x += Math.sin(flake.wobble) * 0.5 + flake.drift;

            // Reset if off screen
            if (flake.y > this.canvas.height) {
                flake.y = -10;
                flake.x = Math.random() * this.canvas.width;
            }

            if (flake.x > this.canvas.width) {
                flake.x = 0;
            } else if (flake.x < 0) {
                flake.x = this.canvas.width;
            }
        });
    }

    draw() {
        if (!this.ctx || !this.canvas) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snowflakes
        this.snowflakes.forEach(flake => {
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            this.ctx.fill();

            // Add subtle glow
            if (flake.radius > 2) {
                this.ctx.beginPath();
                this.ctx.arc(flake.x, flake.y, flake.radius * 1.5, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(200, 230, 255, ${flake.opacity * 0.2})`;
                this.ctx.fill();
            }
        });
    }

    animate() {
        this.update();
        this.draw();

        if (this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    setIntensity(intensity) {
        this.intensity = Math.max(0, Math.min(2, intensity));
        this.createSnowflakes();
    }

    destroy() {
        this.stop();
        if (this.canvas && this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

export default SnowfallEffect;
