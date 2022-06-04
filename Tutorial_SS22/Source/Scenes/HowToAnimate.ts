namespace Tutorial_SS22 {
  export async function HowToAnimate(): ƒS.SceneReturn {
    console.log("Let's animate!");

    let text = {
      Narrator: {
        T0000: "Wenn du in den Szenen-Code schaust, wirst du bemerken,...",
        T0001: "dass dieser Text nicht manuell,...",
        T0002: "sondern mit einer for of-Schleife wiedergegeben wird."
      },
      Aisaka: {
        T0000: "Ich bin ein Geist!",
        T0001: "Muhahaha"
      }
    };

    // dataForSave.pickedAnimationScene = true;
    
    // Any text content within the above Narrator-key will be played one after another (as it should be) by this code
    for (let narratorText of Object.values(text.Narrator)) {
      await ƒS.Speech.tell(text.Aisaka, narratorText);
    }


    ƒS.Speech.hide();
    await ƒS.Location.show(locations.bedroomAtNight);
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
    // ƒS.update();
    await ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, ghostAnimation());
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0001);
    await ƒS.Speech.tell(characters.aisaka, "Mich wirst du niemals finden!");


    // return "GoodEnding";


  



  }



}