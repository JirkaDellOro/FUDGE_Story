namespace Tutorial_WS21 {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Tutorial_WS21 starting");


  // define transitions
  export let transitions = {
    clock: {
      duration: 1,
      alpha: "./FreeTransitions/JigsawThemedTransitions/puzzle.png",
      edge: 1
    }
  };


  export let sound = {
    // music
    backgroundTheme: "",

    // sound
    click: ""
  };


  export let locations = {
    bedroom: {
      name: "Bedroom",
      background: "./Images/Backgrounds/Bedroom.png"
    }
  };

  // Stilfrage - Eigenen Styleguide für FS veröffentlichen? 
  export let characters = {
    narrator: {
      name: ""
    },
    aisaka: {
      name: "Aisaka",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        angry: "./Images/Characters/aisaka_angry.png",
        happy: "./Images/Characters/aisaka_happy.png",
        upset: "./Images/Characters/aisaka_upset.png"
      }
    },
    kohana: {
      name: "Kohana",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        angry: "./Images/Characters/kohana_angry.png",
        happy: "./Images/Characters/kohana_happy.png",
        upset: "./Images/Characters/kohana_upset.png"
      }
    }
  };

  // Animations
  // export function jirkaAnimation(): ƒS.AnimationDefinition {
  //   return {
  //     start: { translation: ƒS.positions.bottomleft, rotation: -20, scaling: new ƒS.Position(0.5, 1.5), color: ƒS.Color.CSS("white", 0) },
  //     end: { translation: ƒS.positions.bottomright, rotation: 20, scaling: new ƒS.Position(1.5, 0.5), color: ƒS.Color.CSS("red") },
  //     duration: 1,
  //     playmode: ƒS.ANIMATION_PLAYMODE.LOOP
  //   };
  // }

  export function fromRightToOutOfCanvas(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positionPercent(30, 100) },
      end: { translation: ƒS.positionPercent(120, 100) },
      duration: 1,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  export function fromRightToLeft(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positions.bottomright },
      end: { translation: ƒS.positions.bottomleft },
      duration: 1,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  export let dataForSave = {

  };



  window.addEventListener("load", start);
  function start(_event: Event): void {
    let scenes: ƒS.Scenes = [
      { scene: Introduction, name: "Introduction to FS" }
    ];



    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);


    // start the sequence
    ƒS.Progress.go(scenes);
  }


}