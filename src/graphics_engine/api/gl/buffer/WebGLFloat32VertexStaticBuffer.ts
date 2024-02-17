import { WebGLVertexStaticBuffer } from "./WebGLVertexStaticBuffer";
import { WebGLExt } from "../wrappers/WebGLExt";

export class WebGLFloat32VertexStaticBuffer extends WebGLVertexStaticBuffer {

	public constructor(gl: WebGLExt, data: Float32Array) {
		super(gl, data, data.length);
	}

}