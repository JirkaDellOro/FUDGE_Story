"use strict";
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * Holds core functionality for the inner workings. Do not instantiate or call methods directly!
     */
    class Base {
        static viewport;
        static back;
        static middle;
        static front;
        static mesh = new ƒ.MeshQuad("Quad");
        static aspectRatio;
        static graph;
        static size;
        static getGraph() {
            return Base.graph;
        }
        static getViewport() {
            return Base.viewport;
        }
        /**
         * Will be called once by {@link Progress} before anything else may happen.
         */
        static setup() {
            if (Base.viewport)
                return;
            let client = document.body.querySelector("scene");
            Base.aspectRatio = client.clientWidth / client.clientHeight;
            Base.graph = new ƒ.Node("Graph");
            Base.back = new ƒ.Node("Back");
            Base.middle = new ƒ.Node("Middle");
            Base.front = new ƒ.Node("Front");
            let canvas = document.querySelector("canvas");
            Base.size = new ƒ.Vector2(client.clientWidth, client.clientHeight);
            console.log("Size", Base.size.toString());
            Base.graph.appendChild(Base.back);
            Base.graph.appendChild(Base.middle);
            Base.graph.appendChild(Base.front);
            Base.back.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(-1))));
            Base.front.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(1))));
            let cmpCamera = new ƒ.ComponentCamera();
            Base.viewport = new ƒ.Viewport();
            Base.viewport.initialize("Viewport", Base.graph, cmpCamera, canvas);
            let factor = 2 * Math.sqrt(2);
            cmpCamera.projectCentral(Base.size.x / Base.size.y, 20, ƒ.FIELD_OF_VIEW.HORIZONTAL, 1000, Base.size.x * factor + 100);
            //TODO: use orthographic camera, no fov-calculation required
            cmpCamera.mtxPivot.translateZ(Base.size.x * factor);
            cmpCamera.mtxPivot.lookAt(ƒ.Vector3.ZERO());
            Base.viewport.draw();
            Base.calculatePositions();
            Base.resize();
            window.addEventListener("resize", Base.resize);
            ƒ.Loop.start();
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, FudgeStory.Animation.update);
        }
        /**
         * Creates a serialization-object representing the current state of the {@link Character}s currently shown
         */
        static serialize() {
            let serialization = { characters: [] };
            for (let pose of Base.middle.getChildren()) {
                let poseUrl = pose.getComponent(ƒ.ComponentMaterial).material.coat.texture.url;
                let origin = Reflect.get(pose, "origin");
                serialization.characters.push({ name: pose.name, pose: poseUrl, origin: origin, position: pose.mtxLocal.translation.toVector2().serialize() });
            }
            return serialization;
        }
        /**
         * Reconstructs the {@link Character}s from a serialization-object and shows them
         * @param _serialization
         */
        static async deserialize(_serialization) {
            for (let characterData of _serialization.characters) {
                let character = { name: characterData.name, pose: { id: characterData.pose }, origin: characterData.origin };
                let position = await new ƒ.Vector2().deserialize(characterData.position);
                FudgeStory.Character.show(character, characterData.pose, position);
            }
        }
        static async createImageNode(_name, _request, _origin = ƒ.ORIGIN2D.CENTER, _size) {
            let node = new ƒ.Node(_name);
            let cmpMesh = new ƒ.ComponentMesh(Base.mesh);
            if (_size)
                Base.adjustMesh(cmpMesh, _origin, _size);
            node.addComponent(cmpMesh);
            let texture = new ƒ.TextureImage();
            await texture.load(_request);
            let coat = new ƒ.CoatTextured(ƒ.Color.CSS("white"), texture);
            let material = new ƒ.Material(_name, ƒ.ShaderLitTextured, coat);
            if (!_size)
                this.adjustMesh(cmpMesh, _origin, new ƒ.Vector2(texture.image.width, texture.image.height));
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            node.addComponent(cmpMaterial);
            return node;
        }
        static update(_event) {
            if (!FudgeStory.Animation.isPending)
                return;
            Base.viewport.draw();
        }
        static adjustMesh(_cmpMesh, _origin, _size) {
            let rect = new ƒ.Rectangle(0, 0, _size.x, _size.y, _origin);
            _cmpMesh.mtxPivot.translateX(rect.x + rect.width / 2);
            _cmpMesh.mtxPivot.translateY(-rect.y - rect.height / 2);
            _cmpMesh.mtxPivot.scale(_size.toVector3(1));
        }
        static calculatePositions() {
            let xOffset = Base.size.x / 2;
            let yOffset = Base.size.y / 2;
            FudgeStory.positions = {
                topleft: new FudgeStory.Position(-xOffset, yOffset), topright: new FudgeStory.Position(xOffset, yOffset), topcenter: new FudgeStory.Position(0, yOffset),
                centerleft: new FudgeStory.Position(-xOffset, 0), centerright: new FudgeStory.Position(xOffset, 0), center: new FudgeStory.Position(0, 0),
                bottomleft: new FudgeStory.Position(-xOffset, -yOffset), bottomright: new FudgeStory.Position(xOffset, -yOffset), bottomcenter: new FudgeStory.Position(0, -yOffset),
                left: new FudgeStory.Position(-xOffset * 0.7, -yOffset), right: new FudgeStory.Position(xOffset * 0.7, -yOffset)
            };
        }
        static resize() {
            let scene = document.body.querySelector("scene");
            let bodyWidth = document.body.clientWidth;
            let bodyHeight = document.body.clientHeight;
            let aspectWindow = bodyWidth / bodyHeight;
            let height;
            let width;
            if (Base.aspectRatio / aspectWindow < 1) {
                height = bodyHeight;
                width = bodyHeight * Base.aspectRatio;
            }
            else {
                width = bodyWidth;
                height = bodyWidth / Base.aspectRatio;
            }
            scene.style.height = height + "px";
            scene.style.width = width + "px";
            scene.style.top = ((bodyHeight - height) / 2) + "px";
            scene.style.left = ((bodyWidth - width) / 2) + "px";
        }
    }
    FudgeStory.Base = Base;
})(FudgeStory || (FudgeStory = {}));
///<reference path="Base.ts"/>
var FudgeStory;
///<reference path="Base.ts"/>
(function (FudgeStory) {
    var ƒ = FudgeCore;
    FudgeStory.Color = ƒ.Color;
    FudgeStory.ANIMATION_PLAYMODE = ƒ.ANIMATION_PLAYMODE;
    /**
     * Handles animation
     */
    class Animation extends FudgeStory.Base {
        static activeComponents = [];
        /**
         * Returns true if an animation is being played
         */
        static get isPending() {
            return (Animation.activeComponents?.length > 0);
        }
        /**
         * Creates a FUDGE-Animation from an {@link AnimationDefinition}
         */
        static create(_animation) {
            let mutator = {};
            let duration = _animation.duration * 1000;
            for (let key in _animation.start) {
                mutator[key] = {};
                let start = Reflect.get(_animation.start, key);
                let end = Reflect.get(_animation.end, key);
                if (!end)
                    throw (new Error(`Property mismatch in animation: ${key} is missing at the end`));
                if (start instanceof ƒ.Mutable) {
                    let mutatorStart = start.getMutator();
                    let mutatorEnd = end.getMutator();
                    for (let subKey in mutatorStart) {
                        let seq = new ƒ.AnimationSequence();
                        seq.addKey(new ƒ.AnimationKey(0, mutatorStart[subKey]));
                        seq.addKey(new ƒ.AnimationKey(duration, mutatorEnd[subKey]));
                        mutator[key][subKey] = seq;
                    }
                }
                else if (key == "rotation") {
                    let seq = new ƒ.AnimationSequence();
                    seq.addKey(new ƒ.AnimationKey(0, start));
                    seq.addKey(new ƒ.AnimationKey(duration, end));
                    mutator[key]["z"] = seq;
                }
            }
            let result = { components: {} };
            if (mutator.color) {
                result.components["ComponentMaterial"] = [{ "ƒ.ComponentMaterial": { clrPrimary: mutator.color } }];
                delete mutator.color;
            }
            if (mutator.translation || mutator.rotation || mutator.scaling)
                result.components["ComponentTransform"] = [{ "ƒ.ComponentTransform": { mtxLocal: mutator } }];
            // console.log(result);
            let animation = new ƒ.Animation("Animation", result);
            animation.setEvent("animationStart", 1);
            animation.setEvent("animationEnd", duration - 1);
            return animation;
        }
        /**
         * Attaches the given FUDGE-Animation to the given node with the given mode.
         * Used internally by Character.
         */
        static async attach(_pose, _animation, _playmode) {
            // TODO: Mutate must not initiate drawing, implement render event at component to animate  
            // _pose.cmpTransform.addEventListener(ƒ.EVENT.MUTATE, () => Base.viewport.draw());
            // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, () => Base.viewport.draw());
            let cmpAnimator = new ƒ.ComponentAnimator(_animation, _playmode);
            _pose.addComponent(cmpAnimator);
            cmpAnimator.addEventListener("componentActivate" /* COMPONENT_ACTIVATE */, Animation.trackComponents);
            cmpAnimator.addEventListener("componentDeactivate" /* COMPONENT_DEACTIVATE */, Animation.trackComponents);
            cmpAnimator.activate(true);
            return new Promise((resolve) => {
                cmpAnimator.addEventListener(_playmode == ƒ.ANIMATION_PLAYMODE.REVERSELOOP ? "animationStart" : "animationEnd", () => resolve());
            });
        }
        static trackComponents = (_event) => {
            let index = Animation.activeComponents.indexOf(_event.target);
            if (_event.type == "componentDeactivate" /* COMPONENT_DEACTIVATE */ && index > -1) {
                Animation.activeComponents.splice(index, 1);
                return;
            }
            if (index > -1)
                return;
            Animation.activeComponents.push(_event.target);
            // console.log(Animation.activeComponents);
        };
    }
    FudgeStory.Animation = Animation;
})(FudgeStory || (FudgeStory = {}));
/// <reference path="Base.ts" />
var FudgeStory;
/// <reference path="Base.ts" />
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     *  Represents a character in various poses and with a unique name
     */
    class Character extends FudgeStory.Base {
        static characters = new Map();
        /** A list of poses for that character */
        poses = new Map();
        /** The local origin of the characters image */
        origin;
        definition;
        constructor(_character) {
            super();
            this.origin = Reflect.get(_character, "origin") || ƒ.ORIGIN2D.BOTTOMCENTER;
            this.definition = _character;
            Character.characters.set(_character.name, this);
        }
        /**
         * Retrieves or creates the {@link Character} from the {@link CharacterDefinition} given
         */
        static get(_character) {
            let result = Character.characters.get(_character.name);
            return result || new Character(_character);
        }
        /**
         * Retrieve the {@link Character} from the name given or null if not defined yet
         */
        static getByName(_name) {
            return Character.characters.get(_name);
        }
        /**
         * Show the given {@link Character} in the specified pose at the given position. See {@link CharacterDefinition} for the definition of a character.
         */
        static async show(_character, _pose, _position) {
            let character = Character.get(_character);
            let pose = await character.getPose(_pose);
            pose.mtxLocal.set(ƒ.Matrix4x4.TRANSLATION(_position.toVector3(0)));
            FudgeStory.Base.middle.appendChild(pose);
        }
        /**
         * Hide the given {@link Character}
         */
        static async hide(_character) {
            let found = FudgeStory.Base.middle.getChildrenByName(_character.name);
            if (found.length == 0)
                console.warn(`No character with name ${_character.name} to hide`);
            if (found.length > 1)
                console.warn(`Multiple characters with name ${_character.name} exist, removing first`);
            FudgeStory.Base.middle.removeChild(found[0]);
        }
        /**
         * Animate the given {@link Character} in the specified pose using the animation given.
         */
        static async animate(_character, _pose, _animation) {
            let character = Character.get(_character);
            let pose = await character.getPose(_pose);
            for (let cmpOldAnimator of pose.getComponents(ƒ.ComponentAnimator))
                pose.removeComponent(cmpOldAnimator);
            if (!_animation)
                return;
            let animation = FudgeStory.Animation.create(_animation);
            FudgeStory.Base.middle.appendChild(pose);
            return FudgeStory.Animation.attach(pose, animation, _animation.playmode);
        }
        /**
         * Remove all {@link Character}s and objects
         */
        static hideAll() {
            FudgeStory.Base.middle.removeAllChildren();
        }
        /**
         * Retrieves a node displaying the pose defined by the given url of an image file. Creates a new one if not yet existent.
         */
        async getPose(_pose) {
            let result = this.poses.get(_pose);
            return result || await this.createPose(_pose);
        }
        async createPose(_pose) {
            let pose = await FudgeStory.Base.createImageNode(this.definition.name, _pose, this.origin);
            pose.addComponent(new ƒ.ComponentTransform());
            this.poses.set(_pose, pose);
            Reflect.set(pose, "origin", this.origin); // needed for save/load
            return pose;
        }
    }
    FudgeStory.Character = Character;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    FudgeStory.ORIGIN = FudgeCore.ORIGIN2D;
    let EVENT;
    (function (EVENT) {
        EVENT["KEYDOWN"] = "keydown";
        EVENT["KEYUP"] = "keyup";
        EVENT["POINTERDOWN"] = "pointerdown";
        EVENT["POINTERUP"] = "pointerup";
    })(EVENT = FudgeStory.EVENT || (FudgeStory.EVENT = {}));
    // tslint:disable-next-line
    FudgeStory.Position = ƒ.Vector2;
    let pos0 = new FudgeStory.Position(0, 0);
    /**
     * Inserts the given scene. A scene is a sequence of commands defining a small piece of the whole story.
     * A scene needs to be defined in the following format, where NameOfTheScene is a placeholder and should be chosen arbitrarily.
     * ```typescript
     * export async function NameOfTheScene(): SceneReturn {
     *   ...
     *   ...
     * }
     * ```
     * Calling {@link insert} directly will not register the scene as a save-point for saving and loading.
     */
    async function insert(_scene) {
        console.log("SceneFunction", _scene.name);
        return await _scene();
    }
    FudgeStory.insert = insert;
    /**
     * Display the recent changes. If parameters are specified, they are used blend from the previous display to the new.
     * The parameters define the duration of the blend, the grayscale image for special effects and the edges (smooth 0 - 2 sharp)
     */
    async function update(_duration, _url, _edge) {
        let viewport = FudgeStory.Base.getViewport();
        if (!_duration) {
            viewport.draw();
            return;
        }
        viewport.adjustingFrames = false;
        let crc2 = viewport.context;
        let imgOld = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
        viewport.draw();
        let imgNew = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.putImageData(imgOld, 0, 0);
        let transition;
        if (_url)
            transition = await FudgeStory.Transition.get(_url);
        await FudgeStory.Transition.blend(imgOld, imgNew, _duration * 1000, transition, _edge);
        viewport.adjustingFrames = true;
    }
    FudgeStory.update = update;
    /**
     * Wait for the viewers input. See {@link EVENT} for predefined events to wait for.
     */
    async function getInput(_eventTypes) {
        return new Promise((resolve) => {
            let hndEvent = (_event) => {
                for (let type of _eventTypes) {
                    document.removeEventListener(type, hndEvent);
                }
                resolve(_event);
            };
            for (let type of _eventTypes) {
                document.addEventListener(type, hndEvent);
            }
        });
    }
    FudgeStory.getInput = getInput;
    /**
     * Returns a promise that resolves when the given key is pressed.
     * Can be used with {@link Progress.defineSignal} as e.g. () => getKeypress(ƒ.KEYBOARD_CODE.SPACE)
     */
    async function getKeypress(_code) {
        return new Promise((resolve) => {
            let hndEvent = (_event) => {
                if (_event.code == _code) {
                    document.removeEventListener("keypress", hndEvent);
                    resolve(_event);
                }
            };
            document.addEventListener("keypress", hndEvent);
        });
    }
    FudgeStory.getKeypress = getKeypress;
    /**
     * Standard positions
     */
    FudgeStory.positions = {
        topleft: pos0, topright: pos0, topcenter: pos0,
        centerleft: pos0, centerright: pos0, center: pos0,
        bottomleft: pos0, bottomright: pos0, bottomcenter: pos0,
        left: pos0, right: pos0
    };
    /**
     * Calculates and returns a position to place {@link Character}s or objects.
     * Pass values in percent relative to the upper left corner.
     */
    function positionPercent(_x, _y) {
        let size = Reflect.get(FudgeStory.Base, "size").clone;
        let position = new FudgeStory.Position(-size.x / 2, size.y / 2);
        size.x *= _x / 100;
        size.y *= -_y / 100;
        position.add(size);
        return position;
    }
    FudgeStory.positionPercent = positionPercent;
    function pointCanvasToMiddleGround(_point) {
        // let point: ƒ.Vector2 = Base.getViewport().poi
        let ray = FudgeStory.Base.getViewport().getRayFromClient(_point);
        let middle = Reflect.get(FudgeStory.Base, "middle");
        let result = ray.intersectPlane(middle.mtxWorld.translation, ƒ.Vector3.Z());
        return result;
    }
    FudgeStory.pointCanvasToMiddleGround = pointCanvasToMiddleGround;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    // import ƒ = FudgeCore;
    /**
     * Manages the inventory
     */
    //@ts-ignore
    class Inventory extends (HTMLDialogElement) {
        static ƒDialog;
        static ƒused;
        static get dialog() {
            if (Inventory.ƒDialog)
                return Inventory.ƒDialog;
            Inventory.ƒDialog = document.querySelector("dialog[type=inventory]");
            return Inventory.ƒDialog;
        }
        /**
         * Adds an item to the inventory
         */
        static add(_item) {
            let item = Inventory.getItemElement(_item);
            if (item) {
                let amount = item.querySelector("amount");
                amount.innerText = (parseInt(amount.innerText) + 1).toString();
                return;
            }
            item = document.createElement("li");
            item.id = Inventory.replaceWhitespace(_item.name);
            item.innerHTML = `<name>${_item.name}</name><amount>1</amount><description>${_item.description}</description><img src="${_item.image}"/>`;
            if (!_item.static)
                item.addEventListener("pointerdown", Inventory.hndUseItem);
            if (_item.handler) {
                function custom(_event) {
                    _item.handler(new CustomEvent(_event.type, { detail: _item.name }));
                }
                item.addEventListener("pointerup", custom);
                item.addEventListener("pointerdown", custom);
            }
            Inventory.dialog.querySelector("ul").appendChild(item);
        }
        /**
         * Retrieves the number of items specified by the parameter currently available in the inventory
         */
        static getAmount(_item) {
            let item = Inventory.getItemElement(_item);
            if (item)
                return parseInt(item.querySelector("amount").innerText);
            return 0;
        }
        /**
         * Opens the inventory and return a list of the names of consumed items when the inventory closes again
         */
        static async open() {
            let dialog = Inventory.dialog;
            //@ts-ignore
            dialog.showModal();
            Inventory.ƒused = [];
            return new Promise((_resolve) => {
                let hndClose = (_event) => {
                    dialog.querySelector("button").removeEventListener(FudgeStory.EVENT.POINTERDOWN, hndClose);
                    //@ts-ignore
                    dialog.close();
                    _resolve(Inventory.ƒused);
                };
                dialog.querySelector("button").addEventListener(FudgeStory.EVENT.POINTERDOWN, hndClose);
            });
        }
        /**
         * Closes the inventory
         */
        static close() {
            //@ts-ignore
            Inventory.dialog.close();
        }
        static hndUseItem = (_event) => {
            _event.stopPropagation();
            let item = _event.currentTarget;
            Inventory.ƒused.push(item.querySelector("name").textContent);
            let amount = item.querySelector("amount");
            amount.innerText = (parseInt(amount.innerText) - 1).toString();
            if (amount.innerText == "0")
                Inventory.dialog.querySelector("ul").removeChild(item);
        };
        static replaceWhitespace(_text) {
            return _text.replaceAll(" ", "_");
        }
        static getItemElement(_item) {
            return Inventory.dialog.querySelector(`[id=${Inventory.replaceWhitespace(_item.name)}]`);
        }
    }
    FudgeStory.Inventory = Inventory;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * Represents a location with foreground, background and the middle, where {@link Character}s show.
     */
    class Location extends FudgeStory.Base {
        static locations = new Map();
        background;
        foreground;
        constructor(_description) {
            super();
        }
        /**
         * Retrieves the {@link Location} associated with the given {@link LocationDefinition}
         */
        static async get(_description) {
            let result = Location.locations.get(_description);
            if (result)
                return result;
            result = new Location(_description);
            await result.load(_description);
            return result;
        }
        /**
         * Show the location given by {@link LocationDefinition}.
         */
        static async show(_location) {
            FudgeStory.Base.back.removeAllChildren();
            let location = await Location.get(_location);
            FudgeStory.Base.back.appendChild(location.background);
            FudgeStory.Base.front.removeAllChildren();
            if (location.foreground)
                FudgeStory.Base.front.appendChild(location.foreground);
        }
        async load(_location) {
            this.background = await FudgeStory.Base.createImageNode(_location.name + "|" + "Background", _location.background, ƒ.ORIGIN2D.CENTER);
            if (Reflect.get(this, "foreground"))
                this.foreground = await FudgeStory.Base.createImageNode(_location.name + "|" + "Foreground", _location.foreground, ƒ.ORIGIN2D.CENTER);
        }
    }
    FudgeStory.Location = Location;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    class Menu {
        dialog;
        callback;
        constructor(_options, _callback, _cssClass) {
            this.dialog = Menu.createDialog(_options, _cssClass);
            this.callback = _callback;
            //@ts-ignore
            this.dialog.show();
            this.dialog.addEventListener(FudgeStory.EVENT.POINTERDOWN, this.hndSelect);
        }
        /**
         * Displays a modal dialog showing buttons with the texts given as values with the options-object to be selected by the user.
         * Use with `await` to receive the text the user selected while the dialog closes.
         * The class-parameter allows for specific styling with css.
         */
        static async getInput(_options, _cssClass) {
            let dialog = Menu.createDialog(_options, _cssClass);
            //@ts-ignore
            dialog.showModal();
            dialog.addEventListener("cancel", (_event) => {
                _event.preventDefault();
                _event.stopPropagation();
            });
            let promise = new Promise((_resolve) => {
                let hndSelect = (_event) => {
                    _event.stopPropagation();
                    if (_event.target == dialog)
                        return;
                    dialog.removeEventListener(FudgeStory.EVENT.POINTERDOWN, hndSelect);
                    //@ts-ignore
                    dialog.close();
                    _resolve(Reflect.get(_event.target, "innerHTML"));
                };
                dialog.addEventListener(FudgeStory.EVENT.POINTERDOWN, hndSelect);
            });
            return promise;
        }
        /**
         * Displays a non-modal dialog showing buttons with the texts given as values with the options-object to be selected by the user.
         * When the user uses a button, the given callback function is envolde with the key the selected text is associated with. The class-parameter allows for specific styling with css.
         * Returns a {@link Menu}-object.
         */
        static create(_options, _callback, _cssClass) {
            return new Menu(_options, _callback, _cssClass);
        }
        static createDialog(_options, _cssClass) {
            // let dialog: HTMLDialogElement = document.querySelector("dialog#menu");
            let dialog = document.createElement("dialog", {});
            console.log(dialog);
            dialog.classList.add(_cssClass);
            dialog.innerHTML = "";
            for (let option in _options) {
                let dom = document.createElement("button");
                dom.innerHTML += Reflect.get(_options, option);
                dom.id = option;
                dialog.appendChild(dom);
            }
            document.body.appendChild(dialog);
            return dialog;
        }
        close() {
            this.dialog.removeEventListener(FudgeStory.EVENT.POINTERDOWN, this.hndSelect);
            document.body.removeChild(this.dialog);
        }
        open() {
            this.dialog.addEventListener(FudgeStory.EVENT.POINTERDOWN, this.hndSelect);
            document.body.appendChild(this.dialog);
        }
        hndSelect = (_event) => {
            _event.stopPropagation();
            if (_event.target == this.dialog)
                return;
            if (this.callback)
                this.callback(Reflect.get(_event.target, "innerHTML"));
        };
    }
    FudgeStory.Menu = Menu;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * Controls the main flow of the story, tracks logical data and provides load/save
     */
    class Progress extends FudgeStory.Base {
        static data = {};
        static serialization;
        static scenes;
        static currentSceneDescriptor;
        /**
         * Starts the story with the scenes-object given and reads the url-searchstring to enter at a point previously saved
         */
        static async go(_scenes) {
            FudgeStory.Base.setup();
            Progress.scenes = _scenes.flat(100);
            let index = 0;
            let urlSearch = location.search.substr(1);
            if (urlSearch) {
                let json = JSON.parse(decodeURI(urlSearch));
                await Progress.splash(json.sceneDescriptor.name);
                Progress.restoreData(json.data);
                FudgeStory.Speech.deserialize(json.speech);
                await FudgeStory.Base.deserialize(json.base);
                FudgeStory.Sound.deserialize(json.sound);
                index = parseInt(json.sceneDescriptor.index);
            }
            else
                await Progress.splash(document.title);
            do {
                let descriptor = Progress.scenes[index];
                let next = await Progress.start(index);
                console.log(descriptor.name + " done");
                if (typeof (next) == "number")
                    index = next;
                else {
                    next = next || descriptor.next;
                    if (next)
                        index = Progress.scenes.findIndex(_descriptor => (_descriptor.id == next));
                    else
                        index++;
                }
            } while (index < Progress.scenes.length);
        }
        /**
         * Returns an object to use to track logical data like score, states, textual inputs given by the play etc.
         */
        static setData(_data, _dom) {
            // Progress.setData(_data); // test if this is sufficient to support previous save/load functionality
            Progress.data = _data;
            let hndProxy = {
                set: function (_target, _prop, _value) {
                    console.log("ProgressData: " + _prop.toString() + " = " + _value);
                    Reflect.set(_target, _prop, _value);
                    if (_dom)
                        Progress.updateInterface(_dom);
                    return true;
                }
                // get: function (_target: Object, _prop: PropertyKey): Object {
                //   return "Hallo";
                // }
            };
            let proxy = new Proxy(Progress.data, hndProxy);
            return proxy;
        }
        /**
         * Opens a dialog for file selection, loads selected file and restarts the program with its contents as url-searchstring
         */
        static async load() {
            let loaded = await ƒ.FileIoBrowserLocal.load();
            for (let key in loaded)
                window.location.href = window.location.origin + window.location.pathname + "?" + loaded[key];
        }
        /**
         * Saves the state the program was in when starting the current scene from {@link Progress}.play(...)
         */
        static async save() {
            let saved = await ƒ.FileIoBrowserLocal.save({ [Progress.currentSceneDescriptor.name]: JSON.stringify(Progress.serialization) }, "application/json");
            console.log(saved);
        }
        /**
         * Defines a {@link Signal} which is a bundle of promises waiting for a set of events to happen.
         * Example:
         * ```typescript
         * // define a signal to observe the keyboard for a keydown-event and a timeout of 5 seconds
         * let signal: Signal = Progress.defineSignal([ƒT.EVENT.KEYDOWN, () => ƒT.Progress.delay(5)]);
         * // wait for the signal to become active
         * await signal();
         * ```
         *
         */
        static defineSignal(_promiseFactoriesOrEventTypes) {
            return () => {
                return Progress.bundlePromises(_promiseFactoriesOrEventTypes);
            };
        }
        static createEventPromise(_target, _eventType) {
            return new Promise((resolve) => {
                let hndEvent = function (_event) {
                    _target.removeEventListener(_eventType, hndEvent);
                    resolve(_event);
                };
                _target.addEventListener(_eventType, hndEvent);
            });
        }
        /**
         * Wait for the given amount of time in seconds to pass
         */
        static async delay(_lapse) {
            await ƒ.Time.game.delay(_lapse * 1000);
        }
        static bundlePromises(_promiseFactoriesOrEventTypes) {
            let promises = [];
            for (let entry of _promiseFactoriesOrEventTypes) {
                if (entry instanceof Function)
                    promises.push(entry());
                else
                    promises.push(FudgeStory.getInput([entry]));
            }
            return Promise.any(promises);
        }
        static async start(index) {
            let descriptor = Progress.scenes[index];
            console.log("Start scene ", descriptor);
            Progress.currentSceneDescriptor = descriptor;
            Reflect.set(Progress.currentSceneDescriptor, "index", index);
            Progress.storeData();
            return await FudgeStory.insert(descriptor.scene);
        }
        static restoreData(_restored) {
            Object.assign(Progress.data, _restored);
            console.log("Loaded", Progress.data);
        }
        static storeData() {
            Progress.serialization = {
                sceneDescriptor: Progress.currentSceneDescriptor,
                data: JSON.parse(JSON.stringify(Progress.data)),
                speech: FudgeStory.Speech.serialize(),
                base: FudgeStory.Base.serialize(),
                sound: FudgeStory.Sound.serialize()
            };
            console.log("Stored", Progress.serialization);
        }
        static updateInterface(_dom) {
            for (let prop in Progress.data) {
                let elements = _dom.querySelectorAll("[name=" + prop + "]");
                for (let element of elements)
                    element.value = Reflect.get(Progress.data, prop).toString();
            }
        }
        static async splash(_text) {
            console.log("Splash");
            let splash = document.querySelector("dialog[type=splash]");
            let logo = splash.querySelector("img#FudgeStoryLogo");
            if (logo.getAttribute("theme") == "dark")
                logo.src = `data:image/gif;base64,${Progress.splashBlobDark()}`;
            else
                logo.src = `data:image/gif;base64,${Progress.splashBlobLight()}`;
            return new Promise(_resolve => {
                function hndClick(_event) {
                    splash.removeEventListener("click", hndClick);
                    //@ts-ignore
                    splash.close();
                    splash.parentElement.removeChild(splash);
                    _resolve();
                }
                splash.addEventListener("click", hndClick);
            });
        }
        static splashBlobDark() {
            return "iVBORw0KGgoAAAANSUhEUgAAA9UAAADRCAIAAABNUQbDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowZWM5ZDBiMS0xYmI0LTBjNGEtOGFhNS03ZmVhOTJkZmZkYWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODE0MjM5MDhFNDEyMTFFQjlGRTNFNzQwQURDOTA3OTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODE0MjM5MDdFNDEyMTFFQjlGRTNFNzQwQURDOTA3OTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YmQ2MjA5ODgtNTQ3MS1jMDQ3LWE0OTMtYTg5ZDA0OGEwZjkxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YWQyNjBlYWUtZTQwZi0xMWViLWIwY2Qt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";
        }
        static splashBlobLight() {
            return "iVBORw0KGgoAAAANSUhEUgAAA9UAAADRCAIAAABNUQbDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowZWM5ZDBiMS0xYmI0LTBjNGEtOGFhNS03ZmVhOTJkZmZkYWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzk0NTg2MUFFNDEyMTFFQjlDRDdFMkY2NDdEOTUzNTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzk0NTg2MTlFNDEyMTFFQjlDRDdFMkY2NDdEOTUzNTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YmQ2MjA5ODgtNTQ3MS1jMDQ3LWE0OTMtYTg5ZDA0OGEwZjkxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YWQyNjBlYWUtZTQwZi0xMWViLWIwY2Qt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";
        }
    }
    FudgeStory.Progress = Progress;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * Controls the audio signals emitted
     */
    class Sound {
        static sounds = new Map();
        static node = Sound.setup();
        cmpAudio;
        loop = false;
        fadingToVolume = undefined;
        constructor(_url, _loop) {
            this.cmpAudio = new ƒ.ComponentAudio(new ƒ.Audio(_url), _loop, false);
            Sound.node.addComponent(this.cmpAudio);
            this.loop = _loop;
            Sound.sounds.set(_url, this);
        }
        static getSound(_url) {
            let sound = Sound.sounds.get(_url);
            if (!sound)
                return false;
            return sound.cmpAudio.isPlaying;
        }
        static isPlaying(_url) {
            return Sound.sounds.get(_url);
        }
        /**
         * Plays the audiofile defined by the given url with the given volume and loops it, if desired
         */
        static play(_url, _volume, _loop = false) {
            let sound = Sound.sounds.get(_url);
            if (!sound || _loop != sound.loop)
                sound = new Sound(_url, _loop);
            sound.cmpAudio.volume = _volume;
            sound.cmpAudio.play(true);
            return sound;
        }
        /**
         * Set the overall volume for the sound mix
         */
        static setMasterVolume(_volume) {
            ƒ.AudioManager.default.volume = _volume;
        }
        /**
         * Changes the volume of the sound defined by the url linearly of the given duration to the define volume.
         * If the sound is not currently playing, it starts it respecting the loop-flag.
         */
        static fade(_url, _toVolume, _duration, _loop = false) {
            let sound = Sound.sounds.get(_url);
            if (!sound)
                sound = Sound.play(_url, _toVolume ? 0 : 1, _loop);
            let fromVolume = sound.cmpAudio.volume;
            sound.fadingToVolume = _toVolume; //need to be remembered for serialization
            let timeStart = ƒ.Time.game.get();
            return new Promise((resolve) => {
                let hndLoop = function (_event) {
                    let progress = (ƒ.Time.game.get() - timeStart) / (_duration * 1000);
                    if (progress < 1) {
                        sound.cmpAudio.volume = fromVolume + progress * (_toVolume - fromVolume);
                        return;
                    }
                    ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
                    sound.cmpAudio.volume = _toVolume;
                    sound.fadingToVolume = undefined;
                    console.log("Audio faded to " + sound.cmpAudio.volume);
                    resolve();
                };
                ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
                // ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 30);
            });
        }
        /**
         * Used internally for save/load, don't call directly
         */
        static serialize() {
            let serialization = [];
            for (let sound of Sound.sounds) {
                let cmpAudio = sound[1].cmpAudio;
                console.log("Serialize ", cmpAudio);
                if (!cmpAudio.isPlaying || cmpAudio.volume == 0 || sound[1].fadingToVolume == 0)
                    continue;
                let data = {
                    url: sound[0],
                    volume: sound[1].fadingToVolume || cmpAudio.volume,
                    loop: sound[1].loop
                };
                serialization.push(data);
            }
            return serialization;
        }
        /**
         * Used internally for save/load, don't call directly
         */
        static deserialize(_serialization) {
            for (let sound of _serialization) {
                Sound.play(sound.url, sound.volume, sound.loop);
            }
        }
        static setup() {
            let nodeSound = new ƒ.Node("Sound");
            ƒ.AudioManager.default.listenTo(nodeSound);
            return nodeSound;
        }
        get audio() {
            return this.cmpAudio;
        }
    }
    FudgeStory.Sound = Sound;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * Displays the phrases told by the characters or the narrator
     */
    class Speech {
        static signalForwardTicker = FudgeStory.Progress.defineSignal([() => FudgeStory.getKeypress(ƒ.KEYBOARD_CODE.SPACE), FudgeStory.EVENT.POINTERDOWN]);
        static signalNext = FudgeStory.Progress.defineSignal([() => FudgeStory.getKeypress(ƒ.KEYBOARD_CODE.SPACE), FudgeStory.EVENT.POINTERDOWN]);
        static element;
        static time = new ƒ.Time();
        static delayLetter = 50;
        static delayParagraph = 1000;
        static get div() {
            Speech.element = Speech.element || document.querySelector("speech");
            return Speech.element;
        }
        /**
         * Displays the {@link Character}s name or the string given as name and the given text at once
         */
        static set(_character, _text, _class) {
            Speech.show();
            let name = (typeof (_character) == "string") ? _character : _character ? Reflect.get(_character, "name") : "";
            let nameTag = Speech.div.querySelector("name");
            let textTag = Speech.div.querySelector("content");
            nameTag.innerHTML = "";
            Speech.div.className = _class || name;
            if (name) {
                nameTag.innerHTML = name;
            }
            textTag.innerHTML = _text;
        }
        /**
         * Displays the {@link Character}s name or the string given as name and slowly writes the text letter by letter
         */
        static async tell(_character, _text, _waitForSignalNext = true, _class) {
            Speech.show();
            let done = false;
            Speech.set(_character, "", _class);
            let buffer = document.createElement("div");
            let textTag = Speech.div.querySelector("content");
            buffer.innerHTML = _text;
            let prmTick = this.copyByLetter(buffer, textTag);
            let prmInput = new Promise(async (_resolve) => {
                await Speech.signalForwardTicker();
                if (done)
                    return;
                console.log("Ticker interrupted");
                Speech.time.clearAllTimers();
                Speech.set(_character, _text, _class);
                _resolve(null);
            });
            await Promise.race([prmTick, prmInput]);
            done = true;
            if (!_waitForSignalNext)
                return;
            await Speech.signalNext();
        }
        /**
         * Defines the pauses used by ticker between letters and before a paragraph in milliseconds
         */
        static setTickerDelays(_letter, _paragraph = 1000) {
            Speech.delayLetter = _letter;
            Speech.delayParagraph = _paragraph;
        }
        /**
         * Clears the speech
         */
        static clear() {
            let nameTag = Speech.div.querySelector("name");
            let textTag = Speech.div.querySelector("content");
            nameTag.innerHTML = "";
            Speech.div.className = "";
            textTag.innerHTML = "";
        }
        /**
         * Hides the speech
         */
        static hide() {
            Speech.div.style.visibility = "hidden";
        }
        /**
         * Shows the speech
         */
        static show() {
            Speech.div.style.visibility = "visible";
        }
        /**
         * Displays an input field to be filled by the user and returns the input
         */
        static async getInput() {
            return new Promise((_resolve) => {
                let textTag = Speech.div.querySelector("content");
                let input = document.createElement("input");
                textTag.appendChild(input);
                let hndEvent = (_event) => {
                    input.removeEventListener("change", hndEvent);
                    input.disabled = true;
                    _resolve(input.value);
                };
                input.addEventListener("change", hndEvent);
                input.addEventListener("keydown", (_event) => _event.stopPropagation());
                input.focus();
            });
        }
        /**
         * Returns a serialization-object holding the current state of the speech
         */
        static serialize() {
            let serialization = {
                delayLetter: Speech.delayLetter,
                delayParagraph: Speech.delayParagraph,
                visibility: Speech.div.style.visibility,
                name: Speech.div.querySelector("name").innerHTML.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
                text: Speech.div.querySelector("content").innerHTML.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
            };
            return serialization;
        }
        /**
         * Restores the state of the speech given with the serialization-object
         */
        static deserialize(_serialization) {
            Speech.setTickerDelays(_serialization.delayLetter, _serialization.delayParagraph);
            _serialization.visibility ? Speech.show() : Speech.hide();
            Speech.div.querySelector("name").innerHTML = _serialization.name.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
            Speech.div.querySelector("content").innerHTML = _serialization.text.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
        }
        static async copyByLetter(_from, _to) {
            for (let child of _from.childNodes) {
                // console.log(child.nodeType, child instanceof HTMLParagraphElement, child.hasChildNodes(), child);
                if (child.nodeType == Node.TEXT_NODE) {
                    let text = child.textContent;
                    for (let i = 0; i < text.length; i++) {
                        _to.innerHTML += text[i];
                        await Speech.time.delay(Speech.delayLetter);
                    }
                }
                else {
                    let clone = child.cloneNode(false);
                    _to.appendChild(clone);
                    if (child instanceof HTMLParagraphElement)
                        await Speech.time.delay(Speech.delayParagraph);
                    if (child.hasChildNodes())
                        await Speech.copyByLetter(child, clone);
                }
            }
        }
    }
    FudgeStory.Speech = Speech;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    /**
     * Displays a longer narrative text to convey larger parts of the story not told by a character
     */
    //@ts-ignore
    class Text extends (HTMLDialogElement) {
        static get dialog() {
            return document.querySelector("dialog[type=text]");
        }
        /**
         * Prints the text in a modal dialog stylable with css
         */
        static async print(_text) {
            let dialog = Text.dialog;
            //@ts-ignore
            dialog.close();
            dialog.innerHTML = _text;
            //@ts-ignore
            dialog.showModal();
            return new Promise((_resolve) => {
                let hndSelect = (_event) => {
                    _event.stopPropagation();
                    if (_event.target != dialog)
                        return;
                    dialog.removeEventListener(FudgeStory.EVENT.POINTERDOWN, hndSelect);
                    //@ts-ignore
                    dialog.close();
                    _resolve();
                };
                dialog.addEventListener(FudgeStory.EVENT.POINTERDOWN, hndSelect);
            });
        }
        /**
         * sets the classname of the dialog to enable specific styling
         */
        static setClass(_class) {
            Text.dialog.className = _class;
        }
        /**
         * adds a classname to the classlist of the dialog to enable cascading styles
         */
        static addClass(_class) {
            Text.dialog.classList.add(_class);
        }
        /**
         * closes the text-dialog
         */
        static close() {
            //@ts-ignore
            Text.dialog.close();
        }
    }
    FudgeStory.Text = Text;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     *
     */
    class Transition extends FudgeStory.Base {
        static transitions = new Map();
        /**
         * Called by {@link update} to blend from the old display of a scene to the new. Don't call directly.
         */
        static async blend(_imgOld, _imgNew, _duration = 1000, _transition, _factor = 0.5) {
            let crc2 = FudgeStory.Base.viewport.context;
            let bmpNew = await createImageBitmap(_imgNew);
            if (!_transition) {
                function simpleFade(_progress) {
                    crc2.globalAlpha = 1;
                    crc2.putImageData(_imgOld, 0, 0);
                    crc2.globalAlpha = _progress;
                    crc2.drawImage(bmpNew, 0, 0);
                }
                return Transition.getPromise(simpleFade, _duration);
            }
            let scale = Math.pow(16, _factor * 2) - 1;
            async function transit(_progress) {
                crc2.globalAlpha = 1;
                crc2.putImageData(_imgOld, 0, 0);
                let value = (_progress * (scale + 1) - scale) * 255;
                for (let index = 0; index < _transition.length; index += 4) {
                    let alpha = _transition[index];
                    _imgNew.data[index + 3] = alpha * scale + value;
                }
                let source = await createImageBitmap(_imgNew);
                crc2.drawImage(source, 0, 0);
            }
            return Transition.getPromise(transit, _duration);
        }
        /**
         * Loads an image to use for special transition effects and returns the buffer. Don't call directly.
         */
        static async get(_url) {
            let transition = Transition.transitions.get(_url);
            if (transition)
                return transition;
            let txtTransition = new ƒ.TextureImage();
            await txtTransition.load(_url);
            // TODO: move to get(...)
            let canvasTransition = document.createElement("canvas");
            canvasTransition.width = FudgeStory.Base.viewport.canvas.width;
            canvasTransition.height = FudgeStory.Base.viewport.canvas.height;
            let crcTransition = canvasTransition.getContext("2d");
            crcTransition.imageSmoothingEnabled = false;
            crcTransition.drawImage(txtTransition.image, 0, 0, txtTransition.image.width, txtTransition.image.height, 0, 0, canvasTransition.width, canvasTransition.height);
            transition = crcTransition.getImageData(0, 0, canvasTransition.width, canvasTransition.height).data;
            Transition.transitions.set(_url, transition);
            return transition;
        }
        static getPromise(_transition, _duration) {
            let timeStart = ƒ.Time.game.get();
            return new Promise((resolve) => {
                let hndLoop = function (_event) {
                    let progress = (ƒ.Time.game.get() - timeStart) / _duration;
                    if (progress < 1) {
                        _transition(progress);
                        return;
                    }
                    ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
                    _transition(1);
                    resolve();
                };
                ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
                // ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 30);
            });
        }
    }
    FudgeStory.Transition = Transition;
})(FudgeStory || (FudgeStory = {}));
//# sourceMappingURL=FudgeStory.js.map