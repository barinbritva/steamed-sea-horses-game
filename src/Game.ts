import { InputHandler } from "./InputHandler";
import { Player } from "./Player";

export class Game {
    public player: Player;
    private inputHandler: InputHandler;
    public keys: string[];
    public ammo: number;
    private maxAmmo: number;
    private ammoTimer: number;
    private ammoInterval: number;

    constructor(public width: number, private height: number) {
        this.player = new Player(this);
        this.inputHandler = new InputHandler(this);
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
    }
}