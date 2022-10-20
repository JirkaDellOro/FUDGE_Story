"use strict";
var Tutorial_WS22;
(function (Tutorial_WS22) {
    Tutorial_WS22.ƒ = FudgeCore;
    Tutorial_WS22.ƒS = FudgeStory;
    console.log("Tutorial WS22 starting");
    Tutorial_WS22.transition = {
        puzzle: {
            duration: 1,
            alpha: "",
            edge: 1
        }
    };
    Tutorial_WS22.sound = {
        // themes
        // SFX
        drop: "Audio/drop.mp3"
    };
    Tutorial_WS22.locations = {
        beachDay: {
            name: "Beach Day",
            background: ""
        }
    };
    Tutorial_WS22.characters = {
        narrator: {
            name: ""
        },
        protagonist: {
            name: ""
        },
        aisaka: {
            name: "Aisaka",
            origin: Tutorial_WS22.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "Pfad des Bildes",
                happy: "",
                upset: ""
            }
        }
    };
    // **** DATA THAT WILL BE SAVED (GAME PROGRESS) ****
    Tutorial_WS22.dataForSave = {
        nameProtagonist: ""
    };
    window.addEventListener("load", start);
    function start(_event) {
        // **** SCENE HIERARCHY ****
        let scenes = [
            { scene: Tutorial_WS22.Texting, name: "Text Scene" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Tutorial_WS22.dataForSave = Tutorial_WS22.ƒS.Progress.setData(Tutorial_WS22.dataForSave, uiElement);
        // start the sequence
        Tutorial_WS22.ƒS.Progress.go(scenes);
    }
})(Tutorial_WS22 || (Tutorial_WS22 = {}));
var Tutorial_WS22;
(function (Tutorial_WS22) {
    async function Texting() {
        console.log("Texting");
        // let text = {
        //   Aisaka: {
        //     T0000: "GUTES ENDE"
        //   }
        // };
        // await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);
        // Since you defined a next-scene in the scene hierarchy a return will not be needed
        // return "GameOver";
    }
    Tutorial_WS22.Texting = Texting;
})(Tutorial_WS22 || (Tutorial_WS22 = {}));
//# sourceMappingURL=Tutorial_WS22.js.map