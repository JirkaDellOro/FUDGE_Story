namespace Tutorial {
  export async function Decision(): ƒS.SceneReturn {
    console.log("Decision");


    let text = {
      Aoi: {
        T0000: "Hi.",
        T0001: "<p>Das war's auch schon.</p>"
      }
    };



    ƒS.Speech.setTickerDelays(50, 2);

    ƒS.Sound.fade(sound.backgroundTheme, 0.2, 0.1, true);

    ƒS.Speech.hide();
    await ƒS.Location.show(locations.city);
    await ƒS.update(transition.clock.duration, transition.clock.alpha, transition.clock.edge);
    await ƒS.Character.show(characters.Aoi, characters.Aoi.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.update();
    await ƒS.Speech.tell(characters.Aoi, text.Aoi.T0000);


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
        await ƒS.Speech.tell(characters.Aoi, "okay");
        ƒS.Speech.clear();
        await ƒS.update(1);
        break;
      case firstDialogueElementAnswers.iSayYes:
        ƒS.Sound.play(sound.click, 1);
        //continue writing on this path here
        await ƒS.Speech.tell(characters.Aoi, "Ja.");
        ƒS.Speech.clear();
        await ƒS.update(1);
        break;
      case firstDialogueElementAnswers.iSayNo:
        ƒS.Sound.play(sound.click, 1);
        //continue writing on this path here
        ƒS.Character.hide(characters.Aoi);
        await ƒS.update(1);
        await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positionPercent(70, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Ryu, "No.");
        await ƒS.Character.hide(characters.Ryu);
        ƒS.Speech.clear();
        await ƒS.update(1);
        break;
    }


    
    await ƒS.Character.show(characters.Aoi, characters.Aoi.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.update();
    await ƒS.Speech.tell(characters.Aoi, text.Aoi.T0001);

    await ƒS.Character.hide(characters.Aoi);
    ƒS.Speech.hide();
    await ƒS.update(1);

    // Musik ausblenden

    ƒS.Sound.fade(sound.backgroundTheme, 0, 1);



  }
}


