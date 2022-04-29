namespace Tutorial_SS22 {
  export async function HowToText(): ƒS.SceneReturn {
    console.log("Let's text!");

    let text = {
      Narrator: {
        T0000: "",
        T0001: "",
        T0002: ""
      },
      Aisaka: {
        T0000: "Sei gegrüßt, Erdling.",
        T0001: "Kleiner Scherz, willkommen zum Tutorial!"
      }
    };

    
    ƒS.Speech.hide();
    await ƒS.Location.show(locations.nightpark);
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0001);
    await ƒS.Speech.tell(characters.aisaka, "Dieser Text wurde vorher nicht deklariert.");


  }
}