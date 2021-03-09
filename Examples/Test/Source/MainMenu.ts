namespace Tutorial {
  export async function Main(): ƒS.SceneReturn {
    console.log("Main Menu");

    await ƒS.Location.show(locations.city);
    await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.update(2);
    await ƒS.Speech.tell(characters.Sue, "Willkommen zum Test von FUDGE-Story", false);
  }
}