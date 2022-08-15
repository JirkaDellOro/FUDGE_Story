namespace Test {
  export async function Main(): ƒS.SceneReturn {
    console.log("Main Menu");

    await ƒS.Location.show(locations.city);
    console.log("Startupdate");
    await ƒS.update(1, "Images/jigsaw_06.jpg");
    // ƒS.Text.setClass("blue");

    let graph: ƒ.Node = ƒS.Base.getGraph();
    ƒ.Debug.branch(graph);
    // let city: ƒ.Node = graph.getChildrenByName("Back")[0].getChildren()[0];
    // let cmpMesh: ƒ.ComponentMesh = city.getComponent(ƒ.ComponentMesh);

    // graph.addComponent(new ƒ.ComponentTransform());
    console.log(graph);

    // function jitter(): void {
    //   // graph.mtxLocal.translateX(ƒ.Random.default.getRangeFloored(-2, 3));
    //   // graph.mtxLocal.translateY(ƒ.Random.default.getRangeFloored(-2, 3));
    //   // cmpMesh.mtxPivot.translateX(Math.sin(performance.now() / 100) / 100);
    //   graph.mtxLocal.rotateZ(1);
    //   ƒS.update();
    // }
    // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, jitter);

    let logo: ƒS.CharacterDefinition = {
      name: "Logo",
      origin: ƒS.ORIGIN.CENTER,
      pose: {
        default: "Images/Fudge_48.png"
      }
    };

    await ƒS.Character.show(logo, logo.pose.default, ƒS.positionPercent(50, 50));
    let nodeLogo: ƒ.Node = await ƒS.Character.get(logo).getPose(logo.pose.default);
    let canvas: HTMLCanvasElement = ƒS.Base.getViewport().canvas;
    canvas.addEventListener("mousemove", hndMouse);
    function hndMouse(_event: MouseEvent): void {
      let offset: ƒ.Vector2 = new ƒ.Vector2(_event.offsetX, _event.offsetY);
      let position: ƒ.Vector3 = ƒS.pointCanvasToMiddleGround(offset);
      nodeLogo.mtxLocal.translation = position;
      ƒS.update(0);
    }

    let menu: ƒS.Menu = ƒS.Menu.create({ a: "Opt1", b: "Opt2" }, null);
    await ƒS.Speech.tell("characters.Sue", "Dies ist nur ein langer Text um zu prüfen, ob das Menü nun das Click-Event frisst", false);
    menu.close();
    // await ƒS.Text.print("Achtung, gleich geht's los!");
    ƒS.Inventory.add(items.Fudge);
    ƒS.Inventory.add(items.Fudge);
    ƒS.Inventory.add(items.Fudge);
    console.log(await ƒS.Inventory.open());
    state.a = 10;
    state.c = 20;
    state.b = "Hi";
    // max. Wert für Bar definieren if-Abfrage
    // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.Character.animate(characters.Sue, characters.Sue.pose.normal, getAnimation());
    await ƒS.Character.hide(characters.Sue);
    ƒS.update(0.5);
    await ƒS.Speech.tell("characters.Sue", "Willkommen zum Test von FUDGE-Story", false);
    // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.update(0.5);
  }
}