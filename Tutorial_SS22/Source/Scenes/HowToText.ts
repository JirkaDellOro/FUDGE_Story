namespace Tutorial_SS22 {
  export async function HowToText(): ƒS.SceneReturn {
    console.log("Let's text!");

    // This text was moved to a separate dialogue file in the folder "Definitions"
    // let text = {
    //   Aisaka: {
    //     T0000: "Sei gegrüßt, Erdling.",
    //     T0001: "Kleiner Scherz, willkommen zum Tutorial!"
    //   }
    // };

    // dataForSave.pickedMeterScene = true;
    document.getElementsByName("aisakaScore").forEach(meterStuff => meterStuff.hidden = true);
    document.getElementById("scoreForAisaka").style.display = "none";


    let signalDelay1: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(1)]);
    // let signalDelay2: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(2)]);


    ƒS.Speech.hide();
    await ƒS.Location.show(locations.bedroomAtNight);
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(70, 100));
    ƒS.update();
    await ƒS.Speech.tell(characters.aisaka, textAusgelagert.Aisaka.T0000);
    await ƒS.Speech.tell(characters.aisaka, textAusgelagert.Aisaka.T0001);
    await ƒS.Speech.tell(characters.aisaka, "...und <strong>dieser</strong> Text wird als direkter String in der tell-Methode ausgegeben.");
    await ƒS.Speech.tell(characters.aisaka, "Hierfür wird lediglich nach Angabe des Charakters, bei dem dieser Text erscheinen soll, der Text in Anführungsstrichen dahinter geschrieben.");
    await signalDelay1();


    ƒS.Speech.hide();

    let pages: string[] = ["<strong>Ende-zu-Ende-Verschlüsselung:</strong><br\>Nur beide Kommunikationspartner nehmen das Ver- und Entschlüsseln der übertragenen Informationen direkt vor. \
          Andere Stationen die an der Übertragung der Informationen beteiligt sind, können nicht darauf zugreifen.<br\><br\><br\><br\><br\><br\><br\>Seite 1", "Langzeitverschlüsselung,\
          <br\>Verschlüsselte Nutzerprofile,<br\>Telefonbuch-Kontakte werden nicht auf die Betriebsserver geladen,<br\>Sicherung und Schutz persönlicher Informationen durch persönliche PIN,\
          <br\>Gesprächsverschlüsselung,<br\>kein Tracking \
          <br\><br\>Seite 2", "Seite 3", "Seite 4", "Seite 5", "Seite 6", "Seite 7", "Seite 8"];
    let current: number = 0;
    let flip = { back: "Back", next: "Next", done: "Close" };
    let choice: string;
    ƒS.Text.addClass("flip");
    do {
      ƒS.Text.print(pages[current]);
      choice = await ƒS.Menu.getInput(flip, "flip");
      switch (choice) {
        case flip.back: current = Math.max(0, current - 1); break;
        case flip.next: current = Math.min(2, current + 1); break;
      }
    } while (choice != flip.done);
    ƒS.Text.close();

  }
}