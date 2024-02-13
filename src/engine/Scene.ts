import {Sprite2DRendererSystemComponent} from "./ecs/system/ext/Sprite2DRendererSystemComponent";
import {TransformSystemComponent} from "./ecs/system/ext/TransformSystemComponent";
import {TagSystemComponent} from "./ecs/system/ext/TagSystemComponent";
import {CameraSystemComponent} from "./ecs/system/ext/CameraSystemComponent";
import {GameEngine} from "./GameEngine";
import {Texture2DRendererSystemComponent} from "./ecs/system/ext/Texture2DRendererSystemComponent";
import {ColorRendererSystemComponent} from "./ecs/system/ext/ColorRendererSystemComponent";
import {TypeScriptSystemComponent} from "./ecs/system/ext/TypeScriptSystemComponent";
import {ECS} from "#entity_component_system/namespace/ecs";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export class Scene {
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

	public createEntity(name: string = "Entity"): ECS.Entity {
		name = name + " " + Scene.entityId;

		const result = new ECS.Entity(Scene.entityId++);
		result.addComponent(ECS.TransformComponent);
		result.addComponent(ECS.TagComponent).tag = name;
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

	public update(time: GraphicsEngine.Time): void {
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
		this.transformSystemComponent.clean();
		this.sprite2DRendererSystemComponent.clean();
		this.tagSystemComponent.clean();
		this.cameraSystemComponent.clean();
		this.texture2DRendererSystemComponent.clean();
		this.colorRendererSystemComponent.clean();
		this.typeScriptSystemComponent.clean();
	}
}