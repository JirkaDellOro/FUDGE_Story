namespace Tutorial {
  export async function Animation(): ƒS.SceneReturn {
    console.log("Animation");

    // let text: {
    //   Narrator: {
    //     T0000: "<i></i>",
    //     T0001: "<i></i>",
    //     T0002: "<i> </i>"
    //   }
    //   Aoi: {
    //     T0000: "Hello~"
    //   }
    // };


    // let animation: ƒS.AnimationDefinition = {
    //   start: { translation: ƒS.positions.bottomleft, rotation: -20, scaling: new ƒS.Position(0.5, 1.5), color: ƒS.Color.CSS("blue", 0) },
    //   end: { translation: ƒS.positions.bottomright, rotation: 20, scaling: new ƒS.Position(1.5, 0.5), color: ƒS.Color.CSS("red")},
    //   duration: 1,
    //   playmode: ƒS.ANIMATION_PLAYMODE.REVERSELOOP
    // };

    let animation2: ƒS.AnimationDefinition = {
      start: { translation: ƒS.positions.bottomleft},
      end: { translation: ƒS.positions.bottomright},
      duration: 3,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };



    ƒS.Speech.hide();
    await ƒS.Location.show(locations.bench);
    // await ƒS.Character.animate(characters.Aoi, characters.Aoi.pose.normal, animation);
    // await ƒS.update(2);
    await ƒS.Character.animate(characters.Aoi, characters.Aoi.pose.normal, animation2);
    await ƒS.update(2);



    






  }
}
