namespace Tutorial {
  export async function NovelPages(): ƒS.SceneReturn {
    console.log("Novel Pages");

    let text = {
      Narrator: {
        T0000: "",
        T0001: ""
      },
      Protagonist: {
        T0000: "",
        T0001: ""
      },
      Ryu: {
        T0000: "Novel pages können ganz unterschiedlich verwendet werden.",
        T0001: "Hier konntest du ein Beispiel sehen, bei dem man die Seiten, wie in einem Buch, umblättert."
      }
    };



    document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = true);
    document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = true);
    gameMenu.close();
    menu = false;

    ƒS.Speech.hide();
    await ƒS.Location.show(locations.bench);
    // await ƒS.update(transition.clock.duration, transition.clock.alpha, transition.clock.edge);
    await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positionPercent(30, 100));
    await ƒS.update(1);
    // await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0000);
    // if (!dataForSave.started) {
    ƒS.Text.addClass("contract");
    ƒS.Speech.hide();

    let pages: string[] = ["<strong>Überschrift:</strong>blabla<br></br> \
      <br>Seite 1</br>", "<strong>Überschrift</strong>\
      <br>Seite 2</br>", "<strong>Überschrift</strong> \
      <br>test text test</br> text test text <br>test text test</br> text<br></br> Seite 3", "Seite 4", "Seite 5", "Seite 6", "Seite 7", "Seite 8"];
    let current: number = 0;
    let flip = { back: "Back", next: "Next", done: "Close" };
    let choice: string;
    ƒS.Text.addClass("flip");
    do {
      ƒS.Text.print(pages[current]);
      choice = await ƒS.Menu.getInput(flip, "flip");
      switch (choice) {
        case flip.back: current = Math.max(0, current - 1); break;
        case flip.next: current = Math.min(pages.length - 1, current + 1); break;
        // case flip.back: current = Math.max(0, current - 1); break;
        // case flip.next: current = Math.min(2, current + 1); break;
      }
    } while (choice != flip.done);
    ƒS.Text.close();

    // }

    // Delay reinmachen + testen

    await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0000);
    await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0001);

    ƒS.Text.print("Lies mich.");
    ƒS.Text.setClass("text");

    await ƒS.Speech.tell(characters.Ryu, "Probier' es doch einmal selbst aus.");
    await ƒS.Character.hide(characters.Ryu);
    await ƒS.update(1);








  }

}

