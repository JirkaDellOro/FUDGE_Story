namespace Tutorial_WS21 {
  export async function Scene3(): ƒS.SceneReturn {
    console.log("Intro");


    let text = {
      narrator: {
        T0000: "",
        T0001: ""
      },
      aisaka: {
        T0000: "This is Scene3",
        T0001: ""
      },
      kohana: {
        T0000: "Szene3"
      }
    };




    await ƒS.Location.show(locations.bedroom);
    await ƒS.update(transitions.clock.duration, transitions.clock.alpha, transitions.clock.edge);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(30, 100));
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.aisaka, text.aisaka.T0000);
    await ƒS.Character.hide(characters.aisaka);
    await ƒS.update(4);


    // return "Szene2";

  }

}

