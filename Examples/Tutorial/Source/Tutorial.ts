namespace Tutorial {
  // export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Start");

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

  export let sound = {
    backgroundTheme: "../Audio/hypnotic.mp3",
    shoot: "../Audio/fire.mp3"
  };

  // data for some locations to decorate the stage with
  export let locations = {
    window: {
      name: "Window",
      background: "../Backgrounds/bg_window.png"
    },
    rain: {
      name: "RainInCity",
      background: "../Backgrounds/bg_city_rain.png"
    }
  };

  // data for some characters that will show on the stage
  export let characters = {
    Sue: {
      name: "Sue",
      origin: ƒS.ORIGIN.BOTTOMRIGHT,
      pose: {
        normal: "../Characters/placeholder_girl.png",
        talk: "../Characters/placeholder_girl_talk.png"
      }
    },
    John: {
      name: "John",
      // check origin not being respected
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        normal: "../Characters/placeholder_boy.png",
        smile: "../Characters/placeholder_boy_smile.png"
      }
    }
  };


  export let scenes: ƒS.Scenes = [
    { scene: Main, name: "Main Menu" }
  ];

  
  ƒS.Progress.play(scenes);
}