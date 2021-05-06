namespace Test {
  export async function Main(): ƒS.SceneReturn {
    console.log("Main Menu");

    let animation: ƒS.AnimationDefinition = {
      start: {translation: ƒS.positions.bottomleft, rotation: -20, scaling: new ƒS.Position(0.5, 1.5), color: ƒS.Color.CSS("white", 0)},
      end: {translation: ƒS.positions.bottomright, rotation: 20, scaling: new ƒS.Position(1.5, 0.5), color: ƒS.Color.CSS("red")},
      duration: 1,
      playmode: ƒS.ANIMATION_PLAYMODE.REVERSELOOP
    };

    await ƒS.Location.show(locations.city);
    console.log("Startupdate");
    await ƒS.update(3);
    // ƒS.Text.setClass("blue");
    // await ƒS.Text.print("Achtung, gleich geht's los!");
    ƒS.Inventory.add(items.Fudge);
    ƒS.Inventory.add(items.Fudge);
    ƒS.Inventory.add(items.Fudge);
    console.log(await ƒS.Inventory.open());
    state.a = 10;
    state.b = "Hi";
    // max. Wert für Bar definieren if-Abfrage
    // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.Character.animate(characters.Sue, characters.Sue.pose.normal, animation);
    await ƒS.Speech.tell(characters.Sue, "Willkommen zum Test von FUDGE-Story", false);
    await ƒS.Character.hide(characters.Sue);
    // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.update(2);
  }
}