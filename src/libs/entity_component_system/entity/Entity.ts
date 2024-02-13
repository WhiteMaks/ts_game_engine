import { Component } from "../component/Component";

export class Entity {
	private readonly id: number;
	private readonly components: Map<string, Component>;

	public constructor(id: number) {
		this.id = id;

		this.components = new Map<string, Component>();
	}

	public addComponent<T extends Component>(componentClass: new (...args: any[]) => T): T {
		const component = new componentClass(this);
		this.components.set(componentClass.name, component);
		return component;
	}

	public hasComponent<T extends Component>(componentClass: new (...args: any[]) => T): boolean {
		return this.components.has(componentClass.name);
	}

	public getComponent<T extends Component>(componentClass: new (...args: any[]) => T): T {
		const componentType = componentClass.name;

		if (this.hasComponent(componentClass)) {
			return this.components.get(componentClass.name) as T;
		}

		throw new Error("Component by type [ " + componentType + " ] not found into entity [ " + this.id + " ]");
	}

	public removeComponent<T extends Component>(componentClass: new (...args: any[]) => T): void {
		const component = this.getComponent(componentClass);
		component.remove();
		this.components.delete(componentClass.name);
	}

	public clean(): void {
		for (const component of this.components.values()) {
			component.remove();
		}
		this.components.clear();
	}
}