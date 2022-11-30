namespace Tutorial_WS22 {
  export async function Choices(): ƒS.SceneReturn {
    console.log("Choices");



    await ƒS.Location.show(locations.beachDay);
    ƒS.update();
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
    await ƒS.Speech.tell(characters.aisaka, "Versuchen wir nun einmal ein paar Auswahlmöglichkeiten einzubauen, " + dataForSave.nameProtagonist + "!");
    await ƒS.Speech.tell(characters.aisaka, "Kannst du mir dabei helfen?");
    ƒS.update(2);


    let dialogue = {
      iSayYes:  "Klar",
      iSayOk:   "Okay",
      iSayNo:   "Nö",
      iSayBla:  "Bla"
    };


    let dialogueElement = await ƒS.Menu.getInput(dialogue, "choicesCSSClass");


    switch (dialogueElement) {
      case dialogue.iSayYes:
        // continue path here
        console.log(dialogue.iSayYes);
        await ƒS.Speech.tell(characters.aisaka, "ja");
        break;
      case dialogue.iSayNo:
        // continue path here
        console.log(dialogue.iSayNo);
        await ƒS.Speech.tell(characters.aisaka, "nein");
        break;
      case dialogue.iSayOk:
        // continue path here
        console.log(dialogue.iSayOk);
        await ƒS.Speech.tell(characters.aisaka, "ok");
        break;
      case dialogue.iSayBla:
        // continue path here
        console.log(dialogue.iSayBla);
        await ƒS.Speech.tell(characters.aisaka, "bla");
        break;
    }
  }
}