namespace Tutorial_WS22 {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;
  console.log("Tutorial WS22 starting");

  export let transition = {
    puzzle: {
      duration: 1,
      alpha: "",
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
      background: ""
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
        angry: "Pfad des Bildes",
        happy: "",
        upset: ""
      }
    }
  };

  // **** DATA THAT WILL BE SAVED (GAME PROGRESS) ****
  export let dataForSave = {
    nameProtagonist: ""
  };


  window.addEventListener("load", start);
  function start(_event: Event): void {
    // **** SCENE HIERARCHY ****
    let scenes: ƒS.Scenes = [
      { scene: Texting, name: "Text Scene" }
    ];

    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);


    // start the sequence
    ƒS.Progress.go(scenes);
  }


}