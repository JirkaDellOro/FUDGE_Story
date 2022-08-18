namespace FudgeStory {
  import ƒ = FudgeCore;

  /**
   * Controls the audio signals emitted
   */
  export class Sound {
    private static sounds: Map<RequestInfo, Sound> = new Map();
    private static node: ƒ.Node = Sound.setup();
    private cmpAudio: ƒ.ComponentAudio;
    private loop: boolean = false;
    private fadingToVolume: number = undefined;

    private constructor(_url: RequestInfo, _loop: boolean) {
      this.cmpAudio = new ƒ.ComponentAudio(new ƒ.Audio(_url), _loop, false);
      Sound.node.addComponent(this.cmpAudio);
      this.loop = _loop;
      Sound.sounds.set(_url, this);
    }

    public static getSound(_url: RequestInfo): boolean {
      let sound: Sound = Sound.sounds.get(_url);
      if (!sound)
        return false;
      return sound.cmpAudio.isPlaying;
    }

    public static isPlaying(_url: RequestInfo): Sound {
      return Sound.sounds.get(_url);
    }

    /**
     * Plays the audiofile defined by the given url with the given volume and loops it, if desired
     */
    public static play(_url: RequestInfo, _volume: number, _loop: boolean = false): Sound {
      let sound: Sound = Sound.sounds.get(_url);
      if (!sound || _loop != sound.loop)
        sound = new Sound(_url, _loop);

      sound.cmpAudio.volume = _volume;
      sound.cmpAudio.play(true);
      return sound;
    }

    /**
     * Set the overall volume for the sound mix
     */
    public static setMasterVolume(_volume: number): void {
      ƒ.AudioManager.default.volume = _volume;
    }

    /**
     * Changes the volume of the sound defined by the url linearly of the given duration to the define volume.
     * If the sound is not currently playing, it starts it respecting the loop-flag.
     */
    public static fade(_url: RequestInfo, _toVolume: number, _duration: number, _loop: boolean = false): Promise<void> {
      let sound: Sound = Sound.sounds.get(_url);
      if (!sound)
        sound = Sound.play(_url, _toVolume ? 0 : 1, _loop);

      let fromVolume: number = sound.cmpAudio.volume;
      sound.fadingToVolume = _toVolume;  //need to be remembered for serialization

      let timeStart: number = ƒ.Time.game.get();
      return new Promise((resolve) => {
        let hndLoop: EventListener = function (_event: Event): void {
          let progress: number = (ƒ.Time.game.get() - timeStart) / (_duration * 1000);

          if (progress < 1) {
            sound.cmpAudio.volume = fromVolume + progress * (_toVolume - fromVolume);
            return;
          }

          ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
          sound.cmpAudio.volume = _toVolume;
          sound.fadingToVolume = undefined;
          console.log("Audio faded to " + sound.cmpAudio.volume);
          resolve();
        };

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
        // ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 30);
      });
    }

    /**
     * Used internally for save/load, don't call directly
     */
    public static serialize(): ƒ.Serialization[] {
      let serialization: ƒ.Serialization[] = [];
      for (let sound of Sound.sounds) {
        let cmpAudio: ƒ.ComponentAudio = sound[1].cmpAudio;
        console.log("Serialize ", cmpAudio);
        if (!cmpAudio.isPlaying || cmpAudio.volume == 0 || sound[1].fadingToVolume == 0)
          continue;
        let data: ƒ.Serialization = {
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
    public static deserialize(_serialization: ƒ.Serialization[]): void {
      for (let sound of _serialization) {
        Sound.play(sound.url, sound.volume, sound.loop);
      }
    }

    private static setup(): ƒ.Node {
      let nodeSound: ƒ.Node = new ƒ.Node("Sound");
      ƒ.AudioManager.default.listenTo(nodeSound);
      return nodeSound;
    }

    public get audio(): ƒ.ComponentAudio {
      return this.cmpAudio;
    }
  }
}