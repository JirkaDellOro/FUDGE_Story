namespace Tutorial {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Start");

  // define transitions
  export let transitions = {
    clock: {
      duration: 3,
      alpha: "../Free Transitions/circlewipe-ccw.jpg",
      edge: 1
    },
    jigsaw: {
      duration: 2,
      alpha: "../Free Transitions/jigsaw 08.png",
      edge: 0.4
    }
  };

  // define sounds as key-string-pairs with the url of the soundfile
  export let sound = {
    backgroundTheme: "../Audio/hypnotic.mp3",
    shoot: "../Audio/fire.mp3"
  };

  // define locations as key-object-pairs, the objects with the properties name, background and an optional foreground
  export let locations = {
    city: {
      name: "CloudyCity",
      background: "Images/bg_city_cloudy.png"
    }
  };

  // define characters as key-object-pairs, the objects with the properties name, origin and an array if poses, each again with a unique key
  export let characters = {
    Sue: {
      name: "Sue",
      origin: ƒS.ORIGIN.BOTTOMRIGHT,
      pose: {
        normal: "Images/placeholder_girl.png"
      }
    }
  };

  // define the sequence of scenes, each scene as an object with a reference to the scene-function, a name and optionally an id and an id to continue the story with
  export let scenes: ƒS.Scenes = [
    { scene: Main, name: "Main Menu" }
  ];

  // start the sequence
  ƒS.Progress.go(scenes);
 

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
}