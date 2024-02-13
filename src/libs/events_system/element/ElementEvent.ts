import { ElementEventType } from "./ElementEventType";

export class ElementEvent {
	private readonly type: ElementEventType;
	private readonly width: number;
	private readonly height: number;

	public constructor(type: ElementEventType, width: number, height: number) {
		this.type = type;
		this.width = width;
		this.height = height;
	}

	public isValid(): boolean {
		return this.type !== ElementEventType.INVALID;
	}

	public getWidth(): number {
		return this.width;
	}

	public getHeight(): number {
		return this.height;
	}

	public getType(): ElementEventType {
		return this.type;
	}
}