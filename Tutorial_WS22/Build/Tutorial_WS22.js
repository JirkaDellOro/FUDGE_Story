"use strict";
var Tutorial_WS22;
(function (Tutorial_WS22) {
    Tutorial_WS22.ƒ = FudgeCore;
    Tutorial_WS22.ƒS = FudgeStory;
    console.log("Tutorial WS22 starting");
    Tutorial_WS22.transition = {
        puzzle: {
            duration: 1,
            alpha: "Images/Transitions/jigsaw_06.jpg",
            edge: 1
        }
    };
    Tutorial_WS22.sound = {
        // themes
        // SFX
        drop: "Audio/drop.mp3"
    };
    Tutorial_WS22.locations = {
        beachDay: {
            name: "Beach Day",
            background: "Images/Backgrounds/Beach_day.png"
        },
        beachEvening: {
            name: "Beach Evening",
            background: "Images/Backgrounds/Beach_evening.png"
        }
    };
    Tutorial_WS22.characters = {
        narrator: {
            name: ""
        },
        protagonist: {
            name: ""
        },
        aisaka: {
            name: "Aisaka",
            origin: Tutorial_WS22.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                angry: "",
                happy: "Images/Characters/aisaka_happy.png",
                upset: ""
            }
        }
    };
    function getAnimation() {
        return {
            start: { translation: Tutorial_WS22.ƒS.positions.bottomleft },
            end: { translation: Tutorial_WS22.ƒS.positions.bottomright },
            duration: 1,
            playmode: Tutorial_WS22.ƒS.ANIMATION_PLAYMODE.LOOP
        };
    }
    Tutorial_WS22.getAnimation = getAnimation;
    // **** DATA THAT WILL BE SAVED (GAME PROGRESS) ****
    Tutorial_WS22.dataForSave = {
        nameProtagonist: "",
        interrupt: false
    };
    // horizontal Shaker
    async function horizontalShake() {
        let scene = document.getElementsByTagName("scene")[0];
        for (let i = 0; i < 15; i++) {
            if (i % 2 == 0) {
                scene.style.transform = `translateX(20px)`;
            }
            else {
                scene.style.transform = `translateX(-20px)`;
            }
            await new Promise(resolve => setTimeout(resolve, 40));
        }
        scene.style.transform = `translateX(0px)`;
    }
    Tutorial_WS22.horizontalShake = horizontalShake;
    // vertical Shaker
    async function verticalShake() {
        let scene = document.getElementsByTagName("scene")[0];
        for (let i = 0; i < 15; i++) {
            if (i % 2 == 0) {
                scene.style.transform = `translateY(20px)`;
            }
            else {
                scene.style.transform = `translateY(-20px)`;
            }
            await new Promise(resolve => setTimeout(resolve, 40));
        }
        scene.style.transform = `translateY(0px)`;
    }
    Tutorial_WS22.verticalShake = verticalShake;
    // Menu shortcuts
    let inGameMenuButtons = {
        save: "Save",
        load: "Load",
        close: "Close"
    };
    let gameMenu;
    // open = Menü ist offen und false = Menü ist zu 
    let menuIsOpen = true;
    async function buttonFunctionalities(_option) {
        console.log(_option);
        switch (_option) {
            case inGameMenuButtons.save:
                await Tutorial_WS22.ƒS.Progress.save();
                break;
            case inGameMenuButtons.load:
                await Tutorial_WS22.ƒS.Progress.load();
                break;
            case inGameMenuButtons.close:
                gameMenu.close();
                menuIsOpen = false;
                break;
        }
    }
    //  Menu shortcuts
    document.addEventListener("keydown", hndKeyPress);
    async function hndKeyPress(_event) {
        switch (_event.code) {
            case Tutorial_WS22.ƒ.KEYBOARD_CODE.F8:
                console.log("Save");
                await Tutorial_WS22.ƒS.Progress.save();
                break;
            case Tutorial_WS22.ƒ.KEYBOARD_CODE.F9:
                console.log("Load");
                await Tutorial_WS22.ƒS.Progress.load();
                break;
            case Tutorial_WS22.ƒ.KEYBOARD_CODE.M:
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
        }
    }
    window.addEventListener("load", start);
    function start(_event) {
        gameMenu = Tutorial_WS22.ƒS.Menu.create(inGameMenuButtons, buttonFunctionalities, "gameMenuCSSClass");
        buttonFunctionalities("Close");
        // **** SCENE HIERARCHY ****
        let scenes = [
            // { scene: Texting, name: "How To Text"}
            { scene: Tutorial_WS22.Text, name: "We write some text" },
            { scene: Tutorial_WS22.Choices, name: "We build in some choices" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        Tutorial_WS22.dataForSave = Tutorial_WS22.ƒS.Progress.setData(Tutorial_WS22.dataForSave, uiElement);
        // start the sequence
        Tutorial_WS22.ƒS.Progress.go(scenes);
    }
})(Tutorial_WS22 || (Tutorial_WS22 = {}));
var Tutorial_WS22;
(function (Tutorial_WS22) {
    async function Text() {
        console.log("Text Scene");
        let text = {
            Aisaka: {
                T0000: "Hallöchen <p>Dies ist ein Paragraph.</p>",
                T0001: "",
                T0002: ""
            }
        };
        Tutorial_WS22.ƒS.Speech.setTickerDelays(80, 5000);
        let signalDelay3 = Tutorial_WS22.ƒS.Progress.defineSignal([() => Tutorial_WS22.ƒS.Progress.delay(3)]);
        // function getAnimation(): ƒS.AnimationDefinition {
        //   return {
        //     start: { translation: ƒS.positions.bottomleft },
        //     end: { translation: ƒS.positions.bottomright },
        //     duration: 1,
        //     playmode: ƒS.ANIMATION_PLAYMODE.LOOP
        //   };
        // }
        Tutorial_WS22.ƒS.Speech.hide();
        await Tutorial_WS22.ƒS.Location.show(Tutorial_WS22.locations.beachEvening);
        await Tutorial_WS22.ƒS.update(Tutorial_WS22.transition.puzzle.duration, Tutorial_WS22.transition.puzzle.alpha, Tutorial_WS22.transition.puzzle.edge);
        await Tutorial_WS22.ƒS.Speech.tell(Tutorial_WS22.characters.aisaka, "Dieser Text wurde direkt über die tell()-Methode wiedergegeben.");
        signalDelay3();
        await Tutorial_WS22.ƒS.Speech.tell(Tutorial_WS22.characters.aisaka, text.Aisaka.T0000 + Tutorial_WS22.dataForSave.nameProtagonist);
        Tutorial_WS22.dataForSave.nameProtagonist = await Tutorial_WS22.ƒS.Speech.getInput();
        Tutorial_WS22.characters.protagonist.name = Tutorial_WS22.dataForSave.nameProtagonist;
        console.log(Tutorial_WS22.dataForSave.nameProtagonist);
        // await ƒS.Character.show(characters.aisaka, characters.aisaka.pose.happy, ƒS.positionPercent(70, 100));
        await Tutorial_WS22.ƒS.Character.show(Tutorial_WS22.characters.aisaka, Tutorial_WS22.characters.aisaka.pose.happy, Tutorial_WS22.ƒS.positions.bottomcenter);
        Tutorial_WS22.ƒS.update(5);
    }
    Tutorial_WS22.Text = Text;
})(Tutorial_WS22 || (Tutorial_WS22 = {}));
var Tutorial_WS22;
(function (Tutorial_WS22) {
    async function Choices() {
        console.log("Choices");
        await Tutorial_WS22.ƒS.Location.show(Tutorial_WS22.locations.beachDay);
        Tutorial_WS22.ƒS.update();
        await Tutorial_WS22.ƒS.Character.show(Tutorial_WS22.characters.aisaka, Tutorial_WS22.characters.aisaka.pose.happy, Tutorial_WS22.ƒS.positions.bottomcenter);
        await Tutorial_WS22.ƒS.Speech.tell(Tutorial_WS22.characters.aisaka, "Versuchen wir nun einmal ein paar Auswahlmöglichkeiten einzubauen, " + Tutorial_WS22.dataForSave.nameProtagonist + "!");
        await Tutorial_WS22.ƒS.Speech.tell(Tutorial_WS22.characters.aisaka, "Kannst du mir dabei helfen?");
        Tutorial_WS22.ƒS.update(2);
        let dialogue = {
            iSayYes: "Klar",
            iSayOk: "Okay",
            iSayNo: "Nö",
            iSayBla: "Bla"
        };
        let dialogueElement = await Tutorial_WS22.ƒS.Menu.getInput(dialogue, "choicesCSSClass");
        switch (dialogueElement) {
            case dialogue.iSayYes:
                // continue path here
                console.log(dialogue.iSayYes);
                await Tutorial_WS22.ƒS.Speech.tell(Tutorial_WS22.characters.aisaka, "ja");
                break;
            case dialogue.iSayNo:
                // continue path here
                console.log(dialogue.iSayNo);
                await Tutorial_WS22.ƒS.Speech.tell(Tutorial_WS22.characters.aisaka, "nein");
                break;
            case dialogue.iSayOk:
                // continue path here
                console.log(dialogue.iSayOk);
                await Tutorial_WS22.ƒS.Speech.tell(Tutorial_WS22.characters.aisaka, "ok");
                break;
            case dialogue.iSayBla:
                // continue path here
                console.log(dialogue.iSayBla);
                await Tutorial_WS22.ƒS.Speech.tell(Tutorial_WS22.characters.aisaka, "bla");
                break;
        }
    }
    Tutorial_WS22.Choices = Choices;
})(Tutorial_WS22 || (Tutorial_WS22 = {}));
var Tutorial_WS22;
(function (Tutorial_WS22) {
    async function Animations() {
        console.log("Animation scene started");
        await Tutorial_WS22.ƒS.Location.show(Tutorial_WS22.locations.beachDay);
        Tutorial_WS22.ƒS.update(1);
        // await ƒS.update(1, "Images/jigsaw_06.jpg");
        await Tutorial_WS22.ƒS.Character.show(Tutorial_WS22.characters.aisaka, Tutorial_WS22.characters.aisaka.pose.happy, Tutorial_WS22.ƒS.positions.bottomcenter);
        // await ƒS.Character.animate(characters.aisaka, characters.aisaka.pose.happy, ghostAnimation());
        Tutorial_WS22.ƒS.update(1);
    }
    Tutorial_WS22.Animations = Animations;
})(Tutorial_WS22 || (Tutorial_WS22 = {}));
// namespace Script {
//   import ƒ = FudgeCore;
//   import ƒAid = FudgeAid;
//   ƒ.Debug.info("Main Program Template running!");
//   let viewport: ƒ.Viewport;
//   let pacman: ƒ.Node;
//   let grid: ƒ.Node;
//   let direction: ƒ.Vector2 = ƒ.Vector2.ZERO();
//   let speed: number = 0.05;
//   let waka: ƒ.ComponentAudio;
//   let ghost: ƒ.Node;
//   let sprite: ƒAid.NodeSprite;
//   document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);
//   async function start(_event: CustomEvent): Promise<void> {
//     viewport = _event.detail;
//     console.log(viewport.camera);
//     viewport.camera.mtxPivot.translateZ(10);
//     viewport.camera.mtxPivot.rotateY(180);
//     viewport.camera.mtxPivot.translateX(-2);
//     viewport.camera.mtxPivot.translateY(2);
//     let graph: ƒ.Node = viewport.getBranch();
//     grid = graph.getChildrenByName("Grid")[0];
//     pacman = graph.getChildrenByName("Pacman")[0];
//     sprite = await createSprite();
//     pacman.addChild(sprite);
//     pacman.getComponent(ƒ.ComponentMaterial).activate(false);
//     ghost = createGhost();
//     graph.addChild(ghost);
//     ƒ.AudioManager.default.listenTo(graph);
//     waka = graph.getChildrenByName("Sound")[0].getComponents(ƒ.ComponentAudio)[1];
//     ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
//     ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
//   }
//   function update(_event: Event): void {
//     // ƒ.Physics.simulate();  // if physics is included and used
//     let posPacman: ƒ.Vector3 = pacman.mtxLocal.translation;
//     let nearestGridPoint: ƒ.Vector2 = new ƒ.Vector2(Math.round(posPacman.x), Math.round(posPacman.y));
//     let nearGridPoint: boolean = posPacman.toVector2().equals(nearestGridPoint, 2 * speed);
//     if (nearGridPoint) {
//       let directionOld: ƒ.Vector2 = direction.clone;
//       if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]))
//         direction.set(1, 0);
//       if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]))
//         direction.set(-1, 0);
//       if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W]))
//         direction.set(0, 1);
//       if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN, ƒ.KEYBOARD_CODE.S]))
//         direction.set(0, -1);
//       if (blocked(ƒ.Vector2.SUM(nearestGridPoint, direction)))
//         if (direction.equals(directionOld)) // did not turn
//           direction.set(0, 0); // full stop
//         else {
//           if (blocked(ƒ.Vector2.SUM(nearestGridPoint, directionOld))) // wrong turn and dead end
//             direction.set(0, 0); // full stop
//           else
//             direction = directionOld; // don't turn but continue ahead
//         }
//       if (!direction.equals(directionOld) || direction.magnitudeSquared == 0)
//         pacman.mtxLocal.translation = nearestGridPoint.toVector3();
//       if (direction.magnitudeSquared == 0) {
//         waka.play(false);
//         sprite.setFrameDirection(0);
//       }
//       else if (!waka.isPlaying) {
//         waka.play(true);  
//         sprite.setFrameDirection(3);
//       }
//     }
//     pacman.mtxLocal.translate(ƒ.Vector2.SCALE(direction, speed).toVector3());
//     if (direction.magnitudeSquared != 0) {
//       sprite.mtxLocal.reset();
//       sprite.mtxLocal.rotation = new ƒ.Vector3(0, direction.x < 0 ? 180 : 0, direction.y * 90);
//     }
//     viewport.draw();
//     // ƒ.AudioManager.default.update();
//   }
//   function blocked(_posCheck: ƒ.Vector2): boolean {
//     let check: ƒ.Node = grid.getChild(_posCheck.y)?.getChild(_posCheck.x)?.getChild(0);
//     return (!check || check.name == "Wall");
//   }
//   function createGhost(): ƒ.Node {
//     let node: ƒ.Node = new ƒ.Node("Ghost");
//     let mesh: ƒ.MeshSphere = new ƒ.MeshSphere();
//     let material: ƒ.Material = new ƒ.Material("MaterialGhost", ƒ.ShaderLit, new ƒ.CoatColored());
//     let cmpTransfrom: ƒ.ComponentTransform = new ƒ.ComponentTransform();
//     let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
//     let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
//     cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
//     node.addComponent(cmpMaterial);
//     node.addComponent(cmpMesh);
//     node.addComponent(cmpTransfrom);
//     node.mtxLocal.translateX(2);
//     cmpTransfrom.mtxLocal.translateY(1);
//     return node;
//   }
//   async function createSprite(): Promise<ƒAid.NodeSprite> {
//     let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
//     await imgSpriteSheet.load("Image/texture.png");
//     let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);
//     let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("Pacman", coat);
//     animation.generateByGrid(ƒ.Rectangle.GET(0, 0, 64, 64), 8, 70, ƒ.ORIGIN2D.CENTER, ƒ.Vector2.X(64));
//     let sprite: ƒAid.NodeSprite = new ƒAid.NodeSprite("Sprite");
//     sprite.setAnimation(animation);
//     sprite.setFrameDirection(1);
//     sprite.framerate = 15;
//     let cmpTransfrom: ƒ.ComponentTransform = new ƒ.ComponentTransform();
//     sprite.addComponent(cmpTransfrom);
//     sprite.getComponent(ƒ.ComponentMaterial).clrPrimary.a = 0.5;
//     return sprite;
//   }
// }
//# sourceMappingURL=Tutorial_WS22.js.map