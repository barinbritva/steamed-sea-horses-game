import {Game} from './Game';

export class Layer {
	public width: number;
	public height: number;
	public x: number;
	public y: number;
	constructor(
		private game: Game,
		private image: HTMLImageElement,
		private speedModifier: number
	) {
		this.width = 1768;
		this.height = 500;
		this.x = 0;
		this.y = 0;
	}

	update() {
		if (this.x <= -this.width) {
			this.x = 0;
		}
		this.x -= this.game.speed * this.speedModifier;
	}

	draw(context: CanvasRenderingContext2D) {
		context.drawImage(this.image, this.x, this.y);
		context.drawImage(this.image, this.x + this.width, this.y);
	}
}
