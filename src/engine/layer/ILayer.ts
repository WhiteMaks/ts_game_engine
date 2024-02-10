import Cleanable from "#graphics_engine/src/support/Cleanable";
import Time from "#graphics_engine/src/support/Time";
import MouseEvent from "#events_system/src/mouse/MouseEvent";
import KeyboardEvent from "#events_system/src/keyboard/KeyboardEvent";
import ElementEvent from "#events_system/src/element/ElementEvent";

interface ILayer extends Cleanable {

	attach(): void;

	detach(): void;

	mouseInput(event: MouseEvent): void;

	keyboardInput(event: KeyboardEvent): void;

	elementInput(event: ElementEvent): void;

	update(time: Time): void;

	render(): void;

	getName(): string;

}

export default ILayer;