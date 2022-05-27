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
    // items wird hier deklariert und initialisiert
    Tutorial_SS22.items = {
        BlobRED: {
            name: "Blob Red",
            description: "A reddish something",
            image: "/Tutorial_SS22/Images/Items/blobRED.png",
            static: true
        },
        BlobBU: {
            name: "Blob Blue",
            description: "A blueish something",
            image: "Images/Items/blobBU.png"
        },
        BlobDKBU: {
            name: "Blob DK Blue",
            description: "A dark blueish something",
            image: "Images/Items/blobDKBU.png"
        },
        BlobGN: {
            name: "Blob Green",
            description: "A greenish something",
            image: "Images/Items/blobGN.png"
        },
        BlobPK: {
            name: "Blob Pink",
            description: "A pinkish something",
            image: "Images/Items/blobPK.png"
        },
        BlobYL: {
            name: "Blob Yellow",
            description: "A yellowish something",
            image: "Images/Items/blobYL.png"
        },
        BlobOG: {
            name: "Blob Orange",
            description: "An orangeish something",
            image: "Images/Items/blobOG.png"
        },
        Stick: {
            name: "Stick",
            description: "Just a stick",
            image: "Images/Items/blobOG.png"
        }
    };
    // **** DATEN DIE GESPEICHERT WERDEN SOLLEN ****
    Tutorial_SS22.dataForSave = {
        nameProtagonist: "",
        score: {
            scoreOne: 0,
            scoreTwo: 0,
            scoreThree: 0
        },
        pickedAnimationScene: false
    };
    // **** CREDITS ****
    function showCredits() {
        Tutorial_SS22.ƒS.Text.setClass("credits");
        Tutorial_SS22.ƒS.Text.print("Halleluja");
    }
    Tutorial_SS22.showCredits = showCredits;
    // **** ANIMATIONEN ****
    function leftToRight() {
        return {
            start: { translation: Tutorial_SS22.ƒS.positionPercent(70, 100), color: Tutorial_SS22.ƒS.Color.CSS("lightblue", 1) },
            end: { translation: Tutorial_SS22.ƒS.positionPercent(80, 100), color: Tutorial_SS22.ƒS.Color.CSS("lightblue", 0) },
            duration: 3,
            playmode: Tutorial_SS22.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Tutorial_SS22.leftToRight = leftToRight;
    // export function getAnimation(): ƒS.AnimationDefinition {
    //   return {
    //     start: { translation: ƒS.positions.bottomleft, rotation: -20, scaling: new ƒS.Position(0.5, 1.5), color: ƒS.Color.CSS("white", 0.3) },
    //     end: { translation: ƒS.positions.bottomright, rotation: 20, scaling: new ƒS.Position(1.5, 0.5), color: ƒS.Color.CSS("red") },
    //     duration: 1,
    //     playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    //   };
    // }
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
            // Shortcut Inventar
            case Tutorial_SS22.ƒ.KEYBOARD_CODE.I:
                console.log("open inventory");
                await Tutorial_SS22.ƒS.Inventory.open();
                break;
            case Tutorial_SS22.ƒ.KEYBOARD_CODE.ESC:
                console.log("close inventory");
                await Tutorial_SS22.ƒS.Inventory.open();
                Tutorial_SS22.ƒS.Inventory.close();
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
            { scene: Tutorial_SS22.HowToMakeChoices, name: "Choices" },
            { id: "Animation Scene", scene: Tutorial_SS22.HowToAnimate, name: "Animations", next: "EndingOne" },
            { id: "Inventory Scene", scene: Tutorial_SS22.HowToMakeAnInventory, name: "Inventory", next: "EndingTwo" },
            { id: "EndingOne", scene: Tutorial_SS22.EndingOne, name: "GoodEnding", next: "GameOver" },
            { id: "EndingTwo", scene: Tutorial_SS22.EndingTwo, name: "BadEnding", next: "GameOver" },
            { id: "GameOver", scene: Tutorial_SS22.GameOver, name: "ENDE", next: "" }
            // { scene: MessengerMeeting, name: "Messenger Collab" },
            // // GreenPath
            // { scene: ElucidationGreenPath, name: "Green Messenger", next: "GreenOne" },
            // { id: "GreenOne", scene: GreenOne, name: "Green Path goes on", next: "" },
            // // BlackPath
            // { scene: ElucidationBlackPath, name: "Black Messenger", next: "BlackOne" },
            // { id: "BlackOne", scene: BlackOne, name: "Black path goes on", next: "" }
        ];
        // start the sequence
        Tutorial_SS22.ƒS.Progress.go(scenes);
    }
    let uiElement = document.querySelector("[type=interface]");
    Tutorial_SS22.dataForSave = Tutorial_SS22.ƒS.Progress.setData(Tutorial_SS22.dataForSave, uiElement);
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    Tutorial_SS22.textAusgelagert = {
        Narrator: {
            T0000: "Wenn du in den Szenen-Code schaust, wirst du bemerken,...",
            T0001: "dass dieser Text nicht manuell,...",
            T0002: "sondern mit einer for of-Schleife wiedergegeben wird."
        },
        Aisaka: {
            T0000: "Dieser Text wurde ausgelagert.",
            T0001: "Spick' in den Code!"
        }
    };
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function EndingOne() {
        console.log("GOOD ENDING");
        let text = {
            Aisaka: {
                T0000: "GUTES ENDING"
            }
        };
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
        return "GameOver";
    }
    Tutorial_SS22.EndingOne = EndingOne;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function EndingTwo() {
        console.log("BAD ENDING");
        let text = {
            Aisaka: {
                T0000: "BAD ENDIIIING"
            }
        };
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
    }
    Tutorial_SS22.EndingTwo = EndingTwo;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function GameOver() {
        console.log("GAME OVER");
    }
    Tutorial_SS22.GameOver = GameOver;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function HowToAnimate() {
        console.log("Let's animate!");
        let text = {
            Narrator: {
                T0000: "Wenn du in den Szenen-Code schaust, wirst du bemerken,...",
                T0001: "dass dieser Text nicht manuell,...",
                T0002: "sondern mit einer for of-Schleife wiedergegeben wird."
            },
            Aisaka: {
                T0000: "Ich bin ein Geist!",
                T0001: "Muhahaha"
            }
        };
        // dataForSave.pickedAnimationScene = true;
        // Jeglicher Textinhalt des Narrators wird wiedergegeben
        for (let narratorText of Object.values(text.Narrator)) {
            await Tutorial_SS22.ƒS.Speech.tell(text.Aisaka, narratorText);
        }
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.nightpark);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        await Tutorial_SS22.ƒS.Character.show(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.ƒS.positions.bottomcenter);
        Tutorial_SS22.ƒS.update();
        await Tutorial_SS22.ƒS.Character.animate(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.leftToRight());
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0001);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Mich wirst du niemals finden!");
        return Tutorial_SS22.EndingOne();
    }
    Tutorial_SS22.HowToAnimate = HowToAnimate;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function HowToMakeAnInventory() {
        console.log("Let's make an inventory!");
        let text = {
            Aisaka: {
                T0000: "Hallo nochmal",
                T0001: "Hast du dein Inventar gesehen?!"
            }
        };
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.nightpark);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        await Tutorial_SS22.ƒS.Character.show(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.ƒS.positions.bottomcenter);
        await Tutorial_SS22.ƒS.update();
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.BlobBU);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.BlobBU);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.BlobRED);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.BlobGN);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.BlobGN);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.BlobGN);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.BlobGN);
        // ƒS.Inventory.add(items.BlobDKBU);
        // ƒS.Inventory.add(items.BlobDKBU);
        // ƒS.Inventory.add(items.BlobDKBU);
        for (let i = 0; i < 20; i++) {
            Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.BlobDKBU);
        }
        // ƒS.Inventory.add(items.Stick);
        await Tutorial_SS22.ƒS.Inventory.open();
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, " ");
        // Name field - Player can type his name in here
        Tutorial_SS22.dataForSave.nameProtagonist = await Tutorial_SS22.ƒS.Speech.getInput();
        console.log(Tutorial_SS22.dataForSave.nameProtagonist);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000 + " " + Tutorial_SS22.dataForSave.nameProtagonist);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0001);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Cool, nicht wahr?");
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Ich werde dir Schritt für Schritt erklären, wie das erstellt wurde!");
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Außerdem gebe ich dir noch ein paar hilfreiche CSS-Tipps mit an die Hand.");
    }
    Tutorial_SS22.HowToMakeAnInventory = HowToMakeAnInventory;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function HowToMakeChoices() {
        console.log("Let's make some choices!");
        let text = {
            Aisaka: {
                T0000: "Heute wird sich alles um Auswahlmöglichkeiten drehen.",
                T0001: "Schön, dass du dabei warst!"
            }
        };
        // ƒS.Sound.fade(sound.nightclub, 1, 2, true);
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.nightpark);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
        await Tutorial_SS22.ƒS.Character.show(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.ƒS.positionPercent(70, 100));
        await Tutorial_SS22.ƒS.update();
        // ƒS.Character.hide(characters.aisaka);
        // ƒS.Character.hideAll();
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
        Tutorial_SS22.ƒS.Speech.clear();
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.update(1.5);
        let firstDialogueElementAnswers = {
            iSayOk: "Okay.",
            iSayYes: "Ja.",
            iSayNo: "Nein."
        };
        let firstDialogueElement = await Tutorial_SS22.ƒS.Menu.getInput(firstDialogueElementAnswers, "choicesCSSclass");
        switch (firstDialogueElement) {
            case firstDialogueElementAnswers.iSayOk:
                // continue path here
                Tutorial_SS22.dataForSave.score.scoreOne += 50;
                console.log(Tutorial_SS22.dataForSave.score.scoreOne);
                await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Okay");
                Tutorial_SS22.ƒS.Speech.clear();
                break;
            case firstDialogueElementAnswers.iSayYes:
                // continue path here
                await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Ja");
                Tutorial_SS22.ƒS.Character.hide(Tutorial_SS22.characters.aisaka);
                break;
            case firstDialogueElementAnswers.iSayNo:
                // continue path here
                await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Nein");
                Tutorial_SS22.ƒS.Speech.clear();
                break;
        }
        // You can continue your story right after the choice definitions
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0001);
        if (Tutorial_SS22.dataForSave.score.scoreOne === 50) {
            let firstDialogueElementAnswers = {
                iSayOk: "Ich habe über 50 Punkte.",
                iSayYes: "...Deshalb siehst du diese Auswahlmöglichkeit",
                iSayNo: "Spektakulär!"
            };
            let firstDialogueElement = await Tutorial_SS22.ƒS.Menu.getInput(firstDialogueElementAnswers, "choicesCSSclass");
            switch (firstDialogueElement) {
                case firstDialogueElementAnswers.iSayOk:
                    // continue path here
                    Tutorial_SS22.dataForSave.score.scoreOne += 50;
                    console.log(Tutorial_SS22.dataForSave.score.scoreOne);
                    await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Okay, cool.");
                    Tutorial_SS22.ƒS.Speech.clear();
                    break;
                case firstDialogueElementAnswers.iSayYes:
                    // continue path here
                    await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "ja, das wusste ich.");
                    Tutorial_SS22.ƒS.Character.hide(Tutorial_SS22.characters.aisaka);
                    break;
                case firstDialogueElementAnswers.iSayNo:
                    // continue path here
                    await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "find' ich auch!");
                    Tutorial_SS22.ƒS.Speech.clear();
                    break;
            }
        }
    }
    Tutorial_SS22.HowToMakeChoices = HowToMakeChoices;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function HowToText() {
        console.log("Let's text!");
        // let text = {
        //   Aisaka: {
        //     T0000: "Sei gegrüßt, Erdling.",
        //     T0001: "Kleiner Scherz, willkommen zum Tutorial!"
        //   }
        // };
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.nightpark);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        await Tutorial_SS22.ƒS.Character.show(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.ƒS.positionPercent(70, 100));
        Tutorial_SS22.ƒS.update();
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, Tutorial_SS22.textAusgelagert.Aisaka.T0000);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, Tutorial_SS22.textAusgelagert.Aisaka.T0001);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Dieser Text wird als direkter String in der tell-Methode ausgegeben.");
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Hierfür wird lediglich nach Angabe des Charakters, bei dem dieser Text erscheinen soll, der Text in Anführungsstrichen dahinter geschrieben.");
    }
    Tutorial_SS22.HowToText = HowToText;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
// async function showAllText(path = text.aisaka): Promise<void> {
//   for (let diaSequence of Object.values(path)) {
//       await ƒS.Speech.tell(characters.aisaka, diaSequence);
//   }
// for (const t in text.Navigator) {
//   await ƒS.Speech.tell(characters.aisaka, t);
//   }
// async function texto(): Promise<void> {
//   await ƒS.Speech.tell(characters.aisaka, "bla1");
//   await ƒS.Speech.tell(characters.aisaka, "bla2");
// }
// HashMap (Pause and Panda?) fast das gleiche wie n switch case
// if (dataForSave.pickedThisScene) {
//   return HowToMakeChoices();
// }
// else {
//   return HowToAnimate();
// }
// Keine Veränderung/Umkehrung des Werts; nur ABFRAGE!!
// if (dataForSave.pickedAnimationScene) {
//   return HowToText();
// }
//# sourceMappingURL=Tutorial_SS22.js.map