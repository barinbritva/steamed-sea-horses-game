import {Game} from './Game';

window.addEventListener('load', function () {
	const canvas = document.getElementById('canvas');
	if (!(canvas instanceof HTMLCanvasElement)) {
		throw new Error('Canvas not found');
	}
	canvas.width = 700;
	canvas.height = 500;

	const ctx = canvas.getContext('2d');
	const game = new Game(canvas.width, canvas.height);
	let lastTime = 0;

	function animate(timestamp: number) {
		if (ctx == null) {
			throw new Error('Could not get 2D context');
		}
		if (!(canvas instanceof HTMLCanvasElement)) {
			throw new Error('Canvas not found');
		}

		const deltaTime = timestamp - lastTime;
		lastTime = timestamp;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.update(deltaTime);
		game.draw(ctx);
		requestAnimationFrame(animate);
	}

	animate(0);
});
