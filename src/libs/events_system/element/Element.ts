import { Queue } from "../structures/Queue";
import { ElementEvent } from "./ElementEvent";
import { BaseQueue } from "../structures/impl/BaseQueue";
import { ElementEventType } from "./ElementEventType";

export class Element {
	private readonly bufferSize: number;
	private readonly buffer: Queue<ElementEvent>;

	private width: number;
	private height: number;

	public constructor(bufferSize: number) {
		this.bufferSize = bufferSize;

		this.buffer = new BaseQueue();
		this.width = 0;
		this.height = 0;
	}

	public read(): ElementEvent {
		//если в буфере есть записи, то возвращается первая из очереди
		if (this.buffer.size() > 0) {
			return this.buffer.poll();
		}
		return this.generateEvent(ElementEventType.INVALID);
	}

	public getWidth(): number {
		return this.width;
	}

	public getHeight(): number {
		return this.height;
	}

	public onResize(width: number, height: number): void {
		if (this.width !== width || this.height !== height) {
			this.width = width;
			this.height = height;

			this.buffer.push(this.generateEvent(ElementEventType.RESIZE));

			this.trimBuffer();
		}
	}

	public flush(): void {
		this.buffer.flush();
	}

	private trimBuffer(): void {
		//пока в буфере больше записей, чем в значении bufferSize, берем первый из очереди
		while (this.buffer.size() > this.bufferSize) {
			this.buffer.poll();
		}
	}

	private generateEvent(type: ElementEventType): ElementEvent {
		return new ElementEvent(type, this.width, this.height);
	}
}