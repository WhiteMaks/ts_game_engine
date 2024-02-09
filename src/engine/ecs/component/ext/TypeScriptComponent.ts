import GameComponent from "../GameComponent";
import Time from "#graphics_engine/src/support/Time";
import Entity from "#entity_component_system/src/entity/Entity";
import BaseScript from "../../script/BaseScript";
import TypeScriptSystemComponent from "../../system/ext/TypeScriptSystemComponent";

class TypeScriptComponent extends GameComponent {
	private script!: BaseScript | null;

	private instanceFn: () => void;
	private destroyFn: () => void;

	private onInitFn: () => void;
	private onUpdateFn: (time: Time) => void;
	private onDestroyFn: () => void;

	public constructor(entity: Entity) {
		super(entity);

		this.instanceFn = () => {};
		this.destroyFn = () => {};
		this.onInitFn = () => {};
		this.onUpdateFn = (time: Time) => {};
		this.onDestroyFn = () => {};

		TypeScriptSystemComponent.getInstance().saveComponent(this);
	}

	public bind<T extends BaseScript>(componentClass: new (...args: any[]) => T): void {
		this.instanceFn = () => {
			this.script = new componentClass(this.entity);
		};

		this.destroyFn = () => {
			this.script = null;

			this.instanceFn = () => {};
			this.destroyFn = () => {};
			this.onInitFn = () => {};
			this.onUpdateFn = (time: Time) => {};
			this.onDestroyFn = () => {};
		};

		this.onInitFn = () => {
			this.script!.init();
		};

		this.onUpdateFn = (time: Time) => {
			this.script!.update(time);
		};

		this.onDestroyFn = () => {
			this.script!.destroy();
		};
	}

	public remove(): void {
		this.onDestroyFn();
		this.destroyFn();
		TypeScriptSystemComponent.getInstance().removeComponent(this);
	}

	public render(): void {
	}

	public update(time: Time): void {
		if (!this.script) {
			this.instanceFn();
			this.onInitFn();
		}

		this.onUpdateFn(time);
	}

}

export default TypeScriptComponent;