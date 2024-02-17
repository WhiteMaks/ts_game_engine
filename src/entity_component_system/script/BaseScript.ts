import {Component} from "../component/Component";
import {Entity} from "../entity/Entity";
import {Time} from "../../Time";

export abstract class BaseScript {
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