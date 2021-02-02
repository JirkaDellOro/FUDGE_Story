namespace Tutorial {
  export async function Main(): ƒS.SceneReturn {
    console.log("Main Menu");
    
    await ƒS.Location.show(locations.city);
    await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
    // await ƒT.Stage.showCharacter(characters.John, characters.John.pose.smile, ƒT.Stage.positions.right);

    /** Now lift the curtain */
    await ƒS.update( /* Transition */);
  }
}