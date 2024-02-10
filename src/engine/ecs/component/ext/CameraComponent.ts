import {GameComponent} from "../GameComponent";
import {CameraSystemComponent} from "../../system/ext/CameraSystemComponent";
import {ECS} from "#entity_component_system/src/namespace/ecs";
import {GraphicsEngine} from "#graphics_engine/src/namespace/graphics_engine";

export class CameraComponent extends GameComponent {
	public camera!: GraphicsEngine.ICamera;
	public primary!: boolean;

	public constructor(entity: ECS.Entity) {
		super(entity);

		CameraSystemComponent.getInstance().saveComponent(this);
	}

	public render(): void {
	}

	public update(time: GraphicsEngine.Time): void {
		const cameraComponent = this.entity.getComponent(CameraComponent);
		if (cameraComponent.primary) {
			cameraComponent.camera.update();
		}
	}

	public remove() {
		CameraSystemComponent.getInstance().removeComponent(this);
	}

}