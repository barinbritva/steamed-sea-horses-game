import { Game } from "./Game";
import { Item } from "./Item";

export abstract class Enemy implements Item {
    protected speedX: number;
    public markedForDeletion: boolean;
    public lives: number = 5;
    public score: number = 5;

    constructor(protected game: Game, public x: number, public y: number, public width: number, public height: number) {
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
        context.fillStyle = "black";
        context.font = "20px Helvetica";
        context.fillText(String(this.lives), this.x, this.y);
    }
}

export class Angler1 extends Enemy {
    constructor(game: Game) {
        const width = 228 * 0.2;
        const height = 169 * 0.2;
        super(game, game.width, Math.random() * (game.height * 0.9 - height), width, height);
    }
}