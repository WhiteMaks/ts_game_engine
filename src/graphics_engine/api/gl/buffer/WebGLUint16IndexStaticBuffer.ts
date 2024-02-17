import {WebGLIndexStaticBuffer} from "./WebGLIndexStaticBuffer";
import {WebGLExt} from "../wrappers/WebGLExt";

export class WebGLUint16IndexStaticBuffer extends WebGLIndexStaticBuffer {

	public constructor(gl: WebGLExt, data: Uint16Array) {
		super(gl, data, data.length);
	}

}