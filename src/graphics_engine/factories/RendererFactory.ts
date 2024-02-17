import {Renderer} from "../renderer/Renderer";
import {IGraphicsContext} from "../renderer/IGraphicsContext";
import {RendererAPI} from "../renderer/RendererAPI";
import {WebGLContext} from "../api/gl/renderer/WebGLContext";
import {Renderer2D} from "../renderer/Renderer2D";
import {WebGL2DRenderer} from "../api/gl/renderer/WebGL2DRenderer";

export class RendererFactory {

	public static create2D(graphicsContext: IGraphicsContext): Renderer2D {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGL2DRenderer(gl)
			}
		}
	}

}