namespace Tutorial {
  export async function Main(): ƒS.SceneReturn {
    console.log("Main Menu");

    let animation: ƒS.AnimationDefinition = {
      start: {rotation: 0, color: ƒ.Color.CSS("white")},
      end: {rotation: 90, color: ƒ.Color.CSS("red")},
      duration: 1,
      playmode: ƒ.ANIMATION_PLAYMODE.LOOP
    };

    await ƒS.Location.show(locations.city);
    // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.Character.animate(characters.Sue, characters.Sue.pose.normal, animation);
    await ƒS.update(2);
    await ƒS.Speech.tell(characters.Sue, "Willkommen zum Test von FUDGE-Story", false);
    await ƒS.Character.hide(characters.Sue);
    // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    // await ƒS.update(2);
  }
}