namespace Tutorial_WS22 {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;
  console.log("Tutorial WS22 starting");

  export let transition = {
    puzzle: {
      duration: 1,
      alpha: "Images/Transitions/jigsaw_06.jpg",
      edge: 1
    }
  };

  export let sound = {
    // themes

    // SFX
    drop: "Audio/drop.mp3"

  };

  export let locations = {
    beachDay: {
      name: "Beach Day",
      background: "Images/Backgrounds/Beach_day.png"
    },
    beachEvening: {
      name: "Beach Evening",
      background: "Images/Backgrounds/Beach_evening.png"
    }
  };

  export let characters = {
    narrator: {
      name: ""
    },
    protagonist: {
      name: ""
    },
    aisaka: {
      name: "Aisaka",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        angry: "",
        happy: "Images/Characters/aisaka_happy.png",
        upset: ""
      }
    }
  };

  // **** DATA THAT WILL BE SAVED (GAME PROGRESS) ****
  export let dataForSave = {
    nameProtagonist: ""
  };


  // Menu shortcuts
  let inGameMenuButtons = {
    save: "Save",
    load: "Load",
    close: "Close"
  };

  let gameMenu: ƒS.Menu;

  // open entspricht Menü ist offen und false zu 
  let menuIsOpen: boolean = true;

  async function buttonFunctionalities(_option: string): Promise<void> {
    console.log(_option);
    switch(_option) {
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
    }
  }

  //  Menu shortcuts
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
  function start(_event: Event): void {
    gameMenu = ƒS.Menu.create(inGameMenuButtons, buttonFunctionalities, "gameMenuCSSClass");
    buttonFunctionalities("Close");
    // **** SCENE HIERARCHY ****
    let scenes: ƒS.Scenes = [
      // { scene: Texting, name: "How To Text"}
      { scene: Text, name: "Text Scene" },
      { scene: Scene2, name: "Scene2" }

    ];

    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);


    // start the sequence
    ƒS.Progress.go(scenes);
  }


}