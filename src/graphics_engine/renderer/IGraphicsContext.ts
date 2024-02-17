export interface IGraphicsContext {

	init(): void;

	setViewport(x: number, y: number, width: number, height: number): void;

	printDebugInfo(): void;
}