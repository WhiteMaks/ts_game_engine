import GameComponent from "../GameComponent";
import Time from "#graphics_engine/src/support/Time";
import Entity from "#entity_component_system/src/entity/Entity";
import Vector4 from "#graphics_engine/src/maths/impl/Vector4";
import TransformComponent from "./TransformComponent";
import GameEngine from "../../../GameEngine";
import ColorRendererSystemComponent from "../../system/ext/ColorRendererSystemComponent";

class ColorRendererComponent extends GameComponent {
	public readonly color: Vector4;

	public constructor(entity: Entity, color: Vector4) {
		super(entity);

		this.color = color;

		ColorRendererSystemComponent.getInstance().saveComponent(this);
	}

	public update(time: Time): void {
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

export default ColorRendererComponent;