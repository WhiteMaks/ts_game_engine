import {GameSystemComponent} from "../GameSystemComponent";
import {Texture2DRendererComponent} from "../../component/ext/Texture2DRendererComponent";
import {TransformComponent} from "../../component/ext/TransformComponent";

export class Texture2DRendererSystemComponent extends GameSystemComponent<Texture2DRendererComponent> {
	private static instance: Texture2DRendererSystemComponent | null;

	private constructor() {
		super();
	}

	public saveComponent(component: Texture2DRendererComponent) {
		super.saveComponent(component);

		this.components = this.components.sort((a, b) => {
			const aZ = a.entity.getComponent(TransformComponent).position.getZ();
			const bZ = b.entity.getComponent(TransformComponent).position.getZ();
			return aZ - bZ;
		});
	}

	public static getInstance(): Texture2DRendererSystemComponent {
		if (!Texture2DRendererSystemComponent.instance) {
			Texture2DRendererSystemComponent.instance = new Texture2DRendererSystemComponent();
		}

		return Texture2DRendererSystemComponent.instance;
	}
}