import GameComponent from "../GameComponent";
import Time from "#graphics_engine/src/support/Time";
import ITexture from "#graphics_engine/src/resource/ITexture";
import Entity from "#entity_component_system/src/entity/Entity";
import GameEngine from "../../../GameEngine";
import TransformComponent from "./TransformComponent";
import Texture2DRendererSystemComponent from "../../system/ext/Texture2DRendererSystemComponent";

class Texture2DRendererComponent extends GameComponent {
	public texture!: ITexture;

	public constructor(entity: Entity) {
		super(entity);

		Texture2DRendererSystemComponent.getInstance().saveComponent(this);
	}

	public remove(): void {
		Texture2DRendererSystemComponent.getInstance().removeComponent(this);
	}

	public render(): void {
		const transformComponent = this.entity.getComponent(TransformComponent);
		GameEngine.renderer2D.drawQuadWithTexture(
			transformComponent.position,
			transformComponent.rotation,
			transformComponent.scale,
			this.texture
		);
	}

	public update(time: Time): void {
	}

}

export default Texture2DRendererComponent;