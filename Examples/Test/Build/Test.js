"use strict";
var Test;
(function (Test) {
    async function Main() {
        console.log("Main Menu");
        await Test.ƒS.Location.show(Test.locations.city);
        console.log("Startupdate");
        await Test.ƒS.update(1, "Images/jigsaw_06.jpg");
        // ƒS.Text.setClass("blue");
        let graph = Test.ƒS.Base.getGraph();
        Test.ƒ.Debug.branch(graph);
        // let city: ƒ.Node = graph.getChildrenByName("Back")[0].getChildren()[0];
        // let cmpMesh: ƒ.ComponentMesh = city.getComponent(ƒ.ComponentMesh);
        // graph.addComponent(new ƒ.ComponentTransform());
        console.log(graph);
        // function jitter(): void {
        //   // graph.mtxLocal.translateX(ƒ.Random.default.getRangeFloored(-2, 3));
        //   // graph.mtxLocal.translateY(ƒ.Random.default.getRangeFloored(-2, 3));
        //   // cmpMesh.mtxPivot.translateX(Math.sin(performance.now() / 100) / 100);
        //   graph.mtxLocal.rotateZ(1);
        //   ƒS.update();
        // }
        // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, jitter);
        let logo = {
            name: "Logo",
            origin: Test.ƒS.ORIGIN.CENTER,
            pose: {
                default: "Images/Fudge_48.png"
            }
        };
        await Test.ƒS.Character.show(logo, logo.pose.default, Test.ƒS.positionPercent(50, 50));
        let nodeLogo = await Test.ƒS.Character.get(logo).getPose(logo.pose.default);
        let canvas = Test.ƒS.Base.getViewport().canvas;
        canvas.addEventListener("mousemove", hndMouse);
        function hndMouse(_event) {
            let offset = new Test.ƒ.Vector2(_event.offsetX, _event.offsetY);
            let position = Test.ƒS.pointCanvasToMiddleGround(offset);
            nodeLogo.mtxLocal.translation = position;
            Test.ƒS.update(0);
        }
        let menu = Test.ƒS.Menu.create({ a: "Opt1", b: "Opt2" }, null);
        await Test.ƒS.Speech.tell("characters.Sue", "Dies ist nur ein langer Text um zu prüfen, ob das Menü nun das Click-Event frisst", false);
        menu.close();
        // await ƒS.Text.print("Achtung, gleich geht's los!");
        Test.ƒS.Inventory.add(Test.items.Fudge);
        Test.ƒS.Inventory.add(Test.items.Fudge);
        Test.ƒS.Inventory.add(Test.items.Fudge);
        console.log(await Test.ƒS.Inventory.open());
        Test.state.a = 10;
        Test.state.c = 20;
        Test.state.b = "Hi";
        // max. Wert für Bar definieren if-Abfrage
        // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
        await Test.ƒS.Character.animate(Test.characters.Sue, Test.characters.Sue.pose.normal, Test.getAnimation());
        await Test.ƒS.Character.hide(Test.characters.Sue);
        Test.ƒS.update(0.5);
        await Test.ƒS.Speech.tell("characters.Sue", "Willkommen zum Test von FUDGE-Story", false);
        // await ƒS.Character.show(characters.Sue, characters.Sue.pose.normal, ƒS.positions.bottomcenter);
        await Test.ƒS.update(0.5);
    }
    Test.Main = Main;
})(Test || (Test = {}));
var Test;
(function (Test) {
    Test.ƒ = FudgeCore;
    Test.ƒS = FudgeStory;
    console.log("Start");
    // define transitions
    Test.transitions = {
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
    Test.sound = {
        backgroundTheme: "../Audio/hypnotic.mp3",
        shoot: "../Audio/fire.mp3"
    };
    // define locations as key-object-pairs, the objects with the properties name, background and an optional foreground
    Test.locations = {
        city: {
            name: "CloudyCity",
            background: "Images/bg_city_cloudy.png"
        }
    };
    // define characters as key-object-pairs, the objects with the properties name, origin and an array if poses, each again with a unique key
    Test.characters = {
        Sue: {
            name: "Sue",
            origin: Test.ƒS.ORIGIN.BOTTOMRIGHT,
            pose: {
                normal: "Images/placeholder_girl.png"
            }
        }
    };
    // define items as key-object-pairs, the objects with the properties name, description and an address to an image
    Test.items = {
        Fudge: {
            name: "Fudge Item",
            description: "A delicious cube of fudge, adds 10 to your health",
            image: "Images/Fudge_48.png",
            static: false,
            handler: hndItem
        }
    };
    Test.state = {
        a: 1,
        b: "",
        c: 2
    };
    document.addEventListener("keydown", hndKeypress);
    async function hndKeypress(_event) {
        switch (_event.code) {
            case Test.ƒ.KEYBOARD_CODE.F4:
                console.log("Save");
                await Test.ƒS.Progress.save();
                break;
            case Test.ƒ.KEYBOARD_CODE.F9:
                console.log("Load");
                await Test.ƒS.Progress.load();
                break;
        }
    }
    function hndItem(_event) {
        console.log(_event);
    }
    function getAnimation() {
        return {
            start: { translation: Test.ƒS.positions.bottomleft, rotation: -20, scaling: new Test.ƒS.Position(0.5, 1.5), color: Test.ƒS.Color.CSS("white", 0.3) },
            end: { translation: Test.ƒS.positions.bottomright, rotation: 20, scaling: new Test.ƒS.Position(1.5, 0.5), color: Test.ƒS.Color.CSS("red") },
            duration: 1,
            playmode: Test.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
    }
    Test.getAnimation = getAnimation;
    window.addEventListener("load", start);
    function start(_event) {
        // define the sequence of scenes, each scene as an object with a reference to the scene-function, a name and optionally an id and an id to continue the story with
        let scenes = [
            { scene: Test.Main, name: "Main Menu" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Test.state = Test.ƒS.Progress.setData(Test.state, uiElement);
        // window.setInterval(() => state.a++, 1000);
        // start the sequence
        Test.ƒS.Progress.go(scenes);
    }
})(Test || (Test = {}));
//# sourceMappingURL=Test.js.map