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

  // items wird hier deklariert und initialisiert
  export let items = {
    BlobRED: {
      name: "Blob Red",
      description: "A reddish something",
      image: "/Tutorial_SS22/Images/Items/blobRED.png",
      static: true
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
    },
    Stick: {
      name: "Stick",
      description: "Just a stick",
      image: "Images/Items/blobOG.png"
    }
  };

  // **** DATEN DIE GESPEICHERT WERDEN SOLLEN ****
  export let dataForSave = {
    nameProtagonist: "",
    score: 0,
    pickedThisScene: false
  };


  // **** CREDITS ****
  export function showCredits(): void {
    ƒS.Text.setClass("credits");
    ƒS.Text.print("Halleluja");
  }


  // **** ANIMATIONEN ****

  export function leftToRight(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positionPercent(70, 100), color: ƒS.Color.CSS("lightblue", 1) },
      end: { translation: ƒS.positionPercent(80, 100), color: ƒS.Color.CSS("lightblue", 0) },
      duration: 3,
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
      // Shortcut Inventar
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
  // **** SZENENHIERARCHIE ****
  function start(_event: Event): void {
    gameMenu = ƒS.Menu.create(inGameMenuButtons, buttonFunctionalities, "gameMenuCSSclass");
    buttonFunctionalities("Close");
    let scenes: ƒS.Scenes = [
      // { scene: HowToText, name: "Text Scene" },
      { scene: HowToMakeChoices, name: "Choices" },
      
      { id: "Animation Scene", scene: HowToAnimate, name: "Animations", next: "EndingOne" },
      { id: "EndingOne", scene: EndingOne, name: "GoodEnding", next: "EndingOne"},


      { id: "Inventory Scene", scene: HowToMakeAnInventory, name: "Inventory", next: "EndingTwo" },
      { id: "EndingTwo", scene: EndingTwo, name: "BadEnding", next: ""}







      // { scene: MessengerMeeting, name: "Messenger Collab" },

      // // GreenPath
      // { scene: ElucidationGreenPath, name: "Green Messenger", next: "GreenOne" },
      // { id: "GreenOne", scene: GreenOne, name: "Green Path goes on", next: "" },

      // // BlackPath
      // { scene: ElucidationBlackPath, name: "Black Messenger", next: "BlackOne" },
      // { id: "BlackOne", scene: BlackOne, name: "Black path goes on", next: "" }

    ];

    // start the sequence
    ƒS.Progress.go(scenes);
  }

  let uiElement: HTMLElement = document.querySelector("[type=interface]");
  dataForSave = ƒS.Progress.setData(dataForSave, uiElement);

}