import { WebGLExt } from "../wrappers/WebGLExt";
import { WebGLVertexDynamicBuffer } from "./WebGLVertexDynamicBuffer";

export class WebGLFloat32VertexDynamicBuffer extends WebGLVertexDynamicBuffer {

	public constructor(gl: WebGLExt, size: number) {
		super(gl, size);
	}

}