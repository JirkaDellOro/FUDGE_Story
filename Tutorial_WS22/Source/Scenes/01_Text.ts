namespace Tutorial_WS22 {
  export async function Text(): ƒS.SceneReturn {
    console.log("Text Scene");

    let text = {
      Aisaka: {
        T0000: "Hallöchen <p>Dies ist ein Paragraph.</p>",
        T0001: "",
        T0002: ""

      }
    };


    ƒS.Speech.setTickerDelays(80, 5000);
    let signalDelay3: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(3)]);


    // function getAnimation(): ƒS.AnimationDefinition {
    //   return {
    //     start: { translation: ƒS.positions.bottomleft },
    //     end: { translation: ƒS.positions.bottomright },
    //     duration: 1,
    //     playmode: ƒS.ANIMATION_PLAYMODE.LOOP
    //   };
    // }


    ƒS.Speech.hide();
    await ƒS.Location.show(locations.beachEvening);
    await ƒS.update(transition.puzzle.duration, transition.puzzle.alpha, transition.puzzle.edge);
    await ƒS.Speech.tell(characters.aisaka, "Dieser Text wurde direkt über die tell()-Methode wiedergegeben.");
    signalDelay3();
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000 + dataForSave.nameProtagonist);
    dataForSave.nameProtagonist = await ƒS.Speech.getInput();
    characters.protagonist.name = dataForSave.nameProtagonist;
    console.log(dataForSave.nameProtagonist);
    // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(70, 100));
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
    ƒS.update(5);


    



  }

}