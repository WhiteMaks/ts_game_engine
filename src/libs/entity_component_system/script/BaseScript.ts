import {Component} from "../component/Component";
import {Entity} from "../entity/Entity";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export abstract class BaseScript {
	private readonly entity: Entity;

	public constructor(entity: Entity) {
		this.entity = entity;
	}

	protected getComponent<T extends Component>(componentClass: new (...args: any[]) => T): T {
		return this.entity.getComponent(componentClass);
	}

	public init(): void {}

	public abstract update(time: GraphicsEngine.Time): void;

	public destroy(): void {}

}