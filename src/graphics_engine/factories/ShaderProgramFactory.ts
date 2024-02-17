import {IShaderProgram} from "../shader/IShaderProgram";
import {IGraphicsContext} from "../renderer/IGraphicsContext";
import {Renderer} from "../renderer/Renderer";
import {RendererAPI} from "../renderer/RendererAPI";
import {WebGLContext} from "../api/gl/renderer/WebGLContext";
import {IWebGLShader} from "../api/gl/shader/IWebGLShader";
import {WebGLVertexShader} from "../api/gl/shader/WebGLVertexShader";
import {WebGLFragmentShader} from "../api/gl/shader/WebGLFragmentShader";
import {WebGLShaderProgram} from "../api/gl/shader/WebGLShaderProgram";

export class ShaderProgramFactory {

	public static createProgram(graphicsContext: IGraphicsContext, programName: string,  vertexShaderCode: string, fragmentShaderCode: string): IShaderProgram {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				const vertexShader: IWebGLShader = new WebGLVertexShader(gl, vertexShaderCode);
				const fragmentShader: IWebGLShader = new WebGLFragmentShader(gl, fragmentShaderCode);
				return new WebGLShaderProgram(gl, programName, vertexShader, fragmentShader);
			}
		}
	}

}