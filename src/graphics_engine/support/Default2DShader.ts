export class Default2DShader {

	public static getVertexShader(): string {
		return `#version 300 es
				layout (location = 0) in vec4 a_Position;
				layout (location = 1) in vec4 a_Color;
				layout (location = 2) in vec2 a_TextCoord;
				layout (location = 3) in float a_TextIndex;
				layout (location = 4) in vec3 a_Translate;
				layout (location = 5) in vec3 a_Rotation;
				layout (location = 6) in vec3 a_Scale;
				
				out vec4 v_Color;
				out vec2 v_TextCoord;
				out float v_TextIndex;
				
				uniform mat4 u_ViewProjectionMatrix;
				
				mat4 getWorldMatrix() {
					mat4 translationMatrix = mat4(1.0);
					
					translationMatrix[3] = vec4(a_Translate, 1.0);
				
					mat4 rotationMatrixZ = mat4(
						cos(a_Rotation.z), -sin(a_Rotation.z), 0.0, 0.0,
						sin(a_Rotation.z), cos(a_Rotation.z), 0.0, 0.0,
						0.0, 0.0, 1.0, 0.0,
						0.0, 0.0, 0.0, 1.0
					);
					
					mat4 scaleMatrix = mat4(
						a_Scale.x, 0.0, 0.0, 0.0,
						0.0, a_Scale.y, 0.0, 0.0,
						0.0, 0.0, a_Scale.z, 0.0,
						0.0, 0.0, 0.0, 1.0
					);
				
					return translationMatrix * rotationMatrixZ * scaleMatrix;
				}
				
				void main() {
					v_TextCoord = vec2(a_TextCoord.x, 1.0f - a_TextCoord.y);
					v_TextIndex = a_TextIndex;
					v_Color = a_Color;
					
					mat4 worldMatrix = getWorldMatrix();
					gl_Position = u_ViewProjectionMatrix * worldMatrix * a_Position;
				}`;
	}

	public static getFragmentShader(): string {
		return `#version 300 es
				precision lowp float; //модификатор точности для фрагментного шейдера
				
				in vec4 v_Color;
				in vec2 v_TextCoord;
				in float v_TextIndex;
				
				uniform sampler2D u_Textures[16];
				
				out vec4 fragColor; //выходная переменная итогового цвета
				
				vec4 getColorByTexture() {
					int index = int(v_TextIndex);
					
					//amd, intel, nvidia support
					switch (index) {
						case 0: return texture(u_Textures[0], v_TextCoord);
						case 1: return texture(u_Textures[1], v_TextCoord);
						case 2: return texture(u_Textures[2], v_TextCoord);
						case 3: return texture(u_Textures[3], v_TextCoord);
						case 4: return texture(u_Textures[4], v_TextCoord);
						case 5: return texture(u_Textures[5], v_TextCoord);
						case 6: return texture(u_Textures[6], v_TextCoord);
						case 7: return texture(u_Textures[7], v_TextCoord);
						case 8: return texture(u_Textures[8], v_TextCoord);
						case 9: return texture(u_Textures[9], v_TextCoord);
						case 10: return texture(u_Textures[10], v_TextCoord);
						case 11: return texture(u_Textures[11], v_TextCoord);
						case 12: return texture(u_Textures[12], v_TextCoord);
						case 13: return texture(u_Textures[13], v_TextCoord);
						case 14: return texture(u_Textures[14], v_TextCoord);
						case 15: return texture(u_Textures[15], v_TextCoord);
					};
					
					return vec4(1.0, 1.0, 1.0, 1.0);
				}
				
				void main() {
					fragColor = v_Color * getColorByTexture();
				}`;
	}

}