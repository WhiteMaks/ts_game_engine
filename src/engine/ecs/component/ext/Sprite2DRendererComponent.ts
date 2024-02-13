import {GameComponent} from "../GameComponent";
import {Sprite2DRendererSystemComponent} from "../../system/ext/Sprite2DRendererSystemComponent";
import {TransformComponent} from "./TransformComponent";
import {GameEngine} from "../../../GameEngine";
import {ECS} from "#entity_component_system/namespace/ecs";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export class Sprite2DRendererComponent extends GameComponent {
	public sprite!: GraphicsEngine.Sprite2D;

	public constructor(entity: ECS.Entity) {
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