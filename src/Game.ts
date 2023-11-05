import { Angler1, Enemy } from "./Enemy";
import { InputHandler } from "./InputHandler";
import { Item } from "./Item";
import { Player } from "./Player";
import { UI } from "./UI";

export class Game {
    public player: Player;
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
    private score: number = 0;

    constructor(public width: number, public height: number) {
        new InputHandler(this);
        this.player = new Player(this);
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
            if (this.checkCollision(this.player, enemy)) {
                enemy.markedForDeletion = true;
            }
            this.player.projectiles.forEach((projectile) => {
                if (this.checkCollision(projectile, enemy)) {
                    enemy.lives--;
                    projectile.markedForDeletion = true;
                    if (enemy.lives <= 0) {
                        enemy.markedForDeletion = true;
                        this.score += enemy.score;
                    }
                }
            });
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

    checkCollision(rect1: Item, rect2: Item) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }
}