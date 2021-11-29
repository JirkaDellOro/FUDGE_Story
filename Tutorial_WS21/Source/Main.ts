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