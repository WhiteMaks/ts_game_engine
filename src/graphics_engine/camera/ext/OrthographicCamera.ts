import {Transformation} from "../../maths/support/Transformation";
import {BaseCamera} from "../impl/BaseCamera";

export class OrthographicCamera extends BaseCamera {
	private zoomLevel: number;

	public constructor(width: number, height: number, zoomLevel: number = 1) {
		super(
			Transformation.getOrthogonalProjectionMatrix(
				(-1) * width / height * zoomLevel,
				width / height * zoomLevel,
				-1 * zoomLevel,
				zoomLevel,
				-1.0,
				1.0
			),
			width,
			height
		);

		this.zoomLevel = zoomLevel;
	}

	public update(): void {
		this.recalculateViewMatrix();
		this.recalculateViewProjectionMatrix();
	}

	public setZoomLevel(zoomLevel: number): void {
		if (zoomLevel <= 1) {
			this.zoomLevel = 1;
			return;
		}
		this.zoomLevel = zoomLevel;

		this.resize(this.width, this.height);
	}

	public getZoomLevel(): number {
		return this.zoomLevel;
	}

	private recalculateViewMatrix(): void {
		this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
	}

	private recalculateViewProjectionMatrix(): void {
		this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
	}

	public resize(width: number, height: number): void {
		this.width = width;
		this.height = height;

		const aspectRation = this.width / this.height;
		this.projectionMatrix = Transformation.getOrthogonalProjectionMatrix(
			(-1) * aspectRation * this.zoomLevel,
			aspectRation * this.zoomLevel,
			-1 * this.zoomLevel,
			this.zoomLevel,
			-1.0,
			1.0
		);
	}

}