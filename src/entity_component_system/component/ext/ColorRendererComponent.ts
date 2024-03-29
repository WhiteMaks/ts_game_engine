import {TransformComponent} from "./TransformComponent";
import {Engine} from "../../../Engine";
import {ColorRendererSystemComponent} from "../../system/ext/ColorRendererSystemComponent";
import {GameComponent} from "../GameComponent";
import {Entity} from "../../entity/Entity";
import {Time} from "../../../Time";
import {GraphicsEngine} from "../../../graphics_engine/namespace/graphics_engine";

export class ColorRendererComponent extends GameComponent {
	public color: GraphicsEngine.Vector4;

	public constructor(entity: Entity) {
		super(entity);

		this.color = new GraphicsEngine.Vector4(1, 1, 1, 1);

		ColorRendererSystemComponent.getInstance().saveComponent(this);
	}

	public update(time: Time): void {
	}

	public render(): void {
		const transformComponent = this.entity.getComponent(TransformComponent);
		Engine.renderer2D.drawQuadWithColor(
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