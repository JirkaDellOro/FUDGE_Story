/// <reference path="Position.ts" />

namespace FudgeStory {
  import ƒ = FudgeCore;

  /**
   * The [[Stage]] is where the [[Character]]s and [[Location]] show up. It's the main instance to work with.
   */
  export abstract class Base {

    protected static viewport: ƒ.Viewport;
    protected static back: ƒ.Node;
    protected static middle: ƒ.Node;
    protected static front: ƒ.Node;
    private static mesh: ƒ.MeshQuad = new ƒ.MeshQuad("Quad");

    private static aspectRatio: number;
    private static graph: ƒ.Node;
    // private static board: ƒ.Node;
    private static size: ƒ.Vector2;

    /**
     * Will be called once by [[Progress]] before anything else may happen on the [[Stage]].
     */
    protected static create(): void {
      if (Base.viewport)
        return;

      let theater: HTMLDivElement = document.body.querySelector("scene");
      Base.aspectRatio = theater.clientWidth / theater.clientHeight;

      Base.graph = new ƒ.Node("Graph");
      Base.back = new ƒ.Node("Back");
      Base.middle = new ƒ.Node("Middle");
      Base.front = new ƒ.Node("Front");
      // Stage.board = new ƒ.Node("Board");
      // Stage.menu = new ƒ.Node("Menu");

      let canvas: HTMLCanvasElement = document.querySelector("canvas");

      Base.size = new ƒ.Vector2(theater.clientWidth, theater.clientHeight);
      console.log("StageSize", Base.size.toString());

      Base.graph.appendChild(Base.back);
      Base.graph.appendChild(Base.middle);
      Base.graph.appendChild(Base.front);
      // Stage.graph.appendChild(Stage.board);

      Base.back.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(-1))));
      Base.front.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(1))));
      // Stage.board.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(2))));


      let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      Base.viewport = new ƒ.Viewport();
      Base.viewport.initialize("Viewport", Base.graph, cmpCamera, canvas);

      let factor: number = 2 * Math.sqrt(2);
      cmpCamera.projectCentral(Base.size.x / Base.size.y, 20, ƒ.FIELD_OF_VIEW.HORIZONTAL, 1000, Base.size.x * factor + 100);
      //TODO: use orthographic camera, no fov-calculation required
      cmpCamera.pivot.translateZ(Base.size.x * factor);
      cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
      Base.viewport.draw();

      Base.calculatePositions();
      Base.resize();

      window.addEventListener("resize", Base.resize);
    }


    /**
     * Creates a serialization-object representing the current state of the [[Character]]s currently shown on the stage
     */
    protected static serialize(): ƒ.Serialization {
      let serialization: ƒ.Serialization = { characters: [] };

      for (let pose of Base.middle.getChildren()) {
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
    protected static async deserialize(_serialization: ƒ.Serialization): Promise<void> {
      for (let characterData of _serialization.characters) {
        let character: CharacterDefinition = { name: characterData.name, pose: { id: characterData.pose }, origin: characterData.origin };
        let position: ƒ.Vector2 = <ƒ.Vector2>await new ƒ.Vector2().deserialize(characterData.position);
        Character.show(character, characterData.pose, position);
      }
    }

    protected static async createImageNode(_name: string, _request: RequestInfo, _origin: ƒ.ORIGIN2D = ƒ.ORIGIN2D.CENTER, _size?: ƒ.Vector2): Promise<ƒ.Node> {
      let node: ƒ.Node = new ƒ.Node(_name);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Base.mesh);
      if (_size)
        Base.adjustMesh(cmpMesh, _origin, _size);
      node.addComponent(cmpMesh);

      // let material: ƒ.Material = new ƒ.Material(_name, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("red")));
      let texture: ƒ.TextureImage = new ƒ.TextureImage();
      await texture.load(_request);
      let coat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("white"), texture);
      let material: ƒ.Material = new ƒ.Material(_name, ƒ.ShaderTexture, coat);

      if (!_size)
        // texture.image.addEventListener("load", (_event: Event): void => {
        this.adjustMesh(cmpMesh, _origin, new ƒ.Vector2(texture.image.width, texture.image.height));
      // cmpMesh.pivot.scale(new ƒ.Vector3(texture.image.width, texture.image.height, 1));
      // });
      // texture.image.addEventListener("load", Stage.update);

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      node.addComponent(cmpMaterial);


      return node;
    }

    private static adjustMesh(_cmpMesh: ƒ.ComponentMesh, _origin: ƒ.ORIGIN2D, _size: ƒ.Vector2): void {
      let rect: ƒ.Rectangle = new ƒ.Rectangle(0, 0, _size.x, _size.y, _origin);
      _cmpMesh.pivot.translateX(rect.x + rect.width / 2);
      _cmpMesh.pivot.translateY(-rect.y - rect.height / 2);
      _cmpMesh.pivot.scale(_size.toVector3(1));
    }

    private static calculatePositions(): void {
      let xOffset: number = Base.size.x / 2;
      let yOffset: number = Base.size.y / 2;
      positions = {
        topleft: new Position(-xOffset, yOffset), topright: new Position(xOffset, yOffset), topcenter: new Position(0, yOffset),
        centerleft: new Position(-xOffset, 0), centerright: new Position(xOffset, 0), center: new Position(0, 0),
        bottomleft: new Position(-xOffset, -yOffset), bottomright: new Position(xOffset, -yOffset), bottomcenter: new Position(0, -yOffset),
        left: new Position(-xOffset * 0.7, -yOffset), right: new Position(xOffset * 0.7, -yOffset)
      };
    }

    private static resize(): void {
      let theater: HTMLDivElement = document.body.querySelector("scene");
      let bodyWidth: number = document.body.clientWidth;
      let bodyHeight: number = document.body.clientHeight;
      let aspectWindow: number = bodyWidth / bodyHeight;

      // console.log(aspectCanvas, aspectWindow);

      let height: number;
      let width: number;

      // aspectWindow > aspectCanvas -> scaleToHeight
      if (Base.aspectRatio / aspectWindow < 1) {
        height = bodyHeight;
        width = bodyHeight * Base.aspectRatio;
      } else {
        width = bodyWidth;
        height = bodyWidth / Base.aspectRatio;
      }
      theater.style.height = height + "px";
      theater.style.width = width + "px";
      theater.style.top = ((bodyHeight - height) / 2) + "px";
      theater.style.left = ((bodyWidth - width) / 2) + "px";
    }
  }
}