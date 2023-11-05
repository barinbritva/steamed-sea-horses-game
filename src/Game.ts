import { Angler1, Enemy } from "./Enemy";
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
    private enemies: Enemy[];
    private enemyTimer: number;
    private enemyInterval: number;
    private gameOver: boolean;

    constructor(public width: number, public height: number) {
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.keys = [];
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500;
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.gameOver = false
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

        this.enemies.forEach((enemy) => {
            enemy.update();
        });
        this.enemies = this.enemies.filter((enemy) => {
            return !enemy.markedForDeletion;
        });
        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        this.player.draw(context);
        this.ui.draw(context);
        this.enemies.forEach((enemy) => {
            enemy.draw(context);
        });
    }

    addEnemy() {
        this.enemies.push(new Angler1(this));
    }
}