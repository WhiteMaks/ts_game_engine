import { Key } from "../keyboard/Key";

export abstract class Input {
	public static instance: Input;

	protected constructor() {}

	public static getHorizontalAxis(): number {
		let leftValue = 0;
		let rightValue = 0;

		if (this.isKeyboardKeyPressed(Key.A) || this.isKeyboardKeyPressed(Key.ARROW_LEFT)) {
			leftValue = -1;
		}

		if (this.isKeyboardKeyPressed(Key.D) || this.isKeyboardKeyPressed(Key.ARROW_RIGHT)) {
			rightValue = 1;
		}

		return leftValue + rightValue;
	}

	public static getVerticalAxis(): number {
		let upValue = 0;
		let downValue = 0;

		if (this.isKeyboardKeyPressed(Key.W) || this.isKeyboardKeyPressed(Key.ARROW_UP)) {
			upValue = 1;
		}

		if (this.isKeyboardKeyPressed(Key.S) || this.isKeyboardKeyPressed(Key.ARROW_DOWN)) {
			downValue = -1;
		}

		return downValue + upValue;
	}

	public static isKeyboardKeyPressed(key: Key): boolean {
		return this.instance.isKeyboardKeyPressedImpl(key);
	}

	public static isLeftMouseKeyPressed(): boolean {
		return this.instance.isLeftMouseKeyPressedImpl();
	}

	public static isRightMouseKeyPressed(): boolean {
		return this.instance.isRightMouseKeyPressedImpl();
	}

	protected abstract isKeyboardKeyPressedImpl(key: Key): boolean;

	protected abstract isLeftMouseKeyPressedImpl(): boolean;

	protected abstract isRightMouseKeyPressedImpl(): boolean;
}