import {Vector2} from "../impl/Vector2";
import {Random} from "../../support/Random";

export class RandomWalk2D {
	private readonly width: number;
	private readonly height: number;

	public constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	public generate(steps: number): boolean[][] {
		const result: boolean[][] = new Array<boolean[]>(this.width);

		for (let i = 0; i < this.width; i++) {
			result[i] = new Array<boolean>(this.height).fill(false);
		}

		let position = new Vector2(Random.int(this.width), Random.int(this.height));

		result[position.getX()][position.getY()] = true;

		const movements: Vector2[] = [
			Vector2.up(),
			Vector2.down(),
			Vector2.left(),
			Vector2.right(),
		];

		for (let step = 0; step < steps; step++) {
			while (true) {
				const randomMove = movements[Random.int(movements.length)];
				const newPosition = position.plus(new Vector2(randomMove.getX(), randomMove.getY()));

				if (
					newPosition.getX() >= 0 &&
					newPosition.getX() < this.width &&
					newPosition.getY() >= 0 &&
					newPosition.getY() < this.height
				) {
					result[newPosition.getX()][newPosition.getY()] = true;

					position = newPosition;

					break;
				}
			}
		}

		return result;
	}

}