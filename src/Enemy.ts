import { Game } from "./Game";

export abstract class Enemy {
    protected speedX: number;
    public markedForDeletion: boolean;

    constructor(protected game: Game, protected x: number, protected y: number, protected width: number, protected height: number) {
        this.speedX = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false;
    }

    update() {
        this.x += this.speedX;
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export class Angler1 extends Enemy {
    constructor(game: Game) {
        const width = 228 * 0.2;
        const height = 169 * 0.2;
        super(game, game.width, Math.random() * (game.height * 0.9 - height), width, height);
    }
}