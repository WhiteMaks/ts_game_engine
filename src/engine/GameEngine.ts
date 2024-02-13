import {ILayerStack} from "./layer/ILayerStack";
import {BaseLayer} from "./layer/impl/BaseLayer";
import {BaseLayerStack} from "./layer/impl/BaseLayerStack";
import {EventSystem} from "#events_system/namespace/event_system";
import {GraphicsEngine} from "#graphics_engine/namespace/graphics_engine";

export class GameEngine extends GraphicsEngine.GraphicsApplication {
	public static renderer2D: GraphicsEngine.Renderer2D;

	private readonly shaderProgramLibrary: GraphicsEngine.ShaderProgramLibrary;
	private readonly layerStack: ILayerStack<BaseLayer>;
	private readonly mouse: EventSystem.Mouse;
	private readonly keyboard: EventSystem.Keyboard;
	private readonly element: EventSystem.Element;
	private readonly time: GraphicsEngine.Time;

	public constructor(parentElement: HTMLElement, api: GraphicsEngine.RendererAPI = GraphicsEngine.RendererAPI.WEB_GL) {
		super(parentElement);

		GraphicsEngine.Renderer.setAPI(api);

		this.shaderProgramLibrary = new GraphicsEngine.ShaderProgramLibrary();
		this.layerStack = new BaseLayerStack();
		this.element = new EventSystem.Element(16);
		this.mouse = new EventSystem.Mouse(16);
		this.keyboard = new EventSystem.Keyboard(16);
		this.time = new GraphicsEngine.Time();

		EventSystem.Input.instance = new EventSystem.BaseInput(this.mouse, this.keyboard);
	}

	protected init(): void {
		super.init();

		const graphicsElement = this.getGraphicsElement();
		this.element.onResize(graphicsElement.getWidth(), graphicsElement.getHeight());

		const canvasElement = graphicsElement.getCanvasElement();
		this.addMouseListener(canvasElement);
		this.addKeyboardListener(canvasElement);
		this.addElementListener(graphicsElement);
	}

	protected input() {
		super.input();

		const layers = this.layerStack.getLayers()
			.reverse();

		const mouseEvent = this.mouse.read();
		if (mouseEvent.isValid()) {
			for (let layer of layers) {
				layer.mouseInput(mouseEvent);
			}
		}

		const keyboardEvent = this.keyboard.readKey();
		if (keyboardEvent.isValid()) {
			for (let layer of layers) {
				layer.keyboardInput(keyboardEvent);
			}
		}

		const elementEvent = this.element.read();
		if (elementEvent.isValid()) {
			for (let layer of layers) {
				layer.elementInput(elementEvent);
			}
		}
	}

	protected update(timestamp: number) {
		super.update(timestamp);

		this.time.update(timestamp);

		const layers = this.layerStack.getLayers();
		for (let layer of layers) {
			layer.update(this.time);
		}

		this.mouse.updateDirection();
	}

	protected render(): void {
		const layers = this.layerStack.getLayers();
		for (let layer of layers) {
			layer.render();
		}
	}

	protected clean(): void {
		this.mouse.flush();
		this.keyboard.flush();
		this.element.flush();

		const layers = this.layerStack.getLayers();
		for (let layer of layers) {
			layer.clean();
		}

		this.shaderProgramLibrary.clean();

		GameEngine.renderer2D.clean();

		super.clean();
	}

	public init2DRenderer(shaderProgram: GraphicsEngine.IShaderProgram | null = null): void {
		const context = this.getContext();

		if (shaderProgram === null) {
			shaderProgram = GraphicsEngine.ShaderProgramFactory.createProgram(context, "2D shader program", GraphicsEngine.Default2DShader.getVertexShader(), GraphicsEngine.Default2DShader.getFragmentShader());
		}
		this.saveShaderProgram(shaderProgram);

		GameEngine.renderer2D = GraphicsEngine.RendererFactory.create2D(context);
		GameEngine.renderer2D.init(context, shaderProgram);
	}

	public saveShaderProgram(shaderProgram: GraphicsEngine.IShaderProgram): void {
		this.shaderProgramLibrary.add(shaderProgram);
	}

	public pushLayer(layer: BaseLayer): void {
		this.layerStack.push(layer);
	}

	public pushOverlayLayer(layer: BaseLayer): void {
		this.layerStack.pushOverlay(layer);
	}

	public getContext(): GraphicsEngine.IGraphicsContext {
		return this.getGraphicsElement().getGraphicsContext();
	}

	private addMouseListener(canvasElement: HTMLCanvasElement): void {
		canvasElement.addEventListener(
			"mousedown",
			(event) => {
				if (event.button === 0) {
					this.mouse.onLeftKeyPressed(
						event.offsetX,
						event.offsetY
					);
					return;
				}

				if (event.button === 2) {
					this.mouse.onRightKeyPressed(
						event.offsetX,
						event.offsetY
					);
					return;
				}
			});

		canvasElement.addEventListener(
			"mouseup",
			(event) => {
				if (event.button === 0) {
					this.mouse.onLeftKeyReleased(
						event.offsetX,
						event.offsetY
					);
					return;
				}

				if (event.button === 2) {
					this.mouse.onRightKeyReleased(
						event.offsetX,
						event.offsetY
					);
					return;
				}
			});

		canvasElement.addEventListener(
			'mousemove',
			(event) =>
				this.mouse.onMouseMove(
					event.offsetX,
					event.offsetY
				)
		);

		canvasElement.addEventListener(
			'mouseenter',
			() =>
				this.mouse.onMouseEnter()
		);

		canvasElement.addEventListener(
			'mouseleave',
			() =>
				this.mouse.onMouseLeave()
		);
	}

	private addKeyboardListener(canvasElement: HTMLCanvasElement): void {
		document.addEventListener(
			"keydown",
			(event) =>
				this.keyboard.onKeyPressed(event.code),
			false
		);

		document.addEventListener(
			"keyup",
			(event) =>
				this.keyboard.onKeyReleased(event.code),
			false
		);

		document.addEventListener(
			"keypress",
			(event) =>
				this.keyboard.onChar(event.key),
			false
		);
	}

	private addElementListener(graphicsElement: GraphicsEngine.GraphicsElement): void {
		window.addEventListener(
			"resize",
			() => {
				graphicsElement.resize();
				this.element.onResize(graphicsElement.getWidth(), graphicsElement.getHeight());
			}
		);
	}
}