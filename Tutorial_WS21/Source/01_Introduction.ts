namespace Tutorial_WS21 {
  export async function Introduction(): ƒS.SceneReturn {
    console.log("Intro");


    let text = {
      narrator: {
        T0000: "",
        T0001: ""
      },
      aisaka: {
        T0000: "Hi",
        T0001: ""
      },
      kohana: {
        T0000: "Test"
      }
    };




    await ƒS.Location.show(locations.bedroom);
    await ƒS.update(transitions.clock.duration, transitions.clock.alpha, transitions.clock.edge);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(30, 100));
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.aisaka, text.aisaka.T0000);
    await ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, fromRightToLeft());
    await ƒS.Speech.tell(characters.aisaka, "Hi2.");
    await ƒS.Character.hide(characters.aisaka);




    let firstDialogueElementOptions = {
      iSayOk: "Okay.",
      iSayYes: "Ja.",
      iSayNo: "Nein."
    };

    let firstDialogueElement = await ƒS.Menu.getInput(firstDialogueElementOptions, "individualCSSClass");



    switch (firstDialogueElement) {
      case firstDialogueElementOptions.iSayOk:
        await ƒS.Speech.tell(characters.aisaka, "Hi2.");
        break;
      case firstDialogueElementOptions.iSayYes:
        await ƒS.Character.show(characters.kohana, characters.kohana.pose.angry, ƒS.positions.center);
        break;
      case firstDialogueElementOptions.iSayNo:
        await ƒS.Speech.tell(characters.kohana, text.kohana.T0000);
        break;
    }

    await ƒS.Speech.tell(characters.aisaka, text.aisaka.T0000);


  }

}

