"use strict";
var Tutorial_SS22;
(function (Tutorial_SS22) {
    Tutorial_SS22.ƒ = FudgeCore;
    Tutorial_SS22.ƒS = FudgeStory;
    console.log("Tutorial SS22 starting");
    // **** DEFINITIONEN ****
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
            // background: "/Tutorial_SS22/Images/Backgrounds/starry.gif"
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
    // **** DATEN DIE GESPEICHERT WERDEN SOLLEN ****
    Tutorial_SS22.dataForSave = {
        nameProtaginst: "",
        score: 0
    };
    // **** CREDITS ****
    function showCredits() {
        Tutorial_SS22.ƒS.Text.setClass("class2");
        Tutorial_SS22.ƒS.Text.print("Halleluja");
    }
    Tutorial_SS22.showCredits = showCredits;
    // **** MENÜ ****
    // Buttons
    let inGameMenuButtons = {
        save: "Save",
        load: "Load",
        close: "Close",
        credits: "Credits"
    };
    let gameMenu;
    // true = offen; false = geschlossen
    let menuIsOpen = true;
    async function buttonFunctionalities(_option) {
        console.log(_option);
        switch (_option) {
            case inGameMenuButtons.save:
                await Tutorial_SS22.ƒS.Progress.save();
                break;
            case inGameMenuButtons.load:
                await Tutorial_SS22.ƒS.Progress.load();
                break;
            case inGameMenuButtons.close:
                gameMenu.close();
                menuIsOpen = false;
                break;
            case inGameMenuButtons.credits:
                showCredits();
        }
    }
    // Shortcuts für's Menü
    document.addEventListener("keydown", hndKeyPress);
    async function hndKeyPress(_event) {
        switch (_event.code) {
            case Tutorial_SS22.ƒ.KEYBOARD_CODE.F8:
                console.log("Save");
                await Tutorial_SS22.ƒS.Progress.save();
                break;
            case Tutorial_SS22.ƒ.KEYBOARD_CODE.F9:
                console.log("Load");
                await Tutorial_SS22.ƒS.Progress.load();
                break;
            case Tutorial_SS22.ƒ.KEYBOARD_CODE.M:
                if (menuIsOpen) {
                    console.log("Close");
                    gameMenu.close();
                    menuIsOpen = false;
                }
                else {
                    console.log("Open");
                    gameMenu.open();
                    menuIsOpen = true;
                }
                break;
        }
    }
    window.addEventListener("load", start);
    // **** SZENENHIERARCHIE ****
    function start(_event) {
        gameMenu = Tutorial_SS22.ƒS.Menu.create(inGameMenuButtons, buttonFunctionalities, "gameMenuCSSclass");
        buttonFunctionalities("Close");
        let scenes = [
            // { scene: HowToText, name: "Text Scene" },
            { scene: Tutorial_SS22.HowToMakeChoices, name: "Choice Scene" }
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
                T0000: "Heute wird sich alles um Auswahlmöglichkeiten drehen.",
                T0001: "Schön, dass du dabei warst!"
            }
        };
        // ƒS.Sound.fade(sound.nightclub, 1, 2, true);
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.nightpark);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        await Tutorial_SS22.ƒS.Character.show(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.ƒS.positions.bottomcenter);
        await Tutorial_SS22.ƒS.Character.show(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.ƒS.positionPercent(70, 100));
        // ƒS.Character.hide(characters.aisaka);
        // ƒS.Character.hideAll();
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
        Tutorial_SS22.ƒS.Speech.clear();
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.update(3);
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
                Tutorial_SS22.ƒS.Character.hide(Tutorial_SS22.characters.aisaka);
                break;
            case firstDialogueElementAnswers.iSayNo:
                // continue path here
                await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Hi");
                Tutorial_SS22.ƒS.Speech.clear();
                break;
        }
        // You can continue your story right after the choice definitions
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