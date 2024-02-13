import {ECS} from "#entity_component_system/namespace/ecs";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export abstract class BaseScript {
	private readonly entity: ECS.Entity;

	public constructor(entity: ECS.Entity) {
		this.entity = entity;
	}

	protected getComponent<T extends ECS.Component>(componentClass: new (...args: any[]) => T): T {
		return this.entity.getComponent(componentClass);
	}

	public init(): void {}

	public abstract update(time: GraphicsEngine.Time): void;

	public destroy(): void {}

}