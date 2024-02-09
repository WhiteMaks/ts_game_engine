import GameSystemComponent from "../GameSystemComponent";
import TagComponent from "../../component/ext/TagComponent";

class TagSystemComponent extends GameSystemComponent<TagComponent> {
	private static instance: TagSystemComponent | null;

	private constructor() {
		super();
	}

	public static getInstance(): TagSystemComponent {
		if (!TagSystemComponent.instance) {
			TagSystemComponent.instance = new TagSystemComponent();
		}

		return TagSystemComponent.instance;
	}
}

export default TagSystemComponent;