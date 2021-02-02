"use strict";
var Tutorial;
(function (Tutorial) {
    async function Main() {
        console.log("Main Menu");
    }
    Tutorial.Main = Main;
})(Tutorial || (Tutorial = {}));
var Tutorial;
(function (Tutorial) {
    // export import ƒ = FudgeCore;
    Tutorial.ƒS = FudgeStory;
    console.log("Start");
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
    Tutorial.sound = {
        backgroundTheme: "../Audio/hypnotic.mp3",
        shoot: "../Audio/fire.mp3"
    };
    // data for some locations to decorate the stage with
    Tutorial.locations = {
        window: {
            name: "Window",
            background: "../Backgrounds/bg_window.png"
        },
        rain: {
            name: "RainInCity",
            background: "../Backgrounds/bg_city_rain.png"
        }
    };
    // data for some characters that will show on the stage
    Tutorial.characters = {
        Sue: {
            name: "Sue",
            origin: Tutorial.ƒS.ORIGIN.BOTTOMRIGHT,
            pose: {
                normal: "../Characters/placeholder_girl.png",
                talk: "../Characters/placeholder_girl_talk.png"
            }
        },
        John: {
            name: "John",
            // check origin not being respected
            origin: Tutorial.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                normal: "../Characters/placeholder_boy.png",
                smile: "../Characters/placeholder_boy_smile.png"
            }
        }
    };
    Tutorial.scenes = [
        { scene: Tutorial.Main, name: "Main Menu" }
    ];
    Tutorial.ƒS.Progress.play(Tutorial.scenes);
})(Tutorial || (Tutorial = {}));
//# sourceMappingURL=Tutorial.js.map