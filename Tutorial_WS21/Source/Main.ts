namespace Tutorial_WS21 {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Tutorial_WS21 starting");

  window.addEventListener("load", start);
  function start(_event: Event): void {
    let scenes: ƒS.Scenes = [
      { scene: Scene1, name: "SceneOne" }
    ];

    // start the sequence
    ƒS.Progress.go(scenes);
  }
}