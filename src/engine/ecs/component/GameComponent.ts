import Component from "#entity_component_system/src/component/Component";
import Entity from "#entity_component_system/src/entity/Entity";
import Time from "#graphics_engine/src/support/Time";

abstract class GameComponent extends Component {

	protected constructor(entity: Entity) {
		super(entity);
	}

	public abstract update(time: Time): void;
}

export default GameComponent;