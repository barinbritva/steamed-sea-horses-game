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
		public score: number,
		public type: 'generic' | 'lucky' | 'hive' = 'generic',
		speedX?: number
	) {
		this.speedX = speedX || Math.random() * -1.5 - 0.5;
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
			Math.random() * (game.height * 0.95 - height),
			width,
			height,
			5,
			5
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
			Math.random() * (game.height * 0.95 - height),
			width,
			height,
			6,
			6
		);
	}
}

export class LuckyFish extends Enemy {
	constructor(game: Game) {
		const width = 99;
		const height = 95;
		const image = document.getElementById('lucky') as HTMLImageElement;
		const frameY = Math.floor(Math.random() * 2);
		super(
			game,
			image,
			0,
			frameY,
			37,
			game.width,
			Math.random() * (game.height * 0.95 - height),
			width,
			height,
			5,
			15,
			'lucky'
		);
	}
}

export class HiveWhale extends Enemy {
	constructor(game: Game) {
		const width = 400;
		const height = 227;
		const image = document.getElementById('hivewhale') as HTMLImageElement;
		const frameY = 0;
		super(
			game,
			image,
			0,
			frameY,
			37,
			game.width,
			Math.random() * (game.height * 0.95 - height),
			width,
			height,
			20,
			20,
			'hive',
			Math.random() * -1.2 - 0.2
		);
	}
}

export class Drone extends Enemy {
	constructor(game: Game, x: number, y: number) {
		const width = 115;
		const height = 95;
		const image = document.getElementById('drone') as HTMLImageElement;
		const frameY = Math.floor(Math.random() * 2);
		super(
			game,
			image,
			0,
			frameY,
			37,
			x,
			y,
			width,
			height,
			3,
			3,
			'generic',
			Math.random() * -4.2 - 0.5
		);
	}
}
