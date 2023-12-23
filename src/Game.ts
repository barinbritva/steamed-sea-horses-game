import {Background} from './Background';
import {Angler1, Angler2, BulbWhale, Drone, Enemy, HiveWhale, LuckyFish, MoonFish} from './Enemy';
import {InputHandler} from './InputHandler';
import {Box} from './Protocol';
import {Player} from './Player';
import {UI} from './UI';
import {Particle} from './Particle';
import {Explosion, FireExplosion, SmokeExplosion} from './Explosion';

export class Game {
	private background: Background;
	public player: Player;
	private ui: UI;
	public keys: string[];
	public ammo: number;
	public maxAmmo: number;
	private ammoTimer: number;
	private ammoInterval: number;
	private enemies: Enemy[];
	private enemyTimer: number;
	private enemyInterval: number;
	public gameOver: boolean;
	public score: number = 0;
	public winningScore: number = 80;
	public gameTime: number = 0;
	public timeLimit: number = 30000;
	public speed: number = 1;
	public particles: Particle[];
	public explosions: Explosion[];

	constructor(
		public width: number,
		public height: number,
		public debug: boolean = false
	) {
		new InputHandler(this);
		this.background = new Background(this);
		this.player = new Player(this);
		this.ui = new UI(this);
		this.keys = [];
		this.ammo = 20;
		this.maxAmmo = 50;
		this.ammoTimer = 0;
		this.ammoInterval = 350;
		this.enemies = [];
		this.enemyTimer = 0;
		this.enemyInterval = 2000;
		this.gameOver = false;
		this.particles = [];
		this.explosions = [];
	}
	update(deltaTime: number) {
		if (!this.gameOver) {
			this.gameTime += deltaTime;
		}
		if (this.gameTime > this.timeLimit) {
			this.gameOver = true;
		}
		this.background.update();
		this.background.layer4.update();
		this.player.update(deltaTime);
		if (this.ammoTimer > this.ammoInterval) {
			if (this.ammo < this.maxAmmo) {
				this.ammo++;
			}
			this.ammoTimer = 0;
		} else {
			this.ammoTimer += deltaTime;
		}

		// particles
		this.particles.forEach((particle) => {
			particle.update();
		});
		this.particles = this.particles.filter((particle) => {
			return !particle.markedForDeletion;
		});

		// explosions
		this.explosions.forEach((explosion) => {
			explosion.update(deltaTime);
		});
		this.explosions = this.explosions.filter((explosion) => {
			return !explosion.markedForDeletion;
		});

		// enemies
		this.enemies.forEach((enemy) => {
			enemy.update();
			if (this.checkCollision(this.player, enemy)) {
				enemy.markedForDeletion = true;
				this.addExplosion(enemy);

				for (let i = 0; i < enemy.score; i++) {
					this.particles.push(
						new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5)
					);
				}

				if (enemy.type === 'lucky') {
					this.player.enterPowerUp();
				} else {
					if (!this.gameOver) {
						this.score--;
					}
				}
			}
			this.player.projectiles.forEach((projectile) => {
				if (this.checkCollision(projectile, enemy)) {
					enemy.lives--;
					projectile.markedForDeletion = true;

					this.particles.push(
						new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5)
					);

					if (enemy.lives <= 0) {
						enemy.markedForDeletion = true;
						this.addExplosion(enemy);

						for (let i = 0; i < enemy.score; i++) {
							this.particles.push(
								new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5)
							);
						}

						if (enemy.type === 'moon') {
							this.player.enterPowerUp();
						}

						if (enemy.type === 'hive') {
							for (let i = 0; i < 5; i++) {
								this.enemies.push(
									new Drone(
										this,
										enemy.x + Math.random() * enemy.width,
										enemy.y + Math.random() * enemy.height * 0.5
									)
								);
							}
						}

						if (!this.gameOver) {
							this.score += enemy.score;
						}

						/* if (this.score >= this.winningScore) {
							this.gameOver = true;
						} */
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
		this.background.draw(context);
		this.ui.draw(context);
		this.player.draw(context);
		this.particles.forEach((particle) => {
			particle.draw(context);
		});
		this.enemies.forEach((enemy) => {
			enemy.draw(context);
		});
		this.explosions.forEach((explosion) => {
			explosion.draw(context);
		});
		this.background.layer4.draw(context);
	}

	addEnemy() {
		const randomize = Math.random();
		if (randomize < 0.3) {
			this.enemies.push(new Angler1(this));
		} else if (randomize < 0.6) {
			this.enemies.push(new Angler2(this));
		} else if (randomize < 0.7) {
			this.enemies.push(new HiveWhale(this));
		} else if (randomize < 0.8) {
			this.enemies.push(new BulbWhale(this));
		} else if (randomize < 0.9) {
			this.enemies.push(new MoonFish(this));
		} else {
			this.enemies.push(new LuckyFish(this));
		}
	}

	addExplosion(enemy: Enemy) {
		const randomize = Math.random();
		if (randomize < 0.5) {
			this.explosions.push(
				new SmokeExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5)
			);
		} else {
			this.explosions.push(
				new FireExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5)
			);
		}
	}

	checkCollision(rect1: Box, rect2: Box) {
		return (
			rect1.x < rect2.x + rect2.width &&
			rect1.x + rect1.width > rect2.x &&
			rect1.y < rect2.y + rect2.height &&
			rect1.y + rect1.height > rect2.y
		);
	}
}
