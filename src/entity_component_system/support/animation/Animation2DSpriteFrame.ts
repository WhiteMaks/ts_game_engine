import {GraphicsEngine} from "../../../graphics_engine/namespace/graphics_engine";

export class Animation2DSpriteFrame {
	private readonly sprite: GraphicsEngine.Sprite2D;
	private readonly time: number;

	public constructor(sprite: GraphicsEngine.Sprite2D, time: number) {
		this.sprite = sprite;
		this.time = time;
	}

	public getTime(): number {
		return this.time;
	}

	public getSprite(): GraphicsEngine.Sprite2D {
		return this.sprite;
	}
}