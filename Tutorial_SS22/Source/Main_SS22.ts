namespace Tutorial_SS22 {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Tutorial SS22 starting");


  // **** DEFINITIONEN ****
  // define transitions
  export let transitions = {
    puzzle: {
      duration: 1,
      alpha: "/Tutorial_SS22/FreeTransitions/jigsaw_06.jpg",
      edge: 1
    }
  };

  export let sound = {
    // themes
    nightclub: "/Tutorial_SS22/Audio/Nightclub.ogg"

    // SFX
    // click: "Pfad"
  };

  export let locations = {
    nightpark: {
      name: "Nightpark",
      // background: "/Tutorial_SS22/Images/Backgrounds/starry.gif"
      background: "/Tutorial_SS22/Images/Backgrounds/Bedroom_Night.png"
    }
    // starry: {
    //   name: "Starry",
    //   background: "Pfad"
    // }
  };

  export let characters = {
    narrator: {
      name: ""
    },
    aisaka: {
      name: "Aisaka",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        angry: "/Tutorial_SS22/Images/Characters/aisaka_angry.png",
        happy: "/Tutorial_SS22/Images/Characters/aisaka_happy.png",
        upset: ""
      }
    },
    kohana: {
      name: "Kohana",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        angry: "",
        happy: "/Tutorial_SS22/Images/Characters/kohana_happy.png",
        upset: "/Tutorial_SS22/Images/Characters/kohana_upset.png"
      }
    }
  };

  // **** DATEN DIE GESPEICHERT WERDEN SOLLEN ****
  export let dataForSave = {
    nameProtaginst: "",
    score: 0
  };


// **** CREDITS ****
  export function showCredits(): void {
    ƒS.Text.setClass("class2");
    ƒS.Text.print("Halleluja");
  }


  // **** MENÜ ****

  // Buttons
  let inGameMenuButtons = {
    save: "Save",
    load: "Load",
    close: "Close",
    credits: "Credits"
  };

  let gameMenu: ƒS.Menu;

  // true = offen; false = geschlossen
  let menuIsOpen: boolean = true;


  async function buttonFunctionalities(_option: string): Promise<void> {
    console.log(_option);
    switch (_option) {
      case inGameMenuButtons.save:
        await ƒS.Progress.save();
        break;
      case inGameMenuButtons.load:
        await ƒS.Progress.load();
        break;
      case inGameMenuButtons.close:
        gameMenu.close();
        menuIsOpen = false;
        break;
      case inGameMenuButtons.credits:
        showCredits();
    }
  }


  // Shortcuts für's Menü
  document.addEventListener("keydown", hndKeyPress);
  async function hndKeyPress(_event: KeyboardEvent): Promise<void> {
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.F8:
        console.log("Save");
        await ƒS.Progress.save();
        break;
      case ƒ.KEYBOARD_CODE.F9:
        console.log("Load");
        await ƒS.Progress.load();
        break;
      case ƒ.KEYBOARD_CODE.M:
        if (menuIsOpen) {
          console.log("Close");
          gameMenu.close();
          menuIsOpen = false;
        }
        else {
          console.log("Open");
          gameMenu.open();
          menuIsOpen = true;
        }
        break;
    }
  }


  window.addEventListener("load", start);
  // **** SZENENHIERARCHIE ****
  function start(_event: Event): void {
    gameMenu = ƒS.Menu.create(inGameMenuButtons, buttonFunctionalities, "gameMenuCSSclass");
    buttonFunctionalities("Close");
    let scenes: ƒS.Scenes = [
      // { scene: HowToText, name: "Text Scene" },
      { scene: HowToMakeChoices, name: "Choice Scene" }
    ];

    // start the sequence
    ƒS.Progress.go(scenes);
  }

  let uiElement: HTMLElement = document.querySelector("[type=interface]");
  dataForSave = ƒS.Progress.setData(dataForSave, uiElement);

}