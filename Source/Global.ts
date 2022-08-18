namespace FudgeStory {
  import ƒ = FudgeCore;
  export import ORIGIN = FudgeCore.ORIGIN2D;
  export type Position = ƒ.Vector2;
  export type Signal = () => Promise<Event>;

  export enum EVENT {
    KEYDOWN = "keydown",
    KEYUP = "keyup",
    POINTERDOWN = "pointerdown",
    POINTERUP = "pointerup"
  }

  // tslint:disable-next-line
  export let Position = ƒ.Vector2;
  let pos0: Position = new Position(0, 0);

  /**
   * Inserts the given scene. A scene is a sequence of commands defining a small piece of the whole story.
   * A scene needs to be defined in the following format, where NameOfTheScene is a placeholder and should be chosen arbitrarily.
   * ```typescript
   * export async function NameOfTheScene(): SceneReturn {
   *   ...
   *   ...
   * }
   * ```
   * Calling {@link insert} directly will not register the scene as a save-point for saving and loading.
   */
  export async function insert(_scene: SceneFunction): Promise<void | string> {
    console.log("SceneFunction", _scene.name);
    return await _scene();
  }

  /**
   * Display the recent changes. If parameters are specified, they are used blend from the previous display to the new.
   * The parameters define the duration of the blend, the grayscale image for special effects and the edges (smooth 0 - 2 sharp)
   */
  export async function update(_duration?: number, _url?: RequestInfo, _edge?: number): Promise<void> {
    let viewport: ƒ.Viewport = Base.getViewport();
    if (!_duration) {
      viewport.draw();
      return;
    }

    viewport.adjustingFrames = false;
    let crc2: CanvasRenderingContext2D = viewport.context;
    let imgOld: ImageData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
    viewport.draw();
    let imgNew: ImageData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
    crc2.putImageData(imgOld, 0, 0);

    let transition: Uint8ClampedArray;
    if (_url)
      transition = await Transition.get(_url);
    await Transition.blend(imgOld, imgNew, _duration * 1000, transition, _edge);
    viewport.adjustingFrames = true;
  }

  /**
   * Wait for the viewers input. See {@link EVENT} for predefined events to wait for.
   */
  export async function getInput(_eventTypes: string[]): Promise<Event> {
    return new Promise((resolve) => {
      let hndEvent = (_event: Event): void => {
        for (let type of _eventTypes) {
          document.removeEventListener(type, hndEvent);
        }
        resolve(_event);
      };
      for (let type of _eventTypes) {
        document.addEventListener(type, hndEvent);
      }
    });
  }

  /**
   * Returns a promise that resolves when the given key is pressed. 
   * Can be used with {@link Progress.defineSignal} as e.g. () => getKeypress(ƒ.KEYBOARD_CODE.SPACE)
   */
  export async function getKeypress(_code: ƒ.KEYBOARD_CODE): Promise<Event> {
    return new Promise((resolve) => {
      let hndEvent = (_event: KeyboardEvent): void => {
        if (_event.code == _code) {
          document.removeEventListener("keypress", hndEvent);
          resolve(_event);
        }
      };
      document.addEventListener("keypress", hndEvent);
    });
  }

  /**
   * Standard positions
   */
  export let positions = {
    topleft: pos0, topright: pos0, topcenter: pos0,
    centerleft: pos0, centerright: pos0, center: pos0,
    bottomleft: pos0, bottomright: pos0, bottomcenter: pos0,
    left: pos0, right: pos0
  };


  /**
   * Calculates and returns a position to place {@link Character}s or objects.
   * Pass values in percent relative to the upper left corner.
   */
  export function positionPercent(_x: number, _y: number): Position {
    let size: Position = (<ƒ.Vector2>Reflect.get(Base, "size")).clone;
    let position: Position = new Position(-size.x / 2, size.y / 2);
    size.x *= _x / 100;
    size.y *= -_y / 100;
    position.add(size);
    return position;
  }
  
  export function pointCanvasToMiddleGround(_point: ƒ.Vector2): ƒ.Vector3 {
    // let point: ƒ.Vector2 = Base.getViewport().poi
    let ray: ƒ.Ray = Base.getViewport().getRayFromClient(_point);
    let middle: ƒ.Node = (<ƒ.Node>Reflect.get(Base, "middle"));
    let result: ƒ.Vector3 = ray.intersectPlane(middle.mtxWorld.translation, ƒ.Vector3.Z());
    return result;
  }
}