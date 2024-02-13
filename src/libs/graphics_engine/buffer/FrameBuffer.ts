import {FrameBufferData} from "./FrameBufferData";
import {Cleanable} from "../support/Cleanable";

export abstract class FrameBuffer implements Cleanable {
	protected data: FrameBufferData;

	protected constructor(data: FrameBufferData) {
		this.data = data;
	}

	public getData(): FrameBufferData {
		return this.data;
	}

	public abstract resize(width: number, height: number): void;

	public abstract bind(): void;

	public abstract unbind(): void;

	public abstract clean(): void;
}