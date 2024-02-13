import {GameEngine} from "./GameEngine";
import {ECS} from "#entity_component_system/namespace/ecs";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export class Scene {
	private static entityId: number = 1;

	private readonly transformSystemComponent: ECS.TransformSystemComponent;
	private readonly sprite2DRendererSystemComponent: ECS.Sprite2DRendererSystemComponent;
	private readonly tagSystemComponent: ECS.TagSystemComponent;
	private readonly cameraSystemComponent: ECS.CameraSystemComponent;
	private readonly texture2DRendererSystemComponent: ECS.Texture2DRendererSystemComponent;
	private readonly colorRendererSystemComponent: ECS.ColorRendererSystemComponent;
	private readonly typeScriptSystemComponent: ECS.TypeScriptSystemComponent;

	private width: number;
	private height: number;

	public constructor(width: number, height: number) {
		this.transformSystemComponent = ECS.TransformSystemComponent.getInstance();
		this.sprite2DRendererSystemComponent = ECS.Sprite2DRendererSystemComponent.getInstance();
		this.tagSystemComponent = ECS.TagSystemComponent.getInstance();
		this.cameraSystemComponent = ECS.CameraSystemComponent.getInstance();
		this.texture2DRendererSystemComponent = ECS.Texture2DRendererSystemComponent.getInstance();
		this.colorRendererSystemComponent = ECS.ColorRendererSystemComponent.getInstance();
		this.typeScriptSystemComponent = ECS.TypeScriptSystemComponent.getInstance();

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