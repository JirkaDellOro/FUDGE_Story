namespace FudgeStory {
  import ƒ = FudgeCore;

  export type SceneReturn = Promise<void | string>;
  export type SceneFunction = () => SceneReturn;

  export type SceneDescriptor = { scene: SceneFunction, name: string, id?: string, next?: string };
  export type Scenes = (SceneDescriptor | Scenes)[];

  /**
   * Controls the main flow of the story, tracks logical data and provides load/save
   */
  export class Progress {
    private static data: Object;
    private static serialization: Object;
    private static scenes: SceneDescriptor[];

    private static currentSceneDescriptor: SceneDescriptor;

    /**
     * Starts the story with the scenes-object given.  
     * Creates the [[Stage]] and reads the url-searchstring to enter at a point previously saved 
     */
    public static async play(_scenes: Scenes): Promise<void> {
      Stage.create();


      Progress.scenes = <SceneDescriptor[]>_scenes.flat(100);
      let index: number = 0;

      let urlSearch: string = location.search.substr(1);
      if (urlSearch) {
        let json = JSON.parse(decodeURI(urlSearch));
        await Progress.splash(json.sceneDescriptor.name);
        Progress.restoreData(json.data);
        Speech.deserialize(json.board);
        await Stage.deserialize(json.stage);
        Sound.deserialize(json.sound);
        index = parseInt(json.sceneDescriptor.index);
      }
      else
        await Progress.splash(document.title);


      do {
        let descriptor: SceneDescriptor = Progress.scenes[index];
        let next: string | number = await Progress.act(index);
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
    public static setData(_data: Object): void {
      Progress.data = _data;
    }

    /**
     * Opens a dialog for file selection, loads selected file and restarts the program with its contents as url-searchstring
     */
    public static async load(): Promise<void> {
      let loaded: ƒ.MapFilenameToContent = await ƒ.FileIoBrowserLocal.load();
      for (let key in loaded)
        window.location.href = window.location.origin + window.location.pathname + "?" + loaded[key];
    }

    /**
     * Saves the state the program was in when starting the current scene from [[Progress]].play(...)
     */
    public static async save(): Promise<void> {
      let saved: ƒ.MapFilenameToContent = await ƒ.FileIoBrowserLocal.save(
        { [Progress.currentSceneDescriptor.name]: JSON.stringify(Progress.serialization) }, "application/json"
      );
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
    public static defineSignal(_promiseFactoriesOrEventTypes: (Function | EVENT)[]): Signal {
      return () => {
        return Progress.bundlePromises(_promiseFactoriesOrEventTypes);
      };
    }

    /**
     * Wait for the given amount of time in milliseconds to pass
     */
    public static async delay(_lapse: number): Promise<void> {
      await ƒ.Time.game.delay(_lapse * 1000);
    }

    private static bundlePromises(_promiseFactoriesOrEventTypes: (Function | EVENT)[]): Promise<Event> {
      let promises: Promise<Event>[] = [];
      for (let entry of _promiseFactoriesOrEventTypes) {
        if (entry instanceof Function)
          promises.push(entry());
        else
          promises.push(Input.getInput([entry]));
      }

      return Promise.any(promises);
    }

    private static async act(index: number): Promise<string> {
      let descriptor: SceneDescriptor = Progress.scenes[index];
      console.log("Play scene ", descriptor);

      Progress.currentSceneDescriptor = descriptor;
      Reflect.set(Progress.currentSceneDescriptor, "index", index);
      Progress.storeData();

      return <string>await Stage.act(descriptor.scene);
    }

    private static restoreData(_restored: Object): void {
      Object.assign(Progress.data, _restored);
      console.log("Loaded", Progress.data);
    }

    private static storeData(): void {
      Progress.serialization = {
        sceneDescriptor: Progress.currentSceneDescriptor,
        data: JSON.parse(JSON.stringify(Progress.data)), //make a copy of the data instead of referring to it
        board: Speech.serialize(),
        stage: Stage.serialize(),
        sound: Sound.serialize()
      };
      console.log("Stored", Progress.serialization);
    }


    private static async splash(_text: string): Promise<void> {
      console.log("Splash");
      let splash: HTMLDialogElement = document.createElement("dialog");
      document.body.appendChild(splash);
      splash.style.height = "100vh";
      splash.style.width = "100vw";
      splash.style.textAlign = "center";
      splash.style.backgroundColor = "white";
      splash.style.cursor = "pointer";
      splash.innerHTML = "<img src='../Theater/Images/Splash.png'/>";
      splash.innerHTML += "<p>" + _text + "</p>";
      splash.showModal();

      return new Promise<void>(_resolve => {
        function hndClick(_event: Event): void {
          splash.removeEventListener("click", hndClick);
          splash.close();
          document.body.removeChild(splash);
          _resolve();
        }
        splash.addEventListener("click", hndClick);
      });
    }
  }
}