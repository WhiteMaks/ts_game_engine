import {GameComponent} from "../GameComponent";
import {Entity} from "../../entity/Entity";
import {CameraSystemComponent} from "../../../../engine/ecs/system/ext/CameraSystemComponent";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export class CameraComponent extends GameComponent {
	public camera!: GraphicsEngine.ICamera;
	public primary!: boolean;

	public constructor(entity: Entity) {
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