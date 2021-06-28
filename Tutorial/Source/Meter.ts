namespace Tutorial {
  export async function Meter(): ƒS.SceneReturn {
    console.log("Text");

    let text = {
      Narrator: {
        T0000: "",
        T0001: ""
      },
      Protagonist: {
        T0000: "",
        T0001: ""
      },
      Ryu: {
        T0000: "Du hast bisher ganz gut durchgehalten...",
        T0001: "Weiter so."
      }
    };


    document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = true);
    document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = true);

    // ƒS.Speech.hide();
    await ƒS.Location.show(locations.bench);
    await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positionPercent(30, 100));
    await ƒS.update(1);
    ƒS.Speech.show();
    document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = false);
    document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = false);

    await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0000);

    dataForSave.scoreRyu += 50;
    dataForSave.scoreForRyu = "You earned 50 points on Ryus bar",
    // dataForSave.scoreAoi += 15;
    // dataForSave.scoreForAoi = "You earned 15 points on Aois bar",

    

    await ƒS.update(1);
    await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0001);
    // document.getElementById("meterli").hidden = true;
    // document.getElementById("meterInput").hidden = true;
    // beide auf einmal hiden
    // document.getElementsByName("a").forEach(meterStuff => meterStuff.hidden = true);
    await ƒS.Character.hide(characters.Ryu);


    // dataForSave.state.scoreAoi += 100;










  }




}

