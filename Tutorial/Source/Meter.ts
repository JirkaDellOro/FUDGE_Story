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
        T0000: "Ich werde dir nun ein paar Fragen stellen...",
        T0001: "Dann wirst du verstehen, wozu die Skala da ist."
      }
    };



    ƒS.Speech.hide();
    await ƒS.Location.show(locations.bench);
    await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positionPercent(30, 100));
    await ƒS.update(1);
    ƒS.Speech.show();
    await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0000);

    dataForSave.state.a += 53;


    await ƒS.update(1);
    await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0001);
    document.getElementById("meterli").hidden = true;
    document.getElementById("meterInput").hidden = true;
    await ƒS.Character.hide(characters.Ryu);


    dataForSave.state.a += 100;










  }




}

