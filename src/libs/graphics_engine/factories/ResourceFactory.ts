import {IGraphicsContext} from "../renderer/IGraphicsContext";
import {ITexture} from "../resource/ITexture";
import {Renderer} from "../renderer/Renderer";
import {RendererAPI} from "../renderer/RendererAPI";
import {WebGLContext} from "../api/gl/renderer/WebGLContext";
import {WebGL2DTexture} from "../api/gl/resource/WebGL2DTexture";
import {Sprite2D} from "../resource/Sprite2D";
import {Vector2} from "../maths/impl/Vector2";

export class ResourceFactory {

	public static create2DFullWhiteTexture(graphicsContext: IGraphicsContext): ITexture {
		const image = new Image(1, 1);
		return ResourceFactory.create2DTexture(graphicsContext, image, 4, true);
	}

	public static create2DTexture(graphicsContext: IGraphicsContext, image: HTMLImageElement, channels: number, isEmpty: boolean = false): ITexture {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGL2DTexture(gl, image, channels, isEmpty)
			}
		}
	}

	public static createSprite2D(texture: ITexture, coords: Vector2, textureSize: Vector2, size: Vector2 = new Vector2(1, 1)): Sprite2D {
		const result = new Sprite2D(texture);

		const offset = 0.5; //чтобы не было пересечения смежных текстур

		if (texture.getWidth() === 0 || texture.getHeight() === 0) {
			const listener = () => {
				ResourceFactory.updateSpriteCoordinates(result, coords, textureSize, size, texture, offset);

				texture.getImage().removeEventListener("load", listener);
			}
			texture.getImage().addEventListener("load", listener);
		} else {
			ResourceFactory.updateSpriteCoordinates(result, coords, textureSize, size, texture, offset);
		}

		return result;
	}

	private static updateSpriteCoordinates(sprite: Sprite2D, coords: Vector2, textureSize: Vector2, size: Vector2, texture: ITexture, offset: number): void {
		const bottomLeftX = (coords.getX() * textureSize.getX() + offset) / texture.getWidth();
		const bottomLeftY = (coords.getY() * textureSize.getY() + offset) / texture.getHeight();
		const bottomLeft = new Vector2(bottomLeftX, bottomLeftY);

		const topRightX = ((coords.getX() + size.getX()) * textureSize.getX() - offset) / texture.getWidth();
		const topRightY = ((coords.getY() + size.getY()) * textureSize.getY() - offset) / texture.getHeight();
		const topRight = new Vector2(topRightX, topRightY);

		sprite.updateCoordinates(bottomLeft, topRight);
	}
}