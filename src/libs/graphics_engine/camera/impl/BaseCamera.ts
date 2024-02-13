import {ICamera} from "../ICamera";
import {Vector3} from "../../maths/impl/Vector3";
import {Matrix4} from "../../maths/impl/Matrix4";
import {Transformation} from "../../maths/support/Transformation";

export abstract class BaseCamera implements ICamera {
	protected projectionMatrix: Matrix4;
	protected viewMatrix: Matrix4;
	protected viewProjectionMatrix: Matrix4;

	protected position: Vector3;
	protected rotation: Vector3;

	protected width: number;
	protected height: number;

	protected constructor(projectionMatrix: Matrix4, width: number, height: number) {
		this.projectionMatrix = projectionMatrix;

		this.width = width;
		this.height = height;

		this.position = new Vector3(0, 0, 0);
		this.rotation = new Vector3(0, 0, 0);

		this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
		this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
	}

	public getPosition(): Vector3 {
		return this.position;
	}

	public getProjectionMatrix(): Matrix4 {
		return this.projectionMatrix;
	}

	public getRotation(): Vector3 {
		return this.rotation;
	}

	public getViewMatrix(): Matrix4 {
		return this.viewMatrix;
	}

	public getViewProjectionMatrix(): Matrix4 {
		return this.viewProjectionMatrix;
	}

	public setPosition(position: Vector3): void {
		this.position = position;
	}

	public setRotation(rotation: Vector3): void {
		this.rotation = rotation;
	}

	abstract update(): void;

	abstract resize(width: number, height: number): void;

}