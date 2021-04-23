"use strict";
var Tutorial;
(function (Tutorial) {
    async function Text() {
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
                T0000: "Willkommen.",
                T0001: ""
            }
        };
        await Tutorial.ƒS.Location.show(Tutorial.locations.city);
        await Tutorial.ƒS.update(1);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, text.Ryu.T0000);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Ryu, "Fremder.");
    }
    Tutorial.Text = Text;
})(Tutorial || (Tutorial = {}));
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
        await Tutorial.ƒS.Character.animate(Tutorial.characters.Sue, Tutorial.characters.Sue.pose.normal, animation);
        await Tutorial.ƒS.update(2);
        await Tutorial.ƒS.Speech.tell(Tutorial.characters.Sue, "Welcome, welcome to FUDGE-Story~~");
        await Tutorial.ƒS.Character.hide(Tutorial.characters.Sue);
        let pose = await Tutorial.ƒS.Character.get(Tutorial.characters.Sue).getPose("Images/Characters/placeholder_girl.png");
        pose.removeComponent(pose.getComponent(Tutorial.ƒ.ComponentAnimator));
        await Tutorial.ƒS.Character.animate(Tutorial.characters.Sue, Tutorial.characters.Sue.pose.normal, animation1);
        await Tutorial.ƒS.update(2);
        // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
        // await ƒS.update(2);
    }
    Tutorial.Animation = Animation;
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    Tutorial.ƒ = FudgeCore;
    Tutorial.ƒS = FudgeStory;
    console.log("Start");
    // define transitions
    Tutorial.transition = {
        clock: {
            duration: 3,
            alpha: "",
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
        Ryu: {
            name: "Ryu",
            origin: Tutorial.ƒ.ORIGIN2D.BOTTOMRIGHT,
            pose: {
                normal: "",
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
        ];
        // start the sequence
        Tutorial.ƒS.Progress.go(scenes);
    }
})(Tutorial || (Tutorial = {}));
//# sourceMappingURL=Tutorial.js.map