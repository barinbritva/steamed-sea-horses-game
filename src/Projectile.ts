import {Game} from './Game';
import {Box} from './Protocol';

export class Projectile implements Box {
	public width: number;
	public height: number;
	private speed: number;
	public markedForDeletion: boolean;
	private image: HTMLImageElement;

	constructor(
		private game: Game,
		public x: number,
		public y: number
	) {
		this.width = 10;
		this.height = 3;
		this.speed = 3;
		this.markedForDeletion = false;
		this.image = document.getElementById('projectile') as HTMLImageElement;
	}

	update() {
		this.x += this.speed;
		if (this.x > this.game.width * 0.8) {
			this.markedForDeletion = true;
		}
	}

	draw(context: CanvasRenderingContext2D) {
		if (this.game.debug) {
			context.strokeRect(this.x, this.y, this.width, this.height);
		}
		context.drawImage(this.image, this.x, this.y);
	}
}
