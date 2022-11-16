namespace Tutorial_WS22 {
  export async function Text(): ƒS.SceneReturn {
    console.log("Text Scene");

    let text = {
      Aisaka: {
        T0000: "GUTES ENDE"
      }
    };

    ƒS.Speech.hide();
    await ƒS.Location.show(locations.beachEvening);
    await ƒS.update(transition.puzzle.duration, transition.puzzle.alpha, transition.puzzle.edge);
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);
    // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(70, 100));
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
    ƒS.update(5);


    let dialogue = {
      iSayYes: "Yes",
      iSayOk: "Okay",
      iSayNo: "No",
      iSayBla: "Bla"
    };


    let dialogueElement = await ƒS.Menu.getInput(dialogue, "choicesCSSClass");

    let pickedYes: boolean;
    let pickedNo: boolean;
    let pickedBla: boolean;
    let pickedOk: boolean;

    if (pickedYes || pickedBla || pickedNo) {
      delete dialogue.iSayBla;
    }


    switch (dialogueElement) {
      case dialogue.iSayYes:
        // continue path here
        console.log("test");
        break;
      case dialogue.iSayNo:
        // continue path here
        await ƒS.Speech.tell(characters.aisaka, "Nein");
        break;
      case dialogue.iSayOk:
        // continue path here
        break;
      case dialogue.iSayBla:
        // continue path here
        break;
    }




  }
}