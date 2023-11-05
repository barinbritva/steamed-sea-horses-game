import {Game} from './Game';
import {Box, Sprite} from './Protocol';

export abstract class Enemy implements Box, Sprite {
	protected speedX: number;
	public markedForDeletion: boolean;

	constructor(
		protected game: Game,
		public image: HTMLImageElement,
		public frameX: number,
		public frameY: number,
		public maxFrame: number,
		public x: number,
		public y: number,
		public width: number,
		public height: number,
		public lives: number,
		public score: number
	) {
		this.speedX = Math.random() * -1.5 - 0.5;
		this.markedForDeletion = false;
	}

	update() {
		this.x += this.speedX - this.game.speed;
		if (this.x + this.width < 0) {
			this.markedForDeletion = true;
		}
		if (this.frameX < this.maxFrame) {
			this.frameX++;
		} else {
			this.frameX = 0;
		}
	}

	draw(context: CanvasRenderingContext2D) {
		if (this.game.debug) {
			context.strokeRect(this.x, this.y, this.width, this.height);
			context.font = '20px Helvetica';
			context.fillText(String(this.lives), this.x, this.y);
		}
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
}

export class Angler1 extends Enemy {
	constructor(game: Game) {
		const width = 228;
		const height = 169;
		const image = document.getElementById('angler1') as HTMLImageElement;
		const frameY = Math.floor(Math.random() * 3);
		super(
			game,
			image,
			0,
			frameY,
			37,
			game.width,
			Math.random() * (game.height * 0.9 - height),
			width,
			height,
			2,
			2
		);
	}
}

export class Angler2 extends Enemy {
	constructor(game: Game) {
		const width = 213;
		const height = 165;
		const image = document.getElementById('angler2') as HTMLImageElement;
		const frameY = Math.floor(Math.random() * 2);
		super(
			game,
			image,
			0,
			frameY,
			37,
			game.width,
			Math.random() * (game.height * 0.9 - height),
			width,
			height,
			3,
			3
		);
	}
}
