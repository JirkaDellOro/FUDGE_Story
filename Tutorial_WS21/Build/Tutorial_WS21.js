"use strict";
var Tutorial_WS21;
(function (Tutorial_WS21) {
    async function Scene1() {
        console.log("Text");
    }
    Tutorial_WS21.Scene1 = Scene1;
})(Tutorial_WS21 || (Tutorial_WS21 = {}));
var Tutorial_WS21;
(function (Tutorial_WS21) {
    Tutorial_WS21.ƒ = FudgeCore;
    Tutorial_WS21.ƒS = FudgeStory;
    console.log("Tutorial_WS21 starting");
    window.addEventListener("load", start);
    function start(_event) {
        let scenes = [
            { scene: Tutorial_WS21.Scene1, name: "SceneOne" }
        ];
        // start the sequence
        Tutorial_WS21.ƒS.Progress.go(scenes);
    }
})(Tutorial_WS21 || (Tutorial_WS21 = {}));
//# sourceMappingURL=Tutorial_WS21.js.map