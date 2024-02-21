import { Entity } from "../entity/Entity";

export abstract class Component {
	public readonly entity: Entity;

	protected constructor(entity: Entity) {
		this.entity = entity;
	}

	public abstract remove(): void;
}