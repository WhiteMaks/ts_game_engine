import {IBuffer} from "../../../buffer/IBuffer";
import {WebGLExt} from "../wrappers/WebGLExt";
import {BufferLayout} from "../../../buffer/BufferLayout";

export class WebGLVertexDynamicBuffer implements IBuffer {
	private readonly gl: WebGLExt;
	private readonly buffer: WebGLBuffer;

	private layout: BufferLayout | null;

	public constructor(gl: WebGLExt, size: number) {
		this.gl = gl;
		this.buffer = gl.createBuffer();
		this.layout = null;

		this.bind();

		gl.arrayBufferDynamicData(size);
	}

	public bind(): void {
		this.gl.bindArrayBuffer(this.buffer);
	}

	public unbind(): void {
		this.gl.unbindArrayBuffer();
	}

	public getCount(): number {
		throw new Error("getCount not supported in Vertex Buffer");
	}

	public clean(): void {
		this.gl.deleteBuffer(this.buffer);
	}

	public setLayout(layout: BufferLayout): void {
		this.layout = layout;
	}

	public getLayout(): BufferLayout {
		return this.layout!;
	}

	public setFloat32Data(data: Float32Array): void {
		this.bind();
		this.gl.arrayBufferSubData(data);
	}
}