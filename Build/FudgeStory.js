"use strict";
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * Holds core functionality for the inner workings. Do not instantiate or call methods directly!
     */
    class Base {
        /**
         * Will be called once by [[Progress]] before anything else may happen.
         */
        static create() {
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
            cmpCamera.pivot.translateZ(Base.size.x * factor);
            cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
            Base.viewport.draw();
            Base.calculatePositions();
            Base.resize();
            window.addEventListener("resize", Base.resize);
        }
        /**
         * Creates a serialization-object representing the current state of the [[Character]]s currently shown
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
         * Reconstructs the [[Character]]s from a serialization-object and shows them
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
        static adjustMesh(_cmpMesh, _origin, _size) {
            let rect = new ƒ.Rectangle(0, 0, _size.x, _size.y, _origin);
            _cmpMesh.pivot.translateX(rect.x + rect.width / 2);
            _cmpMesh.pivot.translateY(-rect.y - rect.height / 2);
            _cmpMesh.pivot.scale(_size.toVector3(1));
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
    Base.mesh = new ƒ.MeshQuad("Quad");
    FudgeStory.Base = Base;
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
        constructor(_character) {
            super();
            this.poses = new Map();
            this.origin = Reflect.get(_character, "origin") || ƒ.ORIGIN2D.BOTTOMCENTER;
            this.definition = _character;
            Character.characters.set(_character.name, this);
        }
        /**
         * Retrieves or creates the [[Character]] from the [[CharacterDefinition]] given
         */
        static get(_character) {
            let result = Character.characters.get(_character.name);
            return result || new Character(_character);
        }
        /**
         * Retrieve the [[Character]] from the name given or null if not defined yet
         */
        static getByName(_name) {
            return Character.characters.get(_name);
        }
        /**
         * Show the given [[Character]] in the specified pose at the given position. See [[CharacterDefinition]] for the definition of a character.
         */
        static async show(_character, _pose, _position) {
            let character = Character.get(_character);
            let pose = await character.getPose(_pose);
            pose.mtxLocal.translation = _position.toVector3(0);
            FudgeStory.Base.middle.appendChild(pose);
        }
        /**
         * Hide the given [[Character]]
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
         * Remove all [[Character]]s and objects
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
    Character.characters = new Map();
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
     * Calling [[insert]] directly will not register the scene as a save-point for saving and loading.
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
     * Wait for the viewers input. See [[EVENT]] for predefined events to wait for.
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
     * Standard positions
     */
    FudgeStory.positions = {
        topleft: pos0, topright: pos0, topcenter: pos0,
        centerleft: pos0, centerright: pos0, center: pos0,
        bottomleft: pos0, bottomright: pos0, bottomcenter: pos0,
        left: pos0, right: pos0
    };
    /**
     * Calculates and returns a position to place [[Character]]s or objects.
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
    var ƒ = FudgeCore;
    /**
     * Represents a location with foreground, background and the middle, where [[Character]]s show.
     */
    class Location extends FudgeStory.Base {
        constructor(_description) {
            super();
        }
        /**
         * Retrieves the [[Location]] associated with the given [[LocationDefinition]]
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
         * Show the location given by [[LocationDefinition]].
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
    Location.locations = new Map();
    FudgeStory.Location = Location;
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
    /**
     * Controls the main flow of the story, tracks logical data and provides load/save
     */
    class Progress extends FudgeStory.Base {
        /**
         * Starts the story with the scenes-object given and reads the url-searchstring to enter at a point previously saved
         */
        static async go(_scenes) {
            FudgeStory.Base.create();
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
        static async splash(_text) {
            console.log("Splash");
            let splash = document.createElement("dialog");
            document.body.appendChild(splash);
            splash.style.height = "100vh";
            splash.style.width = "100vw";
            splash.style.textAlign = "center";
            splash.style.backgroundColor = "white";
            splash.style.cursor = "pointer";
            // splash.innerHTML = "<img src='../../Images/Splash.png'/>";
            splash.innerHTML = `<img src="data:image/gif;base64,${Progress.splashBlob()}"/>`;
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
        static splashBlob() {
            return "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";
        }
    }
    Progress.data = {};
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
    Sound.sounds = new Map();
    Sound.node = Sound.setup();
    FudgeStory.Sound = Sound;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    var ƒ = FudgeCore;
    /**
     * Displays the phrases told by the characters or the narrator
     */
    class Speech {
        static get div() {
            Speech.element = Speech.element || document.querySelector("speech");
            return Speech.element;
        }
        /**
         * Displays the [[Character]]s name and the given text at once
         */
        static set(_character, _text) {
            Speech.show();
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
         * Displays the [[Character]]s name and slowly writes the text letter by letter
         */
        static async tell(_character, _text, _waitForSignalNext = true) {
            Speech.show();
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
    Speech.signalForwardTicker = FudgeStory.Progress.defineSignal([FudgeStory.EVENT.KEYUP, FudgeStory.EVENT.POINTERDOWN]);
    Speech.signalNext = FudgeStory.Progress.defineSignal([FudgeStory.EVENT.KEYUP, FudgeStory.EVENT.POINTERDOWN]);
    Speech.time = new ƒ.Time();
    Speech.delayLetter = 50;
    Speech.delayParagraph = 1000;
    FudgeStory.Speech = Speech;
})(FudgeStory || (FudgeStory = {}));
var FudgeStory;
(function (FudgeStory) {
    /**
     * Displays a longer narrative text to convey larger parts of the story not told by a character
     */
    class Text extends HTMLDialogElement {
        static get dialog() {
            return document.querySelector("dialog[is=text-page]");
        }
        /**
         * Prints the text in a modal dialog stylable with css
         */
        static async print(_text) {
            if (!customElements.get("text-page"))
                customElements.define("text-page", FudgeStory.Text, { extends: "dialog" });
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
        /**
         * Called by [[update]] to blend from the old display of a scene to the new. Don't call directly.
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
//# sourceMappingURL=FudgeStory.js.map