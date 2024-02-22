import {Animation2DSpriteState} from "../../support/animation/Animation2DSpriteState";
import {GameComponent} from "../GameComponent";
import {Time} from "../../../Time";
import {Entity} from "../../entity/Entity";
import {Sprite2DRendererComponent} from "./Sprite2DRendererComponent";
import {State2DAnimationMachineSystemComponent} from "../../system/ext/State2DAnimationMachineSystemComponent";

export class State2DAnimationMachineComponent extends GameComponent {
	private readonly states: Animation2DSpriteState[];

	private spriteComponent: Sprite2DRendererComponent;

	private currentState!: Animation2DSpriteState;
	private defaultStateName: string;

	public constructor(entity: Entity) {
		super(entity);

		this.defaultStateName = "";

		this.states = [];

		State2DAnimationMachineSystemComponent.getInstance().saveComponent(this);

		this.spriteComponent = this.entity.getComponent(Sprite2DRendererComponent);
	}

	public addState(state: Animation2DSpriteState): void {
		this.states.push(state);
	}

	public play(stateName: string): void {
		if (this.currentState.getName() === stateName) {
			return;
		}
		for (const state of this.states) {
			if (state.getName() === stateName) {
				this.currentState = state;
				break;
			}
		}
	}

	public remove(): void {
		State2DAnimationMachineSystemComponent.getInstance().removeComponent(this);
	}

	public render(): void {
	}

	public update(time: Time): void {
		this.currentState.update(time);

		this.spriteComponent.sprite = this.currentState.getCurrentFrame().getSprite();
	}

	public setDefaultStateName(defaultStateName: string): void {
		this.defaultStateName = defaultStateName;

		for (const state of this.states) {
			if (state.getName() === this.defaultStateName) {
				this.currentState = state;
				break;
			}
		}
	}

}