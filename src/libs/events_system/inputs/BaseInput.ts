import { Input } from "./Input";
import { Mouse } from "../mouse/Mouse";
import { Keyboard } from "../keyboard/Keyboard";
import { Key } from "../keyboard/Key";

export class BaseInput extends Input {
	private readonly mouse: Mouse;
	private readonly keyboard: Keyboard;

	public constructor(mouse: Mouse, keyboard: Keyboard) {
		super();

		this.mouse = mouse;
		this.keyboard = keyboard;
	}

	protected isKeyboardKeyPressedImpl(key: Key): boolean {
		return this.keyboard.keyIsPressed(key);
	}

	protected isLeftMouseKeyPressedImpl(): boolean {
		return this.mouse.isLeftKeyPressed();
	}

	protected isRightMouseKeyPressedImpl(): boolean {
		return this.mouse.isRightKeyPressed();
	}


}