namespace Tutorial {
  export async function Animation(): ƒS.SceneReturn {
    console.log("Animation");

    let animation: ƒS.AnimationDefinition = {
      start: {translation: ƒS.positions.bottomleft, rotation: -20, scaling: new ƒS.Position(0.5, 1.5), color: ƒS.Color.CSS("white", 0)},
      end: {translation: ƒS.positions.bottomright, rotation: 20, scaling: new ƒS.Position(1.5, 0.5), color: ƒS.Color.CSS("red")},
      duration: 1,
      playmode: ƒS.ANIMATION_PLAYMODE.LOOP
    };

    await ƒS.Location.show(locations.city);
    // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.Character.animate(characters.Sue, characters.Sue.pose.normal, animation);
    await ƒS.update(2);
    await ƒS.Speech.tell(characters.Sue, "Willkommen zum Tutorial von FUDGE-Story", false);
    await ƒS.Character.hide(characters.Sue);
    // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    // await ƒS.update(2);
  }
}