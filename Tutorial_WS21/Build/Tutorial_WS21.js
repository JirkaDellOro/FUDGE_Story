"use strict";
var Tutorial_WS21;
(function (Tutorial_WS21) {
    async function Introduction() {
        console.log("Intro");
        let text = {
            narrator: {
                T0000: "",
                T0001: ""
            },
            aisaka: {
                T0000: "Hi",
                T0001: ""
            },
            kohana: {
                T0000: "Test"
            }
        };
        await Tutorial_WS21.ƒS.Location.show(Tutorial_WS21.locations.bedroom);
        await Tutorial_WS21.ƒS.update(Tutorial_WS21.transitions.clock.duration, Tutorial_WS21.transitions.clock.alpha, Tutorial_WS21.transitions.clock.edge);
        await Tutorial_WS21.ƒS.Character.show(Tutorial_WS21.characters.aisaka, Tutorial_WS21.characters.aisaka.pose.happy, Tutorial_WS21.ƒS.positionPercent(30, 100));
        await Tutorial_WS21.ƒS.update(1);
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, text.aisaka.T0000);
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, "Hi2.");
        await Tutorial_WS21.ƒS.Character.hide(Tutorial_WS21.characters.aisaka);
        let firstDialogueElementOptions = {
            iSayOk: "Okay.",
            iSayYes: "Ja.",
            iSayNo: "Nein."
        };
        let firstDialogueElement = await Tutorial_WS21.ƒS.Menu.getInput(firstDialogueElementOptions, "individualCSSClass");
        switch (firstDialogueElement) {
            case firstDialogueElementOptions.iSayOk:
                await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, "Hi2.");
                break;
            case firstDialogueElementOptions.iSayYes:
                await Tutorial_WS21.ƒS.Character.show(Tutorial_WS21.characters.kohana, Tutorial_WS21.characters.kohana.pose.angry, Tutorial_WS21.ƒS.positions.center);
                break;
            case firstDialogueElementOptions.iSayNo:
                await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.kohana, text.kohana.T0000);
                break;
        }
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, text.aisaka.T0000);
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
    // Stilfrage - Eigenen Styleguide für FS veröffentlichen? 
    Tutorial_WS21.characters = {
        narrator: {
            name: ""
        },
        aisaka: {
            name: "Aisaka",
            origin: Tutorial_WS21.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "./Images/Characters/aisaka_angry.png",
                happy: "./Images/Characters/aisaka_happy.png",
                upset: "./Images/Characters/aisaka_upset.png"
            }
        },
        kohana: {
            name: "Kohana",
            origin: Tutorial_WS21.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "./Images/Characters/kohana_angry.png",
                happy: "./Images/Characters/kohana_happy.png",
                upset: "./Images/Characters/kohana_upset.png"
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