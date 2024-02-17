import {Cleanable} from "../support/Cleanable";

export interface ITexture extends Cleanable {

	bind(slot: number): void;

	unbind(): void;

	equal(other: ITexture): boolean;

	getWidth(): number;

	getHeight(): number;

	getId(): string;

	getImage(): HTMLImageElement;

}