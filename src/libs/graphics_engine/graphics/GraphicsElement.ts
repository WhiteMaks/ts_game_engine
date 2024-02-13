import {IGraphicsContext} from "../renderer/IGraphicsContext";
import {GraphicsContextFactory} from "../factories/GraphicsContextFactory";

/**
 * Класс для создания нового графического элемента и взаимодействия с ним
 */
export class GraphicsElement {

	/**
	 * Canvas вэб элемент
	 * @private
	 */
	private readonly canvasElement: HTMLCanvasElement;
	/**
	 * Родительский элемент (в который необходимо встроить canvas)
	 * @private
	 */
	private readonly parentElement: HTMLElement;
	/**
	 * Графический контекст
	 * @private
	 */
	private readonly graphicsContext: IGraphicsContext;

	/**
	 * Конструктор для создания объекта графического элемента в родительском элементе
	 * @param parentElement родительский элемент
	 */
	public constructor(parentElement: HTMLElement) {
		this.parentElement = parentElement;

		this.canvasElement = document.createElement("canvas"); //создание вэб элемента canvas
		this.canvasElement.style.display = "block";
		this.canvasElement.style.width = "100%";
		this.canvasElement.style.height = "100%";
		//запрет на получение контекст меню при нажатии на правую кнопку мыши, так как права кнопка мыши может быть использована для вращения камерой
		this.canvasElement.oncontextmenu = function () {
			return false
		};

		this.graphicsContext = GraphicsContextFactory.createContext(this.canvasElement);
	}

	/**
	 * Проверка на то что графического элемента уже не существует
	 */
	public notExist(): boolean {
		return this.canvasElement.offsetParent == null;
	}

	/**
	 * Инициализация графического элемента
	 */
	public init(): void {
		this.embedToElement();

		this.graphicsContext.init();
	}

	/**
	 * Отрисовка графического элемента
	 */
	public render(): void {

	}

	/**
	 * Получение объекта графического контекста
	 */
	public getGraphicsContext(): IGraphicsContext {
		return this.graphicsContext;
	}

	/**
	 * Получение ширины графического элемента
	 */
	public getWidth(): number {
		return this.canvasElement.width;
	}

	/**
	 * Получение высоты графического элемента
	 */
	public getHeight(): number {
		return this.canvasElement.height;
	}

	/**
	 * Обновление графического элемента
	 */
	public update(): void {

	}

	/**
	 * Уничтожение графического элемента
	 */
	public destroy(): void {
		this.canvasElement.remove();
	}

	public getCanvasElement(): HTMLCanvasElement {
		return this.canvasElement;
	}

	/**
	 * Встраивание графического элемента (canvas) в родительский элемент
	 * @private
	 */
	private embedToElement(): void {
		this.parentElement.append(this.canvasElement); //встраивание canvas элемента внутрь родительского

		this.resize(); //заполнение canvas элемента под размер родительского
	}

	/**
	 * Обновление области просмотра
	 * @private
	 */
	private updateViewport() {
		this.graphicsContext.setViewport(
			0,
			0,
			this.canvasElement.width,
			this.canvasElement.height
		);
	}

	/**
	 * Обновление размеров canvas элемента
	 */
	public resize(): void {
		this.canvasElement.width = this.parentElement.offsetWidth; //задание длины для canvas элемента таким же как у родительского, таким образом canvas всегда будет занимать все пространство родительского элемента
		this.canvasElement.height = this.parentElement.offsetHeight; //задание высоты для canvas элемента таким же как у родительского, таким образом canvas всегда будет занимать все пространство родительского элемента

		this.updateViewport();
	}
}