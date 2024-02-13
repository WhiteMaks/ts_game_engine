import {IVector} from "../IVector";

export class Vector2 implements IVector<Vector2> {
	/**
	 * Компонента X вектора
	 */
	protected x: number;
	/**
	 * Компонента Y вектора
	 */
	protected y: number;

	public constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public static up(): Vector2 {
		return new Vector2(0, 1);
	}

	public static down(): Vector2 {
		return new Vector2(0, -1);
	}

	public static right(): Vector2 {
		return new Vector2(1, 0);
	}

	public static left(): Vector2 {
		return new Vector2(-1, 0);
	}

	/**
	 * Установка значения компоненты вектора X
	 * @param x новое значение компонента X для вектора
	 */
	public setX(x: number): void {
		this.x = x;
	}

	/**
	 * Установка значения компоненты вектора Y
	 * @param y новое значение компонента Y для вектора
	 */
	public setY(y: number): void {
		this.y = y;
	}

	/**
	 * Получение значения компоненты X
	 */
	public getX(): number {
		return this.x;
	}

	/**
	 * Получение значения компоненты Y
	 */
	public getY(): number {
		return this.y;
	}

	public getInversionLength(): number {
		return 1 / this.getLength();
	}

	public getLength(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	public getNormalization(): Vector2 {
		const inversionLength = this.getInversionLength();

		return new Vector2(this.x * inversionLength, this.y * inversionLength);
	}

	public plus(vector: Vector2): Vector2 {
		return new Vector2(this.x + vector.getX(), this.y + vector.getY());
	}

}