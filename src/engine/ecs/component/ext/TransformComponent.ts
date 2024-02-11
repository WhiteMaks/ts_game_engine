import {GameComponent} from "../GameComponent";
import {TransformSystemComponent} from "../../system/ext/TransformSystemComponent";
import {ECS} from "#entity_component_system/src/namespace/ecs";
import {GraphicsEngine} from "#graphics_engine/src/namespace/graphics_engine";

export class TransformComponent extends GameComponent {
	public position: GraphicsEngine.Vector3;
	public rotation: GraphicsEngine.Vector3;
	public scale: GraphicsEngine.Vector3;

	public constructor(entity: ECS.Entity) {
		super(entity);

		this.position = new GraphicsEngine.Vector3(0, 0, 0);
		this.rotation = new GraphicsEngine.Vector3(0, 0, 0);
		this.scale = new GraphicsEngine.Vector3(1, 1, 1);

		TransformSystemComponent.getInstance().saveComponent(this);
	}

	public update(time: GraphicsEngine.Time): void {
	}

	public render(): void {

	}

	public remove(): void {
		TransformSystemComponent.getInstance().removeComponent(this);
	}

}