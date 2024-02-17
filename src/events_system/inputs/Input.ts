import { Key } from "../keyboard/Key";

export abstract class Input {
	public static instance: Input;

	protected constructor() {}

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