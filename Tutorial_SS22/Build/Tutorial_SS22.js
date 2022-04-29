"use strict";
var Tutorial_SS22;
(function (Tutorial_SS22) {
    Tutorial_SS22.ƒ = FudgeCore;
    Tutorial_SS22.ƒS = FudgeStory;
    console.log("Tutorial SS22 starting");
    // define transitions
    Tutorial_SS22.transitions = {
        puzzle: {
            duration: 1,
            alpha: "/Tutorial_SS22/FreeTransitions/jigsaw_06.jpg",
            edge: 1
        }
    };
    Tutorial_SS22.sound = {
        // themes
        nightclub: "/Tutorial_SS22/Audio/Nightclub.ogg"
        // SFX
        // click: "Pfad"
    };
    Tutorial_SS22.locations = {
        nightpark: {
            name: "Nightpark",
            background: "/Tutorial_SS22/Images/Backgrounds/Bedroom_Night.png"
        }
        // starry: {
        //   name: "Starry",
        //   background: "Pfad"
        // }
    };
    Tutorial_SS22.characters = {
        narrator: {
            name: ""
        },
        aisaka: {
            name: "Aisaka",
            origin: Tutorial_SS22.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "/Tutorial_SS22/Images/Characters/aisaka_angry.png",
                happy: "/Tutorial_SS22/Images/Characters/aisaka_happy.png",
                upset: ""
            }
        },
        kohana: {
            name: "Kohana",
            origin: Tutorial_SS22.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "",
                happy: "/Tutorial_SS22/Images/Characters/kohana_happy.png",
                upset: "/Tutorial_SS22/Images/Characters/kohana_upset.png"
            }
        }
    };
    Tutorial_SS22.dataForSave = {
        nameProtaginst: "",
        score: 0
    };
    window.addEventListener("load", start);
    function start(_event) {
        let scenes = [
            { scene: Tutorial_SS22.HowToText, name: "Text Scene" },
            // { scene: HowToMakeChoices, name: "Choice Scene" }
        ];
        // start the sequence
        Tutorial_SS22.ƒS.Progress.go(scenes);
    }
    let uiElement = document.querySelector("[type=interface]");
    Tutorial_SS22.dataForSave = Tutorial_SS22.ƒS.Progress.setData(Tutorial_SS22.dataForSave, uiElement);
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function HowToMakeChoices() {
        console.log("Let's make some choices!");
        let text = {
            Narrator: {
                T0000: "",
                T0001: "",
                T0002: ""
            },
            Aisaka: {
                T0000: "Sei gegrüßt, Erdling.",
                T0001: "Kleiner Scherz, willkommen zum Tutorial!"
            }
        };
        // ƒS.Sound.fade(sound.nightclub, 1, 2, true);
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.nightpark);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
        // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(70, 100));
        // ƒS.Character.hide(characters.aisaka);
        // ƒS.Character.hideAll();
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
        Tutorial_SS22.ƒS.Speech.clear();
        await Tutorial_SS22.ƒS.update(3);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0001);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Dieser Text wurde vorher nicht deklariert.");
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.update();
        let firstDialogueElementAnswers = {
            iSayOk: "Okay.",
            iSayYes: "Ja.",
            iSayNo: "Nein."
        };
        let firstDialogueElement = await Tutorial_SS22.ƒS.Menu.getInput(firstDialogueElementAnswers, "choicesCSSclass");
        switch (firstDialogueElement) {
            case firstDialogueElementAnswers.iSayOk:
                // continue path here
                await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Hi");
                Tutorial_SS22.ƒS.Speech.clear();
                break;
            case firstDialogueElementAnswers.iSayYes:
                // continue path here
                await Tutorial_SS22.ƒS.Character.show(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.ƒS.positions.bottomcenter);
                break;
            case firstDialogueElementAnswers.iSayNo:
                // continue path here
                await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Hi");
                Tutorial_SS22.ƒS.Speech.clear();
                break;
        }
        // You can continue your story after the decision/choice here
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0001);
    }
    Tutorial_SS22.HowToMakeChoices = HowToMakeChoices;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function HowToText() {
        console.log("Let's text!");
        let text = {
            Narrator: {
                T0000: "",
                T0001: "",
                T0002: ""
            },
            Aisaka: {
                T0000: "Sei gegrüßt, Erdling.",
                T0001: "Kleiner Scherz, willkommen zum Tutorial!"
            }
        };
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.nightpark);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0001);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Dieser Text wurde vorher nicht deklariert.");
    }
    Tutorial_SS22.HowToText = HowToText;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
//# sourceMappingURL=Tutorial_SS22.js.map