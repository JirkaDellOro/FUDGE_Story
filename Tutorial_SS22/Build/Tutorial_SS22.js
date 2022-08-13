"use strict";
var Tutorial_SS22;
(function (Tutorial_SS22) {
    Tutorial_SS22.ƒ = FudgeCore;
    Tutorial_SS22.ƒS = FudgeStory;
    console.log("Tutorial SS22 starting");
    // **** TRANSITIONS ****
    // transitions is declared here as well as initialized
    Tutorial_SS22.transitions = {
        puzzle: {
            duration: 1,
            alpha: "FreeTransitions/jigsaw_06.jpg",
            edge: 1
        }
    };
    // **** SOUND ****
    // sound is declared here as well as initialized
    Tutorial_SS22.sound = {
        // themes
        nightclub: "Audio/Nightclub.ogg"
        // SFX
        // click: "Pfad"
    };
    // **** LOCATIONS ****
    Tutorial_SS22.locations = {
        bedroomAtNight: {
            name: "Bedroom in night mode",
            background: "Images/Backgrounds/Bedroom_Night.png"
        },
        bathroom: {
            name: "Bathroom",
            background: "Images/Backgrounds/Bathroom.png"
        },
        bathroomFoggy: {
            name: "Bathroom foggy",
            background: "Images/Backgrounds/Bathroom_Foggy.png"
        },
        radio: {
            name: "Radio",
            background: "Images/Backgrounds/radio.png"
            // foreground: "Images/Backgrounds/radio.png"
        }
    };
    // **** CHARACTERS ****
    // characters is declared here as well as initialized
    Tutorial_SS22.characters = {
        narrator: {
            name: ""
        },
        protagonist: {
            name: ""
        },
        aisaka: {
            name: "Aisaka",
            origin: Tutorial_SS22.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "Images/Characters/aisaka_angry.png",
                happy: "Images/Characters/aisaka_happy.png",
                upset: ""
            }
        },
        kohana: {
            name: "Kohana",
            origin: Tutorial_SS22.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "",
                happy: "Images/Characters/kohana_happy.png",
                upset: "Images/Characters/kohana_upset.png"
            }
        }
    };
    // **** ITEMS ****
    // items is declared here as well as initialized
    Tutorial_SS22.items = {
        blobRED: {
            name: "Blob Red",
            description: "A reddish something",
            image: "Images/Items/blobRED.png",
            static: true
        },
        blobBU: {
            name: "Blob Blue",
            description: "A blueish something",
            image: "Images/Items/blobBU.png"
        },
        blobDKBU: {
            name: "Blob DK Blue",
            description: "A dark blueish something",
            image: "Images/Items/blobDKBU.png"
        },
        blobGN: {
            name: "Blob Green",
            description: "A greenish something",
            image: "Images/Items/blobGN.png"
        },
        blobPK: {
            name: "Blob Pink",
            description: "A pinkish something",
            image: "Images/Items/blobPK.png"
        },
        blobYL: {
            name: "Blob Yellow",
            description: "A yellowish something",
            image: "Images/Items/blobYL.png"
        },
        blobOG: {
            name: "Blob Orange",
            description: "An orangeish something",
            image: "Images/Items/blobOG.png"
        }
    };
    // **** DATA THAT WILL BE SAVED (GAME PROGRESS) ****
    Tutorial_SS22.dataForSave = {
        nameProtagonist: "",
        aisakaScore: 0,
        scoreForAisaka: "",
        randomPoints: 0,
        pickedAnimationScene: false,
        pickedInventoryScene: false,
        pickedMeterScene: false,
        pickedChoice: false
    };
    // **** CREDITS ****
    function showCredits() {
        Tutorial_SS22.ƒS.Text.setClass("credits");
        Tutorial_SS22.ƒS.Text.print("Halleluja");
    }
    Tutorial_SS22.showCredits = showCredits;
    // **** ANIMATIONS ****
    function ghostAnimation() {
        return {
            start: { translation: Tutorial_SS22.ƒS.positionPercent(70, 100), color: Tutorial_SS22.ƒS.Color.CSS("lightblue", 1) },
            end: { translation: Tutorial_SS22.ƒS.positionPercent(80, 100), color: Tutorial_SS22.ƒS.Color.CSS("lightblue", 0) },
            duration: 3,
            playmode: Tutorial_SS22.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Tutorial_SS22.ghostAnimation = ghostAnimation;
    function leftToRight() {
        return {
            start: { translation: Tutorial_SS22.ƒS.positionPercent(70, 100) },
            end: { translation: Tutorial_SS22.ƒS.positionPercent(80, 100) },
            duration: 2,
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
    // Menu shortcuts
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
            // Inventory shortcuts
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
    function start(_event) {
        gameMenu = Tutorial_SS22.ƒS.Menu.create(inGameMenuButtons, buttonFunctionalities, "gameMenuCSSclass");
        buttonFunctionalities("Close");
        // **** SCENE HIERARCHY ****
        let scenes = [
            { scene: Tutorial_SS22.HowToText, name: "Text Scene" },
            // { scene: HowToMakeChoices, name: "Choices" },
            { scene: Tutorial_SS22.HowToMakeChoices2, name: "Choices" },
            // { scene: HowToMakeARadio, name: "Radio" },
            // { scene: HowToMakeAMeterBar, name: "Meter bar" },
            // The id field of "next" must be filled with the id of the next wished scene to play
            { id: "Animation Scene", scene: Tutorial_SS22.HowToAnimate, name: "Animations", next: "Good Ending" },
            { id: "Inventory Scene", scene: Tutorial_SS22.HowToMakeAnInventory, name: "Inventory", next: "Bad Ending" },
            // Branching paths
            { id: "Good Ending", scene: Tutorial_SS22.GoodEnding, name: "This is a good ending", next: "Empty Scene" },
            { id: "Bad Ending", scene: Tutorial_SS22.BadEnding, name: "This is a bad ending", next: "Empty Scene" },
            // Empty ending scene to stop the program
            { id: "Empty Scene", scene: Tutorial_SS22.Empty, name: "END" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Tutorial_SS22.dataForSave = Tutorial_SS22.ƒS.Progress.setData(Tutorial_SS22.dataForSave, uiElement);
        // start the sequence
        Tutorial_SS22.ƒS.Progress.go(scenes);
    }
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
    async function BadEnding() {
        console.log("BAD ENDING");
        let text = {
            Aisaka: {
                T0000: "BAD ENDIIIING"
            }
        };
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
    }
    Tutorial_SS22.BadEnding = BadEnding;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function Empty() {
        console.log("THE VISUAL NOVEL ENDS HERE");
    }
    Tutorial_SS22.Empty = Empty;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function GoodEnding() {
        console.log("GOOD ENDING");
        let text = {
            Aisaka: {
                T0000: "GUTES ENDE"
            }
        };
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
        // Since you defined a next-scene in the scene hierarchy a return will not be needed
        // return "GameOver";
    }
    Tutorial_SS22.GoodEnding = GoodEnding;
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
        // Any text content within the above Narrator-key will be played one after another (as it should be) by this code
        for (let narratorText of Object.values(text.Narrator)) {
            await Tutorial_SS22.ƒS.Speech.tell(text.Aisaka, narratorText);
        }
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.bedroomAtNight);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
        // ƒS.update();
        await Tutorial_SS22.ƒS.Character.animate(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.ghostAnimation());
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0001);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Mich wirst du niemals finden!");
        // return "GoodEnding";
    }
    Tutorial_SS22.HowToAnimate = HowToAnimate;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function HowToMakeAMeterBar() {
        console.log("Let's make a meter bar!");
        let text = {
            Aisaka: {
                T0000: "Wie du vielleicht bemerkt hast, gibt es in Visual Novels häufig eine Skala oder eine Meterbar.",
                T0001: "Damit visualisieren Autoren dem Spieler zum Beispiel die Empathie-Punkte bei der jeweiligen Figur.",
                T0002: ""
            }
        };
        // dataForSave.pickedMeterScene = true;
        // document.getElementsByName("aisakaScore").forEach(meterStuff => meterStuff.hidden = true);
        // document.getElementById("scoreForAisaka").style.display = "none";
        Tutorial_SS22.ƒS.Speech.hide();
        Tutorial_SS22.dataForSave.aisakaScore += 50;
        console.log(Tutorial_SS22.dataForSave.aisakaScore);
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.bathroom);
        Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
        Tutorial_SS22.dataForSave.aisakaScore -= 40;
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0001);
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.bathroomFoggy);
        await Tutorial_SS22.ƒS.update(3);
        Tutorial_SS22.dataForSave.aisakaScore += 50;
        console.log(Tutorial_SS22.dataForSave.aisakaScore);
        // return "Good Ending";
    }
    Tutorial_SS22.HowToMakeAMeterBar = HowToMakeAMeterBar;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function HowToMakeAnInventory() {
        console.log("Let's make an inventory!");
        let text = {
            Aisaka: {
                T0000: "Hallo nochmal",
                T0001: "Hast du dein Inventar gesehen?!"
            },
            Protagonist: {
                T0000: "Ich heiße "
            }
        };
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.bedroomAtNight);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
        // await ƒS.update();
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.blobBU);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.blobBU);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.blobRED);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.blobGN);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.blobGN);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.blobGN);
        Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.blobGN);
        // ƒS.Inventory.add(items.BlobDKBU);
        // ƒS.Inventory.add(items.BlobDKBU);
        // ƒS.Inventory.add(items.BlobDKBU);
        // Generate 20 items of BlobDKBU; Generate a big amount of items at once instead of spamming the Inventory.add-method
        for (let i = 0; i < 20; i++) {
            Tutorial_SS22.ƒS.Inventory.add(Tutorial_SS22.items.blobDKBU);
        }
        await Tutorial_SS22.ƒS.Inventory.open();
        Tutorial_SS22.ƒS.update();
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.protagonist, text.Protagonist.T0000, false);
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
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.bedroomAtNight);
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
                Tutorial_SS22.dataForSave.aisakaScore += 50;
                console.log(Tutorial_SS22.dataForSave.aisakaScore);
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
        if (Tutorial_SS22.dataForSave.aisakaScore === 50) {
            let secondDialogueElementAnswers = {
                iSayOk: "Du hast 50 Punkte bei deiner letzten Auswahl gesammelt.",
                iSayYes: "...deshalb siehst du diese Auswahlmöglichkeit",
                iSayNo: "Spektakulär!"
            };
            let secondDialogueElement = await Tutorial_SS22.ƒS.Menu.getInput(secondDialogueElementAnswers, "choicesCSSclass");
            switch (secondDialogueElement) {
                case secondDialogueElementAnswers.iSayOk:
                    // continue path here
                    Tutorial_SS22.dataForSave.aisakaScore += 50;
                    console.log(Tutorial_SS22.dataForSave.aisakaScore);
                    await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Okay, cool.");
                    Tutorial_SS22.ƒS.Speech.clear();
                    break;
                case secondDialogueElementAnswers.iSayYes:
                    // continue path here
                    await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "ja, das wusste ich.");
                    Tutorial_SS22.ƒS.Character.hide(Tutorial_SS22.characters.aisaka);
                    break;
                case secondDialogueElementAnswers.iSayNo:
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
    async function HowToMakeChoices2() {
        console.log("Let's make some choices!");
        let text = {
            Aisaka: {
                T0000: "Heute wird sich alles um Auswahlmöglichkeiten drehen.",
                T0001: "Schön, dass du dabei warst!"
            }
        };
        Tutorial_SS22.ƒS.Speech.setTickerDelays(50, 2);
        let signalDelay2 = Tutorial_SS22.ƒS.Progress.defineSignal([() => Tutorial_SS22.ƒS.Progress.delay(2)]);
        // let signalDelay1: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(1)]);
        // ƒS.Sound.fade(sound.nightclub, 1, 2, true);
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.bedroomAtNight);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positions.bottomcenter);
        await Tutorial_SS22.ƒS.Character.show(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.ƒS.positionPercent(70, 100));
        await Tutorial_SS22.ƒS.update();
        // ƒS.Character.hide(characters.aisaka);
        // ƒS.Character.hideAll();
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, text.Aisaka.T0000);
        await signalDelay2();
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "test", false);
        Tutorial_SS22.ƒS.Speech.clear();
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.update(1.5);
        let firstDialogueElementAnswers = {
            iSayOk: "Okay.",
            iSayYes: "Ja.",
            iSayNo: "Nein.",
            iSayBla: "Bla"
        };
        let pickedOk;
        let pickedYes;
        let pickedNo;
        let pickedBla;
        do {
            // if (pickedYes || pickedBla || pickedNo || pickedOk || pickedYes) {
            //   delete firstDialogueElementAnswers.iSayYes;
            // }
            if (pickedYes) {
                delete firstDialogueElementAnswers.iSayYes;
            }
            else if (pickedNo) {
                delete firstDialogueElementAnswers.iSayNo;
            }
            else if (pickedOk) {
                delete firstDialogueElementAnswers.iSayOk;
            }
            else if (pickedBla) {
                delete firstDialogueElementAnswers.iSayBla;
            }
            let firstDialogueElement = await Tutorial_SS22.ƒS.Menu.getInput(firstDialogueElementAnswers, "choicesCSSclass");
            switch (firstDialogueElement) {
                case firstDialogueElementAnswers.iSayOk:
                    // continue path here
                    pickedOk = true;
                    console.log(Tutorial_SS22.dataForSave.aisakaScore);
                    await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Okay");
                    Tutorial_SS22.ƒS.Speech.clear();
                    break;
                case firstDialogueElementAnswers.iSayYes:
                    // continue path here
                    pickedYes = true;
                    await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Ja");
                    Tutorial_SS22.ƒS.Character.hide(Tutorial_SS22.characters.aisaka);
                    // delete firstDialogueElementAnswers.iSayYes;
                    break;
                case firstDialogueElementAnswers.iSayNo:
                    // continue path here
                    pickedNo = true;
                    await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Nein");
                    Tutorial_SS22.ƒS.Speech.clear();
                    break;
                case firstDialogueElementAnswers.iSayBla:
                    // continue path here
                    pickedBla = true;
                    Tutorial_SS22.dataForSave.pickedChoice = true;
                    await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Bla");
                    Tutorial_SS22.ƒS.Speech.clear();
                    break;
            }
        } while (!Tutorial_SS22.dataForSave.pickedChoice);
        // function allChoicesTrue(): string {
        //   if (pickedYes && pickedBla && pickedNo && pickedOk && pickedYes) {
        //     return "Good Ending";
        //   }
        // }
    }
    Tutorial_SS22.HowToMakeChoices2 = HowToMakeChoices2;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
var Tutorial_SS22;
(function (Tutorial_SS22) {
    async function HowToText() {
        console.log("Let's text!");
        // This text was moved to a separate dialogue file in the folder "Definitions"
        // let text = {
        //   Aisaka: {
        //     T0000: "Sei gegrüßt, Erdling.",
        //     T0001: "Kleiner Scherz, willkommen zum Tutorial!"
        //   }
        // };
        let signalDelay1 = Tutorial_SS22.ƒS.Progress.defineSignal([() => Tutorial_SS22.ƒS.Progress.delay(1)]);
        // let signalDelay2: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(2)]);
        Tutorial_SS22.ƒS.Speech.hide();
        await Tutorial_SS22.ƒS.Location.show(Tutorial_SS22.locations.bedroomAtNight);
        await Tutorial_SS22.ƒS.update(Tutorial_SS22.transitions.puzzle.duration, Tutorial_SS22.transitions.puzzle.alpha, Tutorial_SS22.transitions.puzzle.edge);
        await Tutorial_SS22.ƒS.Character.show(Tutorial_SS22.characters.aisaka, Tutorial_SS22.characters.aisaka.pose.happy, Tutorial_SS22.ƒS.positionPercent(70, 100));
        Tutorial_SS22.ƒS.update();
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, Tutorial_SS22.textAusgelagert.Aisaka.T0000);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, Tutorial_SS22.textAusgelagert.Aisaka.T0001);
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "...und <strong>dieser</strong> Text wird als direkter String in der tell-Methode ausgegeben.");
        await Tutorial_SS22.ƒS.Speech.tell(Tutorial_SS22.characters.aisaka, "Hierfür wird lediglich nach Angabe des Charakters, bei dem dieser Text erscheinen soll, der Text in Anführungsstrichen dahinter geschrieben.");
        await signalDelay1();
        Tutorial_SS22.ƒS.Speech.hide();
        let pages = ["<strong>Ende-zu-Ende-Verschlüsselung:</strong><br\>Nur beide Kommunikationspartner nehmen das Ver- und Entschlüsseln der übertragenen Informationen direkt vor. \
          Andere Stationen die an der Übertragung der Informationen beteiligt sind, können nicht darauf zugreifen.<br\><br\><br\><br\><br\><br\><br\>Seite 1", "Langzeitverschlüsselung,\
          <br\>Verschlüsselte Nutzerprofile,<br\>Telefonbuch-Kontakte werden nicht auf die Betriebsserver geladen,<br\>Sicherung und Schutz persönlicher Informationen durch persönliche PIN,\
          <br\>Gesprächsverschlüsselung,<br\>kein Tracking \
          <br\><br\>Seite 2", "Seite 3", "Seite 4", "Seite 5", "Seite 6", "Seite 7", "Seite 8"];
        let current = 0;
        let flip = { back: "Back", next: "Next", done: "Close" };
        let choice;
        Tutorial_SS22.ƒS.Text.addClass("flip");
        do {
            Tutorial_SS22.ƒS.Text.print(pages[current]);
            choice = await Tutorial_SS22.ƒS.Menu.getInput(flip, "flip");
            switch (choice) {
                case flip.back:
                    current = Math.max(0, current - 1);
                    break;
                case flip.next:
                    current = Math.min(2, current + 1);
                    break;
            }
        } while (choice != flip.done);
        Tutorial_SS22.ƒS.Text.close();
    }
    Tutorial_SS22.HowToText = HowToText;
})(Tutorial_SS22 || (Tutorial_SS22 = {}));
//# sourceMappingURL=Tutorial_SS22.js.map