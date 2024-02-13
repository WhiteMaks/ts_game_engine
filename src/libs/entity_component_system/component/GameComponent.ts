import {Component} from "./Component";
import {Entity} from "../entity/Entity";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export abstract class GameComponent extends Component {

	protected constructor(entity: Entity) {
		super(entity);
	}

	public abstract update(time: GraphicsEngine.Time): void;

	public abstract render(): void;
}