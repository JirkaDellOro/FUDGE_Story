namespace Tutorial_SS22 {
  export async function HowToMakeAnInventory(): ƒS.SceneReturn {
    console.log("Let's make an inventory!");

    let text = {
      Aisaka: {
        T0000: "Hallo nochmal",
        T0001: "Hast du dein Inventar gesehen?!"
      }
    };



    ƒS.Speech.hide();
    await ƒS.Location.show(locations.nightpark);
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
    await ƒS.update();
    ƒS.Inventory.add(items.BlobBU);
    ƒS.Inventory.add(items.BlobBU);
    ƒS.Inventory.add(items.BlobRED);
    ƒS.Inventory.add(items.BlobGN);
    ƒS.Inventory.add(items.BlobGN);
    ƒS.Inventory.add(items.BlobGN);
    ƒS.Inventory.add(items.BlobGN);
    // ƒS.Inventory.add(items.BlobDKBU);
    // ƒS.Inventory.add(items.BlobDKBU);
    // ƒS.Inventory.add(items.BlobDKBU);

    for (let i: number = 0; i < 20; i++) {
      ƒS.Inventory.add(items.BlobDKBU);
    }

    // ƒS.Inventory.add(items.Stick);

    await ƒS.Inventory.open();
    await ƒS.Speech.tell(characters.aisaka, " ");
    // Name field - Player can type his name in here
    dataForSave.nameProtagonist = await ƒS.Speech.getInput();
    console.log(dataForSave.nameProtagonist);
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000 + " " + dataForSave.nameProtagonist);
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0001);
    await ƒS.Speech.tell(characters.aisaka, "Cool, nicht wahr?");
    await ƒS.Speech.tell(characters.aisaka, "Ich werde dir Schritt für Schritt erklären, wie das erstellt wurde!");
    await ƒS.Speech.tell(characters.aisaka, "Außerdem gebe ich dir noch ein paar hilfreiche CSS-Tipps mit an die Hand.");




  }
}