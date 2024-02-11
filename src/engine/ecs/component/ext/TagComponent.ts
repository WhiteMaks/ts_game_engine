import {GameComponent} from "../GameComponent";
import {TagSystemComponent} from "../../system/ext/TagSystemComponent";
import {ECS} from "#entity_component_system/src/namespace/ecs";
import {GraphicsEngine} from "#graphics_engine/src/namespace/graphics_engine";

export class TagComponent extends GameComponent {
	public tag!: string;

	public constructor(entity: ECS.Entity) {
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