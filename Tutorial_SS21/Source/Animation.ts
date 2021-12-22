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


    document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = true);
    document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = true);
    gameMenu.close();
    menu = false;

    ƒS.Speech.hide();
    await ƒS.Location.show(locations.bench);
    // await ƒS.Character.animate(characters.Aoi, characters.Aoi.pose.normal, animation);
    // await ƒS.Character.show(characters.Aoi, characters.Aoi.pose.normal, ƒS.positions.bottomleft);
    await ƒS.Character.animate(characters.Aoi, characters.Aoi.pose.normal, leftToRight());
    // await ƒS.Character.animate(characters.Aoi, characters.Aoi.pose.normal, fromRightToOutOfCanvas());

    await ƒS.Character.hide(characters.Aoi);

    await ƒS.update(2);

    // await ƒS.Character.hide(characters.Aoi);
    // await ƒS.update(2);












  }
}
