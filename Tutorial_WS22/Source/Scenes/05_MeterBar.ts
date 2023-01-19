


namespace Tutorial_WS22 {
  export async function MeterBar(): ƒS.SceneReturn {
    console.log("Meterbar");

    let text = {
      Aisaka: {
        T0000: "Lass uns zusammen eine Meterbar erstellen!</p>",
        T0001: "",
        T0002: ""

      }
    };


    document.getElementsByName("aisakaScore").forEach(meterStuff => meterStuff.hidden = false);
  

    ƒS.Speech.hide();
    await ƒS.Location.show(locations.beachEvening);
    await ƒS.update(2, "Images/Transitions/jigsaw_06.jpg");
    await ƒS.Speech.tell(characters.aisaka, "Nun kommen wir zur Meterbar");
    // Punktevergabe, visualisiert durch eine Skala
    dataForSave.aisakaScore += 20;
    // Test-Novelpage
    ƒS.Text.addClass("novelpage");
    await ƒS.Text.print("Hi");
    dataForSave.aisakaScore += 50;
    console.log(dataForSave.nameProtagonist);
    await ƒS.Speech.tell(characters.aisaka, "Hast du gesehen wie sie sich füllt?");
    ƒS.Speech.clear();
    ƒS.Speech.hide();


    



  }

}