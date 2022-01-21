"use strict";
var Tutorial_WS21;
(function (Tutorial_WS21) {
    async function Introduction() {
        console.log("Intro");
        let text = {
            narrator: {
                T0000: "<p>Ich bin der Narrator.</p>",
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
        // test: `test ${123} klappt`
        // Textgeschwindigkeit
        Tutorial_WS21.ƒS.Speech.setTickerDelays(20, 2);
        Tutorial_WS21.ƒS.Sound.fade(Tutorial_WS21.sound.backgroundTheme, 0.2, 0.1, true);
        // let animationDone: Promise<void> = ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, fromRightToLeft());
        // let animationDone2: Promise<void> = ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, fromRightToOutOfCanvas());
        //  Name field
        // dataForSave.nameProtagonist = await ƒS.Speech.getInput();
        // console.log(dataForSave.nameProtagonist);
        await Tutorial_WS21.ƒS.Location.show(Tutorial_WS21.locations.bedroom);
        await Tutorial_WS21.ƒS.update(Tutorial_WS21.transitions.clock.duration, Tutorial_WS21.transitions.clock.alpha, Tutorial_WS21.transitions.clock.edge);
        await Tutorial_WS21.ƒS.Character.show(Tutorial_WS21.characters.aisaka, Tutorial_WS21.characters.aisaka.pose.happy, Tutorial_WS21.ƒS.positionPercent(30, 100));
        await Tutorial_WS21.ƒS.update(1);
        // Animationen parallel abspielen
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, text.aisaka.T0000, false);
        Tutorial_WS21.dataForSave.nameProtagonist = await Tutorial_WS21.ƒS.Speech.getInput();
        console.log(Tutorial_WS21.dataForSave.nameProtagonist);
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, text.aisaka.T0000 + Tutorial_WS21.dataForSave.nameProtagonist);
        // LOOP Animations
        // await ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, fromRightToLeft());
        // await ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, fromRightToOutOfCanvas());
        // Inventar
        // ƒS.Inventory.add(items.pen);
        // await ƒS.Inventory.open(); 
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, "Hi2.");
        // await animationDone;
        // await animationDone2;
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
                // return "Ende";
                break;
            case firstDialogueElementOptions.iSayYes:
                await Tutorial_WS21.ƒS.Character.show(Tutorial_WS21.characters.kohana, Tutorial_WS21.characters.kohana.pose.angry, Tutorial_WS21.ƒS.positions.center);
                break;
            case firstDialogueElementOptions.iSayNo:
                Tutorial_WS21.dataForSave.points += 10;
                await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.kohana, text.kohana.T0000);
                break;
        }
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, text.aisaka.T0000);
        Tutorial_WS21.ƒS.Sound.fade(Tutorial_WS21.sound.backgroundTheme, 0, 1);
        Tutorial_WS21.ƒS.Character.hideAll();
        await Tutorial_WS21.ƒS.update(1);
        // if (dataForSave.points === 100) {
        //   return End();
        // }
        // return "Ende";
        // return End();
    }
    Tutorial_WS21.Introduction = Introduction;
})(Tutorial_WS21 || (Tutorial_WS21 = {}));
var Tutorial_WS21;
(function (Tutorial_WS21) {
    async function Scene2() {
        console.log("Szene2");
        let text = {
            narrator: {
                T0000: "",
                T0001: ""
            },
            aisaka: {
                T0000: "HEY",
                T0001: ""
            },
            kohana: {
                T0000: "HII"
            }
        };
        await Tutorial_WS21.ƒS.Location.show(Tutorial_WS21.locations.bedroom);
        await Tutorial_WS21.ƒS.update(1);
        await Tutorial_WS21.ƒS.Character.show(Tutorial_WS21.characters.aisaka, Tutorial_WS21.characters.aisaka.pose.happy, Tutorial_WS21.ƒS.positionPercent(30, 100));
        await Tutorial_WS21.ƒS.update(1);
        // Novel Page
        Tutorial_WS21.ƒS.Text.setClass("text");
        Tutorial_WS21.ƒS.Text.print("Lies mich.");
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, text.aisaka.T0000);
        Tutorial_WS21.dataForSave.points += 10;
        console.log(Tutorial_WS21.dataForSave.points);
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, "Helloo");
        await Tutorial_WS21.ƒS.Character.hide(Tutorial_WS21.characters.aisaka);
        await Tutorial_WS21.ƒS.update(1);
        // return "";
        // if (dataForSave.points == 50) {
        //   return "";
        // return SzenenFunktionsname();
        // }
    }
    Tutorial_WS21.Scene2 = Scene2;
})(Tutorial_WS21 || (Tutorial_WS21 = {}));
var Tutorial_WS21;
(function (Tutorial_WS21) {
    async function Scene3() {
        console.log("Intro");
        let text = {
            narrator: {
                T0000: "",
                T0001: ""
            },
            aisaka: {
                T0000: "This is Scene3",
                T0001: ""
            },
            kohana: {
                T0000: "Szene3"
            }
        };
        await Tutorial_WS21.ƒS.Location.show(Tutorial_WS21.locations.bedroom);
        await Tutorial_WS21.ƒS.update(Tutorial_WS21.transitions.clock.duration, Tutorial_WS21.transitions.clock.alpha, Tutorial_WS21.transitions.clock.edge);
        await Tutorial_WS21.ƒS.Character.show(Tutorial_WS21.characters.aisaka, Tutorial_WS21.characters.aisaka.pose.happy, Tutorial_WS21.ƒS.positionPercent(30, 100));
        await Tutorial_WS21.ƒS.update(1);
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, text.aisaka.T0000);
        await Tutorial_WS21.ƒS.Character.hide(Tutorial_WS21.characters.aisaka);
        await Tutorial_WS21.ƒS.update(4);
        // return "Szene2";
    }
    Tutorial_WS21.Scene3 = Scene3;
})(Tutorial_WS21 || (Tutorial_WS21 = {}));
var Tutorial_WS21;
(function (Tutorial_WS21) {
    async function End() {
        console.log("Ende");
        let text = {
            narrator: {
                T0000: "",
                T0001: ""
            },
            aisaka: {
                T0000: "The End",
                T0001: ""
            },
            kohana: {
                T0000: "Ending"
            }
        };
        await Tutorial_WS21.ƒS.Location.show(Tutorial_WS21.locations.bedroom);
        await Tutorial_WS21.ƒS.update(Tutorial_WS21.transitions.clock.duration, Tutorial_WS21.transitions.clock.alpha, Tutorial_WS21.transitions.clock.edge);
        await Tutorial_WS21.ƒS.Character.show(Tutorial_WS21.characters.aisaka, Tutorial_WS21.characters.aisaka.pose.happy, Tutorial_WS21.ƒS.positionPercent(30, 100));
        await Tutorial_WS21.ƒS.update(1);
        await Tutorial_WS21.ƒS.Speech.tell(Tutorial_WS21.characters.aisaka, text.aisaka.T0000);
        await Tutorial_WS21.ƒS.Character.hide(Tutorial_WS21.characters.aisaka);
        await Tutorial_WS21.ƒS.update(4);
        // return "Szene2";
    }
    Tutorial_WS21.End = End;
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
        backgroundTheme: "./Audio/Dystopian.ogg",
        // sound
        click: ""
    };
    // Items
    // export let items = {
    //   pen: {
    //     name: "Roter Buntstift",
    //     description: "A red pen",
    //     image: "./Images/Items/redPen.png"
    //   }
    // };
    Tutorial_WS21.locations = {
        bedroom: {
            name: "Bedroom",
            background: "./Images/Backgrounds/Bedroom.png"
        },
        kitchen: {
            name: "BedroomNight",
            background: "./Images/Backgrounds/Bedroom_Night.png"
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
    // Animationen
    function fromRightToOutOfCanvas() {
        return {
            start: { translation: Tutorial_WS21.ƒS.positionPercent(30, 100) },
            end: { translation: Tutorial_WS21.ƒS.positionPercent(120, 100) },
            duration: 1,
            playmode: Tutorial_WS21.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Tutorial_WS21.fromRightToOutOfCanvas = fromRightToOutOfCanvas;
    function fromRightToLeft() {
        return {
            start: { translation: Tutorial_WS21.ƒS.positions.bottomright },
            end: { translation: Tutorial_WS21.ƒS.positions.bottomleft },
            duration: 1,
            playmode: Tutorial_WS21.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Tutorial_WS21.fromRightToLeft = fromRightToLeft;
    Tutorial_WS21.dataForSave = {
        nameProtagonist: "",
        points: 0
        // started: false,
        // ended: false
    };
    //  MENU - Audio functions
    let volume = 1.0;
    function incrementSound() {
        if (volume >= 100)
            return;
        volume += 0.5;
        Tutorial_WS21.ƒS.Sound.setMasterVolume(volume);
    }
    Tutorial_WS21.incrementSound = incrementSound;
    function decrementSound() {
        if (volume <= 0)
            return;
        volume -= 0.5;
        Tutorial_WS21.ƒS.Sound.setMasterVolume(volume);
    }
    Tutorial_WS21.decrementSound = decrementSound;
    // Menü 
    let inGameMenu = {
        save: "Save",
        load: "Load",
        close: "Close",
        turnUpVolume: "+",
        turnDownVolume: "-"
        // open: "Open"
    };
    let gameMenu;
    // true = offen; false = geschlossen
    let menu = true;
    async function buttonFunctionalities(_option) {
        console.log(_option);
        switch (_option) {
            case inGameMenu.save:
                await Tutorial_WS21.ƒS.Progress.save();
                break;
            case inGameMenu.load:
                await Tutorial_WS21.ƒS.Progress.load();
                break;
            case inGameMenu.close:
                gameMenu.close();
                menu = false;
                break;
            case inGameMenu.turnUpVolume:
                incrementSound();
                break;
            case inGameMenu.turnDownVolume:
                decrementSound();
            // case inGameMenu.open:
            //   gameMenu.open();
            //   menu = true;
            //   break;
        }
    }
    // Shortcuts für's Menü
    document.addEventListener("keydown", hndKeyPress);
    async function hndKeyPress(_event) {
        switch (_event.code) {
            case Tutorial_WS21.ƒ.KEYBOARD_CODE.F8:
                console.log("Save");
                await Tutorial_WS21.ƒS.Progress.save();
                break;
            case Tutorial_WS21.ƒ.KEYBOARD_CODE.F9:
                console.log("Load");
                await Tutorial_WS21.ƒS.Progress.load();
                break;
            case Tutorial_WS21.ƒ.KEYBOARD_CODE.M:
                if (menu) {
                    console.log("Close");
                    gameMenu.close();
                    menu = false;
                }
                else {
                    console.log("Open");
                    gameMenu.open();
                    menu = true;
                }
                break;
        }
    }
    // Szenenstruktur
    window.addEventListener("load", start);
    function start(_event) {
        // Menü
        gameMenu = Tutorial_WS21.ƒS.Menu.create(inGameMenu, buttonFunctionalities, "gameMenu");
        // Menü zu Beginn geschlossen halten
        buttonFunctionalities("Close");
        let scenes = [
            // Linear
            // { id: "Einführung", scene: Introduction, name: "Introduction to FS", next: "Ende"},
            { scene: Tutorial_WS21.Introduction, name: "Introduction to FS" }
            // { scene: Scene2, name: "Scene Two" }
            // { id: "Ende", scene: End, name: "The End" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Tutorial_WS21.dataForSave = Tutorial_WS21.ƒS.Progress.setData(Tutorial_WS21.dataForSave, uiElement);
        // start the sequence
        Tutorial_WS21.ƒS.Progress.go(scenes);
    }
})(Tutorial_WS21 || (Tutorial_WS21 = {}));
//# sourceMappingURL=Tutorial_WS21.js.map