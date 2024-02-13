import {WebGLExt} from "../wrappers/WebGLExt";
import {IArrayBuffer} from "../../../buffer/IArrayBuffer";
import {IBuffer} from "../../../buffer/IBuffer";
import {BufferLayout} from "../../../buffer/BufferLayout";
import {ShaderDataType, getComponentCountFromShaderDataType} from "../../../shader/ShaderDataType";

export class WebGLVertexArrayBuffer implements IArrayBuffer {
	private readonly gl: WebGLExt;
	private readonly buffer: WebGLVertexArrayObject;
	private readonly vertexBuffers: IBuffer[];

	private indexBuffer: IBuffer | null;

	public constructor(gl: WebGLExt) {
		this.gl = gl;

		this.vertexBuffers = [];
		this.indexBuffer = null;
		this.buffer = gl.createVertexArray();

		this.bind();
	}

	public getCount(): number {
        return 0;
    }

	public addVertexBuffer(buffer: IBuffer): void {
		this.bind();
		buffer.bind();

		const layout = buffer.getLayout();
		const elements = buffer.getLayout().getElements();

		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];

			this.gl.enableVertexAttribArray(i);

			switch (element.type) {
				case ShaderDataType.FLOAT_4:
				case ShaderDataType.FLOAT_3:
				case ShaderDataType.FLOAT_2:
				case ShaderDataType.FLOAT_1: {
					this.gl.vertexAttribPointerFloat(i, getComponentCountFromShaderDataType(element.type), element.normalized, layout.getStride(), element.offset);
					break;
				}
				case ShaderDataType.INT_4:
				case ShaderDataType.INT_3:
				case ShaderDataType.INT_2:
				case ShaderDataType.INT_1: {
					this.gl.vertexAttribPointerUint(i, getComponentCountFromShaderDataType(element.type), element.normalized, layout.getStride(), element.offset);
					break;
				}
				default: {
					throw new Error("ShaderDataType [ " + element.type + " ] not supported");
				}
			}
		}

		this.vertexBuffers.push(buffer);
	}

	public setIndexBuffer(buffer: IBuffer): void {
		this.bind();
		buffer.bind();

		this.indexBuffer = buffer;
	}

	public bind(): void {
		this.gl.bindVertexArray(this.buffer);
	}

	public unbind(): void {
		this.gl.unbindVertexArray();
	}

	public clean(): void {
		this.gl.deleteVertexArray(this.buffer);

		for (const buffer of this.vertexBuffers) {
			buffer.clean();
		}

		this.indexBuffer?.clean();
	}

	public setLayout(layout: BufferLayout): void {
		throw new Error("setLayout: not implemented method");
	}

	public getLayout(): BufferLayout {
		throw new Error("getLayout: not implemented method");
	}

	public getVertexBuffers(): IBuffer[] {
		return this.vertexBuffers;
	}

	public getIndexBuffer(): IBuffer {
		return this.indexBuffer!;
	}

	public setFloat32Data(data: Float32Array): void {
		throw new Error("Vertex Array buffer not supported setFloat32Data");
	}
}