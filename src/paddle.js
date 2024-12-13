export class Paddle {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 100;
        this.height = 20;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 40;
    }

    move(mouseX) {
        // Ensure paddle stays within canvas bounds
        this.x = Math.max(0, Math.min(mouseX - this.width / 2, this.canvas.width - this.width));
    }

    draw(ctx) {
        ctx.fillStyle = '#0095DD';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}