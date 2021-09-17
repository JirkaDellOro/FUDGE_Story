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
                let poseUrl = pose.getComponent(ƒ.ComponentMaterial).material.getCoat().texture.url;
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
            let material = new ƒ.Material(_name, ƒ.ShaderTexture, coat);
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
            for (let cmpOldAnimator of _pose.getComponents(ƒ.ComponentAnimator))
                _pose.removeComponent(cmpOldAnimator);
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
        let viewport = Reflect.get(FudgeStory.Base, "viewport");
        viewport.adjustingFrames = false;
        if (!_duration) {
            viewport.draw();
            return;
        }
        let crc2 = viewport.getContext();
        let imgOld = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
        viewport.draw();
        let imgNew = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.putImageData(imgOld, 0, 0);
        let transition;
        if (_url)
            transition = await FudgeStory.Transition.get(_url);
        await FudgeStory.Transition.blend(imgOld, imgNew, _duration * 1000, transition, _edge);
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
        let size = Reflect.get(FudgeStory.Base, "size").copy;
        let position = new FudgeStory.Position(-size.x / 2, size.y / 2);
        size.x *= _x / 100;
        size.y *= -_y / 100;
        position.add(size);
        return position;
    }
    FudgeStory.positionPercent = positionPercent;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    // import ƒ = FudgeCore;
    /**
     * Manages the inventory
     */
    class Inventory extends HTMLDialogElement {
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
         * Adds an item to the inventory
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
            dialog.showModal();
            Inventory.ƒused = [];
            return new Promise((_resolve) => {
                let hndClose = (_event) => {
                    dialog.querySelector("button").removeEventListener(FudgeStory.EVENT.POINTERDOWN, hndClose);
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
            let splash = document.createElement("dialog");
            let img = document.querySelector("splash");
            document.body.appendChild(splash);
            splash.style.height = "100vh";
            splash.style.width = "100vw";
            splash.style.textAlign = "center";
            splash.style.color = "black";
            splash.style.backgroundColor = "black";
            splash.style.cursor = "pointer";
            let html = "";
            html += `<div style="width:50%; background-color: white; display:inline-block">`;
            html += `<img src="data:image/gif;base64,${Progress.splashBlob()}" style="width: 100%"/>`;
            if (img)
                html += `<p><img src="${img.getAttribute("src")}" style="width:95%;"/></p>`;
            html += `<p>${_text}</p>`;
            html += `</div>`;
            splash.innerHTML = html;
            splash.showModal();
            return new Promise(_resolve => {
                function hndClick(_event) {
                    splash.removeEventListener("click", hndClick);
                    splash.close();
                    document.body.removeChild(splash);
                    _resolve();
                }
                splash.addEventListener("click", hndClick);
            });
        }
        static splashBlob() {
            return "iVBORw0KGgoAAAANSUhEUgAABOIAAAC3CAMAAACIVAEjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURUgmA1csBlMxDVc3F2AvB241C3U4CnM8E10/IGhFHnhDG15AIWdIJ3tHIXpVLGlNMW5TOHNaP3hfRXxkS4U9Bo5BBZdEBIFKHqlLAqxSDK5XE7FcGrVhHoFOKIVTLJNeL4hZN5RfMYxjPptnOKNwP7VmKL9wLLltMrxzO8ByLcR5No5iQpNpSoNsVJdvUYl0XZt0WKd4SL54QqB6X5F8aIx3YaJ9Y8F9SciAPqqCU7OBT7mJV5aCbpyKd6eEa72VZK2Nda+RerGTfcqRVsWDTNGOTcWHVtaXV8mOYcuVac6bc9Cddsyjb9mjac2kcNKje92yfOGpa+Otcee1e2U/oh9sjx5tmyNujiZwjyJvliZylzV6mzdXrixesTZdsQ5nsxtuqh5wrRlutxxwsyJvozFvrCJxpDV7pyRptzRktCd2tzR8uFtIpndPqmZHpWlVrXJYrkZ6qFd8qkhot1FruER5uFd5vm5rt21jtDh9wE5+wWx/wYgvmoc0nI8+oZZVrJROqIp2vIZrt7B5vT6AnjyBqDuCuUKDnkiHp1OMq1mSrEiIt1SLtlmTt3GOuWWKr2KXr2qLt2ebuHScum2gu3aluzuDwUeKxFaLxU6Qx1iVx3WPyWaIxWWbyHibyGme0Huf0GyhyninyGyi0Xip066fkKaWhbWZhK+hkruhjbyllISYvIGsv7+0qLuuotKwlNaph8KqmdmvkNy2mOu8g8u4qd+8osy9sdC/seC+pe3CifLGjfXKkc3EutXFuuLDq+XKtujQvo+Uy5qGw4acx56WzKOHxauXzLyUy4Ssx5WqxomyyZW5y4Ss1ZKp1Ym01pe72KW4zqqj07qq1qa817e316a/4MCNx8SUy9S33Mup1cq33NW+4J3A2aLCz6fF2LXL27rS3Z7B4KjH4rTN5LvT5trNw93SycbN3sLU3t7Y0evYyenc0/Df0+vi2/Lk2sbL5NnJ5cfa6NXb6ujc7s/h8c7g7dfk7dnm8uzo5fXs5fjy7uXt9PLq9ezy9////+KTTUwAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOfaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPg0KICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPg0KICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzQ2ZTE1YmYtYmE5ZS0yNzQ2LThlYTgtZGRmOWEwZjEzMWVhIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg2NkJDNTZGQzRBNDExRUJCODI0QTdEN0Y3MjcxQjBEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg2NkJDNTZFQzRBNDExRUJCODI0QTdEN0Y3MjcxQjBEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+DQogICAgICA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpmYTVhZDA0NC0xYWQwLTI5NDItOGY5Ni0xYzY2NzFkMWVhZTYiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowMzAwNTZjYi1jMWVhLTExZWItOTc5NS1kYTg1Y2JhYTlkMGYiIC8+DQogICAgPC9yZGY6RGVzY3JpcHRpb24+DQogIDwvcmRmOlJERj4NCjwveDp4bXBtZXRhPg0KPD94cGFja2V0IGVuZD0iciI/PleY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";
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
    class Text extends HTMLDialogElement {
        static get dialog() {
            return document.querySelector("dialog[type=text]");
        }
        /**
         * Prints the text in a modal dialog stylable with css
         */
        static async print(_text) {
            let dialog = Text.dialog;
            dialog.close();
            dialog.innerHTML = _text;
            dialog.showModal();
            return new Promise((_resolve) => {
                let hndSelect = (_event) => {
                    if (_event.target != dialog)
                        return;
                    dialog.removeEventListener(FudgeStory.EVENT.POINTERDOWN, hndSelect);
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
            let crc2 = FudgeStory.Base.viewport.getContext();
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
            canvasTransition.width = FudgeStory.Base.viewport.getCanvas().width;
            canvasTransition.height = FudgeStory.Base.viewport.getCanvas().height;
            let crcTransition = canvasTransition.getContext("2d");
            crcTransition.imageSmoothingEnabled = false;
            crcTransition.drawImage(txtTransition.image, 0, 0, txtTransition.image.width, txtTransition.image.height, 0, 0, 1280, 720);
            transition = crcTransition.getImageData(0, 0, 1280, 720).data;
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