namespace Test {
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

  // define items as key-object-pairs, the objects with the properties name, description and an address to an image
  export let items = {
    Fudge: {
      name: "Fudge Item",
      description: "A delicious cube of fudge, adds 10 to your health",
      image: "Images/Fudge_48.png",
      static: false,
      handler: hndItem
    }
  };

  export let state = {
    a: 1,
    b: "",
    c: 2
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
  
  function hndItem(_event: CustomEvent): void {
    console.log(_event);
  }

  export function getAnimation(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positions.bottomleft, rotation: -20, scaling: new ƒS.Position(0.5, 1.5), color: ƒS.Color.CSS("white", 0.3) },
      end: { translation: ƒS.positions.bottomright, rotation: 20, scaling: new ƒS.Position(1.5, 0.5), color: ƒS.Color.CSS("red") },
      duration: 1,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }


  window.addEventListener("load", start);
  function start(_event: Event): void {

    // define the sequence of scenes, each scene as an object with a reference to the scene-function, a name and optionally an id and an id to continue the story with
    let scenes: ƒS.Scenes = [
      { scene: Main, name: "Main Menu" }
    ];


    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    state = ƒS.Progress.setData(state, uiElement);

    // window.setInterval(() => state.a++, 1000);

    // start the sequence
    ƒS.Progress.go(scenes);
  }
}