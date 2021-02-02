namespace FudgeStory {
  import ƒ = FudgeCore;

  // export type TransitionFunction = (_imgOld: ImageData, _imgNew: ImageData, _duration: number, _transition: Uint8ClampedArray, _factor: number) => Promise<void>;

  export class Transition {
    private static transitions: Map<RequestInfo, Uint8ClampedArray> = new Map();

    public static async blend(_imgOld: ImageData, _imgNew: ImageData, _duration: number = 1000, _transition: Uint8ClampedArray, _factor: number = 0.5): Promise<void> {
      let crc2: CanvasRenderingContext2D = Stage.viewport.getContext();
      let bmpNew: ImageBitmap = await createImageBitmap(_imgNew);

      if (!_transition) {
        function simpleFade(_progress: number): void {
          crc2.globalAlpha = 1;
          crc2.putImageData(_imgOld, 0, 0);
          crc2.globalAlpha = _progress;
          crc2.drawImage(bmpNew, 0, 0);
        }
        return Transition.getPromise(simpleFade, _duration);
      }

      let scale = Math.pow(16, _factor * 2) - 1;

      async function transit(_progress: number): Promise<void> {
        crc2.globalAlpha = 1;
        crc2.putImageData(_imgOld, 0, 0);
        let value = (_progress * (scale + 1) - scale) * 255;
        for (let index = 0; index < _transition.length; index += 4) {
          let alpha: number = _transition[index];
          _imgNew.data[index + 3] = alpha * scale + value;
        }
        let source: ImageBitmap = await createImageBitmap(_imgNew);
        crc2.drawImage(source, 0, 0);
      }

      return Transition.getPromise(transit, _duration);
    }

    public static async get(_url: RequestInfo): Promise<Uint8ClampedArray> {
      let transition: Uint8ClampedArray = Transition.transitions.get(_url);
      if (transition)
        return transition;

      let txtTransition = new ƒ.TextureImage();
      await txtTransition.load(_url);

      // TODO: move to get(...)
      let canvasTransition: HTMLCanvasElement = document.createElement("canvas");
      canvasTransition.width = Stage.viewport.getCanvas().width;
      canvasTransition.height = Stage.viewport.getCanvas().height;
      let crcTransition: CanvasRenderingContext2D = canvasTransition.getContext("2d");
      crcTransition.imageSmoothingEnabled = false;
      crcTransition.drawImage(txtTransition.image, 0, 0, txtTransition.image.width, txtTransition.image.height, 0, 0, 1280, 720);
      transition = crcTransition.getImageData(0, 0, 1280, 720).data;

      Transition.transitions.set(_url, transition);
      return transition;
    }

    private static getPromise(_transition: (_progress: number) => void, _duration: number): Promise<void> {
      return new Promise((resolve) => {
        let hndLoop: EventListener = function (_event: Event): void {
          let progress: number = (ƒ.Time.game.get() - ƒ.Loop.timeStartGame) / _duration;

          if (progress < 1) {
            _transition(progress);
            return;
          }

          ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
          _transition(1);
          resolve();
        };

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 30);
      });
    }
  }
}