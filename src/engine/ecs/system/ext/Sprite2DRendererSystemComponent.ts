import {GameSystemComponent} from "../GameSystemComponent";
import {Sprite2DRendererComponent} from "../../../../libs/entity_component_system/component/ext/Sprite2DRendererComponent";

export class Sprite2DRendererSystemComponent extends GameSystemComponent<Sprite2DRendererComponent> {
	private static instance: Sprite2DRendererSystemComponent | null;

	private constructor() {
		super();
	}

	public static getInstance(): Sprite2DRendererSystemComponent {
		if (!Sprite2DRendererSystemComponent.instance) {
			Sprite2DRendererSystemComponent.instance = new Sprite2DRendererSystemComponent();
		}

		return Sprite2DRendererSystemComponent.instance;
	}

}