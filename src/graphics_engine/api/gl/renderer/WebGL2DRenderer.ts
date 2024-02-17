import {IArrayBuffer} from "../../../buffer/IArrayBuffer";
import {WebGLExt} from "../wrappers/WebGLExt";
import {Vector4} from "../../../maths/impl/Vector4";
import {Renderer2D} from "../../../renderer/Renderer2D";

export class WebGL2DRenderer extends Renderer2D {
	private readonly gl: WebGLExt;

	public constructor(gl: WebGLExt) {
		super();

		this.gl = gl;
	}

	public clear(): void {
		this.gl.clearColorBuffer();
		this.gl.clearDepthBuffer();
	}

	public setClearColor(color: Vector4): void {
		this.gl.clearColor(color.getX(), color.getY(), color.getZ(), color.getW());
	}

	protected drawTrianglesImpl(arrayBuffer: IArrayBuffer, indexCount: number = 0): void {
		const count = indexCount === 0 ? arrayBuffer.getCount() : indexCount;
		this.gl.drawTriangleElementsUshort(count, 0);
	}

	protected initImpl(): void {
		this.gl.enableDepthTest(); //включение проверки удаленности объектов
		this.gl.enableBlend(); //включение смешивания пикселей
		this.gl.blendFuncSrcAlphaOneMinusSrcAlpha(); //включение прозрачности
	}
}