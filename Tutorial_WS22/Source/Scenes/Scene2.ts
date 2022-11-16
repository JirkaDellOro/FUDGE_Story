namespace Tutorial_WS22 {
  export async function Scene2(): ƒS.SceneReturn {
    console.log("Scene2");



    await ƒS.Location.show(locations.beachDay);
    ƒS.update(1);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);

    ƒS.update(1);
  }
}