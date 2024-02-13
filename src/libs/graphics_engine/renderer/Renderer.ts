import {RendererAPI} from "./RendererAPI";

export abstract class Renderer {
	private static rendererAPI: RendererAPI = RendererAPI.WEB_GL;

	public static getAPI(): RendererAPI {
		return this.rendererAPI;
	}

	public static setAPI(api: RendererAPI): void {
		Renderer.rendererAPI = api;
	}
}