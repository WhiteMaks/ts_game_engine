export interface IMatrix<EXTENSION extends IMatrix<any>> {

	/**
	 * Получить матрицу в виде массива
	 */
	getArray(): number[];

	/**
	 * Умножить матрицу на матрицу
	 */
	multiplyMatrix(matrix: EXTENSION): EXTENSION;

	/**
	 * Найти определитель матрицы
	 */
	determinant(): number;

	/**
	 * Транспонировать матрицу
	 */
	transpose(): EXTENSION;
}