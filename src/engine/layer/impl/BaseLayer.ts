import ILayer from "../ILayer";
import Time from "#graphics_engine/src/support/Time";
import MouseEvent from "#events_system/src/mouse/MouseEvent";
import KeyboardEvent from "#events_system/src/keyboard/KeyboardEvent";
import ElementEvent from "#events_system/src/element/ElementEvent";

abstract class BaseLayer implements ILayer {
	private readonly name: string;

	protected constructor(name: string = "layer") {
		this.name = name;
	}

	public getName(): string {
		return this.name;
	}

	public abstract attach(): void;

	public abstract detach(): void;

	public abstract keyboardInput(event: KeyboardEvent): void;

	public abstract mouseInput(event: MouseEvent): void;

	public abstract elementInput(event: ElementEvent): void;

	public abstract update(time: Time): void;

	public abstract render(): void;

	public abstract clean(): void;

}

export default BaseLayer;