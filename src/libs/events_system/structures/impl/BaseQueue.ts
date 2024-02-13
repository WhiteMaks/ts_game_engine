import { Queue } from "../Queue";

/**
 * Класс реализации базовой очереди
 */
export class BaseQueue<T> implements Queue<T> {
	private readonly array: T[];

	public constructor() {
		this.array = [];
	}

	public peek(): T {
		return this.array[0];
	}

	public poll(): T {
		let result = this.array.shift();
		if (!result) {
			throw new Error("Нет элементов в очереди");
		}
		return result;
	}

	public push(element: T): void {
		this.array.push(element);
	}

	public size(): number {
		return this.array.length;
	}

	public flush(): void {
		//пока в очереди есть записи, берем первый из очереди
		while (this.size() !== 0) {
			this.poll();
		}
	}

}