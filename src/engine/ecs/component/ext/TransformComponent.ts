import GameComponent from "../GameComponent";
import Entity from "#entity_component_system/src/entity/Entity";
import Vector3 from "#graphics_engine/src/maths/impl/Vector3";
import TransformSystemComponent from "../../system/ext/TransformSystemComponent";
import Time from "#graphics_engine/src/support/Time";

class TransformComponent extends GameComponent {
	public position: Vector3;
	public rotation: Vector3;
	public scale: Vector3;

	public constructor(entity: Entity) {
		super(entity);

		this.position = new Vector3(0, 0, 0);
		this.rotation = new Vector3(0, 0, 0);
		this.scale = new Vector3(1, 1, 1);

		TransformSystemComponent.getInstance().saveComponent(this);
	}

	public update(time: Time): void {
	}

	public render(): void {

	}

	public remove(): void {
		TransformSystemComponent.getInstance().removeComponent(this);
	}

}

export default TransformComponent;