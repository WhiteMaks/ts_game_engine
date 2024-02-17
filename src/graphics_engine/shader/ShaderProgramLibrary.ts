import {IShaderProgram} from "./IShaderProgram";
import {Cleanable} from "../support/Cleanable";

export class ShaderProgramLibrary implements Cleanable {
	private readonly shaderPrograms: Map<string, IShaderProgram>;

	public constructor() {
		this.shaderPrograms = new Map<string, IShaderProgram>();
	}

	public add(shaderProgram: IShaderProgram): void {
		this.shaderPrograms.set(shaderProgram.getName(), shaderProgram);
	}

	public get(name: string): IShaderProgram {
		const result = this.shaderPrograms.get(name);
		if (!result) {
			throw new Error("Shader program by name [ " + name + " ] not found in library");
		}
		return result;
	}

	public clean(): void {
		this.shaderPrograms.clear();
	}
}