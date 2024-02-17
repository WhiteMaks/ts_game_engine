import { Component } from "../component/Component";

export abstract class System<T extends Component> {
	protected readonly components: T[];

	protected constructor() {
		this.components = new Array<T>();
	}

	public saveComponent(component: T): void {
		this.components.push(component);
	}

	public removeComponent(component: T): void {
		const index = this.components.indexOf(component);
		if (index > -1) {
			this.components.splice(index, 1);
		}
	}

	public clean(): void {
		for (const component of this.components) {
			component.remove();
		}
	}
}