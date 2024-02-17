import {NumberType} from "../support/NumberType";

export enum ShaderDataType {
	FLOAT_1 = NumberType.FLOAT.valueOf(),
	FLOAT_2 = NumberType.FLOAT.valueOf() * 2,
	FLOAT_3 = NumberType.FLOAT.valueOf() * 3,
	FLOAT_4 = NumberType.FLOAT.valueOf() * 4,
	INT_1 = NumberType.INT.valueOf(),
	INT_2 = NumberType.INT.valueOf() * 2,
	INT_3 = NumberType.INT.valueOf() * 3,
	INT_4 = NumberType.INT.valueOf() * 4,
}

export function getComponentCountFromShaderDataType(type: ShaderDataType): number {
	switch (type) {
		case ShaderDataType.FLOAT_1: return 1;
		case ShaderDataType.FLOAT_2: return 2;
		case ShaderDataType.FLOAT_3: return 3;
		case ShaderDataType.FLOAT_4: return 4;
		case ShaderDataType.INT_1: return 1;
		case ShaderDataType.INT_2: return 2;
		case ShaderDataType.INT_3: return 3;
		case ShaderDataType.INT_4: return 4;
	}

	throw new Error("ShaderDataType [ " + type + " ] not supported");
}