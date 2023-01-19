namespace Tutorial_WS22 {
  export async function Animations(): ƒS.SceneReturn {
    console.log("Animation scene started");



    document.getElementsByName("aisakaScore").forEach(meterStuff => meterStuff.hidden = true);
    document.getElementById("scoreForAisaka").style.display = "none";

    ƒS.Speech.hide();
    await ƒS.Location.show(locations.beachDay);
    // await ƒS.update(transition.puzzle.duration, transition.puzzle.alpha, transition.puzzle.edge);
    await ƒS.update(1, "Images/Transitions/jigsaw_06.jpg");
    await ƒS.Speech.tell(characters.aisaka, "Gleich wirst du eine Animation sehen.");
    await ƒS.Speech.tell(characters.aisaka, "Bist du bereit?");
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
    ƒS.update(2);
    await ƒS.Speech.tell(characters.aisaka, "Los geht's!");
    await ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, getAnimation());
    ƒS.update(2);
    await ƒS.Speech.tell(characters.aisaka, "Tadaah.");



    ƒS.Speech.clear();
    ƒS.Speech.hide();
    // ƒS.update(1);
  }
}