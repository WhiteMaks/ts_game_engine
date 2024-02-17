import {IVector} from "../IVector";
import {Vector2} from "./Vector2";

/**
 * Класс для работы с векторами
 */
export class Vector3 extends Vector2 implements IVector<Vector3> {
	/**
	 * Компонента Z вектора
	 */
	protected z: number;

	/**
	 * Конструктор для создания нового вектора
	 * @param x компонента вектора X
	 * @param y компонента вектора Y
	 * @param z компонента вектора Z
	 */
	public constructor(x: number, y: number, z: number) {
		super(x, y);
		this.z = z;
	}

	/**
	 * Установка значения компоненты вектора Z
	 * @param z новое значение компонента Z для вектора
	 */
	public setZ(z: number): void {
		this.z = z;
	}

	/**
	 * Получение значения компоненты Z
	 */
	public getZ(): number {
		return this.z;
	}

	public getLength(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	public getNormalization(): Vector3 {
		const inversionLength = this.getInversionLength();

		return new Vector3(this.x * inversionLength, this.y * inversionLength, this.z * inversionLength);
	}

	public plus(vector: Vector3): Vector3 {
		return new Vector3(this.x + vector.getX(), this.y + vector.getY(), this.z + vector.getZ());
	}
}