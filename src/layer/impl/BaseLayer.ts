import {ILayer} from "../ILayer";
import {Time} from "../../Time";
import {EventSystem} from "../../events_system/namespace/event_system";

export abstract class BaseLayer implements ILayer {
	private readonly name: string;

	protected constructor(name: string = "layer") {
		this.name = name;
	}

	public getName(): string {
		return this.name;
	}

	public abstract attach(): void;

	public abstract detach(): void;

	public abstract keyboardInput(event: EventSystem.KeyboardEvent): void;

	public abstract mouseInput(event: EventSystem.MouseEvent): void;

	public abstract elementInput(event: EventSystem.ElementEvent): void;

	public abstract update(time: Time): void;

	public abstract render(): void;

	public abstract clean(): void;

}