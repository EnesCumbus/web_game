import { Paddle } from './paddle.js';
import { Ball } from './ball.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.paddle = new Paddle(canvas);
        this.balls = [];
        this.score = 0;
        this.gameLoop = this.gameLoop.bind(this);
        this.lastBallSpawn = 0;
        this.spawnInterval = 2000; // Spawn a new ball every 2 seconds
        
        // Add event listeners for paddle movement
        document.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            this.paddle.move(mouseX);
        });
    }

    start() {
        requestAnimationFrame(this.gameLoop);
    }

    spawnBall() {
        const ball = new Ball(this.canvas);
        this.balls.push(ball);
    }

    updateScore() {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = `Score: ${this.score}`;
    }

    gameLoop(timestamp) {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Spawn new balls
        if (timestamp - this.lastBallSpawn > this.spawnInterval) {
            this.spawnBall();
            this.lastBallSpawn = timestamp;
        }

        // Update and draw paddle
        this.paddle.draw(this.ctx);

        // Update and draw balls
        for (let i = this.balls.length - 1; i >= 0; i--) {
            const ball = this.balls[i];
            ball.update();
            ball.draw(this.ctx);

            // Check for collision with paddle
            if (ball.checkCollision(this.paddle)) {
                this.score += 1;
                this.updateScore();
                this.balls.splice(i, 1);
                continue;
            }

            // Remove balls that fall below the screen
            if (ball.y > this.canvas.height) {
                this.balls.splice(i, 1);
            }
        }

        requestAnimationFrame(this.gameLoop);
    }
}