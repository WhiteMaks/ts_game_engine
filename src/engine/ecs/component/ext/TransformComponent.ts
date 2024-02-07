import GameComponent from "../GameComponent";
import Time from "#graphics_engine/src/support/Time";
import Entity from "#entity_component_system/src/entity/Entity";
import TransformSystemComponent from "../../system/ext/TransformSystemComponent";

class TransformComponent extends GameComponent {

	public constructor(entity: Entity) {
		super(entity);

		TransformSystemComponent.getInstance().saveComponent(this);
	}

	public update(time: Time): void {
	}

}

export default TransformComponent;