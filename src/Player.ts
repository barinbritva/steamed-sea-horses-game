import {Game} from './Game';
import {Box} from './Protocol';
import {Projectile} from './Projectile';

export class Player implements Box {
	width: number;
	height: number;
	x: number;
	y: number;
	speedY: number;
	maxSpeed: number;
	projectiles: Projectile[];
	image: HTMLImageElement;
	frameX: number;
	frameY: number;
	maxFrame: number;
	powerUp: boolean = false;
	powerUpTimer: number = 0;
	powerUpLimit: number = 10000;

	constructor(private game: Game) {
		this.width = 120;
		this.height = 190;
		this.x = 20;
		this.y = 100;
		this.frameX = 0;
		this.frameY = 0;
		this.maxFrame = 37;
		this.speedY = 0;
		this.maxSpeed = 3;
		this.projectiles = [];
		this.image = document.getElementById('player') as HTMLImageElement;
	}

	update(deltaTime: number) {
		// movement
		if (this.game.keys.includes('ArrowUp')) {
			this.speedY = -this.maxSpeed;
		} else if (this.game.keys.includes('ArrowDown')) {
			this.speedY = this.maxSpeed;
		} else {
			this.speedY = 0;
		}
		this.y += this.speedY;

		// vertical bounds
		const maxBottomPosition = this.game.height - this.height * 0.5;
		const maxTopPosition = this.height * 0.5;
		if (this.y > maxBottomPosition) {
			this.y = maxBottomPosition;
		} else if (this.y < -maxTopPosition) {
			this.y = -maxTopPosition;
		}

		// projectiles
		this.projectiles.forEach((projectile) => {
			projectile.update();
		});
		this.projectiles = this.projectiles.filter((projectile) => {
			return !projectile.markedForDeletion;
		});

		// sprite animation
		if (this.frameX < this.maxFrame) {
			this.frameX++;
		} else {
			this.frameX = 0;
		}

		// power up
		if (this.powerUp) {
			if (this.powerUpTimer > this.powerUpLimit) {
				this.powerUp = false;
				this.powerUpTimer = 0;
				this.frameY = 0;
			} else {
				this.powerUpTimer += deltaTime;
				this.frameY = 1;
				this.game.ammo += 0.1;
			}
		}
	}

	draw(context: CanvasRenderingContext2D) {
		if (this.game.debug) {
			context.strokeRect(this.x, this.y, this.width, this.height);
		}

		this.projectiles.forEach((projectile) => {
			projectile.draw(context);
		});
		context.drawImage(
			this.image,
			this.frameX * this.width,
			this.frameY * this.height,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	shootTop() {
		if (this.game.ammo > 0) {
			this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
			this.game.ammo--;
		}
		if (this.powerUp) {
			this.shootBottom();
		}
	}

	shootBottom() {
		if (this.game.ammo > 0) {
			this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175));
			this.game.ammo--;
		}
	}

	enterPowerUp() {
		this.powerUp = true;
		this.powerUpTimer = 0;
		this.game.ammo = this.game.maxAmmo;
	}
}
