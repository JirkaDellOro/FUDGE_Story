namespace Tutorial_SS22 {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;
  console.log("Tutorial SS22 starting");


  // **** TRANSITIONS ****
  // transitions is declared here as well as initialized
  export let transitions = {
    puzzle: {
      duration: 1,
      alpha: "FreeTransitions/jigsaw_06.jpg",
      edge: 1
    }
  };

  // **** SOUND ****
  // sound is declared here as well as initialized
  export let sound = {
    // themes
    nightclub: "Audio/Nightclub.ogg"

    // SFX
    // click: "Pfad"
  };

  // **** LOCATIONS ****
  export let locations = {
    bedroomAtNight: {
      name: "Bedroom in night mode",
      background: "Images/Backgrounds/Bedroom_Night.png"
    },
    bathroom: {
      name: "Bathroom",
      background: "Images/Backgrounds/Bathroom.png"
    },
    bathroomFoggy: {
      name: "Bathroom foggy",
      background: "Images/Backgrounds/Bathroom_Foggy.png"
    },
    radio: {
      name: "Radio",
      background: "Images/Backgrounds/radio.png"
      // foreground: "Images/Backgrounds/radio.png"
    }
  };

  // **** CHARACTERS ****
  // characters is declared here as well as initialized
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
        angry: "Images/Characters/aisaka_angry.png",
        happy: "Images/Characters/aisaka_happy.png",
        upset: ""
      }
    },
    kohana: {
      name: "Kohana",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        angry: "",
        happy: "Images/Characters/kohana_happy.png",
        upset: "Images/Characters/kohana_upset.png"
      }
    }
  };



  // **** ITEMS ****
  // items is declared here as well as initialized
  export let items = {
    blobRED: {
      name: "Blob Red",
      description: "A reddish something",
      image: "Images/Items/blobRED.png",
      static: true
    },
    blobBU: {
      name: "Blob Blue",
      description: "A blueish something",
      image: "Images/Items/blobBU.png"
    },
    blobDKBU: {
      name: "Blob DK Blue",
      description: "A dark blueish something",
      image: "Images/Items/blobDKBU.png"
    },
    blobGN: {
      name: "Blob Green",
      description: "A greenish something",
      image: "Images/Items/blobGN.png"
    },
    blobPK: {
      name: "Blob Pink",
      description: "A pinkish something",
      image: "Images/Items/blobPK.png"
    },
    blobYL: {
      name: "Blob Yellow",
      description: "A yellowish something",
      image: "Images/Items/blobYL.png"
    },
    blobOG: {
      name: "Blob Orange",
      description: "An orangeish something",
      image: "Images/Items/blobOG.png"
    }
  };

  // **** DATA THAT WILL BE SAVED (GAME PROGRESS) ****
  export let dataForSave = {
    nameProtagonist: "",
    aisakaScore: 0,
    scoreForAisaka: "",
    randomPoints: 0,
    pickedAnimationScene: false,
    pickedInventoryScene: false,
    pickedMeterScene: false,
    pickedChoice: false
  };


  // **** CREDITS ****
  export function showCredits(): void {
    ƒS.Text.setClass("credits");
    ƒS.Text.print("Halleluja");
  }


  // **** ANIMATIONS ****
  export function ghostAnimation(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positionPercent(70, 100), color: ƒS.Color.CSS("lightblue", 1) },
      end: { translation: ƒS.positionPercent(80, 100), color: ƒS.Color.CSS("lightblue", 0) },
      duration: 3,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  export function leftToRight(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positionPercent(70, 100) },
      end: { translation: ƒS.positionPercent(80, 100) },
      duration: 2,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  // export function getAnimation(): ƒS.AnimationDefinition {
  //   return {
  //     start: { translation: ƒS.positions.bottomleft, rotation: -20, scaling: new ƒS.Position(0.5, 1.5), color: ƒS.Color.CSS("white", 0.3) },
  //     end: { translation: ƒS.positions.bottomright, rotation: 20, scaling: new ƒS.Position(1.5, 0.5), color: ƒS.Color.CSS("red") },
  //     duration: 1,
  //     playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
  //   };
  // }


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

  // Menu shortcuts
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
      // Inventory shortcuts
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


  window.addEventListener("load", start);
  function start(_event: Event): void {
    gameMenu = ƒS.Menu.create(inGameMenuButtons, buttonFunctionalities, "gameMenuCSSclass");
    buttonFunctionalities("Close");
    // **** SCENE HIERARCHY ****
    let scenes: ƒS.Scenes = [
      { scene: HowToText, name: "Text Scene" },
      // { scene: HowToMakeChoices, name: "Choices" },
      { scene: HowToMakeChoices2, name: "Choices" },
      // { scene: HowToMakeARadio, name: "Radio" },
      // { scene: HowToMakeAMeterBar, name: "Meter bar" },

      // The id field of "next" must be filled with the id of the next wished scene to play
      { id: "Animation Scene", scene: HowToAnimate, name: "Animations", next: "Good Ending" },
      { id: "Inventory Scene", scene: HowToMakeAnInventory, name: "Inventory", next: "Bad Ending" },

      // Branching paths
      { id: "Good Ending", scene: GoodEnding, name: "This is a good ending", next: "Empty Scene" },
      { id: "Bad Ending", scene: BadEnding, name: "This is a bad ending", next: "Empty Scene" },

      // Empty ending scene to stop the program
      { id: "Empty Scene", scene: Empty, name: "END" }

    ];

    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);


    // start the sequence
    ƒS.Progress.go(scenes);
  }


}