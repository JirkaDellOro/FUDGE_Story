namespace FudgeStory {
  import ƒ = FudgeCore;

  let pos0: Position = new Position(0, 0);

  /**
   * The [[Stage]] is where the [[Character]]s and [[Location]] show up. It's the main instance to work with.
   */
  export class Stage {
    public static positions = {
      topleft: pos0, topright: pos0, topcenter: pos0,
      centerleft: pos0, centerright: pos0, center: pos0,
      bottomleft: pos0, bottomright: pos0, bottomcenter: pos0,
      left: pos0, right: pos0
    };

    public static viewport: ƒ.Viewport;

    private static aspectRatio: number;
    private static graph: ƒ.Node;
    private static back: ƒ.Node;
    private static middle: ƒ.Node;
    private static front: ƒ.Node;
    private static board: ƒ.Node;
    private static size: ƒ.Vector2;

    /**
     * Will be called once by [[Progress]] before anything else may happen on the [[Stage]].
     */
    public static create(): void {
      if (Stage.viewport)
        return;

      let theater: HTMLDivElement = document.body.querySelector("theater");
      Stage.aspectRatio = theater.clientWidth / theater.clientHeight;

      Stage.graph = new ƒ.Node("Graph");
      Stage.back = new ƒ.Node("Back");
      Stage.middle = new ƒ.Node("Middle");
      Stage.front = new ƒ.Node("Front");
      Stage.board = new ƒ.Node("Board");
      // Stage.menu = new ƒ.Node("Menu");

      let canvas: HTMLCanvasElement = document.querySelector("canvas");

      Stage.size = new ƒ.Vector2(theater.clientWidth, theater.clientHeight);
      console.log("StageSize", Stage.size.toString());

      Stage.graph.appendChild(Stage.back);
      Stage.graph.appendChild(Stage.middle);
      Stage.graph.appendChild(Stage.front);
      Stage.graph.appendChild(Stage.board);

      Stage.back.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(-1))));
      Stage.front.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(1))));
      Stage.board.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(2))));


      let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      Stage.viewport = new ƒ.Viewport();
      Stage.viewport.initialize("Viewport", Stage.graph, cmpCamera, canvas);

      let factor: number = 2 * Math.sqrt(2);
      cmpCamera.projectCentral(Stage.size.x / Stage.size.y, 20, ƒ.FIELD_OF_VIEW.HORIZONTAL, 1000, Stage.size.x * factor + 100);
      //TODO: use orthographic camera, no fov-calculation required
      cmpCamera.pivot.translateZ(Stage.size.x * factor);
      cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
      Stage.viewport.draw();

      Stage.calculatePositions();
      Stage.resize();

      window.addEventListener("resize", Stage.resize);
    }

    /**
     * Calculates and returns a position on the [[Stage]] to be used to place [[Character]]s or objects on the [[Stage]].
     * Pass values in percent relative to the upper left corner.
     */
    public static positionPercent(_x: number, _y: number): Position {
      let size: Position = Stage.size.copy;
      let position: Position = new Position(-size.x / 2, size.y / 2);
      size.x *= _x / 100;
      size.y *= -_y / 100;
      position.add(size);
      return position;
    }

    /**
     * Show the given location on the [[Stage]]. See [[Location]] for the definition of a location.
     */
    public static async showLocation(_location: Location): Promise<void> {
      Stage.back.removeAllChildren();

      let location: LocationNodes = await LocationNodes.get(_location);
      Stage.back.appendChild(location.background);

      Stage.front.removeAllChildren();
      if (location.foreground)
        Stage.front.appendChild(location.foreground);
    }

    /**
     * Show the given [[Character]] in the specified pose at the given position on the stage. See [[Character]] for the definition of a character.
     */
    public static async showCharacter(_character: Character, _pose: RequestInfo, _position: Position): Promise<void> {
      let character: CharacterNode = CharacterNode.get(_character);
      let pose: ƒ.Node = await character.getPose(_pose);
      pose.mtxLocal.translation = _position.toVector3(0);
      Stage.middle.appendChild(pose);
    }

    /**
     * Hide the given [[Character]], removing it from the [[Stage]]
     */
    public static async hideCharacter(_character: Character): Promise<void> {
      let found: ƒ.Node[] = Stage.middle.getChildrenByName(_character.name);
      if (found.length == 0)
        console.warn(`No character with name ${_character.name} to hide on the stage`);
      if (found.length > 1)
        console.warn(`Multiple characters with name ${_character.name} on the stage, removing first`);
      Stage.middle.removeChild(found[0]);
    }

    /**
     * Remove all [[Character]]s and objects from the stage
     */
    public static free(): void {
      Stage.middle.removeAllChildren();
    }

    /**
     * Display the recent changes to the [[Stage]]. If a parameters are specified, they are used blend from the previous display to the new
     * as described in [[Transition]]
     */
    public static async update(_duration?: number, _url?: RequestInfo, _edge?: number): Promise<void> {
      Stage.viewport.adjustingFrames = false;
      if (!_duration) {
        Stage.viewport.draw();
        return;
      }

      let crc2: CanvasRenderingContext2D = Stage.viewport.getContext();
      let imgOld: ImageData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
      Stage.viewport.draw();
      let imgNew: ImageData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
      crc2.putImageData(imgOld, 0, 0);

      let transition: Uint8ClampedArray;
      if (_url)
        transition = await Transition.get(_url);
      await Transition.blend(imgOld, imgNew, _duration * 1000, transition, _edge);
    }

    /**
     * Wait for the viewers input. See [[EVENT]] for predefined events to wait for.
     */
    public static async getInput(_eventTypes: string[]): Promise<Event> {
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
     * Calls the given scene to be played on the stage. A scene is a sequence of commands defining a small piece of the whole play.
     * A scene needs to be defined in the following format, where NameOfTheScene is a placeholder and should be chosen arbitrarily.
     * Calling this function directly will not register the scene as a save-point for saving and loading. Use Progress.play for this!
     * ```typescript
     * export async function NameOfTheScene(): SceneReturn {
     *   ...
     *   ...
     * }
     * ```
     */
    public static async act(_scene: SceneFunction): Promise<void | string> {
      console.log("SceneFunction", _scene.name);
      return await _scene();
    }

    /**
     * Creates a serialization-object representing the current state of the [[Character]]s currently shown on the stage
     */
    public static serialize(): ƒ.Serialization {
      let serialization: ƒ.Serialization = { characters: [] };

      for (let pose of Stage.middle.getChildren()) {
        let poseUrl: RequestInfo = (<ƒ.CoatTextured>pose.getComponent(ƒ.ComponentMaterial).material.getCoat()).texture.url;
        let origin: ƒ.Vector2 = Reflect.get(pose, "origin");

        serialization.characters.push(
          { name: pose.name, pose: poseUrl, origin: origin, position: pose.mtxLocal.translation.toVector2().serialize() }
        );
      }

      return serialization;
    }

    /**
     * Reconstructs the [[CharacterNode]]s from a serialization-object and places them on the stage
     * @param _serialization
     */
    public static async deserialize(_serialization: ƒ.Serialization): Promise<void> {
      for (let characterData of _serialization.characters) {
        let character: Character = {name: characterData.name, pose: {id: characterData.pose}, origin: characterData.origin };
        let position: ƒ.Vector2 = <ƒ.Vector2>await new ƒ.Vector2().deserialize(characterData.position);
        Stage.showCharacter(character, characterData.pose, position);
      }
    }

    private static calculatePositions(): void {
      let xOffset: number = Stage.size.x / 2;
      let yOffset: number = Stage.size.y / 2;
      Stage.positions = {
        topleft: new Position(-xOffset, yOffset), topright: new Position(xOffset, yOffset), topcenter: new Position(0, yOffset),
        centerleft: new Position(-xOffset, 0), centerright: new Position(xOffset, 0), center: new Position(0, 0),
        bottomleft: new Position(-xOffset, -yOffset), bottomright: new Position(xOffset, -yOffset), bottomcenter: new Position(0, -yOffset),
        left: new Position(-xOffset * 0.7, -yOffset), right: new Position(xOffset * 0.7, -yOffset)
      };
    }

    private static resize(): void {
      let theater: HTMLDivElement = document.body.querySelector("theater");
      let bodyWidth: number = document.body.clientWidth;
      let bodyHeight: number = document.body.clientHeight;
      let aspectWindow: number = bodyWidth / bodyHeight;

      // console.log(aspectCanvas, aspectWindow);

      let height: number;
      let width: number;

      // aspectWindow > aspectCanvas -> scaleToHeight
      if (Stage.aspectRatio / aspectWindow < 1) {
        height = bodyHeight;
        width = bodyHeight * Stage.aspectRatio;
      } else {
        width = bodyWidth;
        height = bodyWidth / Stage.aspectRatio;
      }
      theater.style.height = height + "px";
      theater.style.width = width + "px";
      theater.style.top = ((bodyHeight - height) / 2) + "px";
      theater.style.left = ((bodyWidth - width) / 2) + "px";
    }
  }
}