import {ITexture} from "./ITexture";
import {Vector2} from "../maths/impl/Vector2";

export class Sprite2D {
	private readonly texture: ITexture;
	private readonly coordinates: Vector2[];

	public constructor(texture: ITexture,) {
		this.texture = texture;
		this.coordinates = new Array<Vector2>(4);

		this.coordinates[0] = new Vector2(0, 0);
		this.coordinates[1] = new Vector2(0, 0);
		this.coordinates[2] = new Vector2(0, 0);
		this.coordinates[3] = new Vector2(0, 0);
	}

	public updateCoordinates(bottomLeft: Vector2, topRight: Vector2): void {
		this.coordinates[0] = new Vector2(bottomLeft.getX(), bottomLeft.getY());
		this.coordinates[1] = new Vector2(topRight.getX(), bottomLeft.getY());
		this.coordinates[2] = new Vector2(topRight.getX(), topRight.getY());
		this.coordinates[3] = new Vector2(bottomLeft.getX(), topRight.getY());
	}

	public getTexture(): ITexture {
		return this.texture;
	}

	public getCoordinates(): Vector2[] {
		return this.coordinates;
	}

}