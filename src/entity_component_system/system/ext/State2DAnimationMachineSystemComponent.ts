import {GameSystemComponent} from "../GameSystemComponent";
import {State2DAnimationMachineComponent} from "../../component/ext/State2DAnimationMachineComponent";

export class State2DAnimationMachineSystemComponent extends GameSystemComponent<State2DAnimationMachineComponent> {
	private static instance: State2DAnimationMachineSystemComponent | null;

	private constructor() {
		super();
	}

	public static getInstance(): State2DAnimationMachineSystemComponent {
		if (!State2DAnimationMachineSystemComponent.instance) {
			State2DAnimationMachineSystemComponent.instance = new State2DAnimationMachineSystemComponent();
		}

		return State2DAnimationMachineSystemComponent.instance;
	}
}