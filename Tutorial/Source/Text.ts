namespace Tutorial {
  export async function Text(): ƒS.SceneReturn {
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
        T0000: "Willkommen.",
        T0001: ""
      }
    };



    ƒS.Speech.hide();
    await ƒS.Location.show(locations.city);
    await ƒS.update(transition.clock.duration, transition.clock.alpha, transition.clock.edge);
    // await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positionPercent(30, 100));
    await ƒS.update(1);
    ƒS.Speech.show();
    await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0000);
    await ƒS.Speech.tell(characters.Ryu, "Fremder.");
    await ƒS.Character.hide(characters.Ryu);
    await ƒS.update(1);








  }

}

