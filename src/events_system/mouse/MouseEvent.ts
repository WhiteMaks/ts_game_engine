import { MouseEventType } from "./MouseEventType";

/**
 * Класс для описания событий мышки
 */
export class MouseEvent {
	/**
	 * Тип события
	 * @private
	 */
	private readonly type: MouseEventType;
	private readonly positionX: number;
	private readonly positionY: number;

	private readonly leftKeyIsPressed: boolean;
	private readonly rightKeyIsPressed: boolean;

	public constructor(type: MouseEventType, leftKeyIsPressed: boolean, rightKeyIsPressed: boolean, positionX: number, positionY: number) {
		this.type = type;

		this.leftKeyIsPressed = leftKeyIsPressed;
		this.rightKeyIsPressed = rightKeyIsPressed;

		this.positionX = positionX;
		this.positionY = positionY;
	}

	public isValid(): boolean {
		return this.type !== MouseEventType.INVALID;
	}

	public getPositionX(): number {
		return this.positionX;
	}

	public getPositionY(): number {
		return this.positionY;
	}

	public getType(): MouseEventType {
		return this.type;
	}

	public isLeftKeyIsPressed(): boolean {
		return this.leftKeyIsPressed;
	}

	public isRightKeyIsPressed(): boolean {
		return this.rightKeyIsPressed;
	}

}