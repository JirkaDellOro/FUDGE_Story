"use strict";
var Tutorial;
(function (Tutorial_1) {
    async function Tutorial() {
        console.log("Tutorial");
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
            start: { translation: Tutorial_1.ƒS.positions.bottomleft, rotation: -20, scaling: new Tutorial_1.ƒS.Position(0.5, 1.5), color: Tutorial_1.ƒS.Color.CSS("blue", 0) },
            end: { translation: Tutorial_1.ƒS.positions.bottomright, rotation: 20, scaling: new Tutorial_1.ƒS.Position(1.5, 0.5), color: Tutorial_1.ƒS.Color.CSS("red") },
            duration: 1,
            playmode: Tutorial_1.ƒS.ANIMATION_PLAYMODE.PLAYONCESTOPAFTER
        };
        let animation1 = {
            start: { translation: Tutorial_1.ƒS.positions.bottomleft, rotation: 20, scaling: new Tutorial_1.ƒS.Position(0.5, 1.5), color: Tutorial_1.ƒS.Color.CSS("blue", 0) },
            end: { translation: Tutorial_1.ƒS.positions.bottomright, rotation: 40, scaling: new Tutorial_1.ƒS.Position(1.5, 0.5), color: Tutorial_1.ƒS.Color.CSS("red") },
            duration: 1,
            playmode: Tutorial_1.ƒS.ANIMATION_PLAYMODE.PLAYONCESTOPAFTER
        };
        await Tutorial_1.ƒS.Location.show(Tutorial_1.locations.city);
        // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
        await Tutorial_1.ƒS.Character.animate(Tutorial_1.characters.Sue, Tutorial_1.characters.Sue.pose.normal, animation);
        await Tutorial_1.ƒS.update(2);
        await Tutorial_1.ƒS.Speech.tell(Tutorial_1.characters.Sue, "Willkommen zum Fuiyooh von FUDGE-Story");
        await Tutorial_1.ƒS.Character.hide(Tutorial_1.characters.Sue);
        let pose = await Tutorial_1.ƒS.Character.get(Tutorial_1.characters.Sue).getPose("Images/Characters/placeholder_girl.png");
        pose.removeComponent(pose.getComponent(Tutorial_1.ƒ.ComponentAnimator));
        await Tutorial_1.ƒS.Character.animate(Tutorial_1.characters.Sue, Tutorial_1.characters.Sue.pose.normal, animation1);
        await Tutorial_1.ƒS.update(2);
        // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
        // await ƒS.update(2);
    }
    Tutorial_1.Tutorial = Tutorial;
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    async function Testy() {
        console.log("Testy");
        let animation = {
            start: { translation: Tutorial.ƒS.positions.bottomcenter, rotation: -20, scaling: new Tutorial.ƒS.Position(0.5, 1.5), color: Tutorial.ƒS.Color.CSS("white", 0) },
            end: { translation: Tutorial.ƒS.positions.bottomright, rotation: 20, scaling: new Tutorial.ƒS.Position(1.5, 0.5), color: Tutorial.ƒS.Color.CSS("red") },
            duration: 1,
            playmode: Tutorial.ƒS.ANIMATION_PLAYMODE.LOOP
        };
        await Tutorial.ƒS.Location.show(Tutorial.locations.city);
        await Tutorial.ƒS.Character.show(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, Tutorial.ƒS.positions.bottomcenter);
        await Tutorial.ƒS.Character.animate(Tutorial.characters.Ryu, Tutorial.characters.Ryu.pose.normal, animation);
        await Tutorial.ƒS.update(2);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, "Hm.", false);
        await Tutorial.ƒS.Character.hide(Tutorial.characters.Ryu);
        // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
        // await ƒS.update(2);
    }
    Tutorial.Testy = Testy;
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
            background: "Images/Backgrounds/bg_city_cloudy.png"
        }
    };
    // define characters as key-object-pairs, the objects with the properties name, origin and an array if poses, each again with a unique key
    Tutorial.characters = {
        Narrator: {
            name: ""
        },
        Sue: {
            name: "Sue",
            origin: Tutorial.ƒS.ORIGIN.BOTTOMRIGHT,
            pose: {
                normal: "Images/Characters/placeholder_girl.png"
            }
        },
        Ryu: {
            name: "Ryu",
            origin: Tutorial.ƒS.ORIGIN.BOTTOMRIGHT,
            pose: {
                normal: "Images/Characters/Ryu_normal.png"
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
            { scene: Tutorial.Tutorial, name: "Tutorial" },
            { scene: Tutorial.Testy, name: "Testy" }
        ];
        // start the sequence
        Tutorial.ƒS.Progress.go(scenes);
    }
})(Tutorial || (Tutorial = {}));
//# sourceMappingURL=Tutorial.js.map