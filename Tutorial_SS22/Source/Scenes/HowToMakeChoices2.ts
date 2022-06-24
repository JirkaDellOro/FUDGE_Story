namespace Tutorial_SS22 {
  export async function HowToMakeChoices2(): ƒS.SceneReturn {
    console.log("Let's make some choices!");

    let text = {
      Aisaka: {
        T0000: "Heute wird sich alles um Auswahlmöglichkeiten drehen.",
        T0001: "Schön, dass du dabei warst!"
      }
    };

    ƒS.Speech.setTickerDelays(50, 2);
    let signalDelay2: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(2)]);
    // let signalDelay1: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(1)]);

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
    await signalDelay2();
    await ƒS.Speech.tell(characters.aisaka, "test", false);

    ƒS.Speech.clear();
    ƒS.Speech.hide();
    await ƒS.update(1.5);


    let firstDialogueElementAnswers = {
      iSayOk: "Okay.",
      iSayYes: "Ja.",
      iSayNo: "Nein.",
      iSayBla: "Bla"
    };

    let pickedOk: boolean;
    let pickedYes: boolean;
    let pickedNo: boolean;
    let pickedBla: boolean;

    do {

      // if (pickedYes || pickedBla || pickedNo || pickedOk || pickedYes) {
      //   delete firstDialogueElementAnswers.iSayYes;
      // }
      if (pickedYes) {
        delete firstDialogueElementAnswers.iSayYes;
      }
      else if (pickedNo) {
        delete firstDialogueElementAnswers.iSayNo;
      }
      else if (pickedOk) {
        delete firstDialogueElementAnswers.iSayOk;
      }
      else if (pickedBla) {
        delete firstDialogueElementAnswers.iSayBla;
      }

      let firstDialogueElement = await ƒS.Menu.getInput(firstDialogueElementAnswers, "choicesCSSclass");

      switch (firstDialogueElement) {
        case firstDialogueElementAnswers.iSayOk:
          // continue path here
          pickedOk = true;
          console.log(dataForSave.aisakaScore);
          await ƒS.Speech.tell(characters.aisaka, "Okay");
          ƒS.Speech.clear();
          break;
        case firstDialogueElementAnswers.iSayYes:
          // continue path here
          pickedYes = true;
          await ƒS.Speech.tell(characters.aisaka, "Ja");
          ƒS.Character.hide(characters.aisaka);
          // delete firstDialogueElementAnswers.iSayYes;
          break;
        case firstDialogueElementAnswers.iSayNo:
          // continue path here
          pickedNo = true;
          await ƒS.Speech.tell(characters.aisaka, "Nein");
          ƒS.Speech.clear();
          break;
        case firstDialogueElementAnswers.iSayBla:
          // continue path here
          pickedBla = true;
          dataForSave.pickedChoice = true;
          await ƒS.Speech.tell(characters.aisaka, "Bla");
          ƒS.Speech.clear();
          break;
      }
    } while (!dataForSave.pickedChoice);

    // function allChoicesTrue(): string {
    //   if (pickedYes && pickedBla && pickedNo && pickedOk && pickedYes) {
    //     return "Good Ending";
    //   }
    // }

  }

}
