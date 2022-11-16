"use strict";
var Tutorial_WS22;
(function (Tutorial_WS22) {
    Tutorial_WS22.ƒ = FudgeCore;
    Tutorial_WS22.ƒS = FudgeStory;
    console.log("Tutorial WS22 starting");
    Tutorial_WS22.transition = {
        puzzle: {
            duration: 1,
            alpha: "Images/Transitions/jigsaw_06.jpg",
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
            background: "Images/Backgrounds/Beach_day.png"
        },
        beachEvening: {
            name: "Beach Evening",
            background: "Images/Backgrounds/Beach_evening.png"
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
                angry: "",
                happy: "Images/Characters/aisaka_happy.png",
                upset: ""
            }
        }
    };
    // **** DATA THAT WILL BE SAVED (GAME PROGRESS) ****
    Tutorial_WS22.dataForSave = {
        nameProtagonist: ""
    };
    // Menu shortcuts
    let inGameMenuButtons = {
        save: "Save",
        load: "Load",
        close: "Close"
    };
    let gameMenu;
    // open entspricht Menü ist offen und false zu 
    let menuIsOpen = true;
    async function buttonFunctionalities(_option) {
        console.log(_option);
        switch (_option) {
            case inGameMenuButtons.save:
                await Tutorial_WS22.ƒS.Progress.save();
                break;
            case inGameMenuButtons.load:
                await Tutorial_WS22.ƒS.Progress.load();
                break;
            case inGameMenuButtons.close:
                gameMenu.close();
                menuIsOpen = false;
                break;
        }
    }
    //  Menu shortcuts
    document.addEventListener("keydown", hndKeyPress);
    async function hndKeyPress(_event) {
        switch (_event.code) {
            case Tutorial_WS22.ƒ.KEYBOARD_CODE.F8:
                console.log("Save");
                await Tutorial_WS22.ƒS.Progress.save();
                break;
            case Tutorial_WS22.ƒ.KEYBOARD_CODE.F9:
                console.log("Load");
                await Tutorial_WS22.ƒS.Progress.load();
                break;
            case Tutorial_WS22.ƒ.KEYBOARD_CODE.M:
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
    function start(_event) {
        gameMenu = Tutorial_WS22.ƒS.Menu.create(inGameMenuButtons, buttonFunctionalities, "gameMenuCSSClass");
        buttonFunctionalities("Close");
        // **** SCENE HIERARCHY ****
        let scenes = [
            // { scene: Texting, name: "How To Text"}
            { scene: Tutorial_WS22.Text, name: "Text Scene" },
            { scene: Tutorial_WS22.Scene2, name: "Scene2" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Tutorial_WS22.dataForSave = Tutorial_WS22.ƒS.Progress.setData(Tutorial_WS22.dataForSave, uiElement);
        // start the sequence
        Tutorial_WS22.ƒS.Progress.go(scenes);
    }
})(Tutorial_WS22 || (Tutorial_WS22 = {}));
var Tutorial_WS22;
(function (Tutorial_WS22) {
    async function Scene2() {
        console.log("Scene2");
        await Tutorial_WS22.ƒS.Location.show(Tutorial_WS22.locations.beachDay);
        Tutorial_WS22.ƒS.update(1);
        await Tutorial_WS22.ƒS.Character.show(Tutorial_WS22.characters.aisaka, Tutorial_WS22.characters.aisaka.pose.happy, Tutorial_WS22.ƒS.positions.bottomcenter);
        Tutorial_WS22.ƒS.update(1);
    }
    Tutorial_WS22.Scene2 = Scene2;
})(Tutorial_WS22 || (Tutorial_WS22 = {}));
var Tutorial_WS22;
(function (Tutorial_WS22) {
    async function Text() {
        console.log("Text Scene");
        let text = {
            Aisaka: {
                T0000: "GUTES ENDE"
            }
        };
        Tutorial_WS22.ƒS.Speech.hide();
        await Tutorial_WS22.ƒS.Location.show(Tutorial_WS22.locations.beachEvening);
        await Tutorial_WS22.ƒS.update(Tutorial_WS22.transition.puzzle.duration, Tutorial_WS22.transition.puzzle.alpha, Tutorial_WS22.transition.puzzle.edge);
        await Tutorial_WS22.ƒS.Speech.tell(Tutorial_WS22.characters.aisaka, text.Aisaka.T0000);
        // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(70, 100));
        await Tutorial_WS22.ƒS.Character.show(Tutorial_WS22.characters.aisaka, Tutorial_WS22.characters.aisaka.pose.happy, Tutorial_WS22.ƒS.positions.bottomcenter);
        Tutorial_WS22.ƒS.update(5);
        let dialogue = {
            iSayYes: "Yes",
            iSayOk: "Okay",
            iSayNo: "No",
            iSayBla: "Bla"
        };
        let dialogueElement = await Tutorial_WS22.ƒS.Menu.getInput(dialogue, "choicesCSSClass");
        let pickedYes;
        let pickedNo;
        let pickedBla;
        let pickedOk;
        if (pickedYes || pickedBla || pickedNo) {
            delete dialogue.iSayBla;
        }
        switch (dialogueElement) {
            case dialogue.iSayYes:
                // continue path here
                console.log("test");
                break;
            case dialogue.iSayNo:
                // continue path here
                await Tutorial_WS22.ƒS.Speech.tell(Tutorial_WS22.characters.aisaka, "Nein");
                break;
            case dialogue.iSayOk:
                // continue path here
                break;
            case dialogue.iSayBla:
                // continue path here
                break;
        }
    }
    Tutorial_WS22.Text = Text;
})(Tutorial_WS22 || (Tutorial_WS22 = {}));
//# sourceMappingURL=Tutorial_WS22.js.map