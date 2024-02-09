import System from "#entity_component_system/src/system/System";
import Time from "#graphics_engine/src/support/Time";
import GameComponent from "../component/GameComponent";

abstract class GameSystemComponent<T extends GameComponent> extends System<T> {

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

export default GameSystemComponent;