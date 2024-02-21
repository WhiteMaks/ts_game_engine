import {GameSystemComponent} from "../GameSystemComponent";
import {Sprite2DRendererComponent} from "../../component/ext/Sprite2DRendererComponent";
import {TransformComponent} from "../../component/ext/TransformComponent";

export class Sprite2DRendererSystemComponent extends GameSystemComponent<Sprite2DRendererComponent> {
	private static instance: Sprite2DRendererSystemComponent | null;

	private constructor() {
		super();
	}

	public saveComponent(component: Sprite2DRendererComponent) {
		super.saveComponent(component);

		this.components = this.components.sort((a, b) => {
			const aZ = a.entity.getComponent(TransformComponent).position.getZ();
			const bZ = b.entity.getComponent(TransformComponent).position.getZ();
			return aZ - bZ;
		});
	}

	public static getInstance(): Sprite2DRendererSystemComponent {
		if (!Sprite2DRendererSystemComponent.instance) {
			Sprite2DRendererSystemComponent.instance = new Sprite2DRendererSystemComponent();
		}

		return Sprite2DRendererSystemComponent.instance;
	}

}