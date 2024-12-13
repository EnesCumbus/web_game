import { Game } from './game.js';

// Initialize the game when the window loads
window.onload = () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new Game(canvas);
    game.start();
};