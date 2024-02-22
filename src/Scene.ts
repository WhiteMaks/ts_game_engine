import {Engine} from "./Engine";
import {Time} from "./Time";
import {ECS} from "./entity_component_system/namespace/ecs";

export class Scene {
	private static entityId: number = 1;

	private readonly entities: ECS.Entity[];

	private readonly transformSystemComponent: ECS.TransformSystemComponent;
	private readonly sprite2DRendererSystemComponent: ECS.Sprite2DRendererSystemComponent;
	private readonly tagSystemComponent: ECS.TagSystemComponent;
	private readonly cameraSystemComponent: ECS.CameraSystemComponent;
	private readonly texture2DRendererSystemComponent: ECS.Texture2DRendererSystemComponent;
	private readonly colorRendererSystemComponent: ECS.ColorRendererSystemComponent;
	private readonly typeScriptSystemComponent: ECS.TypeScriptSystemComponent;
	private readonly state2DMachineSystemComponent: ECS.State2DAnimationMachineSystemComponent;

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
		this.state2DMachineSystemComponent = ECS.State2DAnimationMachineSystemComponent.getInstance();

		this.width = width;
		this.height = height;

		this.entities = [];
	}

	public createEntity(name: string = "Entity"): ECS.Entity {
		const result = new ECS.Entity(Scene.entityId++, this);
		result.addComponent(ECS.TransformComponent);
		result.addComponent(ECS.TagComponent).tag = name;

		this.entities.push(result);

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
		this.state2DMachineSystemComponent.update(time);
	}

	public render(): void {
		const primaryCamera = this.cameraSystemComponent.getPrimaryCamera();
		if (primaryCamera) {
			Engine.renderer2D.begin(primaryCamera);

			this.colorRendererSystemComponent.render();
			this.texture2DRendererSystemComponent.render();
			this.sprite2DRendererSystemComponent.render();

			Engine.renderer2D.end();
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
		this.state2DMachineSystemComponent.clean();
	}

	public getEntities(): ECS.Entity[] {
		return this.entities;
	}
}