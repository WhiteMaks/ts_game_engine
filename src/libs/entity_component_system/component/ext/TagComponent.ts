import {TagSystemComponent} from "../../system/ext/TagSystemComponent";
import {GameComponent} from "../GameComponent";
import {Entity} from "../../entity/Entity";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export class TagComponent extends GameComponent {
	public tag!: string;

	public constructor(entity: Entity) {
		super(entity);

		TagSystemComponent.getInstance().saveComponent(this);
	}

	public remove(): void {
		TagSystemComponent.getInstance().removeComponent(this);
	}

	public render(): void {
	}

	public update(time: GraphicsEngine.Time): void {
	}

}