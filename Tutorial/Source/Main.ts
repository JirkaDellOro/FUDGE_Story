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
  };

  // define sound
  export let sound = {
    // Music
    backgroundTheme: "",

    // Sound
    click: ""
  };

  export let locations = {
    city: {
      name: "CloudyCity",
      background: "Images/Backgrounds/bg_city_cloudy.png"
    },
    bench: {
      name: "Bench",
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



  export let animation2: ƒS.AnimationDefinition;


  // define items as key-object-pairs, the objects with the properties name, description and an address to an image
  export let items = {
    // Toy: {
    //   name: "Fish",
    //   description: "Fishy fish",
    //   image: "Images/Items/fishySmall.png"
    // },
    // Blobbys
    BlobRED: {
      name: "BlobRed",
      description: "A reddish something",
      image: "Images/Items/blobRED.png"
    },
    BlobBU: {
      name: "BlobBlue",
      description: "A blueish something",
      image: "Images/Items/blobBU.png"
    },
    BlobDKBU: {
      name: "BlobDKBlue",
      description: "A dark blueish something",
      image: "Images/Items/blobDKBU.png"
    },
    BlobGN: {
      name: "BlobGreen",
      description: "A greenish something",
      image: "Images/Items/blobGN.png"
    },
    BlobPK: {
      name: "BlobPink",
      description: "A pinkish something",
      image: "Images/Items/blobPK.png"
    },
    BlobYL: {
      name: "BlobYellow",
      description: "A yellowish something",
      image: "Images/Items/blobYL.png"
    },
    BlobOG: {
      name: "BlobOrange",
      description: "An orangeish something",
      image: "Images/Items/blobOG.png"
    }
  };

  // tell FUDGE Story the data to save besides the current scene
  export let dataForSave = {
    score: 0,
    Protagonist: {
      name: "Protagonist"
    },
    nameProtagonist: "Protagonist",
    scoreAoi: 0,
    ended: false,
    state: {
      a: 1
    }
  };

  

  let outOfGameMenu = {
    save: "Save",
    load: "Load",
    close: "Close",
    volume: "Volume",
    credits: "Credits",
    about: "About"
  };

  // let meterBar = {
  //   open: "Save",
  //   close: "Close",
  // };

  // Variable nur zum Löschen für outOfGameMenu
  let gameMenu: ƒS.Menu;

  async function saveNload(_option: string): Promise<void> {
    console.log(_option);
    if (_option == outOfGameMenu.load) {
      await ƒS.Progress.load();
    }
    else if (_option == outOfGameMenu.save) {
      await ƒS.Progress.save();
    }

    if (_option == outOfGameMenu.close)
      gameMenu.close();
  }



  // Variable zum Öffnen und Löschen der meterBar
  // let meter = document.querySelector("[type=interface]");

  // async function closeNopenMeterBar(_option: string): Promise<void> {
  //   console.log(_option);
  //   if (_option == meterBar.open) {
  //     document.open();
  //   }

  //   if (_option == meterBar.close)
  //     document.close();
  // }




  // shortcuts to save and load game progress
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
    }
  }



  // meter stuff
  // document.addEventListener("keydown", hndKeypressMeter);
  // async function hndKeypressMeter(_event: KeyboardEvent): Promise<void> {
  //   switch (_event.code) {
  //     case ƒ.KEYBOARD_CODE.Z:
  //       console.log("Open meter");
  //       await document.open();
  //       break;
  //     case ƒ.KEYBOARD_CODE.T:
  //       console.log("Close meter");
  //       await document.close();
  //       break;
  //   }
  // }



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
        ƒS.Inventory.close();
        break;
    }
  }


  window.addEventListener("load", start);
  function start(_event: Event): void {
    // to close menu
    gameMenu =
      ƒS.Menu.create(outOfGameMenu, saveNload, "gameMenu");

    // define the sequence of scenes, each scene as an object with a reference to the scene-function, a name and optionally an id and an id to continue the story with
    let scenes: ƒS.Scenes = [
      // { scene: Text, name: "How To Text" },
      // { scene: Decision, name: "How To Decide" },
      // { scene: End, name: "End" },
      // { id: "Endo", scene: End, name: "This is an ending", next: "Endo" },
      // { scene: Inventory, name: "How To Make An Inventory" }
      // { scene: Animation, name: "How To Animate" },
      // { scene: GameMenu, name: "How To Make A Game Menu" },
      { scene: Meter, name: "How To Make a Progress bar" }

    ];



    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave.state = ƒS.Progress.setDataInterface(dataForSave.state, uiElement);


    // start the sequence
    ƒS.Progress.setData(dataForSave);
    ƒS.Progress.go(scenes);
  }
}