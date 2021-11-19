"use strict";
var Tutorial_WS21;
(function (Tutorial_WS21) {
    async function Introduction() {
        console.log("Intro");
    }
    Tutorial_WS21.Introduction = Introduction;
})(Tutorial_WS21 || (Tutorial_WS21 = {}));
var Tutorial_WS21;
(function (Tutorial_WS21) {
    Tutorial_WS21.ƒ = FudgeCore;
    Tutorial_WS21.ƒS = FudgeStory;
    console.log("Tutorial_WS21 starting");
    // define transitions
    Tutorial_WS21.transitions = {
        clock: {
            duration: 1,
            alpha: "./FreeTransitions/JigsawThemedTransitions/puzzle.png",
            edge: 1
        }
    };
    Tutorial_WS21.sound = {
        // music
        backgroundTheme: "",
        // sound
        click: ""
    };
    Tutorial_WS21.locations = {
        bedroom: {
            name: "Bedroom",
            background: "./Images/Backgrounds/Bedroom.png"
        }
    };
    Tutorial_WS21.characters = {
        narrator: {
            name: ""
        },
        aisaka: {
            name: "Aisaka",
            origin: Tutorial_WS21.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "",
                happy: "",
                upset: ""
            }
        }
    };
    Tutorial_WS21.dataForSave = {};
    window.addEventListener("load", start);
    function start(_event) {
        let scenes = [
            { scene: Tutorial_WS21.Introduction, name: "Introduction to FS" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Tutorial_WS21.dataForSave = Tutorial_WS21.ƒS.Progress.setData(Tutorial_WS21.dataForSave, uiElement);
        // start the sequence
        Tutorial_WS21.ƒS.Progress.go(scenes);
    }
})(Tutorial_WS21 || (Tutorial_WS21 = {}));
//# sourceMappingURL=Tutorial_WS21.js.map