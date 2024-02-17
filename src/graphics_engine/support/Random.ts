export class Random {

	public static uuid(): string {
		return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => {
			const value: number = Number(c);
			const randomValue = value ^ crypto.getRandomValues(new Uint8Array(1))[0];
			const modRandomValue = randomValue & 15;
			return (modRandomValue >> value / 4).toString(16)
		})
	}

	public static int(maxValue: number): number {
		return Math.floor(Math.random() * maxValue);
	}
}