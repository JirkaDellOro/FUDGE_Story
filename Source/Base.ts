namespace FudgeStory {
  import ƒ = FudgeCore;

  /**
   * Holds core functionality for the inner workings. Do not instantiate or call methods directly!
   */
  export abstract class Base {

    protected static viewport: ƒ.Viewport;
    protected static back: ƒ.Node;
    protected static middle: ƒ.Node;
    protected static front: ƒ.Node;
    private static mesh: ƒ.MeshQuad = new ƒ.MeshQuad("Quad");

    private static aspectRatio: number;
    private static graph: ƒ.Node;
    private static size: ƒ.Vector2;

    public static getGraph(): ƒ.Node {
      return Base.graph;
    }
    public static getViewport(): ƒ.Viewport {
      return Base.viewport;
    }

    /**
     * Will be called once by {@link Progress} before anything else may happen.
     */
    protected static setup(): void {
      if (Base.viewport)
        return;

      let client: HTMLDivElement = document.body.querySelector("scene");
      Base.aspectRatio = client.clientWidth / client.clientHeight;

      Base.graph = new ƒ.Node("Graph");
      Base.back = new ƒ.Node("Back");
      Base.middle = new ƒ.Node("Middle");
      Base.front = new ƒ.Node("Front");

      let canvas: HTMLCanvasElement = document.querySelector("canvas");

      Base.size = new ƒ.Vector2(client.clientWidth, client.clientHeight);
      console.log("Size", Base.size.toString());

      Base.graph.appendChild(Base.back);
      Base.graph.appendChild(Base.middle);
      Base.graph.appendChild(Base.front);

      Base.back.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(-1))));
      Base.front.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(1))));


      let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      Base.viewport = new ƒ.Viewport();
      Base.viewport.initialize("Viewport", Base.graph, cmpCamera, canvas);

      let factor: number = 2 * Math.sqrt(2);
      cmpCamera.projectCentral(Base.size.x / Base.size.y, 20, ƒ.FIELD_OF_VIEW.HORIZONTAL, 1000, Base.size.x * factor + 100);
      //TODO: use orthographic camera, no fov-calculation required
      cmpCamera.mtxPivot.translateZ(Base.size.x * factor);
      cmpCamera.mtxPivot.lookAt(ƒ.Vector3.ZERO());
      Base.viewport.draw();

      Base.calculatePositions();
      Base.resize();

      window.addEventListener("resize", Base.resize);
      ƒ.Loop.start();
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Animation.update);
    }


    /**
     * Creates a serialization-object representing the current state of the {@link Character}s currently shown
     */
    protected static serialize(): ƒ.Serialization {
      let serialization: ƒ.Serialization = { characters: [] };

      for (let pose of Base.middle.getChildren()) {
        let poseUrl: RequestInfo =
          (<ƒ.TextureImage>(<ƒ.CoatTextured>pose.getComponent(ƒ.ComponentMaterial).material.coat).texture).url;
        let origin: ƒ.Vector2 = Reflect.get(pose, "origin");

        serialization.characters.push(
          { name: pose.name, pose: poseUrl, origin: origin, position: pose.mtxLocal.translation.toVector2().serialize() }
        );
      }

      return serialization;
    }

    /**
     * Reconstructs the {@link Character}s from a serialization-object and shows them
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

      let texture: ƒ.TextureImage = new ƒ.TextureImage();
      await texture.load(_request);
      let coat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("white"), texture);
      let material: ƒ.Material = new ƒ.Material(_name, ƒ.ShaderLitTextured, coat);

      if (!_size)
        this.adjustMesh(cmpMesh, _origin, new ƒ.Vector2(texture.image.width, texture.image.height));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      node.addComponent(cmpMaterial);


      return node;
    }

    private static update(_event: Event): void {
      if (!Animation.isPending)
        return;
      Base.viewport.draw();
    }

    private static adjustMesh(_cmpMesh: ƒ.ComponentMesh, _origin: ƒ.ORIGIN2D, _size: ƒ.Vector2): void {
      let rect: ƒ.Rectangle = new ƒ.Rectangle(0, 0, _size.x, _size.y, _origin);
      _cmpMesh.mtxPivot.translateX(rect.x + rect.width / 2);
      _cmpMesh.mtxPivot.translateY(-rect.y - rect.height / 2);
      _cmpMesh.mtxPivot.scale(_size.toVector3(1));
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
      let scene: HTMLDivElement = document.body.querySelector("scene");
      let bodyWidth: number = document.body.clientWidth;
      let bodyHeight: number = document.body.clientHeight;
      let aspectWindow: number = bodyWidth / bodyHeight;

      let height: number;
      let width: number;

      if (Base.aspectRatio / aspectWindow < 1) {
        height = bodyHeight;
        width = bodyHeight * Base.aspectRatio;
      } else {
        width = bodyWidth;
        height = bodyWidth / Base.aspectRatio;
      }
      scene.style.height = height + "px";
      scene.style.width = width + "px";
      scene.style.top = ((bodyHeight - height) / 2) + "px";
      scene.style.left = ((bodyWidth - width) / 2) + "px";
    }
  }
}