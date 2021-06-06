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
    ended: false
  };


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
    // define the sequence of scenes, each scene as an object with a reference to the scene-function, a name and optionally an id and an id to continue the story with
    let scenes: ƒS.Scenes = [
      // { scene: Text, name: "HowToText" },
      // { scene: Decision, name: "HowToDecide" },
      // { scene: End, name: "End" },
      // { id: "Endo", scene: End, name: "End", next: "Endo" },
      // { scene: Inventory, name: "HowToMakeAnInventory"}
      { scene: Animation, name: "HowToAnimate"}
    ];

    // start the sequence
    ƒS.Progress.setData(dataForSave);
    ƒS.Progress.go(scenes);
  }
}