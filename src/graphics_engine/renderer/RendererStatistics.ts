export class RendererStatistics {
	private drawMethodCallsCount: number;
	private quadsCount: number;
	private textureSlotsCount: number;

	public constructor() {
		this.drawMethodCallsCount = 0;
		this.quadsCount = 0;
		this.textureSlotsCount = 0;
	}

	public increaseDrawMethodCallsCount(): void {
		this.drawMethodCallsCount++;
	}

	public increaseQuadsCount(): void {
		this.quadsCount++;
	}

	public increaseTextureSlotsCount(): void {
		this.textureSlotsCount++;
	}

	public reset(): void {
		this.drawMethodCallsCount = 0;
		this.quadsCount = 0;
	}

	public getDrawMethodCallsCount(): number {
		return this.drawMethodCallsCount;
	}

	public getQuadsCount(): number {
		return this.quadsCount;
	}

	public getTextureSlotsCount(): number {
		return this.textureSlotsCount;
	}
}