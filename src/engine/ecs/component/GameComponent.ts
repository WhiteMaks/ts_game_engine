import {ECS} from "#entity_component_system/namespace/ecs";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export abstract class GameComponent extends ECS.Component {

	protected constructor(entity: ECS.Entity) {
		super(entity);
	}

	public abstract update(time: GraphicsEngine.Time): void;

	public abstract render(): void;
}