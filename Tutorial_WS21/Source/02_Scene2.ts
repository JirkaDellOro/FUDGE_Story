namespace Tutorial_WS21 {
  export async function Scene2(): ƒS.SceneReturn {
    console.log("Szene2");


    let text = {
      narrator: {
        T0000: "",
        T0001: ""
      },
      aisaka: {
        T0000: "HEY",
        T0001: ""
      },
      kohana: {
        T0000: "HII"
      }
    };




    await ƒS.Location.show(locations.bedroom);
    await ƒS.update(1);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(30, 100));
    await ƒS.update(1);
    // Novel Page
    ƒS.Text.setClass("text");
    ƒS.Text.print("Lies mich.");
  
    await ƒS.Speech.tell(characters.aisaka, text.aisaka.T0000);
    dataForSave.points += 10;
    console.log(dataForSave.points);
    await ƒS.Speech.tell(characters.aisaka, "Helloo");
    await ƒS.Character.hide(characters.aisaka);
    await ƒS.update(1);


    // return "";

    // if (dataForSave.points == 50) {
    //   return "";
      // return SzenenFunktionsname();
    // }


  }

}

