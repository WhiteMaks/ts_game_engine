import {IBuffer} from "../buffer/IBuffer";
import {Renderer} from "../renderer/Renderer";
import {RendererAPI} from "../renderer/RendererAPI";
import {IGraphicsContext} from "../renderer/IGraphicsContext";
import {WebGLContext} from "../api/gl/renderer/WebGLContext";
import {IArrayBuffer} from "../buffer/IArrayBuffer";
import {WebGLVertexArrayBuffer} from "../api/gl/buffer/WebGLVertexArrayBuffer";
import {WebGLUint16IndexStaticBuffer} from "../api/gl/buffer/WebGLUint16IndexStaticBuffer";
import {WebGLFloat32VertexStaticBuffer} from "../api/gl/buffer/WebGLFloat32VertexStaticBuffer";
import {WebGLFloat32VertexDynamicBuffer} from "../api/gl/buffer/WebGLFloat32VertexDynamicBuffer";
import {FrameBuffer} from "../buffer/FrameBuffer";
import {FrameBufferData} from "../buffer/FrameBufferData";
import {WebGLFrameBuffer} from "../api/gl/buffer/WebGLFrameBuffer";

export class BufferFactory {

	public static createFloat32VertexDynamicBuffer(graphicsContext: IGraphicsContext, size: number): IBuffer {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGLFloat32VertexDynamicBuffer(gl, size);
			}
		}
	}

	public static createFloat32VertexStaticBuffer(graphicsContext: IGraphicsContext, data: Float32Array): IBuffer {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGLFloat32VertexStaticBuffer(gl, data);
			}
		}
	}

	public static createUint16IndexStaticBuffer(graphicsContext: IGraphicsContext, data: Uint16Array): IBuffer {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGLUint16IndexStaticBuffer(gl, data);
			}
		}
	}

	public static createVertexArrayBuffer(graphicsContext: IGraphicsContext): IArrayBuffer {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGLVertexArrayBuffer(gl);
			}
		}
	}

	public static createFrameBuffer(graphicsContext: IGraphicsContext, data: FrameBufferData): FrameBuffer {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGLFrameBuffer(gl, data);
			}
		}
	}

}