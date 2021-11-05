namespace Tutorial {
  export async function Decision(): ƒS.SceneReturn {
    console.log("Decision");


    let text = {
      Aoi: {
        T0000: "Hi, wie heißt duu?",
        T0001: "<p>Das war's auch schon.</p>",
        T0002: "Hast du die Verzögerung bemerkt?"
      }
    };



    // let signalDelay2: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(2)]);
    // let signalDelay1: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(1)]);


    // ƒS.Text.addClass("cssklasse");
    // await ƒS.Text.print("Text, den ich anzeigen lassen möchte.");
    // ƒS.Text.close();

    ƒS.Speech.setTickerDelays(50, 2);
    
    ƒS.Sound.fade(sound.backgroundTheme, 0.2, 0.1, true);

    // ƒS.Inventory.add();
    // ƒS.Inventory.open();
    ƒS.Speech.hide();
    await ƒS.Location.show(locations.city);
    await ƒS.update(transition.clock.duration, transition.clock.alpha, transition.clock.edge);
    await ƒS.Character.show(characters.Aoi, characters.Aoi.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.update();
    await ƒS.Speech.tell(characters.Aoi, text.Aoi.T0000);

    // Name field
    // dataForSave.Protagonist.name = await ƒS.Speech.getInput();
    // console.log(dataForSave.Protagonist.name);

    // await signalDelay2();
    ƒS.Speech.set(characters.Aoi, text.Aoi.T0002);


    // if (!dataForSave.goToInventory) {
    //   return Inventory();
    // }


    ƒS.Sound.play(sound.click, 1);

    let firstDialogueElementAnswers = {
      iSayOk: "Okay.",
      iSayYes: "Ja.",
      iSayNo: "Nein."
    };


    let firstDialogueElement = await ƒS.Menu.getInput(firstDialogueElementAnswers, "class");

    switch (firstDialogueElement) {
      case firstDialogueElementAnswers.iSayOk:
        ƒS.Sound.play(sound.click, 1);
        //continue writing on this path here
        // testing audio stuff
        await ƒS.Speech.tell(characters.Aoi, "Okay");
        ƒS.Sound.fade(sound.backgroundTheme, 0, 1);
        ƒS.Sound.play(sound.dystopian, 0.5);
        await ƒS.Speech.tell(characters.Aoi, "1");
        await ƒS.Speech.tell(characters.Aoi, "2");
        await ƒS.Speech.tell(characters.Aoi, "3");
        await ƒS.Speech.tell(characters.Aoi, "4");
        ƒS.Character.hide(characters.Aoi);
        ƒS.Speech.clear();
        ƒS.Sound.fade(sound.dystopian, 0, 0.5);
        await ƒS.update(1);
        // dataForSave.goToInventory = false;
        return "NovelPages";
        break;
      case firstDialogueElementAnswers.iSayYes:
        dataForSave.score -= 10;
        console.log(dataForSave.score);
        ƒS.Sound.play(sound.click, 1);
        //continue writing on this path here
        await ƒS.Speech.tell(characters.Aoi, "Ja.");
        ƒS.Speech.clear();
        await ƒS.update(1);
        return "Inventory";
        // dataForSave.goToInventory = true;
        break;
      case firstDialogueElementAnswers.iSayNo:
        ƒS.Sound.play(sound.click, 1);
        //continue writing on this path here
        ƒS.Character.hide(characters.Aoi);
        await ƒS.update(1);
        await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positionPercent(70, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Ryu, "Nein.");
        await ƒS.Character.hide(characters.Ryu);
        ƒS.Speech.clear();
        await ƒS.update(1);
        dataForSave.goToInventory = false;
        break;
    }


    // ƒS.Sound.fade(sound.backgroundTheme, 0.2, 0.1, true);
    // await ƒS.Character.show(characters.Aoi, characters.Aoi.pose.normal, ƒS.positions.bottomcenter);
    // await ƒS.update();
    // await ƒS.Speech.tell(characters.Aoi, text.Aoi.T0001);

    // await ƒS.Character.hide(characters.Aoi);
    // ƒS.Speech.hide();
    // await ƒS.update(1);

    
    // // Musik ausblenden
    // ƒS.Sound.fade(sound.backgroundTheme, 0, 1);



  }
}


