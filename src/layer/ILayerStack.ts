import {ILayer} from "./ILayer";
import {GraphicsEngine} from "../graphics_engine/namespace/graphics_engine";

export interface ILayerStack<LAYER extends ILayer> extends GraphicsEngine.Cleanable {

	push(layer: LAYER): void;

	pushOverlay(layer: LAYER): void;

	getLayers(): LAYER[];

}