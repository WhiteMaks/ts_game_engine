import {GameSystemComponent} from "../GameSystemComponent";
import {Texture2DRendererComponent} from "../../component/ext/Texture2DRendererComponent";

export class Texture2DRendererSystemComponent extends GameSystemComponent<Texture2DRendererComponent> {
	private static instance: Texture2DRendererSystemComponent | null;

	private constructor() {
		super();
	}

	public static getInstance(): Texture2DRendererSystemComponent {
		if (!Texture2DRendererSystemComponent.instance) {
			Texture2DRendererSystemComponent.instance = new Texture2DRendererSystemComponent();
		}

		return Texture2DRendererSystemComponent.instance;
	}
}