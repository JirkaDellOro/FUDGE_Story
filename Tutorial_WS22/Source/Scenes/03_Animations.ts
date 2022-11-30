namespace Tutorial_WS22 {
  export async function Animations(): ƒS.SceneReturn {
    console.log("Animation scene started");



    await ƒS.Location.show(locations.beachDay);
    ƒS.update(1);
    // await ƒS.update(1, "Images/jigsaw_06.jpg");
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
    // await ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, ghostAnimation());

    ƒS.update(1);
  }
}