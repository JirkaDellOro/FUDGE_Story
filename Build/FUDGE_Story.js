"use strict";
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * Holds some core functionality to load images and build FUDGE-nodes from them for display
     */
    class Base {
        constructor(_name) {
            this.name = _name;
        }
        static async createImageNode(_name, _request, _origin = ƒ.ORIGIN2D.CENTER, _size) {
            let node = new ƒ.Node(_name);
            let cmpMesh = new ƒ.ComponentMesh(Base.mesh);
            if (_size)
                Base.adjustMesh(cmpMesh, _origin, _size);
            node.addComponent(cmpMesh);
            // let material: ƒ.Material = new ƒ.Material(_name, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("red")));
            let texture = new ƒ.TextureImage();
            await texture.load(_request);
            let coat = new ƒ.CoatTextured(ƒ.Color.CSS("white"), texture);
            let material = new ƒ.Material(_name, ƒ.ShaderTexture, coat);
            if (!_size)
                // texture.image.addEventListener("load", (_event: Event): void => {
                this.adjustMesh(cmpMesh, _origin, new ƒ.Vector2(texture.image.width, texture.image.height));
            // cmpMesh.pivot.scale(new ƒ.Vector3(texture.image.width, texture.image.height, 1));
            // });
            // texture.image.addEventListener("load", Stage.update);
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            node.addComponent(cmpMaterial);
            return node;
        }
        static adjustMesh(_cmpMesh, _origin, _size) {
            let rect = new ƒ.Rectangle(0, 0, _size.x, _size.y, _origin);
            _cmpMesh.pivot.translateX(rect.x + rect.width / 2);
            _cmpMesh.pivot.translateY(-rect.y - rect.height / 2);
            _cmpMesh.pivot.scale(_size.toVector3(1));
        }
    }
    Base.mesh = new ƒ.MeshQuad("Quad");
    FudgeStory.Base = Base;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     *  Holds the internal data needed to display a character
     */
    class CharacterNode extends FudgeStory.Base {
        constructor(_character) {
            super(_character.name);
            this.poses = new Map();
            this.origin = Reflect.get(_character, "origin") || ƒ.ORIGIN2D.BOTTOMCENTER;
            this.character = _character;
            CharacterNode.characters.set(_character.name, this);
        }
        /**
         * Retrieve the [[CharacterNode]] from the name defined in the [[Character]]-object given or creates a new [[CharacterNode]] using that object
         */
        static get(_character) {
            let result = CharacterNode.characters.get(_character.name);
            return result || new CharacterNode(_character);
        }
        /**
         * Retrieve the [[CharacterNode]] from the name given or null if not defined yet
         */
        static getByName(_name) {
            return CharacterNode.characters.get(_name);
        }
        /**
         * Retrieves a node displaying the pose defined by the given url of an image file. Creates a new one if not yet existent.
         */
        async getPose(_pose) {
            let result = this.poses.get(_pose);
            return result || await this.createPose(_pose);
        }
        async createPose(_pose) {
            let pose = await FudgeStory.Base.createImageNode(this.character.name, _pose, this.origin);
            pose.addComponent(new ƒ.ComponentTransform());
            this.poses.set(_pose, pose);
            Reflect.set(pose, "origin", this.origin); // needed for save/load
            return pose;
        }
    }
    CharacterNode.characters = new Map();
    FudgeStory.CharacterNode = CharacterNode;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    let EVENT;
    (function (EVENT) {
        EVENT["KEYDOWN"] = "keydown";
        EVENT["KEYUP"] = "keyup";
        EVENT["POINTERDOWN"] = "pointerdown";
        EVENT["POINTERUP"] = "pointerup";
    })(EVENT = FudgeStory.EVENT || (FudgeStory.EVENT = {}));
    class Input {
        /**
         * Wait for the viewers input. See [[EVENT]] for predefined events to wait for.
         */
        static async getInput(_eventTypes) {
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
    }
    FudgeStory.Input = Input;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * Holds internal data to effectively load and display the location images
     */
    class LocationNodes extends FudgeStory.Base {
        constructor(_description) {
            super(_description.name);
        }
        /**
         * Retrieves the [[LocationNode]] associated with the given description
         */
        static async get(_description) {
            let result = LocationNodes.locations.get(_description);
            if (result)
                return result;
            result = new LocationNodes(_description);
            await result.load(_description);
            return result;
        }
        async load(_location) {
            this.background = await FudgeStory.Base.createImageNode(_location.name + "|" + "Background", _location.background, ƒ.ORIGIN2D.CENTER); //, Stage.getSize());
            if (Reflect.get(this, "foreground"))
                this.foreground = await FudgeStory.Base.createImageNode(_location.name + "|" + "Foreground", _location.foreground, ƒ.ORIGIN2D.CENTER); //, Stage.getSize());
        }
    }
    LocationNodes.locations = new Map();
    FudgeStory.LocationNodes = LocationNodes;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    class Menu {
        constructor(_options, _callback, _cssClass) {
            this.hndSelect = (_event) => {
                if (_event.target == this.dialog)
                    return;
                this.callback(Reflect.get(_event.target, "innerHTML"));
            };
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
         * Returns a [[Menu]]-object.
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
    }
    FudgeStory.Menu = Menu;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    FudgeStory.ORIGIN = FudgeCore.ORIGIN2D;
    // tslint:disable-next-line
    FudgeStory.Position = ƒ.Vector2;
    // export class Position extends ƒ.Vector2 {
    //   public constructor(_x: number, _y: number) {
    //     super(_x, _y);
    //   }
    // }
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * Controls the main flow of the story, tracks logical data and provides load/save
     */
    class Progress {
        /**
         * Starts the story with the scenes-object given.
         * Creates the [[Stage]] and reads the url-searchstring to enter at a point previously saved
         */
        static async play(_scenes) {
            FudgeStory.Stage.create();
            Progress.scenes = _scenes.flat(100);
            let index = 0;
            let urlSearch = location.search.substr(1);
            if (urlSearch) {
                let json = JSON.parse(decodeURI(urlSearch));
                await Progress.splash(json.sceneDescriptor.name);
                Progress.restoreData(json.data);
                FudgeStory.Speech.deserialize(json.board);
                await FudgeStory.Stage.deserialize(json.stage);
                FudgeStory.Sound.deserialize(json.sound);
                index = parseInt(json.sceneDescriptor.index);
            }
            else
                await Progress.splash(document.title);
            do {
                let descriptor = Progress.scenes[index];
                let next = await Progress.act(index);
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
         * Defines the object to track containing logical data like score, states, textual inputs given by the play etc.
         */
        static setData(_data) {
            Progress.data = _data;
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
         * Saves the state the program was in when starting the current scene from [[Progress]].play(...)
         */
        static async save() {
            let saved = await ƒ.FileIoBrowserLocal.save({ [Progress.currentSceneDescriptor.name]: JSON.stringify(Progress.serialization) }, "application/json");
            console.log(saved);
        }
        /**
         * Defines a [[Signal]] which is a bundle of promises waiting for a set of events to happen.
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
         * Wait for the given amount of time in milliseconds to pass
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
                    promises.push(FudgeStory.Input.getInput([entry]));
            }
            return Promise.any(promises);
        }
        static async act(index) {
            let descriptor = Progress.scenes[index];
            console.log("Play scene ", descriptor);
            Progress.currentSceneDescriptor = descriptor;
            Reflect.set(Progress.currentSceneDescriptor, "index", index);
            Progress.storeData();
            return await FudgeStory.Stage.act(descriptor.scene);
        }
        static restoreData(_restored) {
            Object.assign(Progress.data, _restored);
            console.log("Loaded", Progress.data);
        }
        static storeData() {
            Progress.serialization = {
                sceneDescriptor: Progress.currentSceneDescriptor,
                data: JSON.parse(JSON.stringify(Progress.data)),
                board: FudgeStory.Speech.serialize(),
                stage: FudgeStory.Stage.serialize(),
                sound: FudgeStory.Sound.serialize()
            };
            console.log("Stored", Progress.serialization);
        }
        static async splash(_text) {
            console.log("Splash");
            let splash = document.createElement("dialog");
            document.body.appendChild(splash);
            splash.style.height = "100vh";
            splash.style.width = "100vw";
            splash.style.textAlign = "center";
            splash.style.backgroundColor = "white";
            splash.style.cursor = "pointer";
            splash.innerHTML = "<img src='../Theater/Images/Splash.png'/>";
            splash.innerHTML += "<p>" + _text + "</p>";
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
        constructor(_url, _loop) {
            this.loop = false;
            this.fadingToVolume = undefined;
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
            sound.cmpAudio.play(true);
            return sound;
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
            return new Promise((resolve) => {
                let hndLoop = function (_event) {
                    let progress = (ƒ.Time.game.get() - ƒ.Loop.timeStartGame) / (_duration * 1000);
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
                ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 30);
            });
        }
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
    Sound.sounds = new Map();
    Sound.node = Sound.setup();
    FudgeStory.Sound = Sound;
})(FudgeStory || (FudgeStory = {}));
/// <reference path="Progress.ts" />
/// <reference path="Event.ts" />
var FudgeStory;
/// <reference path="Progress.ts" />
/// <reference path="Event.ts" />
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * The textboard displaying the phrases told by the characters or the narrator
     */
    class Speech {
        static get div() {
            Speech.element = Speech.element || document.querySelector("board");
            return Speech.element;
        }
        /**
         * Displays the [[Character]]s name and the given text at once
         */
        static set(_character, _text) {
            let name = _character ? Reflect.get(_character, "name") : "";
            let nameTag = Speech.div.querySelector("name");
            let textTag = Speech.div.querySelector("content");
            nameTag.innerHTML = "";
            Speech.div.className = name;
            if (name) {
                nameTag.innerHTML = name;
            }
            textTag.innerHTML = _text;
        }
        /**
         * Displays the [[Character]]s name and slowly writes the text on the board letter by letter
         */
        static async tell(_character, _text, _waitForSignalNext = true) {
            let done = false;
            Speech.set(_character, "");
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
                Speech.set(_character, _text);
                _resolve(null);
            });
            await Promise.race([prmTick, prmInput]);
            done = true;
            if (!_waitForSignalNext)
                return;
            await Speech.signalNext();
        }
        /**
         * Defines the pauses used by ticker between letters and before a paragraph
         */
        static setTickerDelays(_letter, _paragraph = 1000) {
            Speech.delayLetter = _letter * 1000;
            Speech.delayParagraph = _paragraph * 1000;
        }
        /**
         * Clears the board
         */
        static clear() {
            let nameTag = Speech.div.querySelector("name");
            let textTag = Speech.div.querySelector("content");
            nameTag.innerHTML = "";
            Speech.div.className = "";
            textTag.innerHTML = "";
        }
        /**
         * Hides the board
         */
        static hide() {
            Speech.div.style.visibility = "hidden";
        }
        /**
         * Shows the board
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
         * Returns a serialization-object holding the current state of the board
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
         * Restores the state of the board given with the serialization-object
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
    Speech.signalForwardTicker = FudgeStory.Progress.defineSignal([FudgeStory.EVENT.KEYUP, FudgeStory.EVENT.POINTERDOWN]);
    Speech.signalNext = FudgeStory.Progress.defineSignal([FudgeStory.EVENT.KEYUP, FudgeStory.EVENT.POINTERDOWN]);
    Speech.time = new ƒ.Time();
    Speech.delayLetter = 50;
    Speech.delayParagraph = 1000;
    FudgeStory.Speech = Speech;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    let pos0 = new FudgeStory.Position(0, 0);
    /**
     * The [[Stage]] is where the [[Character]]s and [[Location]] show up. It's the main instance to work with.
     */
    class Stage {
        /**
         * Will be called once by [[Progress]] before anything else may happen on the [[Stage]].
         */
        static create() {
            if (Stage.viewport)
                return;
            let theater = document.body.querySelector("theater");
            Stage.aspectRatio = theater.clientWidth / theater.clientHeight;
            Stage.graph = new ƒ.Node("Graph");
            Stage.back = new ƒ.Node("Back");
            Stage.middle = new ƒ.Node("Middle");
            Stage.front = new ƒ.Node("Front");
            Stage.board = new ƒ.Node("Board");
            // Stage.menu = new ƒ.Node("Menu");
            let canvas = document.querySelector("canvas");
            Stage.size = new ƒ.Vector2(theater.clientWidth, theater.clientHeight);
            console.log("StageSize", Stage.size.toString());
            Stage.graph.appendChild(Stage.back);
            Stage.graph.appendChild(Stage.middle);
            Stage.graph.appendChild(Stage.front);
            Stage.graph.appendChild(Stage.board);
            Stage.back.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(-1))));
            Stage.front.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(1))));
            Stage.board.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Z(2))));
            let cmpCamera = new ƒ.ComponentCamera();
            Stage.viewport = new ƒ.Viewport();
            Stage.viewport.initialize("Viewport", Stage.graph, cmpCamera, canvas);
            let factor = 2 * Math.sqrt(2);
            cmpCamera.projectCentral(Stage.size.x / Stage.size.y, 20, ƒ.FIELD_OF_VIEW.HORIZONTAL, 1000, Stage.size.x * factor + 100);
            //TODO: use orthographic camera, no fov-calculation required
            cmpCamera.pivot.translateZ(Stage.size.x * factor);
            cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
            Stage.viewport.draw();
            Stage.calculatePositions();
            Stage.resize();
            window.addEventListener("resize", Stage.resize);
        }
        /**
         * Calculates and returns a position on the [[Stage]] to be used to place [[Character]]s or objects on the [[Stage]].
         * Pass values in percent relative to the upper left corner.
         */
        static positionPercent(_x, _y) {
            let size = Stage.size.copy;
            let position = new FudgeStory.Position(-size.x / 2, size.y / 2);
            size.x *= _x / 100;
            size.y *= -_y / 100;
            position.add(size);
            return position;
        }
        /**
         * Show the given location on the [[Stage]]. See [[Location]] for the definition of a location.
         */
        static async showLocation(_location) {
            Stage.back.removeAllChildren();
            let location = await FudgeStory.LocationNodes.get(_location);
            Stage.back.appendChild(location.background);
            Stage.front.removeAllChildren();
            if (location.foreground)
                Stage.front.appendChild(location.foreground);
        }
        /**
         * Show the given [[Character]] in the specified pose at the given position on the stage. See [[Character]] for the definition of a character.
         */
        static async showCharacter(_character, _pose, _position) {
            let character = FudgeStory.CharacterNode.get(_character);
            let pose = await character.getPose(_pose);
            pose.mtxLocal.translation = _position.toVector3(0);
            Stage.middle.appendChild(pose);
        }
        /**
         * Hide the given [[Character]], removing it from the [[Stage]]
         */
        static async hideCharacter(_character) {
            let found = Stage.middle.getChildrenByName(_character.name);
            if (found.length == 0)
                console.warn(`No character with name ${_character.name} to hide on the stage`);
            if (found.length > 1)
                console.warn(`Multiple characters with name ${_character.name} on the stage, removing first`);
            Stage.middle.removeChild(found[0]);
        }
        /**
         * Remove all [[Character]]s and objects from the stage
         */
        static free() {
            Stage.middle.removeAllChildren();
        }
        /**
         * Display the recent changes to the [[Stage]]. If a parameters are specified, they are used blend from the previous display to the new
         * as described in [[Transition]]
         */
        static async update(_duration, _url, _edge) {
            Stage.viewport.adjustingFrames = false;
            if (!_duration) {
                Stage.viewport.draw();
                return;
            }
            let crc2 = Stage.viewport.getContext();
            let imgOld = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
            Stage.viewport.draw();
            let imgNew = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
            crc2.putImageData(imgOld, 0, 0);
            let transition;
            if (_url)
                transition = await FudgeStory.Transition.get(_url);
            await FudgeStory.Transition.blend(imgOld, imgNew, _duration * 1000, transition, _edge);
        }
        /**
         * Wait for the viewers input. See [[EVENT]] for predefined events to wait for.
         */
        static async getInput(_eventTypes) {
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
        /**
         * Calls the given scene to be played on the stage. A scene is a sequence of commands defining a small piece of the whole play.
         * A scene needs to be defined in the following format, where NameOfTheScene is a placeholder and should be chosen arbitrarily.
         * Calling this function directly will not register the scene as a save-point for saving and loading. Use Progress.play for this!
         * ```typescript
         * export async function NameOfTheScene(): SceneReturn {
         *   ...
         *   ...
         * }
         * ```
         */
        static async act(_scene) {
            console.log("SceneFunction", _scene.name);
            return await _scene();
        }
        /**
         * Creates a serialization-object representing the current state of the [[Character]]s currently shown on the stage
         */
        static serialize() {
            let serialization = { characters: [] };
            for (let pose of Stage.middle.getChildren()) {
                let poseUrl = pose.getComponent(ƒ.ComponentMaterial).material.getCoat().texture.url;
                let origin = Reflect.get(pose, "origin");
                serialization.characters.push({ name: pose.name, pose: poseUrl, origin: origin, position: pose.mtxLocal.translation.toVector2().serialize() });
            }
            return serialization;
        }
        /**
         * Reconstructs the [[CharacterNode]]s from a serialization-object and places them on the stage
         * @param _serialization
         */
        static async deserialize(_serialization) {
            for (let characterData of _serialization.characters) {
                let character = { name: characterData.name, pose: { id: characterData.pose }, origin: characterData.origin };
                let position = await new ƒ.Vector2().deserialize(characterData.position);
                Stage.showCharacter(character, characterData.pose, position);
            }
        }
        static calculatePositions() {
            let xOffset = Stage.size.x / 2;
            let yOffset = Stage.size.y / 2;
            Stage.positions = {
                topleft: new FudgeStory.Position(-xOffset, yOffset), topright: new FudgeStory.Position(xOffset, yOffset), topcenter: new FudgeStory.Position(0, yOffset),
                centerleft: new FudgeStory.Position(-xOffset, 0), centerright: new FudgeStory.Position(xOffset, 0), center: new FudgeStory.Position(0, 0),
                bottomleft: new FudgeStory.Position(-xOffset, -yOffset), bottomright: new FudgeStory.Position(xOffset, -yOffset), bottomcenter: new FudgeStory.Position(0, -yOffset),
                left: new FudgeStory.Position(-xOffset * 0.7, -yOffset), right: new FudgeStory.Position(xOffset * 0.7, -yOffset)
            };
        }
        static resize() {
            let theater = document.body.querySelector("theater");
            let bodyWidth = document.body.clientWidth;
            let bodyHeight = document.body.clientHeight;
            let aspectWindow = bodyWidth / bodyHeight;
            // console.log(aspectCanvas, aspectWindow);
            let height;
            let width;
            // aspectWindow > aspectCanvas -> scaleToHeight
            if (Stage.aspectRatio / aspectWindow < 1) {
                height = bodyHeight;
                width = bodyHeight * Stage.aspectRatio;
            }
            else {
                width = bodyWidth;
                height = bodyWidth / Stage.aspectRatio;
            }
            theater.style.height = height + "px";
            theater.style.width = width + "px";
            theater.style.top = ((bodyHeight - height) / 2) + "px";
            theater.style.left = ((bodyWidth - width) / 2) + "px";
        }
    }
    Stage.positions = {
        topleft: pos0, topright: pos0, topcenter: pos0,
        centerleft: pos0, centerright: pos0, center: pos0,
        bottomleft: pos0, bottomright: pos0, bottomcenter: pos0,
        left: pos0, right: pos0
    };
    FudgeStory.Stage = Stage;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    /**
     * Displays a longer narrative text to convey larger parts of the story not told by a character
     * (Better name required)
     */
    class Text extends HTMLDialogElement {
        static get dialog() {
            return document.querySelector("dialog[is=novel-page]");
        }
        /**
         * Prints the text in a modal dialog stylable with css
         */
        static async print(_text) {
            if (!customElements.get("novel-page"))
                customElements.define("novel-page", FudgeStory.Text, { extends: "dialog" });
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
        static close() {
            Text.dialog.close();
        }
    }
    FudgeStory.Text = Text;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    // export type TransitionFunction = (_imgOld: ImageData, _imgNew: ImageData, _duration: number, _transition: Uint8ClampedArray, _factor: number) => Promise<void>;
    class Transition {
        static async blend(_imgOld, _imgNew, _duration = 1000, _transition, _factor = 0.5) {
            let crc2 = FudgeStory.Stage.viewport.getContext();
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
        static async get(_url) {
            let transition = Transition.transitions.get(_url);
            if (transition)
                return transition;
            let txtTransition = new ƒ.TextureImage();
            await txtTransition.load(_url);
            // TODO: move to get(...)
            let canvasTransition = document.createElement("canvas");
            canvasTransition.width = FudgeStory.Stage.viewport.getCanvas().width;
            canvasTransition.height = FudgeStory.Stage.viewport.getCanvas().height;
            let crcTransition = canvasTransition.getContext("2d");
            crcTransition.imageSmoothingEnabled = false;
            crcTransition.drawImage(txtTransition.image, 0, 0, txtTransition.image.width, txtTransition.image.height, 0, 0, 1280, 720);
            transition = crcTransition.getImageData(0, 0, 1280, 720).data;
            Transition.transitions.set(_url, transition);
            return transition;
        }
        static getPromise(_transition, _duration) {
            return new Promise((resolve) => {
                let hndLoop = function (_event) {
                    let progress = (ƒ.Time.game.get() - ƒ.Loop.timeStartGame) / _duration;
                    if (progress < 1) {
                        _transition(progress);
                        return;
                    }
                    ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
                    _transition(1);
                    resolve();
                };
                ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
                ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 30);
            });
        }
    }
    Transition.transitions = new Map();
    FudgeStory.Transition = Transition;
})(FudgeStory || (FudgeStory = {}));
//# sourceMappingURL=FUDGE_Story.js.map