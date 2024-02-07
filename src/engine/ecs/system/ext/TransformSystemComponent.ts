import GameSystemComponent from "../GameSystemComponent";
import TransformComponent from "../../component/ext/TransformComponent";

class TransformSystemComponent extends GameSystemComponent<TransformComponent> {
	private static instance: TransformSystemComponent;

	private constructor() {
		super();
	}

	public static getInstance(): TransformSystemComponent {
		if (!TransformSystemComponent.instance) {
			TransformSystemComponent.instance = new TransformSystemComponent();
		}

		return TransformSystemComponent.instance;
	}
}

export default TransformSystemComponent;