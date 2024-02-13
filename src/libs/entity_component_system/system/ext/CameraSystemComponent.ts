import {GameSystemComponent} from "../GameSystemComponent";
import {CameraComponent} from "../../component/ext/CameraComponent";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export class CameraSystemComponent extends GameSystemComponent<CameraComponent> {
	private static instance: CameraSystemComponent | null;

	private constructor() {
		super();
	}

	public static getInstance(): CameraSystemComponent {
		if (!CameraSystemComponent.instance) {
			CameraSystemComponent.instance = new CameraSystemComponent();
		}

		return CameraSystemComponent.instance;
	}

	public resize(width: number, height: number): void {
		for (const component of this.components) {
			component.camera.resize(width, height);
		}
	}

	public getPrimaryCamera(): GraphicsEngine.ICamera | null {
		for (const component of this.components) {
			if (component.primary) {
				return component.camera;
			}
		}
		return null;
	}
}