import Entity from "#entity_component_system/src/entity/Entity";
import GameComponent from "../GameComponent";
import Time from "#graphics_engine/src/support/Time";
import CameraSystemComponent from "../../system/ext/CameraSystemComponent";
import ICamera from "#graphics_engine/src/camera/ICamera";

class CameraComponent extends GameComponent {
	public camera!: ICamera;
	public primary!: boolean;

	public constructor(entity: Entity) {
		super(entity);

		CameraSystemComponent.getInstance().saveComponent(this);
	}

	public render(): void {
	}

	public update(time: Time): void {
		const cameraComponent = this.entity.getComponent(CameraComponent);
		if (cameraComponent.primary) {
			cameraComponent.camera.update();
		}
	}

	public remove() {
		CameraSystemComponent.getInstance().removeComponent(this);
	}

}

export default CameraComponent;