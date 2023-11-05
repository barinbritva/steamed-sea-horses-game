import { InputHandler } from "./InputHandler";
import { Player } from "./Player";
import { UI } from "./UI";

export class Game {
    public player: Player;
    private input: InputHandler;
    private ui: UI;
    public keys: string[];
    public ammo: number;
    private maxAmmo: number;
    private ammoTimer: number;
    private ammoInterval: number;

    constructor(public width: number, private height: number) {
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.keys = [];
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500;
    }
    update(deltaTime: number) {
        this.player.update();
        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) {
                this.ammo++;
            }
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }
    }
    draw(context: CanvasRenderingContext2D) {
        this.player.draw(context);
        this.ui.draw(context);
    }
}