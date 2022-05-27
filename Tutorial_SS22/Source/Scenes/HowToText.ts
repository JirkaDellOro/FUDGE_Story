namespace Tutorial_SS22 {
  export async function HowToText(): ƒS.SceneReturn {
    console.log("Let's text!");

    let text = {
      Aisaka: {
        T0000: "Sei gegrüßt, Erdling.",
        T0001: "Kleiner Scherz, willkommen zum Tutorial!"
      }
    };



   


    ƒS.Speech.hide();
    await ƒS.Location.show(locations.nightpark);
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(70, 100));
    ƒS.update();
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0001);
    await ƒS.Speech.tell(characters.aisaka, "Dieser Text wird als direkter String in der tell-Methode ausgegeben.");
    await ƒS.Speech.tell(characters.aisaka, "Hierfür wird lediglich nach Angabe des Charakters, bei dem dieser Text erscheinen soll, der Text in Anführungsstrichen dahinter geschrieben.");




  }
}