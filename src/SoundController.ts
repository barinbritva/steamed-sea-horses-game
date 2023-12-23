export class SoundController {
	constructor(
		private powerUpSound = document.getElementById('powerup') as HTMLAudioElement,
		private powerDownSound = document.getElementById('powerdown') as HTMLAudioElement,
		private explosionSound = document.getElementById('explosion') as HTMLAudioElement,
		private shotSound = document.getElementById('shot') as HTMLAudioElement,
		private hitSound = document.getElementById('hit') as HTMLAudioElement,
		private shieldSound = document.getElementById('shield') as HTMLAudioElement
	) {}

	powerUp() {
		this.powerUpSound.currentTime = 0;
		this.powerUpSound.play();
	}

	powerDown() {
		this.powerDownSound.currentTime = 0;
		this.powerDownSound.play();
	}

	explosion() {
		this.explosionSound.currentTime = 0;
		this.explosionSound.play();
	}

	shot() {
		this.shotSound.currentTime = 0;
		this.shotSound.play();
	}

	hit() {
		this.hitSound.currentTime = 0;
		this.hitSound.play();
	}

	shield() {
		this.shieldSound.currentTime = 0;
		this.shieldSound.play();
	}
}
