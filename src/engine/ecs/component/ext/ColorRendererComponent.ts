import {GameComponent} from "../GameComponent";
import {TransformComponent} from "./TransformComponent";
import {GameEngine} from "../../../GameEngine";
import {ColorRendererSystemComponent} from "../../system/ext/ColorRendererSystemComponent";
import {ECS} from "#entity_component_system/src/namespace/ecs";
import {GraphicsEngine} from "#graphics_engine/src/namespace/graphics_engine";

export class ColorRendererComponent extends GameComponent {
	public color: GraphicsEngine.Vector4;

	public constructor(entity: ECS.Entity) {
		super(entity);

		this.color = new GraphicsEngine.Vector4(1, 1, 1, 1);

		ColorRendererSystemComponent.getInstance().saveComponent(this);
	}

	public update(time: GraphicsEngine.Time): void {
	}

	public render(): void {
		const transformComponent = this.entity.getComponent(TransformComponent);
		GameEngine.renderer2D.drawQuadWithColor(
			transformComponent.position,
			transformComponent.rotation,
			transformComponent.scale,
			this.color
		);
	}

	public remove(): void {
		ColorRendererSystemComponent.getInstance().removeComponent(this);
	}
}