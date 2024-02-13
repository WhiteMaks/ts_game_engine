import {GameSystemComponent} from "../GameSystemComponent";
import {ColorRendererComponent} from "../../../../libs/entity_component_system/component/ext/ColorRendererComponent";

export class ColorRendererSystemComponent extends GameSystemComponent<ColorRendererComponent> {
	private static instance: ColorRendererSystemComponent | null;

	private constructor() {
		super();
	}

	public static getInstance(): ColorRendererSystemComponent {
		if (!ColorRendererSystemComponent.instance) {
			ColorRendererSystemComponent.instance = new ColorRendererSystemComponent();
		}

		return ColorRendererSystemComponent.instance;
	}

}