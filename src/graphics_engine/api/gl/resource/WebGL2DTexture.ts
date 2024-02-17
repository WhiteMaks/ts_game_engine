import {ITexture} from "../../../resource/ITexture";
import {WebGLExt} from "../wrappers/WebGLExt";
import {Random} from "../../../support/Random";

export class WebGL2DTexture implements ITexture {
	private readonly id: string;
	private readonly gl: WebGLExt;
	private readonly texture: WebGLTexture;
	private readonly image: HTMLImageElement;

	public constructor(gl: WebGLExt, image: HTMLImageElement, channels: number, isEmpty: boolean = false) {
		this.gl = gl;
		this.id = Random.uuid();
		this.image = image;

		this.texture = this.gl.createTexture();

		if (isEmpty) {
			this.prepareTexture();
			this.gl.texImage2DRGBAUbyteWithPixels(0, image, new Uint8Array([255, 255, 255, 255]));
			return;
		}

		const listener = () => {
			this.prepareTexture();
			if (channels === 4) {
				this.gl.texImage2DRGBAUbyte(0, image);
			}
			if (channels === 3) {
				this.gl.texImage2DRGBUbyte(0, image);
			}
			image.removeEventListener("load", listener);
		}

		image.addEventListener("load", listener);
	}

	public bind(slot: number): void {
		this.gl.activeTexture(slot);
		this.gl.bindTexture2D(this.texture);
	}

	public unbind(): void {
		this.gl.unbindTexture2D();
	}

	public clean(): void {
		this.gl.deleteTexture(this.texture);
	}

	public equal(other: ITexture): boolean {
		return this.id === other.getId();
	}

	private prepareTexture(): void {
		this.gl.bindTexture2D(this.texture);
		this.gl.tex2DParameteriMinFilterLinear();
		this.gl.tex2DParameteriMagFilterNearest();
		this.gl.tex2DParameteriWrapSClampToEdge();
		this.gl.tex2DParameteriWrapTClampToEdge();
	}

	public getHeight(): number {
		return this.image.height;
	}

	public getId(): string {
		return this.id;
	}

	public getWidth(): number {
		return this.image.width;
	}

	public getImage(): HTMLImageElement {
		return this.image;
	}

}