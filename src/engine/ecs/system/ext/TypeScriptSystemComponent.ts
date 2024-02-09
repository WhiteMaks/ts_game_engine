import GameSystemComponent from "../GameSystemComponent";
import TypeScriptComponent from "../../component/ext/TypeScriptComponent";

class TypeScriptSystemComponent extends GameSystemComponent<TypeScriptComponent> {
	private static instance: TypeScriptSystemComponent | null;

	private constructor() {
		super();
	}

	public static getInstance(): TypeScriptSystemComponent {
		if (!TypeScriptSystemComponent.instance) {
			TypeScriptSystemComponent.instance = new TypeScriptSystemComponent();
		}

		return TypeScriptSystemComponent.instance;
	}
}

export default TypeScriptSystemComponent;