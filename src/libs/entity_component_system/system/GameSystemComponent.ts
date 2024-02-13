import {System} from "./System"
import {GameComponent} from "../component/GameComponent"
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export abstract class GameSystemComponent<T extends GameComponent> extends System<T> {

	protected constructor() {
		super();
	}

	public update(time: GraphicsEngine.Time): void {
		for (const component of this.components) {
			component.update(time);
		}
	}

	public render(): void {
		for (const component of this.components) {
			component.render();
		}
	}
}