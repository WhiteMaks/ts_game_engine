import GraphicsApplication from "#graphics_engine/src/graphics/GraphicsApplication";
import ShaderProgramLibrary from "#graphics_engine/src/shader/ShaderProgramLibrary";
import Renderer from "#graphics_engine/src/renderer/Renderer";
import RendererAPI from "#graphics_engine/src/renderer/RendererAPI";
import Renderer2D from "#graphics_engine/src/renderer/Renderer2D";
import ILayerStack from "#graphics_engine/src/layers/ILayerStack";
import BaseLayer from "#graphics_engine/src/layers/impl/BaseLayer";
import MouseEvent from "#events_system/src/mouse/MouseEvent";
import KeyboardEvent from "#events_system/src/keyboard/KeyboardEvent";
import ElementEvent from "#events_system/src/element/ElementEvent";
import BaseLayerStack from "#graphics_engine/src/layers/impl/BaseLayerStack";
import IShaderProgram from "#graphics_engine/src/shader/IShaderProgram";
import IGraphicsContext from "#graphics_engine/src/renderer/IGraphicsContext";
import RendererFactory from "#graphics_engine/src/factories/RendererFactory";
import Mouse from "#events_system/src/mouse/Mouse";
import Keyboard from "#events_system/src/keyboard/Keyboard";
import Element from "#events_system/src/element/Element";
import Input from "#events_system/src/inputs/Input";
import BaseInput from "#events_system/src/inputs/BaseInput";
import ShaderProgramFactory from "#graphics_engine/src/factories/ShaderProgramFactory";
import Default2DShader from "#graphics_engine/src/support/Default2DShader";
import Time from "#graphics_engine/src/support/Time";
import GraphicsElement from "#graphics_engine/src/graphics/GraphicsElement";
import Entity from "#entity_component_system/src/entity/Entity";

class GameEngine extends GraphicsApplication {
	public static renderer2D: Renderer2D;

	private readonly shaderProgramLibrary: ShaderProgramLibrary;
	private readonly layerStack: ILayerStack<BaseLayer<MouseEvent, KeyboardEvent, ElementEvent>>;
	private readonly mouse: Mouse;
	private readonly keyboard: Keyboard;
	private readonly element: Element;
	private readonly time: Time;

	public constructor(parentElement: HTMLElement, api: RendererAPI = RendererAPI.WEB_GL) {
		super(parentElement);

		Renderer.setAPI(api);

		this.shaderProgramLibrary = new ShaderProgramLibrary();
		this.layerStack = new BaseLayerStack();
		this.element = new Element(16);
		this.mouse = new Mouse(16);
		this.keyboard = new Keyboard(16);
		this.time = new Time();

		Input.instance = new BaseInput(this.mouse, this.keyboard);

		const entity = new Entity(1);
		// entity.addComponent();
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

	public init2DRenderer(shaderProgram: IShaderProgram | null = null): void {
		const context = this.getContext();

		if (shaderProgram === null) {
			shaderProgram = ShaderProgramFactory.createProgram(context, "2D shader program", Default2DShader.getVertexShader(), Default2DShader.getFragmentShader());
		}
		this.saveShaderProgram(shaderProgram);

		GameEngine.renderer2D = RendererFactory.create2D(context);
		GameEngine.renderer2D.init(context, shaderProgram);
	}

	public saveShaderProgram(shaderProgram: IShaderProgram): void {
		this.shaderProgramLibrary.add(shaderProgram);
	}

	public pushLayer(layer: BaseLayer<MouseEvent, KeyboardEvent, ElementEvent>): void {
		this.layerStack.push(layer);
	}

	public pushOverlayLayer(layer: BaseLayer<MouseEvent, KeyboardEvent, ElementEvent>): void {
		this.layerStack.pushOverlay(layer);
	}

	public getContext(): IGraphicsContext {
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

	private addElementListener(graphicsElement: GraphicsElement): void {
		window.addEventListener(
			"resize",
			() => {
				graphicsElement.resize();
				this.element.onResize(graphicsElement.getWidth(), graphicsElement.getHeight());
			}
		);
	}
}

export default GameEngine;