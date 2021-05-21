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
    Protagonist: {
      name: "Protagonist"
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


  window.addEventListener("load", start);
  function start(_event: Event): void {
    // define the sequence of scenes, each scene as an object with a reference to the scene-function, a name and optionally an id and an id to continue the story with
    let scenes: ƒS.Scenes = [
      { scene: Text, name: "HowToText" },
      { scene: Decision, name: "HowToDecide" }
    ];

    // start the sequence
    ƒS.Progress.go(scenes);
  }
}