import {Component} from "./Component";
import {Entity} from "../entity/Entity";
import {Time} from "../../Time";

export abstract class GameComponent extends Component {

	protected constructor(entity: Entity) {
		super(entity);
	}

	public abstract update(time: Time): void;

	public abstract render(): void;
}