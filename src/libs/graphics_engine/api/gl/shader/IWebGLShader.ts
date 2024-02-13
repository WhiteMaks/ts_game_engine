import {Cleanable} from "../../../support/Cleanable";

export interface IWebGLShader extends Cleanable {

	getShader(): WebGLShader;

}