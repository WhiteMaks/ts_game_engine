export class Time {
	/**
	 * Времени с момента старта в миллисекундах
	 * @private
	 */
	private timestamp: number;
	/**
	 * Времени с последнего кадра в миллисекундах
	 * @private
	 */
	private deltaTime: number;

	public constructor(timestamp: number = 0) {
		this.timestamp = timestamp;
		this.deltaTime = 0;
	}

	public update(timestamp: number): void {
		this.deltaTime = timestamp - this.timestamp;
		this.timestamp = timestamp;
	}

	public getTimestamp(): number {
		return this.timestamp;
	}

	public getDeltaTimeMs(): number {
		return this.deltaTime;
	}

	public getDeltaTimeSec(): number {
		return this.deltaTime / 1_000;
	}
}