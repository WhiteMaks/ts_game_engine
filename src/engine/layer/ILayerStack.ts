import ILayer from "./ILayer";
import Cleanable from "#graphics_engine/src/support/Cleanable";

interface ILayerStack<LAYER extends ILayer> extends Cleanable {

	push(layer: LAYER): void;

	pushOverlay(layer: LAYER): void;

	getLayers(): LAYER[];

}

export default ILayerStack;