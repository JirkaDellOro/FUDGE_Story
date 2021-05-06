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
        //   Sue: {
        //     T0000: "Hi! Schön Dich kennenzulernen."
        //   }
        // };
        let animation = {
            start: { translation: Tutorial.ƒS.positions.bottomleft, rotation: -20, scaling: new Tutorial.ƒS.Position(0.5, 1.5), color: Tutorial.ƒS.Color.CSS("blue", 0) },
            end: { translation: Tutorial.ƒS.positions.bottomright, rotation: 20, scaling: new Tutorial.ƒS.Position(1.5, 0.5), color: Tutorial.ƒS.Color.CSS("red") },
            duration: 1,
            playmode: Tutorial.ƒS.ANIMATION_PLAYMODE.PLAYONCESTOPAFTER
        };
        let animation1 = {
            start: { translation: Tutorial.ƒS.positions.bottomleft, rotation: 20, scaling: new Tutorial.ƒS.Position(0.5, 1.5), color: Tutorial.ƒS.Color.CSS("blue", 0) },
            end: { translation: Tutorial.ƒS.positions.bottomright, rotation: 40, scaling: new Tutorial.ƒS.Position(1.5, 0.5), color: Tutorial.ƒS.Color.CSS("red") },
            duration: 1,
            playmode: Tutorial.ƒS.ANIMATION_PLAYMODE.PLAYONCESTOPAFTER
        };
        await Tutorial.ƒS.Location.show(Tutorial.locations.city);
        // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
        await Tutorial.ƒS.Character.animate(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, animation);
        await Tutorial.ƒS.update(2);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, "Welcome, welcome to FUDGE-Story~~");
        await Tutorial.ƒS.Character.hide(Tutorial.characters.Ryu);
        let pose = await Tutorial.ƒS.Character.get(Tutorial.characters.Ryu).getPose("Images/Characters/Ryu_normal.png");
        pose.removeComponent(pose.getComponent(Tutorial.ƒ.ComponentAnimator));
        await Tutorial.ƒS.Character.animate(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, animation1);
        await Tutorial.ƒS.update(2);
        // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
        // await ƒS.update(2);
    }
    Tutorial.Animation = Animation;
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    async function Case() {
        console.log("Tutorial");
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
                T0000: "Ich zeige dir nun, wie individuelle Entscheidungsmöglichkeiten festgelegt werden können.",
                T0001: "So bietest du dem Spieler deiner Visual Novel die Option, eigene Entscheidungen zu treffen und seinen präferierten Pfad zu wählen."
            }
        };
        // let signalNext: ƒT.Signal = ƒT.Progress.defineSignal([ƒT.EVENT.POINTERDOWN, ƒT.EVENT.KEYDOWN]);
        // let signalDelay2: ƒS.Signal = ƒS.Progress.defineSignal([() => ƒS.Progress.delay(2)]);
        let signalDelay1 = Tutorial.ƒS.Progress.defineSignal([() => Tutorial.ƒS.Progress.delay(1)]);
        await Tutorial.ƒS.Location.show(Tutorial.locations.city);
        await Tutorial.ƒS.update(2);
        await Tutorial.ƒS.Character.show(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, Tutorial.ƒS.positions.bottomcenter);
        await Tutorial.ƒS.update(1);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, text.Ryu.T0000);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, text.Ryu.T0001);
        /** Wait for some user input (here key- or mousedown) then say next phrase */
        Tutorial.ƒS.Sound.play(Tutorial.sound.click, 1);
        /** Define text for a user-dialog. Choose the keys (here "left" and "right" arbitrarily) */
        let firstDialogueElementAnswers = {
            iSayOk: "Okay.",
            iSayYes: "Ja.",
            iSayNo: "Nein."
        };
        /** wait for the user to select */
        let firstDialogueElement = await Tutorial.ƒS.Menu.getInput(firstDialogueElementAnswers, "class");
        /** switch accordingly */
        switch (firstDialogueElement) {
            case firstDialogueElementAnswers.iSayOk:
                Tutorial.ƒS.Sound.play(Tutorial.sound.click, 1);
                // continue writing on this path here
                await Tutorial.ƒS.Character.show(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, Tutorial.ƒS.positions.bottomcenter);
                await Tutorial.ƒS.Character.show(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, Tutorial.ƒS.positions.bottomright);
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, "test1");
                await Tutorial.ƒS.update(1);
                await Tutorial.ƒS.Character.show(Tutorial.characters.Aoi, Tutorial.characters.Aoi.pose.normal, Tutorial.ƒS.positions.bottomcenter);
                await Tutorial.ƒS.update(1);
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Aoi, "test1");
                Tutorial.ƒS.Character.hideAll();
                Tutorial.ƒS.Speech.clear();
                await Tutorial.ƒS.update(1);
                break;
            case firstDialogueElementAnswers.iSayYes:
                Tutorial.ƒS.Sound.play(Tutorial.sound.click, 1);
                // continue writing on this path here
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Protagonist, "test2");
                /** wait one second */
                await Tutorial.ƒS.update(1);
                Tutorial.ƒS.Speech.clear();
                break;
            case firstDialogueElementAnswers.iSayNo:
                Tutorial.ƒS.Sound.play(Tutorial.sound.click, 1);
                // continue writing on this path here
                await Tutorial.ƒS.Speech.tell(Tutorial.characters.Protagonist, "test3");
                await Tutorial.ƒS.update(1);
                Tutorial.ƒS.Speech.clear();
                break;
        }
        /** wait one second */
        await signalDelay1();
    }
    Tutorial.Case = Case;
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
    };
    // define sound
    Tutorial.sound = {
        // Musik
        backgroundTheme: "",
        // Sound
        click: ""
    };
    Tutorial.locations = {
        city: {
            name: "CloudyCity",
            background: "Images/Backgrounds/bg_city_cloudy.png"
        },
        bench: {
            name: "Bench",
            background: "Images/Backgrounds/bg_bench.png"
        }
    };
    // define
    Tutorial.characters = {
        Narrator: {
            name: ""
        },
        Protagonist: {
            name: "Protagonist"
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
    document.addEventListener("keydown", hndKeypress);
    async function hndKeypress(_event) {
        switch (_event.code) {
            case Tutorial.ƒ.KEYBOARD_CODE.F4:
                console.log("Save");
                await Tutorial.ƒS.Progress.save();
                break;
            case Tutorial.ƒ.KEYBOARD_CODE.F9:
                console.log("Load");
                await Tutorial.ƒS.Progress.load();
                break;
        }
    }
    window.addEventListener("load", start);
    function start(_event) {
        // define the sequence of scenes, each scene as an object with a reference to the scene-function, a name and optionally an id and an id to continue the story with
        let scenes = [
            { scene: Tutorial.Text, name: "HowToText" }
            // { scene: Case, name: "HowToDecide" }
            // { scene: Animation, name: "HowToAnimate" }
        ];
        // start the sequence
        Tutorial.ƒS.Progress.go(scenes);
    }
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
        await Tutorial.ƒS.Speech.hide();
        await Tutorial.ƒS.Location.show(Tutorial.locations.city);
        await Tutorial.ƒS.update(Tutorial.transition.clock.duration, Tutorial.transition.clock.alpha, Tutorial.transition.clock.edge);
        // await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positions.bottomcenter);
        await Tutorial.ƒS.Character.show(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, Tutorial.ƒS.positionPercent(30, 100));
        await Tutorial.ƒS.update(1);
        await Tutorial.ƒS.Speech.show();
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, text.Ryu.T0000);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, "Fremder.");
    }
    Tutorial.Text = Text;
})(Tutorial || (Tutorial = {}));
//# sourceMappingURL=Tutorial.js.map