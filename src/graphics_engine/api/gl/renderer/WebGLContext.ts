import {IGraphicsContext} from "../../../renderer/IGraphicsContext";
import {WebGLExt} from "../wrappers/WebGLExt";

export class WebGLContext implements IGraphicsContext {
	/**
	 * Canvas вэб элемент
	 * @private
	 */
	private readonly canvasElement: HTMLCanvasElement;
	/**
	 * Объект для работы с WebGL
	 * @private
	 */
	private readonly gl: WebGLExt;

	public constructor(canvasElement: HTMLCanvasElement) {
		this.canvasElement = canvasElement;

		const webGLContext = this.canvasElement.getContext("webgl2"); //получение контекста для работы с WebGL

		//если выбранный контекст не проинициализирован, значит либо его не существует, либо браузер не может с ним работать
		if (!webGLContext) {
			throw new Error("Невозможно проинициализировать WebGL. Данный браузер не поддерживает данный контекст [ webgl2 ]");
		}

		//инициализация объекта WebGL с выбранным контекстом
		this.gl = new WebGLExt(
			webGLContext //выбранный контекст
		);
	}

	public init(): void {

	}

	public setViewport(x: number, y: number, width: number, height: number): void {
		this.gl.setViewport(x, y, width, height);
	}

	public printDebugInfo(): void {
		console.log("Vendor: " + this.gl.getVendor());
		console.log("Renderer: " + this.gl.getRenderer());
	}

	public getGL(): WebGLExt {
		return this.gl;
	}

}