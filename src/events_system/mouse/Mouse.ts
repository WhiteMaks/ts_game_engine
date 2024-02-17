import { Queue } from "../structures/Queue";
import { BaseQueue } from "../structures/impl/BaseQueue";
import { MouseEventType } from "./MouseEventType";
import { MouseEvent } from "./MouseEvent";

/**
 * Класс для работы с событиями мышки
 */
export class Mouse {
	/**
	 * Размер буфера хранения событий мышки
	 * @private
	 */
	private readonly bufferSize: number;

	/**
	 * Буфер для хранения событий мышки
	 * @private
	 */
	private readonly buffer: Queue<MouseEvent>;

	/**
	 * Направления мышки по оси X
	 * @private
	 */
	private directionX: number;
	/**
	 * Направления мышки по оси Y
	 * @private
	 */
	private directionY: number;
	/**
	 * Позиция мышки по оси X
	 * @private
	 */
	private positionX: number;
	/**
	 * Позиция мышки по оси Y
	 * @private
	 */
	private positionY: number;

	/**
	 * Предыдущая позиция X
	 * @private
	 */
	private previousPositionX: number;
	/**
	 * Предыдущая позиция Y
	 * @private
	 */
	private previousPositionY: number;

	/**
	 * Статус нажатия левой кнопки мышки
	 * @private
	 */
	private leftKeyIsPressed: boolean;
	/**
	 * Статус нажатия правой кнопки мышки
	 * @private
	 */
	private rightKeyIsPressed: boolean;
	/**
	 * Статус для идентификации того, что мышка находиться в фокусе
	 * @private
	 */
	private inFocus: boolean;

	/**
	 * Конструктор для создания объекта мышки
	 */
	public constructor(bufferSize: number) {
		this.bufferSize = bufferSize;

		//инициализация буфера хранения событий мышки
		this.buffer = new BaseQueue();

		//инициализация направления мышки
		this.directionX = 0;
		this.directionY = 0;

		this.positionX = 0; //инициализация начального положения мышки по оси X
		this.positionY = 0; //инициализация начального положения мышки по оси Y

		this.previousPositionX = 0; //инициализация предыдущего положения мышки по оси X
		this.previousPositionY = 0; //инициализация предыдущего положения мышки по оси Y

		this.leftKeyIsPressed = false; //инициализация статуса нажатия левой кнопки мышки
		this.rightKeyIsPressed = false; //инициализация статуса нажатия правой кнопки мышки
		this.inFocus = false; //инициализация статуса нахождения в графическом элементе
	}

	/**
	 * Получение позиции мышки по оси X
	 */
	public getPositionX(): number {
		return this.positionX;
	}

	/**
	 * Получение позиции мышки по оси Y
	 */
	public getPositionY(): number {
		return this.positionY;
	}

	/**
	 * Получение статуса идентификатора нахождения в фокусе
	 */
	public isInFocus(): boolean {
		return this.inFocus;
	}

	/**
	 * Получение статуса нажатия левой кнопки мышки
	 */
	public isLeftKeyPressed(): boolean {
		return this.leftKeyIsPressed;
	}

	/**
	 * Получение статуса нажатия правой кнопки мышки
	 */
	public isRightKeyPressed(): boolean {
		return this.rightKeyIsPressed;
	}

	/**
	 * Получение из буфера событие от мышки
	 */
	public read(): MouseEvent {
		//если в буфере есть записи, то возвращается первая из очереди
		if (this.buffer.size() > 0) {
			return this.buffer.poll();
		}
		return this.generateEvent(MouseEventType.INVALID);
	}

	/**
	 * Отчистка буфера событий мышки
	 */
	public flush(): void {
		this.buffer.flush();
	}

	/**
	 * Сохранение события перемещения мышки
	 * @param newPositionX новая координата мышки по оси X
	 * @param newPositionY новая координата мышки по оси Y
	 */
	public onMouseMove(newPositionX: number, newPositionY: number): void {
		this.positionX = newPositionX; //сохранение новой координаты по оси X
		this.positionY = newPositionY; //сохранение новой координаты по оси Y

		this.buffer.push(this.generateEvent(MouseEventType.MOVE));

		this.trimBuffer();
	}

	/**
	 * Сохранение события выхода мышки за пределы фокуса
	 */
	public onMouseLeave(): void {
		this.inFocus = false; //переключения статуса

		this.buffer.push(this.generateEvent(MouseEventType.LEAVE));

		this.trimBuffer();
	}

	/**
	 * Сохранение события перемещения мышки внутрь фокуса
	 */
	public onMouseEnter(): void {
		this.inFocus = true; //переключения статуса

		this.buffer.push(this.generateEvent(MouseEventType.ENTER));

		this.trimBuffer();
	}

	/**
	 * Сохранение события нажатия на левую кнопку мыши
	 * @param positionX позиция нажатия кнопки мыши по оси X
	 * @param positionY позиция нажатия кнопки мыши по оси Y
	 */
	public onLeftKeyPressed(positionX: number, positionY: number): void {
		this.leftKeyIsPressed = true;

		this.buffer.push(this.generateEvent(MouseEventType.L_PRESS));

		this.trimBuffer();
	}

	/**
	 * Сохранение события отжатия левой кнопки мыши
	 * @param positionX позиция отжатия кнопки мыши по оси X
	 * @param positionY позиция отжатия кнопки мыши по оси Y
	 */
	public onLeftKeyReleased(positionX: number, positionY: number): void {
		this.leftKeyIsPressed = false;

		this.buffer.push(this.generateEvent(MouseEventType.L_RELEASE));

		this.trimBuffer();
	}

	/**
	 * Сохранение события нажатия на правую кнопку мыши
	 * @param positionX позиция нажатия кнопки мыши по оси X
	 * @param positionY позиция нажатия кнопки мыши по оси Y
	 */
	public onRightKeyPressed(positionX: number, positionY: number): void {
		this.rightKeyIsPressed = true;

		this.buffer.push(this.generateEvent(MouseEventType.R_PRESS));

		this.trimBuffer();
	}

	/**
	 * Сохранение события отжатия правой кнопки мыши
	 * @param positionX позиция отжатия кнопки мыши по оси X
	 * @param positionY позиция отжатия кнопки мыши по оси Y
	 */
	public onRightKeyReleased(positionX: number, positionY: number): void {
		this.rightKeyIsPressed = false;

		this.buffer.push(this.generateEvent(MouseEventType.R_RELEASE));

		this.trimBuffer();
	}

	/**
	 * Сохранение события прокрутки барабанчика вверх
	 * @param positionX позиция прокрутки мыши по оси X
	 * @param positionY позиция прокрутки мыши по оси Y
	 */
	public onWheelUp(positionX: number, positionY: number): void {
		this.buffer.push(this.generateEvent(MouseEventType.WHEEL_UP));

		this.trimBuffer();
	}

	/**
	 * Сохранение события прокрутки барабанчика вниз
	 * @param positionX позиция прокрутки мыши по оси X
	 * @param positionY позиция прокрутки мыши по оси Y
	 */
	public onWheelDown(positionX: number, positionY: number): void {
		this.buffer.push(this.generateEvent(MouseEventType.WHEEL_DOWN));

		this.trimBuffer();
	}

	/**
	 * Обновление вектора направления мышки
	 */
	public updateDirection(): void {
		this.directionX = 0;
		this.directionY = 0;

		if (this.previousPositionX > 0 && this.previousPositionY > 0) {
			this.directionX = this.positionY - this.previousPositionY;
			this.directionY = this.positionX - this.previousPositionX;
		}

		this.previousPositionX = this.positionX;
		this.previousPositionY = this.positionY;
	}

	/**
	 * Получение направления мышки по оси X
	 */
	public getDirectionX(): number {
		return this.directionX;
	}

	/**
	 * Получение направления мышки по оси Y
	 */
	public getDirectionY(): number {
		return this.directionY;
	}

	/**
	 * Удаление устаревших записей в буфере событий мышки
	 * @private
	 */
	private trimBuffer(): void {
		//пока в буфере больше записей, чем в значении bufferSize, берем первый из очереди
		while (this.buffer.size() > this.bufferSize) {
			this.buffer.poll();
		}
	}

	private generateEvent(type: MouseEventType): MouseEvent {
		return new MouseEvent(type, this.leftKeyIsPressed, this.rightKeyIsPressed, this.positionX, this.positionY);
	}

}