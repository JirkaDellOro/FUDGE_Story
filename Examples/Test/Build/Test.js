"use strict";
var Tutorial;
(function (Tutorial) {
    async function Main() {
        console.log("Main Menu");
        await Tutorial.ƒS.Location.show(Tutorial.locations.city);
        await Tutorial.ƒS.Character.show(Tutorial.characters.Sue, Tutorial.characters.Sue.pose.normal, Tutorial.ƒS.positions.bottomcenter);
        await Tutorial.ƒS.update(2);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Sue, "Willkommen zum Test von FUDGE-Story", false);
    }
    Tutorial.Main = Main;
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    Tutorial.ƒ = FudgeCore;
    Tutorial.ƒS = FudgeStory;
    console.log("Start");
    // define transitions
    Tutorial.transitions = {
        clock: {
            duration: 3,
            alpha: "../Free Transitions/circlewipe-ccw.jpg",
            edge: 1
        },
        jigsaw: {
            duration: 2,
            alpha: "../Free Transitions/jigsaw 08.png",
            edge: 0.4
        }
    };
    // define sounds as key-string-pairs with the url of the soundfile
    Tutorial.sound = {
        backgroundTheme: "../Audio/hypnotic.mp3",
        shoot: "../Audio/fire.mp3"
    };
    // define locations as key-object-pairs, the objects with the properties name, background and an optional foreground
    Tutorial.locations = {
        city: {
            name: "CloudyCity",
            background: "Images/bg_city_cloudy.png"
        }
    };
    // define characters as key-object-pairs, the objects with the properties name, origin and an array if poses, each again with a unique key
    Tutorial.characters = {
        Sue: {
            name: "Sue",
            origin: Tutorial.ƒS.ORIGIN.BOTTOMRIGHT,
            pose: {
                normal: "Images/placeholder_girl.png"
            }
        }
    };
    // define the sequence of scenes, each scene as an object with a reference to the scene-function, a name and optionally an id and an id to continue the story with
    Tutorial.scenes = [
        { scene: Tutorial.Main, name: "Main Menu" }
    ];
    // start the sequence
    Tutorial.ƒS.Progress.go(Tutorial.scenes);
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
})(Tutorial || (Tutorial = {}));
//# sourceMappingURL=Test.js.map