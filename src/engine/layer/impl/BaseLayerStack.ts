import {ILayerStack} from "../ILayerStack";
import {ILayer} from "../ILayer";

export class BaseLayerStack<LAYER extends ILayer> implements ILayerStack<LAYER> {
	private readonly layers: LAYER[];

	private layerInsert: number;

	public constructor() {
		this.layers = [];
		this.layerInsert = 0;
	}

	public push(layer: LAYER): void {
		this.layers.splice(this.layerInsert, 0, layer);
		layer.attach();

		this.layerInsert++;
	}

	public pushOverlay(layer: LAYER): void {
		this.layers.push(layer);
		layer.attach();
	}

	public clean(): void {
		while(this.layers.length > 0) {
			this.layers.pop();
		}
	}

	public getLayers(): LAYER[] {
		return this.layers;
	}

}