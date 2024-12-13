export class Ball {
    constructor(canvas) {
        this.canvas = canvas;
        this.radius = 10;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = -this.radius;
        this.speed = 3;
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
        ctx.closePath();
    }

    checkCollision(paddle) {
        return (
            this.y + this.radius > paddle.y &&
            this.y - this.radius < paddle.y + paddle.height &&
            this.x + this.radius > paddle.x &&
            this.x - this.radius < paddle.x + paddle.width
        );
    }
}