import Time from "#graphics_engine/src/support/Time";
import Entity from "#entity_component_system/src/entity/Entity";
import Sprite2DRendererSystemComponent from "./ecs/system/ext/Sprite2DRendererSystemComponent";
import TransformSystemComponent from "./ecs/system/ext/TransformSystemComponent";
import TransformComponent from "./ecs/component/ext/TransformComponent";
import Vector3 from "#graphics_engine/src/maths/impl/Vector3";
import TagComponent from "./ecs/component/ext/TagComponent";
import TagSystemComponent from "./ecs/system/ext/TagSystemComponent";
import CameraSystemComponent from "./ecs/system/ext/CameraSystemComponent";
import GameEngine from "./GameEngine";
import Texture2DRendererSystemComponent from "./ecs/system/ext/Texture2DRendererSystemComponent";
import ColorRendererSystemComponent from "./ecs/system/ext/ColorRendererSystemComponent";
import TypeScriptSystemComponent from "./ecs/system/ext/TypeScriptSystemComponent";

class Scene {
	private static entityId: number = 1;

	private readonly transformSystemComponent: TransformSystemComponent;
	private readonly sprite2DRendererSystemComponent: Sprite2DRendererSystemComponent;
	private readonly tagSystemComponent: TagSystemComponent;
	private readonly cameraSystemComponent: CameraSystemComponent;
	private readonly texture2DRendererSystemComponent: Texture2DRendererSystemComponent;
	private readonly colorRendererSystemComponent: ColorRendererSystemComponent;
	private readonly typeScriptSystemComponent: TypeScriptSystemComponent;

	private width: number;
	private height: number;

	public constructor(width: number, height: number) {
		this.transformSystemComponent = TransformSystemComponent.getInstance();
		this.sprite2DRendererSystemComponent = Sprite2DRendererSystemComponent.getInstance();
		this.tagSystemComponent = TagSystemComponent.getInstance();
		this.cameraSystemComponent = CameraSystemComponent.getInstance();
		this.texture2DRendererSystemComponent = Texture2DRendererSystemComponent.getInstance();
		this.colorRendererSystemComponent = ColorRendererSystemComponent.getInstance();
		this.typeScriptSystemComponent = TypeScriptSystemComponent.getInstance();

		this.width = width;
		this.height = height;
	}

	public createEntity(name: string = "Entity"): Entity {
		name = name + " " + Scene.entityId;

		const result = new Entity(Scene.entityId++);
		result.addComponent(
			new TransformComponent(
				result,
				new Vector3(0, 0, 0),
				new Vector3(0, 0, 0),
				new Vector3(1, 1, 1)
			)
		);
		result.addComponent(new TagComponent(result, name));
		return result;
	}

	public resizeCamera(): void {
		this.cameraSystemComponent.resize(this.width, this.height);
	}

	public resize(width: number, height: number): void {
		this.width = width;
		this.height = height;

		this.resizeCamera();
	}

	public update(time: Time): void {
		this.transformSystemComponent.update(time);
		this.sprite2DRendererSystemComponent.update(time);
		this.tagSystemComponent.update(time);
		this.cameraSystemComponent.update(time);
		this.colorRendererSystemComponent.update(time);
		this.texture2DRendererSystemComponent.update(time);
		this.typeScriptSystemComponent.update(time);
	}

	public render(): void {
		const primaryCamera = this.cameraSystemComponent.getPrimaryCamera();
		if (primaryCamera) {
			GameEngine.renderer2D.begin(primaryCamera);

			this.colorRendererSystemComponent.render();
			this.texture2DRendererSystemComponent.render();
			this.sprite2DRendererSystemComponent.render();

			GameEngine.renderer2D.end();
		}
	}

	public clean(): void {

	}
}

export default Scene;