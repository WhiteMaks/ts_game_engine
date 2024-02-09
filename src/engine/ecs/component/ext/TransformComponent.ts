import GameComponent from "../GameComponent";
import Entity from "#entity_component_system/src/entity/Entity";
import Vector3 from "#graphics_engine/src/maths/impl/Vector3";
import TransformSystemComponent from "../../system/ext/TransformSystemComponent";
import Time from "#graphics_engine/src/support/Time";

class TransformComponent extends GameComponent {
	public readonly position: Vector3;
	public readonly rotation: Vector3;
	public readonly scale: Vector3;

	public constructor(entity: Entity, position: Vector3, rotation: Vector3, scale: Vector3) {
		super(entity);

		this.position = position;
		this.rotation = rotation;
		this.scale = scale;

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