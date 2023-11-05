import { Game } from "./Game";

export class UI {
    private fontSize: number;
    private fontFamily: string;
    private color: string;

    constructor(private game: Game) {
        this.fontSize = 25;
        this.fontFamily = "Helvetica";
        this.color = "yellow";
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        for (let i = 0; i < this.game.ammo; i++) {
            context.fillRect(20 + 5 * i, 50, 3, 20);
        }
    }
}