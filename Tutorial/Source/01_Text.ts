namespace Tutorial {
  export async function Text(): ƒS.SceneReturn {
    console.log("Tutorial");

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



    await ƒS.Location.show(locations.city);
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0000);
    await ƒS.Speech.tell(characters.Ryu, "Fremder.");





  }
}