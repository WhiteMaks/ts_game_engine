import {Cleanable} from "../support/Cleanable";
import {BufferLayout} from "./BufferLayout";

export interface IBuffer extends Cleanable {

	/**
	 * Связать буфер
	 */
	bind(): void;

	/**
	 * Отвязать буфер
	 */
	unbind(): void;

	setLayout(layout: BufferLayout): void;

	setFloat32Data(data: Float32Array): void;

	getLayout(): BufferLayout;

	/**
	 * Количество элементов
	 */
	getCount(): number;

}