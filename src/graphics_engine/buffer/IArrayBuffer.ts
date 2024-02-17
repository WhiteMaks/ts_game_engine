import {IBuffer} from "./IBuffer";

export interface IArrayBuffer extends IBuffer {

	addVertexBuffer(buffer: IBuffer): void;

	setIndexBuffer(buffer: IBuffer): void;

	getVertexBuffers(): IBuffer[];

	getIndexBuffer(): IBuffer;

}