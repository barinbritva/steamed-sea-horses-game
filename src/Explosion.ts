import {Game} from './Game';

export class Explosion {
	frameX: number;
	width: number;
	height: number;
	spriteWidth: number;
	spriteHeight: number;
	fps: number;
	timer: number;
	interval: number;
	markedForDeletion: boolean;
	maxFrame: number;

	constructor(
		private game: Game,
		public x: number,
		public y: number,
		protected image: HTMLImageElement
	) {
		this.frameX = 0;
		this.spriteWidth = 200;
		this.spriteHeight = 200;
		this.fps = 30;
		this.timer = 0;
		this.interval = 1000 / this.fps;
		this.markedForDeletion = false;
		this.maxFrame = 8;
		this.width = this.spriteWidth;
		this.height = this.spriteHeight;
		this.x = x - this.width * 0.5;
		this.y = y - this.height * 0.5;
	}

	update(deltaTime: number) {
		this.x -= this.game.speed;

		if (this.timer > this.interval) {
			this.frameX++;
			this.timer = 0;
		} else {
			this.timer += deltaTime;
		}

		if (this.frameX > this.maxFrame) {
			this.markedForDeletion = true;
		}
	}

	draw(context: CanvasRenderingContext2D) {
		context.drawImage(
			this.image,
			this.frameX * this.spriteWidth,
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}

export class SmokeExplosion extends Explosion {
	constructor(game: Game, x: number, y: number) {
		super(game, x, y, document.getElementById('smoke-explosion') as HTMLImageElement);
	}
}

export class FireExplosion extends Explosion {
	constructor(game: Game, x: number, y: number) {
		super(game, x, y, document.getElementById('fire-explosion') as HTMLImageElement);
	}
}
