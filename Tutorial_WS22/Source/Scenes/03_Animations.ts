namespace Tutorial_WS22 {
  export async function Animations(): ƒS.SceneReturn {
    console.log("Animation scene started");


    let signalDelay1: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(1)]);

    document.getElementsByName("aisakaScore").forEach(meterStuff => meterStuff.hidden = true);
    document.getElementById("scoreForAisaka").style.display = "none";

    ƒS.Speech.hide();
    await ƒS.Location.show(locations.beachDay);
    // await ƒS.update(transition.puzzle.duration, transition.puzzle.alpha, transition.puzzle.edge);
    await ƒS.update(1, "Images/Transitions/jigsaw_06.jpg");
    await ƒS.Speech.tell(characters.aisaka, "Gleich wirst du eine Animation sehen.");
    await ƒS.Speech.tell(characters.aisaka, "Bist du bereit?");
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.aisaka, "Los geht's!");
    // signalDelay1();
    
    await ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, getAnimation());
  
    await ƒS.Speech.tell(characters.aisaka, "Tadaah.");
    await ƒS.Character.hide(characters.aisaka);
    await ƒS.update(1);



    ƒS.Speech.clear();
    ƒS.Speech.hide();
    await ƒS.update(0.5);
    // signalDelay1();
  }
}