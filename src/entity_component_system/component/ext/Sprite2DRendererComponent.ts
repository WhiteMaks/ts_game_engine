import {Sprite2DRendererSystemComponent} from "../../system/ext/Sprite2DRendererSystemComponent";
import {TransformComponent} from "./TransformComponent";
import {Engine} from "../../../Engine";
import {GameComponent} from "../GameComponent";
import {Entity} from "../../entity/Entity";
import {Time} from "../../../Time";
import {GraphicsEngine} from "../../../graphics_engine/namespace/graphics_engine";

export class Sprite2DRendererComponent extends GameComponent {
	public sprite!: GraphicsEngine.Sprite2D;

	public constructor(entity: Entity) {
		super(entity);

		Sprite2DRendererSystemComponent.getInstance().saveComponent(this);
	}

	public update(time: Time): void {
	}

	public render(): void {
		const transformComponent = this.entity.getComponent(TransformComponent);
		Engine.renderer2D.drawQuadWithSprite(
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