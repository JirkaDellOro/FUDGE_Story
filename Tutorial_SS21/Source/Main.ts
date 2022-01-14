namespace Tutorial {

  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Start");





  // define transitions
  export let transition = {
    clock: {
      duration: 1.5,
      alpha: "FreeTransitions/WipesAndOther/circlewipe-ccw.jpg",
      edge: 1
    }
    // wipe: {
    //   duration: 1,
    //   alpha: "",
    //   edge: 2
    // }
  };

  // define sound
  export let sound = {
    // Music
    backgroundTheme: "Audio/Nightclub.ogg",
    dystopian: "Audio/Dystopian.ogg",

    // Sound
    click: ""
  };

  export let locations = {
    city: {
      name: "Cloudy City",
      background: "Images/Backgrounds/bg_city_cloudy.png"
    },
    bench: {
      name: "Bench 1",
      background: "Images/Backgrounds/bg_bench.png"
    }
  };


  // define characters that will show on the stage with some data 
  export let characters = {
    Narrator: {
      name: ""
    },
    Aoi: {
      name: "Aoi",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        normal: "Images/Characters/Aoi_normal.png"
      }
    },
    Ryu: {
      name: "Ryu",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        normal: "Images/Characters/Ryu_normal.png",
        smile: ""
      }
    }
  };


  // define items as key-object-pairs, the objects with the properties name, description and an address to an image
  export let items = {
    BlobRED: {
      name: "Blob Red",
      description: "A reddish something",
      image: "Images/Items/blobRED.png"
    },
    BlobBU: {
      name: "Blob Blue",
      description: "A blueish something",
      image: "Images/Items/blobBU.png"
    },
    BlobDKBU: {
      name: "Blob DK Blue",
      description: "A dark blueish something",
      image: "Images/Items/blobDKBU.png"
    },
    BlobGN: {
      name: "Blob Green",
      description: "A greenish something",
      image: "Images/Items/blobGN.png"
    },
    BlobPK: {
      name: "Blob Pink",
      description: "A pinkish something",
      image: "Images/Items/blobPK.png"
    },
    BlobYL: {
      name: "Blob Yellow",
      description: "A yellowish something",
      image: "Images/Items/blobYL.png"
    },
    BlobOG: {
      name: "Blob Orange",
      description: "An orangeish something",
      image: "Images/Items/blobOG.png"
    }
  };

  // tell FUDGE Story the data to save besides the current scene
  export let dataForSave = {
    score: 0,
    // to fix
    Protagonist: {
      name: "Protagonist"
    },
    nameProtagonist: "Protagonist",
    scoreAoi: 0,
    scoreForAoi: "",
    scoreRyu: 0,
    scoreForRyu: "",
    started: false,
    ended: false,
    pickedText: false,
    goToInventory: false
  };


  //  MENU - Audio functions

  let volume: number = 1.0;

  export function incrementSound(): void {
    if (volume >= 100)
      return;
    volume += 0.5;
    ƒS.Sound.setMasterVolume(1.3);
  }

  export function decrementSound(): void {
    if (volume <= 0)
      return;
    volume -= 0.5;
    ƒS.Sound.setMasterVolume(0.7);
  }

  export function showCredits(): void {
    ƒS.Text.addClass("credits");
    ƒS.Text.print("Hier könnten jetzt Credits stehen.");

    // showCredits();
  }

  // MENU - create Menu with Buttons

  let inGameMenu = {
    save: "Save",
    load: "Load",
    close: "Close",
    turnUpVolume: "+",
    turndownVolume: "-",
    credits: "Credits",
    about: "About",
    open: "Open"
  };




  // MENU - create Menu with buttons
  let gameMenu: ƒS.Menu;

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
        break;
      case inGameMenu.open:
        gameMenu.open();
        break;
      case inGameMenu.credits:
        showCredits();
        break;
    }


    // if (_option == inGameMenu.save) {
    //   await ƒS.Progress.save();
    // }
    // else if (_option == inGameMenu.load) {
    //   await ƒS.Progress.load();
    // }
    // else if (_option == inGameMenu.turnUpVolume) {
    //   incrementSound();
    // }
    // else if (_option == inGameMenu.turndownVolume) {
    //   decrementSound();
    // }
    // if (_option == inGameMenu.close) {
    //   gameMenu.close();
    // }
    // if (_option == inGameMenu.open) {
    //   gameMenu.open();
    // }
    // if (_option == inGameMenu.credits) {
    //   showCredits();
    // }
  }


  // true heißt hier offen und false geschlossen
  let menu: boolean = true;

  // shortcuts to save and load game progress
  // && doesn't work in a switch
  document.addEventListener("keydown", hndKeypress);
  async function hndKeypress(_event: KeyboardEvent): Promise<void> {
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.F8:
        console.log("Save");
        await ƒS.Progress.save();
        break;
      case ƒ.KEYBOARD_CODE.F9:
        console.log("Load");
        await ƒS.Progress.load();
        break;
      // case ƒ.KEYBOARD_CODE.X:
      //   console.log("Close");
      //   gameMenu.close();
      //   break;
      // Englische Tastatur beachten, Öffnen und Schließen des Inventars mit derselben Taste
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


  // shortcuts to open and close the inventory
  document.addEventListener("keydown", hndKeypressForInventory);
  async function hndKeypressForInventory(_event: KeyboardEvent): Promise<void> {
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.I:
        console.log("open inventory");
        await ƒS.Inventory.open();
        break;
      case ƒ.KEYBOARD_CODE.ESC:
        console.log("close inventory");
        await ƒS.Inventory.open();
        ƒS.Inventory.close();
        break;
    }
  }

  export function leftToRight(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positions.bottomleft },
      end: { translation: ƒS.positions.bottomright },
      duration: 3,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  export function fromRightToOutOfCanvas(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positionPercent(30, 100) },
      end: { translation: ƒS.positionPercent(120, 100) },
      duration: 3,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }


  window.addEventListener("load", start);
  function start(_event: Event): void {
    // MENU
    gameMenu =
      ƒS.Menu.create(inGameMenu, buttonFunctionalities, "gameMenu");



    // define the sequence of scenes, each scene as an object with a reference to the scene-function, a name and optionally an id and an id to continue the story with
    let scenes: ƒS.Scenes = [
      // linear path
      { scene: Text, name: "How To Text" },
      { scene: Decision, name: "How To Decide" },


      // Gabelung
      // Pfad 1
      { id: "NovelPages", scene: NovelPages, name: "Different uses of novel pages", next: "Animation" },
      { id: "Animation", scene: Animation, name: "How To Animate", next: "End" },

      // Pfad 2
      { id: "Inventory", scene: Inventory, name: "How To Make An Inventory", next: "Meter" },
      { id: "Meter", scene: Meter, name: "How To Make a Progress bar", next: "End" }

      // { scene: Animation, name: "How To Animate" },
      // { scene: GameMenu, name: "How To Make A Game Menu" },
      // { scene: Meter, name: "How To Make a Progress bar" },

      // { id: "End", scene: End, name: "This is an ending" }

    ];



    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);


    // start the sequence
    ƒS.Progress.go(scenes);
  }
}