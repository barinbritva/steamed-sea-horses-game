import {Game} from './Game';
import {Box} from './Protocol';

export class Projectile implements Box {
	public width: number;
	public height: number;
	private speed: number;
	public markedForDeletion: boolean;
	private image: HTMLImageElement;
	frameX: number;
	maxFrame: number;
	fps: number;
	timer: number;
	interval: number;

	constructor(
		private game: Game,
		public x: number,
		public y: number
	) {
		this.width = 36.25;
		this.height = 20;
		this.speed = Math.random() * 0.2 + 2.8;
		this.markedForDeletion = false;
		this.image = document.getElementById('fireball') as HTMLImageElement;
		this.frameX = 0;
		this.maxFrame = 3;
		this.fps = 10;
		this.timer = 0;
		this.interval = 1000 / this.fps;
	}

	update(deltaTime: number) {
		this.x += this.speed;
		if (this.timer > this.interval) {
			if (this.frameX < this.maxFrame) {
				this.frameX++;
			} else {
				this.frameX = 0;
			}

			this.timer = 0;
		} else {
			this.timer += deltaTime;
		}

		if (this.x > this.game.width * 0.8) {
			this.markedForDeletion = true;
		}
	}

	draw(context: CanvasRenderingContext2D) {
		if (this.game.debug) {
			context.strokeRect(this.x, this.y, this.width, this.height);
		}
		context.drawImage(
			this.image,
			this.frameX * this.width,
			0,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}
