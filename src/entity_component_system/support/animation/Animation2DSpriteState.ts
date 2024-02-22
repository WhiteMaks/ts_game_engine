import {Animation2DSpriteFrame} from "./Animation2DSpriteFrame";
import {Time} from "../../../Time";
import {GraphicsEngine} from "../../../graphics_engine/namespace/graphics_engine";

export class Animation2DSpriteState {
	private readonly name: string;
	private readonly frames: Animation2DSpriteFrame[];

	private currentFrameIndex: number;
	private timeTracker: number;

	public constructor(name: string) {
		this.name = name;
		this.frames = [];

		this.currentFrameIndex = 0;
		this.timeTracker = 0;
	}

	public addFrame(sprite: GraphicsEngine.Sprite2D, frameTime: number): void {
		this.frames.push(new Animation2DSpriteFrame(sprite, frameTime));
	}

	public update(time: Time): void {
		this.timeTracker -= time.getDeltaTimeMs();

		if (this.timeTracker < 0) {
			this.currentFrameIndex++;

			if (this.currentFrameIndex >= this.frames.length) {
				this.currentFrameIndex = 0;
			}

			this.timeTracker = this.frames[this.currentFrameIndex].getTime();
		}
	}

	public getCurrentFrame(): Animation2DSpriteFrame {
		return this.frames[this.currentFrameIndex];
	}

	public getName(): string {
		return this.name;
	}
}