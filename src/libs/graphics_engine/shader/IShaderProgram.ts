import {Cleanable} from "../support/Cleanable";
import {Vector4} from "../maths/impl/Vector4";
import {Vector3} from "../maths/impl/Vector3";
import {Matrix4} from "../maths/impl/Matrix4";

export interface IShaderProgram extends Cleanable {

	getName(): string;

	bind(): void;

	unbind(): void;

	setVector3f(name: string, vector: Vector3): void;

	setVector4f(name: string, vector: Vector4): void;

	setValue1i(name: string, value: number): void;

	setValueArrayI(name: string, values: number[]): void;

	setMatrix4f(name: string, matrix: Matrix4): void;

}