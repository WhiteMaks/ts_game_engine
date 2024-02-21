import {GameSystemComponent} from "../GameSystemComponent";
import {ColorRendererComponent} from "../../component/ext/ColorRendererComponent";
import {TransformComponent} from "../../component/ext/TransformComponent";

export class ColorRendererSystemComponent extends GameSystemComponent<ColorRendererComponent> {
	private static instance: ColorRendererSystemComponent | null;

	private constructor() {
		super();
	}

	public saveComponent(component: ColorRendererComponent) {
		super.saveComponent(component);

		this.components = this.components.sort((a, b) => {
			const aZ = a.entity.getComponent(TransformComponent).position.getZ();
			const bZ = b.entity.getComponent(TransformComponent).position.getZ();
			return aZ - bZ;
		});
	}

	public static getInstance(): ColorRendererSystemComponent {
		if (!ColorRendererSystemComponent.instance) {
			ColorRendererSystemComponent.instance = new ColorRendererSystemComponent();
		}

		return ColorRendererSystemComponent.instance;
	}

}