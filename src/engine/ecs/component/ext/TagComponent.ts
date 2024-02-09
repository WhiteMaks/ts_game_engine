import GameComponent from "../GameComponent";
import Time from "#graphics_engine/src/support/Time";
import Entity from "#entity_component_system/src/entity/Entity";
import TagSystemComponent from "../../system/ext/TagSystemComponent";

class TagComponent extends GameComponent {
	public tag: string;

	public constructor(entity: Entity, tag: string) {
		super(entity);

		this.tag = tag;

		TagSystemComponent.getInstance().saveComponent(this);
	}

	public remove(): void {
		TagSystemComponent.getInstance().removeComponent(this);
	}

	public render(): void {
	}

	public update(time: Time): void {
	}

}

export default TagComponent;