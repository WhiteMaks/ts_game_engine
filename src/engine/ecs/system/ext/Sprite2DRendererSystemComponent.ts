import GameSystemComponent from "../GameSystemComponent";
import Sprite2DRendererComponent from "../../component/ext/Sprite2DRendererComponent";

class Sprite2DRendererSystemComponent extends GameSystemComponent<Sprite2DRendererComponent> {
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

export default Sprite2DRendererSystemComponent;