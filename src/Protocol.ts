export interface Box {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface Sprite {
	image: HTMLImageElement;
	frameX: number;
	frameY: number;
	maxFrame: number;
}
