import {GameSystemComponent} from "../GameSystemComponent";
import {TransformComponent} from "../../component/ext/TransformComponent";

export class TransformSystemComponent extends GameSystemComponent<TransformComponent> {
	private static instance: TransformSystemComponent | null;

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