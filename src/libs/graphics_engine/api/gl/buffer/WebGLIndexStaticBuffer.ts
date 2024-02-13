import {IBuffer} from "../../../buffer/IBuffer";
import {WebGLExt} from "../wrappers/WebGLExt";
import {BufferLayout} from "../../../buffer/BufferLayout";

export class WebGLIndexStaticBuffer implements IBuffer {
	private readonly gl: WebGLExt;
	private readonly buffer: WebGLBuffer;
	private readonly count;

	public constructor(gl: WebGLExt, data: BufferSource, count: number) {
		this.gl = gl;
		this.buffer = gl.createBuffer();
		this.count = count;

		this.bind();
		gl.elementArrayBufferStaticData(data);
	}

	public bind(): void {
		this.gl.bindElementArrayBuffer(this.buffer);
	}

	public unbind(): void {
		this.gl.bindElementArrayBuffer(this.buffer);
	}

	public getCount(): number {
		return this.count;
	}

	public clean(): void {
		this.gl.deleteBuffer(this.buffer);
	}

	public setLayout(layout: BufferLayout): void {
		throw new Error("setLayout: not implemented method");
	}

	public getLayout(): BufferLayout {
		throw new Error("getLayout: not implemented method");
	}

	public setFloat32Data(data: Float32Array): void {
		throw new Error("Index Static buffer not supported setFloat32Data");
	}
}