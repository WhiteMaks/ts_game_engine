import Entity from "#entity_component_system/src/entity/Entity";
import Component from "#entity_component_system/src/component/Component";
import Time from "#graphics_engine/src/support/Time";

abstract class BaseScript {
	private readonly entity: Entity;

	public constructor(entity: Entity) {
		this.entity = entity;
	}

	protected getComponent<T extends Component>(componentClass: new (...args: any[]) => T): T {
		return this.entity.getComponent(componentClass);
	}

	public init(): void {}

	public abstract update(time: Time): void;

	public destroy(): void {}

}

export default BaseScript;