"use strict";
var Tutorial;
(function (Tutorial) {
    async function Animation() {
        console.log("Animation");
        // let text: {
        //   Narrator: {
        //     T0000: "<i></i>",
        //     T0001: "<i></i>",
        //     T0002: "<i> </i>"
        //   }
        //   Aoi: {
        //     T0000: "Hello~"
        //   }
        // };
        document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = true);
        document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = true);
        Tutorial.gameMenu.close();
        Tutorial.menu = false;
        Tutorial.ƒS.Speech.hide();
        await Tutorial.ƒS.Location.show(Tutorial.locations.bench);
        // await ƒS.Character.animate(characters.Aoi, characters.Aoi.pose.normal, animation);
        // await ƒS.Character.show(characters.Aoi, characters.Aoi.pose.normal, ƒS.positions.bottomleft);
        await Tutorial.ƒS.Character.animate(Tutorial.characters.Aoi, Tutorial.characters.Aoi.pose.normal, Tutorial.leftToRight());
        // await ƒS.Character.animate(characters.Aoi, characters.Aoi.pose.normal, fromRightToOutOfCanvas());
        await Tutorial.ƒS.Character.hide(Tutorial.characters.Aoi);
        await Tutorial.ƒS.update(2);
        // await ƒS.Character.hide(characters.Aoi);
        // await ƒS.update(2);
    }
    Tutorial.Animation = Animation;
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    async function Decision() {
        console.log("Decision");
        let text = {
            Aoi: {
                T0000: "Hi, wie heißt duu?",
                T0001: "<p>Das war's auch schon.</p>",
                T0002: "Hast du die Verzögerung bemerkt?"
            }
        };
        // let signalDelay2: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(2)]);
        // let signalDelay1: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(1)]);
        // ƒS.Text.addClass("cssklasse");
        // await ƒS.Text.print("Text, den ich anzeigen lassen möchte.");
        // ƒS.Text.close();
        Tutorial.ƒS.Speech.setTickerDelays(50, 2);
        Tutorial.ƒS.Sound.fade(Tutorial.sound.backgroundTheme, 0.2, 0.1, true);
        // ƒS.Inventory.add();
        // ƒS.Inventory.open();
        Tutorial.ƒS.Speech.hide();
        await Tutorial.ƒS.Location.show(Tutorial.locations.city);
        await Tutorial.ƒS.update(Tutorial.transition.clock.duration, Tutorial.transition.clock.alpha, Tutorial.transition.clock.edge);
        await Tutorial.ƒS.Character.show(Tutorial.characters.Aoi, Tutorial.characters.Aoi.pose.normal, Tutorial.ƒS.positions.bottomcenter);
        await Tutorial.ƒS.update();
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Aoi, text.Aoi.T0000);
        // Name field
        // dataForSave.Protagonist.name = await ƒS.Speech.getInput();
        // console.log(dataForSave.Protagonist.name);
        // await signalDelay2();
        Tutorial.ƒS.Speech.set(Tutorial.characters.Aoi, text.Aoi.T0002);
        // if (!dataForSave.goToInventory) {
        //   return Inventory();
        // }
        Tutorial.ƒS.Sound.play(Tutorial.sound.click, 1);
        let firstDialogueElementAnswers = {
            iSayOk: "Okay.",
            iSayYes: "Ja.",
            iSayNo: "Nein."
        };
        let firstDialogueElement = await Tutorial.ƒS.Menu.getInput(firstDialogueElementAnswers, "class");
        switch (firstDialogueElement) {
            case firstDialogueElementAnswers.iSayOk:
                Tutorial.ƒS.Sound.play(Tutorial.sound.click, 1);
                //continue writing on this path here
                // testing audio stuff
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Aoi, "Okay");
                Tutorial.ƒS.Sound.fade(Tutorial.sound.backgroundTheme, 0, 1);
                Tutorial.ƒS.Sound.play(Tutorial.sound.dystopian, 0.5);
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Aoi, "1");
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Aoi, "2");
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Aoi, "3");
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Aoi, "4");
                Tutorial.ƒS.Character.hide(Tutorial.characters.Aoi);
                Tutorial.ƒS.Speech.clear();
                Tutorial.ƒS.Sound.fade(Tutorial.sound.dystopian, 0, 0.5);
                await Tutorial.ƒS.update(1);
                // dataForSave.goToInventory = false;
                return "NovelPages";
                break;
            case firstDialogueElementAnswers.iSayYes:
                Tutorial.dataForSave.score -= 10;
                console.log(Tutorial.dataForSave.score);
                Tutorial.ƒS.Sound.play(Tutorial.sound.click, 1);
                //continue writing on this path here
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Aoi, "Ja.");
                Tutorial.ƒS.Speech.clear();
                await Tutorial.ƒS.update(1);
                return "Inventory";
                // dataForSave.goToInventory = true;
                break;
            case firstDialogueElementAnswers.iSayNo:
                Tutorial.ƒS.Sound.play(Tutorial.sound.click, 1);
                //continue writing on this path here
                Tutorial.ƒS.Character.hide(Tutorial.characters.Aoi);
                await Tutorial.ƒS.update(1);
                await Tutorial.ƒS.Character.show(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, Tutorial.ƒS.positionPercent(70, 100));
                await Tutorial.ƒS.update(1);
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, "Nein.");
                await Tutorial.ƒS.Character.hide(Tutorial.characters.Ryu);
                Tutorial.ƒS.Speech.clear();
                await Tutorial.ƒS.update(1);
                Tutorial.dataForSave.goToInventory = false;
                break;
        }
        // ƒS.Sound.fade(sound.backgroundTheme, 0.2, 0.1, true);
        // await ƒS.Character.show(characters.Aoi, characters.Aoi.pose.normal, ƒS.positions.bottomcenter);
        // await ƒS.update();
        // await ƒS.Speech.tell(characters.Aoi, text.Aoi.T0001);
        // await ƒS.Character.hide(characters.Aoi);
        // ƒS.Speech.hide();
        // await ƒS.update(1);
        // // Musik ausblenden
        // ƒS.Sound.fade(sound.backgroundTheme, 0, 1);
    }
    Tutorial.Decision = Decision;
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    async function Inventory() {
        console.log("Inventory");
        let text = {
            Narrator: {
                T0000: "",
                T0001: ""
            },
            Protagonist: {
                T0000: "",
                T0001: ""
            },
            Ryu: {
                T0000: "Willkommen.",
                T0001: ""
            }
        };
        document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = true);
        document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = true);
        Tutorial.ƒS.Speech.hide();
        await Tutorial.ƒS.Location.show(Tutorial.locations.city);
        await Tutorial.ƒS.update(Tutorial.transition.clock.duration, Tutorial.transition.clock.alpha, Tutorial.transition.clock.edge);
        // ƒS.Inventory.add(items.Toy);
        // ƒS.Inventory.add(items.Toy);
        // ƒS.Inventory.add(items.Toy);
        // ƒS.Inventory.add(items.Toy);
        Tutorial.ƒS.Inventory.add(Tutorial.items.BlobBU);
        Tutorial.ƒS.Inventory.add(Tutorial.items.BlobRED);
        Tutorial.ƒS.Inventory.add(Tutorial.items.BlobGN);
        Tutorial.ƒS.Inventory.add(Tutorial.items.BlobDKBU);
        Tutorial.ƒS.Inventory.add(Tutorial.items.BlobYL);
        Tutorial.ƒS.Inventory.add(Tutorial.items.BlobPK);
        Tutorial.ƒS.Inventory.add(Tutorial.items.BlobOG);
        // console.log(await ƒS.Inventory.open());
        await Tutorial.ƒS.Inventory.open();
        Tutorial.ƒS.Speech.hide();
        // await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positions.bottomcenter);
        await Tutorial.ƒS.Character.show(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, Tutorial.ƒS.positionPercent(30, 100));
        await Tutorial.ƒS.update(1);
        Tutorial.ƒS.Speech.show();
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, text.Ryu.T0000);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, "Fremder.");
        await Tutorial.ƒS.Character.hide(Tutorial.characters.Ryu);
        await Tutorial.ƒS.update(1);
    }
    Tutorial.Inventory = Inventory;
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    Tutorial.ƒ = FudgeCore;
    Tutorial.ƒS = FudgeStory;
    console.log("Start");
    // define transitions
    Tutorial.transition = {
        clock: {
            duration: 1.5,
            alpha: "FreeTransitions/WipesAndOther/circlewipe-ccw.jpg",
            edge: 1
        }
        // wipe: {
        //   duration: 1,
        //   alpha: "",
        //   edge: 2
        // }
    };
    // define sound
    Tutorial.sound = {
        // Music
        backgroundTheme: "Audio/Nightclub.ogg",
        dystopian: "Audio/Dystopian.ogg",
        // Sound
        click: ""
    };
    Tutorial.locations = {
        city: {
            name: "Cloudy City",
            background: "Images/Backgrounds/bg_city_cloudy.png"
        },
        bench: {
            name: "Bench 1",
            background: "Images/Backgrounds/bg_bench.png"
        }
    };
    // define characters that will show on the stage with some data 
    Tutorial.characters = {
        Narrator: {
            name: ""
        },
        Aoi: {
            name: "Aoi",
            origin: Tutorial.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                normal: "Images/Characters/Aoi_normal.png"
            }
        },
        Ryu: {
            name: "Ryu",
            origin: Tutorial.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                normal: "Images/Characters/Ryu_normal.png",
                smile: ""
            }
        }
    };
    // define items as key-object-pairs, the objects with the properties name, description and an address to an image
    Tutorial.items = {
        BlobRED: {
            name: "Blob Red",
            description: "A reddish something",
            image: "Images/Items/blobRED.png"
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
        }
    };
    // tell FUDGE Story the data to save besides the current scene
    Tutorial.dataForSave = {
        score: 0,
        // to fix
        Protagonist: {
            name: "Protagonist"
        },
        nameProtagonist: "Protagonist",
        scoreAoi: 0,
        scoreForAoi: "",
        scoreRyu: 0,
        scoreForRyu: "",
        started: false,
        ended: false,
        pickedText: false,
        goToInventory: false
    };
    //  MENU - Audio functions
    let volume = 1.0;
    function incrementSound() {
        if (volume >= 100)
            return;
        volume += 0.5;
        Tutorial.ƒS.Sound.setMasterVolume(1.3);
    }
    Tutorial.incrementSound = incrementSound;
    function decrementSound() {
        if (volume <= 0)
            return;
        volume -= 0.5;
        Tutorial.ƒS.Sound.setMasterVolume(0.7);
    }
    Tutorial.decrementSound = decrementSound;
    function showCredits() {
        Tutorial.ƒS.Text.addClass("credits");
        Tutorial.ƒS.Text.print("Hier könnten jetzt Credits stehen.");
        // showCredits();
    }
    Tutorial.showCredits = showCredits;
    // MENU - create Menu with Buttons
    let inGameMenu = {
        save: "Save",
        load: "Load",
        close: "Close",
        turnUpVolume: "+",
        turndownVolume: "-",
        credits: "Credits",
        about: "About",
        open: "Open"
    };
    async function buttonFunctionalities(_option) {
        console.log(_option);
        if (_option == inGameMenu.save) {
            await Tutorial.ƒS.Progress.save();
        }
        else if (_option == inGameMenu.load) {
            await Tutorial.ƒS.Progress.load();
        }
        else if (_option == inGameMenu.turnUpVolume) {
            incrementSound();
        }
        else if (_option == inGameMenu.turndownVolume) {
            decrementSound();
        }
        if (_option == inGameMenu.close) {
            Tutorial.gameMenu.close();
        }
        if (_option == inGameMenu.open) {
            Tutorial.gameMenu.open();
        }
        if (_option == inGameMenu.credits) {
            showCredits();
        }
    }
    // true heißt hier offen und false geschlossen
    Tutorial.menu = true;
    // shortcuts to save and load game progress
    // && doesn't work in a switch
    document.addEventListener("keydown", hndKeypress);
    async function hndKeypress(_event) {
        switch (_event.code) {
            case Tutorial.ƒ.KEYBOARD_CODE.F8:
                console.log("Save");
                await Tutorial.ƒS.Progress.save();
                break;
            case Tutorial.ƒ.KEYBOARD_CODE.F9:
                console.log("Load");
                await Tutorial.ƒS.Progress.load();
                break;
            // case ƒ.KEYBOARD_CODE.X:
            //   console.log("Close");
            //   gameMenu.close();
            //   break;
            // Englische Tastatur beachten, Öffnen und Schließen des Inventars mit derselben Taste
            case Tutorial.ƒ.KEYBOARD_CODE.M:
                if (Tutorial.menu) {
                    console.log("Close");
                    Tutorial.gameMenu.close();
                    Tutorial.menu = false;
                }
                else {
                    console.log("Open");
                    Tutorial.gameMenu.open();
                    Tutorial.menu = true;
                }
                break;
        }
    }
    // shortcuts to open and close the inventory
    document.addEventListener("keydown", hndKeypressForInventory);
    async function hndKeypressForInventory(_event) {
        switch (_event.code) {
            case Tutorial.ƒ.KEYBOARD_CODE.I:
                console.log("open inventory");
                await Tutorial.ƒS.Inventory.open();
                break;
            case Tutorial.ƒ.KEYBOARD_CODE.ESC:
                console.log("close inventory");
                await Tutorial.ƒS.Inventory.open();
                Tutorial.ƒS.Inventory.close();
                break;
        }
    }
    function leftToRight() {
        return {
            start: { translation: Tutorial.ƒS.positions.bottomleft },
            end: { translation: Tutorial.ƒS.positions.bottomright },
            duration: 3,
            playmode: Tutorial.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Tutorial.leftToRight = leftToRight;
    function fromRightToOutOfCanvas() {
        return {
            start: { translation: Tutorial.ƒS.positionPercent(30, 100) },
            end: { translation: Tutorial.ƒS.positionPercent(120, 100) },
            duration: 3,
            playmode: Tutorial.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Tutorial.fromRightToOutOfCanvas = fromRightToOutOfCanvas;
    window.addEventListener("load", start);
    function start(_event) {
        // MENU
        Tutorial.gameMenu =
            Tutorial.ƒS.Menu.create(inGameMenu, buttonFunctionalities, "gameMenu");
        // define the sequence of scenes, each scene as an object with a reference to the scene-function, a name and optionally an id and an id to continue the story with
        let scenes = [
            // linear path
            { scene: Tutorial.Text, name: "How To Text" },
            { scene: Tutorial.Decision, name: "How To Decide" },
            // Gabelung
            // Pfad 1
            { id: "NovelPages", scene: Tutorial.NovelPages, name: "Different uses of novel pages", next: "Animation" },
            { id: "Animation", scene: Tutorial.Animation, name: "How To Animate", next: "End" },
            // Pfad 2
            { id: "Inventory", scene: Tutorial.Inventory, name: "How To Make An Inventory", next: "Meter" },
            { id: "Meter", scene: Tutorial.Meter, name: "How To Make a Progress bar", next: "End" },
            // { scene: Animation, name: "How To Animate" },
            // { scene: GameMenu, name: "How To Make A Game Menu" },
            // { scene: Meter, name: "How To Make a Progress bar" },
            { id: "End", scene: End, name: "This is an ending" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Tutorial.dataForSave = Tutorial.ƒS.Progress.setData(Tutorial.dataForSave, uiElement);
        // start the sequence
        Tutorial.ƒS.Progress.go(scenes);
    }
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    async function Meter() {
        console.log("Text");
        let text = {
            Narrator: {
                T0000: "",
                T0001: ""
            },
            Protagonist: {
                T0000: "",
                T0001: ""
            },
            Ryu: {
                T0000: "Du hast bisher ganz gut durchgehalten...",
                T0001: "Weiter so."
            }
        };
        document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = true);
        document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = true);
        // ƒS.Speech.hide();
        await Tutorial.ƒS.Location.show(Tutorial.locations.bench);
        await Tutorial.ƒS.Character.show(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, Tutorial.ƒS.positionPercent(30, 100));
        await Tutorial.ƒS.update(1);
        Tutorial.ƒS.Speech.show();
        document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = false);
        document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = false);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, text.Ryu.T0000);
        Tutorial.dataForSave.scoreRyu += 50;
        Tutorial.dataForSave.scoreForRyu = "You earned 50 points on Ryus bar",
            // dataForSave.scoreAoi += 15;
            // dataForSave.scoreForAoi = "You earned 15 points on Aois bar",
            await Tutorial.ƒS.update(1);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, text.Ryu.T0001);
        // document.getElementById("meterli").hidden = true;
        // document.getElementById("meterInput").hidden = true;
        // beide auf einmal hiden
        // document.getElementsByName("a").forEach(meterStuff => meterStuff.hidden = true);
        await Tutorial.ƒS.Character.hide(Tutorial.characters.Ryu);
        // dataForSave.state.scoreAoi += 100;
    }
    Tutorial.Meter = Meter;
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    async function NovelPages() {
        console.log("Novel Pages");
        let text = {
            Narrator: {
                T0000: "",
                T0001: ""
            },
            Protagonist: {
                T0000: "",
                T0001: ""
            },
            Ryu: {
                T0000: "Novel pages können ganz unterschiedlich verwendet werden.",
                T0001: "Hier konntest du ein Beispiel sehen, bei dem man die Seiten, wie in einem Buch, umblättert."
            }
        };
        document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = true);
        document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = true);
        Tutorial.gameMenu.close();
        Tutorial.menu = false;
        Tutorial.ƒS.Speech.hide();
        await Tutorial.ƒS.Location.show(Tutorial.locations.bench);
        // await ƒS.update(transition.clock.duration, transition.clock.alpha, transition.clock.edge);
        await Tutorial.ƒS.Character.show(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, Tutorial.ƒS.positionPercent(30, 100));
        await Tutorial.ƒS.update(1);
        // await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0000);
        // if (!dataForSave.started) {
        Tutorial.ƒS.Text.addClass("contract");
        Tutorial.ƒS.Speech.hide();
        let pages = ["<strong>Überschrift:</strong>blabla<br></br> \
      <br>Seite 1</br>", "<strong>Überschrift</strong>\
      <br>Seite 2</br>", "<strong>Überschrift</strong> \
      <br>test text test</br> text test text <br>test text test</br> text<br></br> Seite 3", "Seite 4", "Seite 5", "Seite 6", "Seite 7", "Seite 8"];
        let current = 0;
        let flip = { back: "Back", next: "Next", done: "Close" };
        let choice;
        Tutorial.ƒS.Text.addClass("flip");
        do {
            Tutorial.ƒS.Text.print(pages[current]);
            choice = await Tutorial.ƒS.Menu.getInput(flip, "flip");
            switch (choice) {
                case flip.back:
                    current = Math.max(0, current - 1);
                    break;
                case flip.next:
                    current = Math.min(pages.length - 1, current + 1);
                    break;
                // case flip.back: current = Math.max(0, current - 1); break;
                // case flip.next: current = Math.min(2, current + 1); break;
            }
        } while (choice != flip.done);
        Tutorial.ƒS.Text.close();
        // }
        // Delay reinmachen + testen
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, text.Ryu.T0000);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, text.Ryu.T0001);
        Tutorial.ƒS.Text.print("Lies mich.");
        Tutorial.ƒS.Text.setClass("text");
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, "Probier' es doch einmal selbst aus.");
        await Tutorial.ƒS.Character.hide(Tutorial.characters.Ryu);
        await Tutorial.ƒS.update(1);
    }
    Tutorial.NovelPages = NovelPages;
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    async function Text() {
        console.log("Text");
        let text = {
            Narrator: {
                T0000: "",
                T0001: ""
            },
            Protagonist: {
                T0000: "",
                T0001: ""
            },
            Ryu: {
                T0000: "Willkommen.",
                T0001: ""
            }
        };
        // dataForSave.pickedText = true;
        document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = true);
        document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = true);
        Tutorial.ƒS.Speech.hide();
        await Tutorial.ƒS.Location.show(Tutorial.locations.city);
        await Tutorial.ƒS.update(Tutorial.transition.clock.duration, Tutorial.transition.clock.alpha, Tutorial.transition.clock.edge);
        // await ƒS.update(transition.clock.duration, transition.wipe.alpha, transition.clock.edge);
        // await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positions.bottomcenter);
        await Tutorial.ƒS.Character.show(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, Tutorial.ƒS.positionPercent(30, 100));
        await Tutorial.ƒS.update(1);
        Tutorial.ƒS.Speech.show();
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, text.Ryu.T0000, false);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, "Fremder.");
        await Tutorial.ƒS.Character.hide(Tutorial.characters.Ryu);
        await Tutorial.ƒS.update(1);
        // if (dataForSave.pickedText) {
        //   return Text();
        // }
    }
    Tutorial.Text = Text;
})(Tutorial || (Tutorial = {}));
//# sourceMappingURL=Tutorial.js.map