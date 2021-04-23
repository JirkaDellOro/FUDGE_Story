namespace Tutorial {

  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Start");

  // define transitions
  export let transition = {
    clock: {
      duration: 3,
      alpha: "",
      edge: 1
    }
  };

  // define sound
  export let sound = {
    // Musik
    backgroundTheme: "",

    // Sound
    click: ""
  };

  export let locations = {
    city: {
      name: "CloudyCity",
      background: "Images/Backgrounds/bg_city_cloudy.png"
    }
  };


  // define
  export let characters = {
    Narrator: {
      name: ""
    },
    Protagonist: {
      name: "Protagonist"
    },
    Ryu: {
      name: "Ryu",
      origin: ƒ.ORIGIN2D.BOTTOMRIGHT,
      pose: {
        normal: "",
        smile: ""
      }
    }
  };


  document.addEventListener("keydown", hndKeypress);
  async function hndKeypress(_event: KeyboardEvent): Promise<void> {
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.F4:
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
      { scene: Text, name: "HowToText" }
    ];

    // start the sequence
    ƒS.Progress.go(scenes);
  }
}