import {BaseScript} from "../../script/BaseScript";
import {TypeScriptSystemComponent} from "../../system/ext/TypeScriptSystemComponent";
import {GameComponent} from "../GameComponent";
import {Entity} from "../../entity/Entity";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export class TypeScriptComponent extends GameComponent {
	private script!: BaseScript | null;

	private instanceFn: () => void;
	private destroyFn: () => void;

	private onInitFn: () => void;
	private onUpdateFn: (time: GraphicsEngine.Time) => void;
	private onDestroyFn: () => void;

	public constructor(entity: Entity) {
		super(entity);

		this.instanceFn = () => {};
		this.destroyFn = () => {};
		this.onInitFn = () => {};
		this.onUpdateFn = (time: GraphicsEngine.Time) => {};
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
			this.onUpdateFn = (time: GraphicsEngine.Time) => {};
			this.onDestroyFn = () => {};
		};

		this.onInitFn = () => {
			this.script!.init();
		};

		this.onUpdateFn = (time: GraphicsEngine.Time) => {
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

	public update(time: GraphicsEngine.Time): void {
		if (!this.script) {
			this.instanceFn();
			this.onInitFn();
		}

		this.onUpdateFn(time);
	}

}