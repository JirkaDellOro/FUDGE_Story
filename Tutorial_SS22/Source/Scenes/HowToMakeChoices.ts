namespace Tutorial_SS22 {
  export async function HowToMakeChoices(): ƒS.SceneReturn {
    console.log("Let's make some choices!");

    let text = {
      Aisaka: {
        T0000: "Heute wird sich alles um Auswahlmöglichkeiten drehen.",
        T0001: "Schön, dass du dabei warst!"
      }
    };


    // ƒS.Sound.fade(sound.nightclub, 1, 2, true);
    ƒS.Speech.hide();
    await ƒS.Location.show(locations.bedroomAtNight);
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(70, 100));
    await ƒS.update();
    // ƒS.Character.hide(characters.aisaka);
    // ƒS.Character.hideAll();
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);
    ƒS.Speech.clear();
    ƒS.Speech.hide();
    await ƒS.update(1.5);




    let firstDialogueElementAnswers = {
      iSayOk: "Okay.",
      iSayYes: "Ja.",
      iSayNo: "Nein."
    };

    let firstDialogueElement = await ƒS.Menu.getInput(firstDialogueElementAnswers, "choicesCSSclass");

    switch (firstDialogueElement) {
      case firstDialogueElementAnswers.iSayOk:
        // continue path here
        dataForSave.aisakaScore += 50;
        console.log(dataForSave.aisakaScore);
        await ƒS.Speech.tell(characters.aisaka, "Okay");
        ƒS.Speech.clear();
        break;
      case firstDialogueElementAnswers.iSayYes:
        // continue path here
        await ƒS.Speech.tell(characters.aisaka, "Ja");
        ƒS.Character.hide(characters.aisaka);
        break;
      case firstDialogueElementAnswers.iSayNo:
        // continue path here
        await ƒS.Speech.tell(characters.aisaka, "Nein");
        ƒS.Speech.clear();
        break;
    }

    // You can continue your story right after the choice definitions
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0001);


    if (dataForSave.aisakaScore === 50) {
      let secondDialogueElementAnswers = {
        iSayOk: "Du hast 50 Punkte bei deiner letzten Auswahl gesammelt.",
        iSayYes: "...deshalb siehst du diese Auswahlmöglichkeit",
        iSayNo: "Spektakulär!"
      };
  
      let secondDialogueElement = await ƒS.Menu.getInput(secondDialogueElementAnswers, "choicesCSSclass");
  
      switch (secondDialogueElement) {
        case secondDialogueElementAnswers.iSayOk:
          // continue path here
          dataForSave.aisakaScore += 50;
          console.log(dataForSave.aisakaScore);
          await ƒS.Speech.tell(characters.aisaka, "Okay, cool.");
          ƒS.Speech.clear();
          break;
        case secondDialogueElementAnswers.iSayYes:
          // continue path here
          await ƒS.Speech.tell(characters.aisaka, "ja, das wusste ich.");
          ƒS.Character.hide(characters.aisaka);
          break;
        case secondDialogueElementAnswers.iSayNo:
          // continue path here
          await ƒS.Speech.tell(characters.aisaka, "find' ich auch!");
          ƒS.Speech.clear();
          break;
      }
    }


  }
}