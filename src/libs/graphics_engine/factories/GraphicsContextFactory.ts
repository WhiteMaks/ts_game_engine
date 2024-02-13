import {IGraphicsContext} from "../renderer/IGraphicsContext";
import {RendererAPI} from "../renderer/RendererAPI";
import {WebGLContext} from "../api/gl/renderer/WebGLContext";
import {Renderer} from "../renderer/Renderer";

export class GraphicsContextFactory {

	public static createContext(canvasElement: HTMLCanvasElement): IGraphicsContext {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: return new WebGLContext(canvasElement);
		}
	}

}