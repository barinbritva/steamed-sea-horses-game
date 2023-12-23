import {Game} from './Game';

export class Shield {
	width: number;
	height: number;
	frameX: number;
	maxFrame: number;
	image: HTMLImageElement;
	time: number;
	interval: number;
	fps: number;

	constructor(private game: Game) {
		this.width = this.game.player.width;
		this.height = this.game.player.height;
		this.frameX = 0;
		this.maxFrame = 24;
		this.image = document.getElementById('shield') as HTMLImageElement;
		this.fps = 60;
		this.time = 0;
		this.interval = 1000 / this.fps;
	}

	update(deltaTime: number) {
		if (this.frameX <= this.maxFrame) {
			if (this.time > this.interval) {
				this.frameX++;
				this.time = 0;
			} else {
				this.time += deltaTime;
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(
			this.image,
			this.frameX * this.width,
			0,
			this.width,
			this.height,
			this.game.player.x,
			this.game.player.y,
			this.width,
			this.height
		);
	}

	reset() {
		this.frameX = 0;
		this.game.sound.shield();
	}
}
