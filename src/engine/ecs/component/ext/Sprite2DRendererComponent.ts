import GameComponent from "../GameComponent";
import Time from "#graphics_engine/src/support/Time";
import Entity from "#entity_component_system/src/entity/Entity";
import Sprite2DRendererSystemComponent from "../../system/ext/Sprite2DRendererSystemComponent";
import TransformComponent from "./TransformComponent";
import GameEngine from "../../../GameEngine";
import Sprite2D from "#graphics_engine/src/resource/Sprite2D";

class Sprite2DRendererComponent extends GameComponent {
	public sprite!: Sprite2D;

	public constructor(entity: Entity) {
		super(entity);

		Sprite2DRendererSystemComponent.getInstance().saveComponent(this);
	}

	public update(time: Time): void {
	}

	public render(): void {
		const transformComponent = this.entity.getComponent(TransformComponent);
		GameEngine.renderer2D.drawQuadWithSprite(
			transformComponent.position,
			transformComponent.rotation,
			transformComponent.scale,
			this.sprite
		);
	}

	public remove(): void {
		Sprite2DRendererSystemComponent.getInstance().removeComponent(this);
	}
}

export default Sprite2DRendererComponent;