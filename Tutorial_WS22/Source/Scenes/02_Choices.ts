namespace Tutorial_WS22 {
  export async function Choices(): ƒS.SceneReturn {
    console.log("Choices");

    ƒS.Speech.hide();

    document.getElementsByName("aisakaScore").forEach(meterStuff => meterStuff.hidden = true);
    document.getElementById("scoreForAisaka").style.display = "none";

    await ƒS.Location.show(locations.beachDay);
    await ƒS.update(transition.puzzle.duration, transition.puzzle.alpha, transition.puzzle.edge);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(70, 100));
    ƒS.update(1);
    await ƒS.Speech.tell(characters.aisaka, "Versuchen wir nun einmal ein paar Auswahlmöglichkeiten einzubauen, " + dataForSave.nameProtagonist + "!");
    await ƒS.Speech.tell(characters.aisaka, "Kannst du mir dabei helfen?");
    // return "Text";
    // ƒS.update(2);


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
        dataForSave.aisakaPoints += 10;
        break;
      case dialogue.iSayNo:
        // continue path here
        console.log(dialogue.iSayNo);
        await ƒS.Speech.tell(characters.aisaka, "nein");
        // return Text();
        break;
      case dialogue.iSayOk:
        // continue path here
        console.log(dialogue.iSayOk);
        // dataForSave.pickedOk = true;
        await ƒS.Speech.tell(characters.aisaka, "ok");
        return "Write";
        break;
      case dialogue.iSayBla:
        // continue path here
        console.log(dialogue.iSayBla);
        await ƒS.Speech.tell(characters.aisaka, "bla");
        break;
    }

    ƒS.Speech.clear();
    ƒS.Speech.hide();

    // return "Text";
  }
}