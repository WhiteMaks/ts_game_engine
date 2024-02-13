import {GraphicsElement} from "./GraphicsElement";

/**
 * Класс графического приложения
 */
export class GraphicsApplication {
	/**
	 * Объект для работы с графическим элементом
	 * @private
	 */
	private readonly graphicElement: GraphicsElement;

	/**
	 * Идентификатор фрейма анимации
	 * @private
	 */
	private frame: number;

	private shouldBeClosed: boolean;

	/**
	 * Конструктор для создания объекта графического приложения
	 */
	public constructor(parentElement: HTMLElement) {
		this.graphicElement = new GraphicsElement(parentElement);

		this.frame = 0;
		this.shouldBeClosed = false;
	}

	/**
	 * Запуск графического приложения
	 */
	public start(): void {
		this.init();

		this.startNewFrame();
	}

	/**
	 * Остановка графического приложения
	 */
	public stop(): void {
		this.shouldBeClosed = true;
	}

	/**
	 * Инициализация графического приложения внутри родительского вэб элемента
	 */
	protected init(): void {
		this.graphicElement.init();
	}

	/**
	 * Отправить запрос на отрисовку нового кадра
	 * @private
	 */
	private startNewFrame(): void {
		if (this.graphicElement.notExist() || this.shouldBeClosed) {
			window.cancelAnimationFrame(this.frame);
			this.clean();
			return;
		}

		this.frame = window.requestAnimationFrame(
			(timestamp: number) => this.loop(timestamp)
		);
	}

	/**
	 * Цикл рендеринга
	 * @param timestamp времени с момента старта цикла
	 * @private
	 */
	private loop(timestamp: number): void {
		this.input();
		this.update(timestamp);
		this.render();
		this.endFrame();
		this.startNewFrame();
	}

	/**
	 * Обработка ввода
	 */
	protected input(): void {

	}

	/**
	 * Обновление кадра
	 * @param timestamp времени с момента старта цикла
	 */
	protected update(timestamp: number): void {
		this.graphicElement.update();
	}

	/**
	 * Отрисовка кадра
	 */
	protected render(): void {
		this.graphicElement.render();
	}

	/**
	 * Завершить отрисовку кадра
	 * @private
	 */
	private endFrame(): void {

	}

	/**
	 * Отчистка ресурсов графического приложения
	 */
	protected clean(): void {
		this.graphicElement.destroy();
	}

	public getGraphicsElement(): GraphicsElement {
		return this.graphicElement;
	}

}