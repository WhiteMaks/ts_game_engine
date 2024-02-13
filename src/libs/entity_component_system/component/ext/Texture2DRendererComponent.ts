import {GameEngine} from "../../../../engine/GameEngine";
import {TransformComponent} from "./TransformComponent";
import {Texture2DRendererSystemComponent} from "../../system/ext/Texture2DRendererSystemComponent";
import {GameComponent} from "../GameComponent";
import {Entity} from "../../entity/Entity";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export class Texture2DRendererComponent extends GameComponent {
	public texture!: GraphicsEngine.ITexture;

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

	public update(time: GraphicsEngine.Time): void {
	}

}