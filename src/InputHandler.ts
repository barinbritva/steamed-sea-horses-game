import {Game} from './Game';

export class InputHandler {
	constructor(private game: Game) {
		window.addEventListener('keydown', (event) => {
			if (
				(event.key === 'ArrowUp' || event.key === 'ArrowDown') &&
				this.game.keys.indexOf(event.key) === -1
			) {
				this.game.keys.push(event.key);
			} else if (event.key === ' ') {
				this.game.player.shootTop();
			} else if (event.key === 'd') {
				this.game.debug = !this.game.debug;
			}
		});

		window.addEventListener('keyup', (event) => {
			const keyIndexOf = this.game.keys.indexOf(event.key);
			if (keyIndexOf > -1) {
				this.game.keys.splice(keyIndexOf, 1);
			}
		});
	}
}
