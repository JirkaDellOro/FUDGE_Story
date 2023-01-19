namespace Tutorial_SS22 {
  export async function HowToMakeAMeterBar(): ƒS.SceneReturn {
    console.log("Let's make a meter bar!");

    let text = {
      Aisaka: {
        T0000: "Wie du vielleicht bemerkt hast, gibt es in Visual Novels häufig eine Skala oder eine Meterbar.",
        T0001: "Damit visualisieren Autoren dem Spieler zum Beispiel die Empathie-Punkte bei der jeweiligen Figur.",
        T0002: ""
      }
    };

    dataForSave.pickedMeterScene = true;
    document.getElementsByName("aisakaScore").forEach(meterStuff => meterStuff.hidden = false);
    // document.getElementById("scoreForAisaka").style.display = "none";

    ƒS.Speech.hide();
    dataForSave.aisakaScore += 50;
    console.log(dataForSave.aisakaScore);
    await ƒS.Location.show(locations.bathroom);
    ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);
    dataForSave.aisakaScore -= 40;
    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0001);
    await ƒS.Location.show(locations.bathroomFoggy);
    await ƒS.update(3);
    dataForSave.aisakaScore += 50;
    console.log(dataForSave.aisakaScore);



    // return "Good Ending";






  }



}





