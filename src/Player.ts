import {Game} from './Game';
import {Item} from './Item';
import {Projectile} from './Projectile';

export class Player implements Item {
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

	update() {
		if (this.game.keys.includes('ArrowUp')) {
			this.speedY = -this.maxSpeed;
		} else if (this.game.keys.includes('ArrowDown')) {
			this.speedY = this.maxSpeed;
		} else {
			this.speedY = 0;
		}
		this.y += this.speedY;

		this.projectiles.forEach((projectile) => {
			projectile.update();
		});
		this.projectiles = this.projectiles.filter((projectile) => {
			return !projectile.markedForDeletion;
		});
		if (this.frameX < this.maxFrame) {
			this.frameX++;
		} else {
			this.frameX = 0;
		}
	}

	draw(context: CanvasRenderingContext2D) {
		context.fillStyle = 'black';
		// context.fillRect(this.x, this.y, this.width, this.height);
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
		this.projectiles.forEach((projectile) => {
			projectile.draw(context);
		});
	}

	shootTop() {
		if (this.game.ammo > 0) {
			this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
			this.game.ammo--;
		}
	}
}
