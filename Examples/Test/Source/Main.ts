namespace Test {
  export async function Main(): ƒS.SceneReturn {
    console.log("Main Menu");

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
    state.c = 20;
    state.b = "Hi";
    // max. Wert für Bar definieren if-Abfrage
    // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.Character.animate(characters.Sue, characters.Sue.pose.normal, getAnimation());
    await ƒS.Character.hide(characters.Sue);
    ƒS.update(0.5);
    await ƒS.Speech.tell("characters.Sue", "Willkommen zum Test von FUDGE-Story", false);
    // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.update(2);
  }
}