namespace Tutorial_SS22 {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Tutorial SS22 starting");


  // define transitions
  export let transitions = {
    puzzle: {
      duration: 1,
      alpha: "/Tutorial_SS22/FreeTransitions/jigsaw_06.jpg",
      edge: 1
    }
  };

  export let sound = {
    // themes
    nightclub: "/Tutorial_SS22/Audio/Nightclub.ogg"

    // SFX
    // click: "Pfad"
  };

  export let locations = {
    nightpark: {
      name: "Nightpark",
      background: "/Tutorial_SS22/Images/Backgrounds/Bedroom_Night.png"
    }
    // starry: {
    //   name: "Starry",
    //   background: "Pfad"
    // }
  };

  export let characters = {
    narrator: {
      name: ""
    },
    aisaka: {
      name: "Aisaka",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        angry: "/Tutorial_SS22/Images/Characters/aisaka_angry.png",
        happy: "/Tutorial_SS22/Images/Characters/aisaka_happy.png",
        upset: ""
      }
    },
    kohana: {
      name: "Kohana",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        angry: "",
        happy: "/Tutorial_SS22/Images/Characters/kohana_happy.png",
        upset: "/Tutorial_SS22/Images/Characters/kohana_upset.png"
      }
    }
  };

  export let dataForSave = {
    nameProtaginst: "",
    score: 0
  };










  window.addEventListener("load", start);
  function start(_event: Event): void {
    let scenes: ƒS.Scenes = [
      { scene: HowToText, name: "Text Scene" },
      // { scene: HowToMakeChoices, name: "Choice Scene" }
    ];

    // start the sequence
    ƒS.Progress.go(scenes);
  }

  let uiElement: HTMLElement = document.querySelector("[type=interface]");
  dataForSave = ƒS.Progress.setData(dataForSave, uiElement);

}