import {IVector} from "../IVector";
import {Vector3} from "./Vector3";

/**
 * Класс для работы с векторами
 */
export class Vector4 extends Vector3 implements IVector<Vector4> {
	/**
	 * Компонента W вектора
	 * @private
	 */
	protected w: number;

	/**
	 * Конструктор для создания нового вектора
	 * @param x компонента вектора X
	 * @param y компонента вектора Y
	 * @param z компонента вектора Z
	 * @param w компонента вектора W
	 */
	public constructor(x: number, y: number, z: number, w: number) {
		super(x, y, z);
		this.w = w;
	}

	/**
	 * Получение значения компоненты W
	 */
	public getW(): number {
		return this.w;
	}

	/**
	 * Установка значения компоненты вектора W
	 * @param w новое значение компонента W для вектора
	 */
	public setW(w: number): void {
		this.w = w;
	}

	public getLength(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}

	public getNormalization(): Vector4 {
		const inversionLength = this.getInversionLength();

		return new Vector4(this.x * inversionLength, this.y * inversionLength, this.z * inversionLength, this.w * inversionLength);
	}

	public plus(vector: Vector4): Vector4 {
		return new Vector4(this.x + vector.getX(), this.y + vector.getY(), this.z + vector.getZ(), this.w + vector.getW());
	}
}