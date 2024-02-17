import {IMatrix} from "../IMatrix";
import {Vector4} from "./Vector4";

export class Matrix4 implements IMatrix<Matrix4> {
	private readonly arrayMatrix: number[];

	public constructor(arrayMatrix: number[]) {
		this.arrayMatrix = arrayMatrix;
	}

	/**
	 * Единичная матрица 4x4
	 */
	public static identity(): Matrix4 {
		return new Matrix4([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);
	}

	public getArray(): number[] {
		return this.arrayMatrix;
	}

	public multiplyMatrix(matrix: Matrix4): Matrix4 {
		const a11 = this.a11() * matrix.a11() + this.a12() * matrix.a21() + this.a13() * matrix.a31() + this.a14() * matrix.a41();
		const a12 = this.a11() * matrix.a12() + this.a12() * matrix.a22() + this.a13() * matrix.a32() + this.a14() * matrix.a42();
		const a13 = this.a11() * matrix.a13() + this.a12() * matrix.a23() + this.a13() * matrix.a33() + this.a14() * matrix.a43();
		const a14 = this.a11() * matrix.a14() + this.a12() * matrix.a24() + this.a13() * matrix.a34() + this.a14() * matrix.a44();

		const a21 = this.a21() * matrix.a11() + this.a22() * matrix.a21() + this.a23() * matrix.a31() + this.a24() * matrix.a41();
		const a22 = this.a21() * matrix.a12() + this.a22() * matrix.a22() + this.a23() * matrix.a32() + this.a24() * matrix.a42();
		const a23 = this.a21() * matrix.a13() + this.a22() * matrix.a23() + this.a23() * matrix.a33() + this.a24() * matrix.a43();
		const a24 = this.a21() * matrix.a14() + this.a22() * matrix.a24() + this.a23() * matrix.a34() + this.a24() * matrix.a44();

		const a31 = this.a31() * matrix.a11() + this.a32() * matrix.a21() + this.a33() * matrix.a31() + this.a34() * matrix.a41();
		const a32 = this.a31() * matrix.a12() + this.a32() * matrix.a22() + this.a33() * matrix.a32() + this.a34() * matrix.a42();
		const a33 = this.a31() * matrix.a13() + this.a32() * matrix.a23() + this.a33() * matrix.a33() + this.a34() * matrix.a43();
		const a34 = this.a31() * matrix.a14() + this.a32() * matrix.a24() + this.a33() * matrix.a34() + this.a34() * matrix.a44();

		const a41 = this.a41() * matrix.a11() + this.a42() * matrix.a21() + this.a43() * matrix.a31() + this.a44() * matrix.a41();
		const a42 = this.a41() * matrix.a12() + this.a42() * matrix.a22() + this.a43() * matrix.a32() + this.a44() * matrix.a42();
		const a43 = this.a41() * matrix.a13() + this.a42() * matrix.a23() + this.a43() * matrix.a33() + this.a44() * matrix.a43();
		const a44 = this.a41() * matrix.a14() + this.a42() * matrix.a24() + this.a43() * matrix.a34() + this.a44() * matrix.a44();

		return new Matrix4([
			a11, a12, a13, a14,
			a21, a22, a23, a24,
			a31, a32, a33, a34,
			a41, a42, a43, a44,
		]);
	}

	public multiplyVector(vector: Vector4): Vector4 {
		return new Vector4(
			this.a11() * vector.getX() + this.a12() * vector.getY() + this.a13() * vector.getZ() + this.a14() * vector.getW(),
			this.a21() * vector.getX() + this.a22() * vector.getY() + this.a23() * vector.getZ() + this.a24() * vector.getW(),
			this.a31() * vector.getX() + this.a32() * vector.getY() + this.a33() * vector.getZ() + this.a34() * vector.getW(),
			this.a41() * vector.getX() + this.a42() * vector.getY() + this.a43() * vector.getZ() + this.a44() * vector.getW()
		);
	}

	public a11(): number {
		return this.arrayMatrix[0];
	}

	public a12(): number {
		return this.arrayMatrix[1];
	}

	public a13(): number {
		return this.arrayMatrix[2];
	}

	public a14(): number {
		return this.arrayMatrix[3];
	}

	public a21(): number {
		return this.arrayMatrix[4];
	}

	public a22(): number {
		return this.arrayMatrix[5];
	}

	public a23(): number {
		return this.arrayMatrix[6];
	}

	public a24(): number {
		return this.arrayMatrix[7];
	}

	public a31(): number {
		return this.arrayMatrix[8];
	}

	public a32(): number {
		return this.arrayMatrix[9];
	}

	public a33(): number {
		return this.arrayMatrix[10];
	}

	public a34(): number {
		return this.arrayMatrix[11];
	}

	public a41(): number {
		return this.arrayMatrix[12];
	}

	public a42(): number {
		return this.arrayMatrix[13];
	}

	public a43(): number {
		return this.arrayMatrix[14];
	}

	public a44(): number {
		return this.arrayMatrix[15];
	}

	public transpose(): Matrix4 {
		return new Matrix4([
			this.a11(), this.a21(), this.a31(), this.a41(),
			this.a12(), this.a22(), this.a32(), this.a42(),
			this.a13(), this.a23(), this.a33(), this.a43(),
			this.a14(), this.a24(), this.a34(), this.a44()
		]);
	}

	/*
		       | a11  a12  a13  a14 |         | a22  a23  a24 |         | a21  a23  a24 |         | a21  a22  a24 |         | a21  a22  a23 |
		detA = | a21  a22  a23  a24 | = a11 * | a32  a33  a34 | - a12 * | a31  a33  a34 | + a13 * | a31  a32  a34 | - a14 * | a31  a32  a33 | = a11 * (a22 * | a33  a34 | - a23 * | a32  a34 | + a24 * | a32  a33 |) - a12 * (a21 * | a33  a34 | - a23 * | a31  a34 | + a24 * | a31  a33 |) + a13 * (a21 * | a32  a34 | - a22 * | a31  a34 | + a24 * | a31  a32 |) - a14 * (a21 * | a32  a33 | - a22 * | a31  a33 | + a23 * | a31  a32 |) =
		       | a31  a32  a33  a34 |         | a42  a43  a44 |         | a41  a43  a44 |         | a41  a42  a44 |         | a41  a42  a43 |                | a43  a44 |         | a42  a44 |         | a42  a43 |                 | a43  a44 |         | a41  a44 |         | a41  a43 |                 | a42  a44 |         | a41  a44 |         | a41  a42 |                 | a42  a43 |         | a41  a43 |         | a41  a42 |
		       | a41  a42  a43  a44 |

		     = a11 * (a22 * (a33 * a44 - a43 * a34) - a23 * (a32 * a44 - a42 * a34) + a24 * (a32 * a43 - a42 * a33)) - a12 * (a21 * (a33 * a44 - a43 * a34) - a23 * (a31 * a44 - a41 * a34) + a24 * (a31 * a43 - a41 * a33)) + a13 * (a21 * (a32 * a44 - a42 * a34) - a22 * (a31 * a44 - a41 * a34) + a24 * (a31 * a42 - a41 * a32)) - a14 * (a21 * (a32 * a43 - a42 * a33) - a22 * (a31 * a43 - a41 * a33) + a23 * (a31 * a42 - a41 * a32)) =
		     = a11 * (a22 * a33a44_43a34 - a23 * a32a44_a42a34 + a24 * a32a43_a42a33) - a12 * (a21 * a33a44_43a34 - a23 * a31a44_a41a34 + a24 * a31a43_a41a33) + a13 * (a21 * a32a44_a42a34 - a22 * a31a44_a41a34 + a24 * a31a42_a41a32) - a14 * (a21 * a32a43_a42a33 - a22 * a31a43_a41a33 + a23 * a31a42_a41a32)
	 */
	public determinant(): number {
		const a33a44_43a34 = this.a33() * this.a44() - this.a43() * this.a34();
		const a32a44_a42a34 = this.a32() * this.a44() - this.a42() * this.a34();
		const a32a43_a42a33 = this.a32() * this.a43() - this.a42() * this.a33();
		const a31a44_a41a34 = this.a31() * this.a44() - this.a41() * this.a34();
		const a31a43_a41a33 = this.a31() * this.a43() - this.a41() * this.a33();
		const a31a42_a41a32 = this.a31() * this.a42() - this.a41() * this.a32();

		return this.a11() * (this.a22() * a33a44_43a34 - this.a23() * a32a44_a42a34 + this.a24() * a32a43_a42a33) - this.a12() * (this.a21() * a33a44_43a34 - this.a23() * a31a44_a41a34 + this.a24() * a31a43_a41a33) + this.a13() * (this.a21() * a32a44_a42a34 - this.a22() * a31a44_a41a34 + this.a24() * a31a42_a41a32) - this.a14() * (this.a21() * a32a43_a42a33 - this.a22() * a31a43_a41a33 + this.a23() * a31a42_a41a32);
	}
}