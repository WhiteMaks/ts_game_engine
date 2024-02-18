import {Component} from "../component/Component";
import {Entity} from "../entity/Entity";
import {Time} from "../../Time";
import {Scene} from "../../Scene";

export abstract class BaseScript {
	private readonly entity: Entity;

	public constructor(entity: Entity) {
		this.entity = entity;
	}

	protected getComponent<T extends Component>(componentClass: new (...args: any[]) => T): T {
		return this.entity.getComponent(componentClass);
	}

	protected addComponent<T extends Component>(componentClass: new (...args: any[]) => T): T {
		return this.entity.addComponent(componentClass);
	}

	protected getScene(): Scene {
		return this.entity.getScene();
	}

	public init(): void {}

	public abstract update(time: Time): void;

	public destroy(): void {}

}