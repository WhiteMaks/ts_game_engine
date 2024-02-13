import {BaseCamera} from "../impl/BaseCamera";
import {Transformation} from "../../maths/support/Transformation";

export class PerspectiveCamera extends BaseCamera {
	/**
	 * Область просмотра (в радианах)
	 * @private
	 */
	private readonly fieldOfView: number;
	private readonly zNear: number;
	private readonly zFar: number;

	public constructor(width: number, height: number, fieldOfView: number, zNear: number, zFar: number) {
		super(Transformation.getPerspectiveProjectionMatrix(width / height, Transformation.degreesToRadians(fieldOfView), zNear, zFar), width, height);

		this.zNear = zNear;
		this.zFar = zFar;
		this.fieldOfView = Transformation.degreesToRadians(fieldOfView);
	}

	public update(): void {
		this.recalculateViewMatrix();
		this.recalculateViewProjectionMatrix();
	}

	public resize(width: number, height: number): void {
		this.width = width;
		this.height = height;
		this.projectionMatrix = Transformation.getPerspectiveProjectionMatrix(this.width / this.height, this.fieldOfView, this.zNear, this.zFar);
	}

	private recalculateViewMatrix(): void {
		this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
	}

	private recalculateViewProjectionMatrix(): void {
		this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
	}
}