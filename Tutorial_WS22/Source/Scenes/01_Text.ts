namespace Tutorial_WS22 {
  export async function Text(): ƒS.SceneReturn {
    console.log("Text Scene");

    let text = {
      Aisaka: {
        T0000: "Dieser Text ist über die text-Variable definiert. <p>Dies hingegen ist ein Paragraph.</p>",
        T0001: "",
        T0002: ""

      }
    };


    document.getElementsByName("aisakaScore").forEach(meterStuff => meterStuff.hidden = true);
    document.getElementById("scoreForAisaka").style.display = "none";


    // cpms = characters per millisecond
    ƒS.Speech.setTickerDelays(80, 5000);
    let signalDelay3: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(3)]);



    ƒS.Speech.hide();
    await ƒS.Location.show(locations.beachEvening);
    await ƒS.update(transition.puzzle.duration, transition.puzzle.alpha, transition.puzzle.edge);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
    ƒS.update(1);
    await ƒS.Speech.tell(characters.aisaka, "Hi, ich bin Aisaka!");
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);
    // signalDelay3();

    // ------ INVENTORY AUSLAGERN ------
    // ƒS.Inventory.add(items.egg);
    // Mit einer for-Schleife mehrere Items auf einmal generieren:
    // for (let i: number = 0; i < 5; i++) {
    //   ƒS.Inventory.add(items.egg);
    // }

    // Öffnet das Inventar
    // await ƒS.Inventory.open();
    // await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000 + dataForSave.nameProtagonist);
    // ƒS.Text.addClass("novelpage");
    // await ƒS.Text.print("Hi");


    await ƒS.Speech.tell(characters.aisaka, "Und wie heißt du?");
    await ƒS.Speech.tell(characters.protagonist, "Hi ich bin der Protagonist aka der Spieler. " + "Ich heiße ", true, "Player");
    dataForSave.nameProtagonist = await ƒS.Speech.getInput();
    characters.protagonist.name = dataForSave.nameProtagonist;
    console.log(dataForSave.nameProtagonist);
    await ƒS.Speech.tell(characters.aisaka, "Hi " + dataForSave.nameProtagonist + "!");
    // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(70, 100));
    // ƒS.update(1);

    // dmg-visualization
    // ƒS.Text.addClass("testCSSClass");
    // ƒS.Text.print("-5 dmg");
    ƒS.Speech.clear();
    ƒS.Speech.hide();
    // ƒS.Character.hide(characters.aisaka);
    ƒS.update(1);






  }

}