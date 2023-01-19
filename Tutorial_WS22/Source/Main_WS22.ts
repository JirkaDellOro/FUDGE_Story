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

  export let items = {
    egg: {
      name: "Egg",
      description: "An eggish egg",
      image: "Images/Items/Egg.png"
      // static: true
    }
  };



  export function getAnimation(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positions.bottomleft },
      end: { translation: ƒS.positionPercent(70, 100) },
      duration: 1,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }


  // **** DATA THAT WILL BE SAVED (GAME PROGRESS) ****
  export let dataForSave = {
    nameProtagonist: "",
    interrupt: false,
    aisakaPoints: 0,
    pickedOk: false,
    pickedMeterBar: false,
    aisakaScore: 0

  };


  // horizontal Shaker
  export async function horizontalShake(): Promise<void> {
    let scene: HTMLElement = <HTMLElement>document.getElementsByTagName("scene")[0];

    for (let i: number = 0; i < 15; i++) {
      if (i % 2 == 0) {
        scene.style.transform = `translateX(20px)`;
      }
      else {
        scene.style.transform = `translateX(-20px)`;
      }
      await new Promise(resolve => setTimeout(resolve, 40));
    }
    scene.style.transform = `translateX(0px)`;
  }


  // vertical Shaker
  export async function verticalShake(): Promise<void> {
    let scene: HTMLElement = <HTMLElement>document.getElementsByTagName("scene")[0];

    for (let i: number = 0; i < 15; i++) {
      if (i % 2 == 0) {
        scene.style.transform = `translateY(20px)`;
      }
      else {
        scene.style.transform = `translateY(-20px)`;
      }
      await new Promise(resolve => setTimeout(resolve, 40));
    }
    scene.style.transform = `translateY(0px)`;
  }

  function credits(): void {
    ƒS.Text.print("");
  }

  // Menu shortcuts
  let inGameMenuButtons = {
    save: "Save",
    load: "Load",
    close: "Close",
    credits: "Credits"
  };

  let gameMenu: ƒS.Menu;

  // open = Menü ist offen und false = Menü ist zu 
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
        credits();
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
      { id: "Write", scene: Text, name: "We write some text" },
      { id: "Choose", scene: Choices, name: "We build in some choices"},
      { id: "Animate", scene: Animations, name: "We animate"},
      { id: "Fill", scene: MeterBar, name: "We create a meter bar" }



    ];

    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);


    // start the sequence
    ƒS.Progress.go(scenes);
  }


}