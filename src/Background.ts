import {Game} from './Game';
import {Layer} from './Layer';

export class Background {
	private image1: HTMLImageElement;
	private layer1: Layer;
	private layers: Layer[];
	private image2: HTMLImageElement;
	private image3: HTMLImageElement;
	private image4: HTMLImageElement;
	private layer2: Layer;
	private layer3: Layer;
	public layer4: Layer;

	constructor(private game: Game) {
		this.image1 = document.getElementById('layer1') as HTMLImageElement;
		this.image2 = document.getElementById('layer2') as HTMLImageElement;
		this.image3 = document.getElementById('layer3') as HTMLImageElement;
		this.image4 = document.getElementById('layer4') as HTMLImageElement;

		this.layer1 = new Layer(this.game, this.image1, 0.1);
		this.layer2 = new Layer(this.game, this.image2, 0.4);
		this.layer3 = new Layer(this.game, this.image3, 1);
		this.layer4 = new Layer(this.game, this.image4, 1.5);

		this.layers = [this.layer1, this.layer2, this.layer3];
	}

	update() {
		this.layers.forEach((layer) => {
			layer.update();
		});
	}

	draw(context: CanvasRenderingContext2D) {
		this.layers.forEach((layer) => {
			layer.draw(context);
		});
	}
}
