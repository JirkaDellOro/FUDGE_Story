namespace Tutorial_WS21 {
  export async function Introduction(): ƒS.SceneReturn {
    console.log("Intro");


    let text = {
      narrator: {
        T0000: "<p>Ich bin der Narrator.</p>",
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

    // test: `test ${123} klappt`
    // Textgeschwindigkeit
    ƒS.Speech.setTickerDelays(20, 2);
    ƒS.Sound.fade(sound.backgroundTheme, 0.2, 0.1, true);

    // let animationDone: Promise<void> = ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, fromRightToLeft());
    // let animationDone2: Promise<void> = ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, fromRightToOutOfCanvas());



    
    //  Name field
    // dataForSave.nameProtagonist = await ƒS.Speech.getInput();
    // console.log(dataForSave.nameProtagonist);


    await ƒS.Location.show(locations.bedroom);
    await ƒS.update(transitions.clock.duration, transitions.clock.alpha, transitions.clock.edge);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(30, 100));
    await ƒS.update(1);
    // Animationen parallel abspielen
    await ƒS.Speech.tell(characters.aisaka, text.aisaka.T0000, false);
    dataForSave.nameProtagonist = await ƒS.Speech.getInput();
    console.log(dataForSave.nameProtagonist);
    await ƒS.Speech.tell(characters.aisaka, text.aisaka.T0000 + dataForSave.nameProtagonist);
    // LOOP Animations
    // await ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, fromRightToLeft());
    // await ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, fromRightToOutOfCanvas());

    // Inventar
    // ƒS.Inventory.add(items.pen);
    // await ƒS.Inventory.open(); 


    await ƒS.Speech.tell(characters.aisaka, "Hi2.");
    // await animationDone;
    // await animationDone2;
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
        // return "Ende";
        break;
      case firstDialogueElementOptions.iSayYes:
        await ƒS.Character.show(characters.kohana, characters.kohana.pose.angry, ƒS.positions.center);
        break;
      case firstDialogueElementOptions.iSayNo:
        dataForSave.points += 10;
        await ƒS.Speech.tell(characters.kohana, text.kohana.T0000);
        break;
    }

    await ƒS.Speech.tell(characters.aisaka, text.aisaka.T0000);

    ƒS.Sound.fade(sound.backgroundTheme, 0, 1);

    ƒS.Character.hideAll();
    await ƒS.update(1);


    // if (dataForSave.points === 100) {
    //   return End();
    // }

    // return "Ende";
    // return End();
  }

}

