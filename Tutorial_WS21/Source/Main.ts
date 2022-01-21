namespace Tutorial_WS21 {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Tutorial_WS21 starting");


  // define transitions
  export let transitions = {
    clock: {
      duration: 1,
      alpha: "./FreeTransitions/JigsawThemedTransitions/puzzle.png",
      edge: 1
    }
  };


  export let sound = {
    // music
    backgroundTheme: "./Audio/Dystopian.ogg",

    // sound
    click: ""
  };

  // Items
  // export let items = {
  //   pen: {
  //     name: "Roter Buntstift",
  //     description: "A red pen",
  //     image: "./Images/Items/redPen.png"
  //   }
  // };


  export let locations = {
    bedroom: {
      name: "Bedroom",
      background: "./Images/Backgrounds/Bedroom.png"
    },
    kitchen: {
      name: "BedroomNight",
      background: "./Images/Backgrounds/Bedroom_Night.png"
    }
  };

  // Stilfrage - Eigenen Styleguide für FS veröffentlichen? 
  export let characters = {
    narrator: {
      name: ""
    },
    aisaka: {
      name: "Aisaka",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        angry: "./Images/Characters/aisaka_angry.png",
        happy: "./Images/Characters/aisaka_happy.png",
        upset: "./Images/Characters/aisaka_upset.png"
      }
    },
    kohana: {
      name: "Kohana",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        angry: "./Images/Characters/kohana_angry.png",
        happy: "./Images/Characters/kohana_happy.png",
        upset: "./Images/Characters/kohana_upset.png"
      }
    }
  };


  // Animationen
  export function fromRightToOutOfCanvas(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positionPercent(30, 100) },
      end: { translation: ƒS.positionPercent(120, 100) },
      duration: 1,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  export function fromRightToLeft(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positions.bottomright },
      end: { translation: ƒS.positions.bottomleft },
      duration: 1,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  export let dataForSave = {
    nameProtagonist: "",
    points: 0
    // started: false,
    // ended: false
  };


  //  MENU - Audio functions

  let volume: number = 1.0;

  export function incrementSound(): void {
    if (volume >= 100)
      return;
    volume += 0.5;
    ƒS.Sound.setMasterVolume(volume);
  }

  export function decrementSound(): void {
    if (volume <= 0)
      return;
    volume -= 0.5;
    ƒS.Sound.setMasterVolume(volume);
  }


  // Menü 

  let inGameMenu = {
    save: "Save",
    load: "Load",
    close: "Close",
    turnUpVolume: "+",
    turnDownVolume: "-"
    // open: "Open"
  };


  let gameMenu: ƒS.Menu;

  // true = offen; false = geschlossen
  let menu: boolean = true;

  async function buttonFunctionalities(_option: string): Promise<void> {
    console.log(_option);
    switch (_option) {
      case inGameMenu.save:
        await ƒS.Progress.save();
        break;
      case inGameMenu.load:
        await ƒS.Progress.load();
        break;
      case inGameMenu.close:
        gameMenu.close();
        menu = false;
        break;
      case inGameMenu.turnUpVolume:
        incrementSound();
        break;
      case inGameMenu.turnDownVolume:
        decrementSound();
      // case inGameMenu.open:
      //   gameMenu.open();
      //   menu = true;
      //   break;
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
        if (menu) {
          console.log("Close");
          gameMenu.close();
          menu = false;
        }
        else {
          console.log("Open");
          gameMenu.open();
          menu = true;
        }
        break;
    }
  }




  // Szenenstruktur
  window.addEventListener("load", start);
  function start(_event: Event): void {
    // Menü
    gameMenu = ƒS.Menu.create(inGameMenu, buttonFunctionalities, "gameMenu");
    // Menü zu Beginn geschlossen halten
    buttonFunctionalities("Close");
    let scenes: ƒS.Scenes = [
      // Linear
      // { id: "Einführung", scene: Introduction, name: "Introduction to FS", next: "Ende"},
      { scene: Introduction, name: "Introduction to FS" }
      // { scene: Scene2, name: "Scene Two" }
      // { id: "Ende", scene: End, name: "The End" }


    ];



    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);


    // start the sequence
    ƒS.Progress.go(scenes);
  }


}