namespace FudgeStory {
  import ƒ = FudgeCore;

  /**
   * Holds some core functionality to load images and build FUDGE-nodes from them for display
   */
  export class Base {
    private static mesh: ƒ.MeshQuad = new ƒ.MeshQuad("Quad");
    public name: string;

    public constructor(_name: string) {
      this.name = _name;
    }

    public static async createImageNode(_name: string, _request: RequestInfo, _origin: ƒ.ORIGIN2D = ƒ.ORIGIN2D.CENTER, _size?: ƒ.Vector2): Promise<ƒ.Node> {
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
  }
}