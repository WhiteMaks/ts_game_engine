import {EventSystem} from "#events_system/namespace/event_system";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export interface ILayer extends GraphicsEngine.Cleanable {

	attach(): void;

	detach(): void;

	mouseInput(event: EventSystem.MouseEvent): void;

	keyboardInput(event: EventSystem.KeyboardEvent): void;

	elementInput(event: EventSystem.ElementEvent): void;

	update(time: GraphicsEngine.Time): void;

	render(): void;

	getName(): string;

}