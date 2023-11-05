import { Game } from "./Game";

export class Projectile {
    private width: number;
    private height: number;
    private speed: number;
    public markedForDeletion: boolean;

    constructor(private game: Game, private x: number, private y: number,) {
        this.width = 10;
        this.height = 3;
        this.speed = 3;
        this.markedForDeletion = false;
    }

    update() {
        this.x += this.speed;
        if (this.x > this.game.width * 0.8) {
            this.markedForDeletion = true;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "yellow";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}