import {System} from "./System"
import {GameComponent} from "../component/GameComponent"
import {Time} from "../../Time";

export abstract class GameSystemComponent<T extends GameComponent> extends System<T> {

	protected constructor() {
		super();
	}

	public update(time: Time): void {
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