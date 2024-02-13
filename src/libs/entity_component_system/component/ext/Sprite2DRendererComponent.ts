import {Sprite2DRendererSystemComponent} from "../../../../engine/ecs/system/ext/Sprite2DRendererSystemComponent";
import {TransformComponent} from "./TransformComponent";
import {GameEngine} from "../../../../engine/GameEngine";
import {GameComponent} from "../GameComponent";
import {Entity} from "../../entity/Entity";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export class Sprite2DRendererComponent extends GameComponent {
	public sprite!: GraphicsEngine.Sprite2D;

	public constructor(entity: Entity) {
		super(entity);

		Sprite2DRendererSystemComponent.getInstance().saveComponent(this);
	}

	public update(time: GraphicsEngine.Time): void {
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