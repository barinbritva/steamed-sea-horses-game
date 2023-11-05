import { Game } from "./Game";

export class UI {
    private fontSize: number;
    private fontFamily: string;
    private color: string;

    constructor(private game: Game) {
        this.fontSize = 25;
        this.fontFamily = "Helvetica";
        this.color = "white";
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();

        context.fillStyle = this.color;
        context.font = this.fontSize + "px " + this.fontFamily;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = "black";

        context.fillText("Score: " + this.game.score, 20, 40);

        for (let i = 0; i < this.game.ammo; i++) {
            context.fillRect(20 + 5 * i, 50, 3, 20);
        }

        if (this.game.gameOver) {
            let message1 = "";
            let message2 = ""
            if (this.game.score >= this.game.winningScore) {
                message1 = "You won!";
                message2 = "Well done!";
            } else {
                message1 = "You lost!";
                message2 = "Try again";
            }

            context.textAlign = "center";

            context.font = '50px ' + this.fontFamily;
            context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 40);

            context.font = '25px ' + this.fontFamily;
            context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40);
        }

        context.restore();
    }
}