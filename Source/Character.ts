/// <reference path="Base.ts" />

namespace FudgeStory {
  import ƒ = FudgeCore;

  /**
   * ## Pattern for the definition of characters
   * Define characters to appear in various poses using this pattern 
   * ```text
   * {
   *   id of the character: {
   *     name: "Name of the character to appear when speaking",
   *     origin: the origin of the image, in most cases FudgeStory.ORIGIN.BOTTOMCENTER,
   *     pose: {
   *       id of 1st pose: "path to the image to be used for 1st pose",
   *       id of 2nd pose: "path to the image to be used for 2nd pose",
   *       ...
   *     }
   *   },
   *   id of the character: {
   *     ... same pattern as above
   *   },
   *   ... more characters as above
   * }
   * ```
   * ## Example
   * ```typescript
   * export let chars = {
   *   Sue: {
   *     name: "Susan Rice",
   *     origin: FudgeStory.ORIGIN.BOTTOMCENTER,
   *     pose: {
   *       normal: "../Characters/placeholder_girl.png",
   *       talk: "../Characters/placeholder_girl_talk.png"
   *     }
   *   },
   *   John: {
   *     name: "John Wick"
   *     ...
   *   },
   * }
   * ```
   */
  export interface CharacterDefinition {
    /** Name of the character to appear when speaking */
    name: string;
    /** The origin of the characters images, in most cases FudgeStory.ORIGIN.BOTTOMCENTER, */
    origin: ORIGIN;
    /** A list of key-value-pairs defining various poses of the character and holding the urls to the according images
     * ```typescript
     * {
     *   id of 1st pose: "path to the image to be used for 1st pose",
     *   id of 2nd pose: "path to the image to be used for 2nd pose",
     *   ...
     * }
     * ```
     */
    pose: { [id: string]: RequestInfo };
  }

  /**
   *  Represents a character in various poses and with a unique name
   */
  export class Character extends Base {
    private static characters: Map<string, Character> = new Map();

    /** A list of poses for that character */
    public poses: Map<RequestInfo, ƒ.Node> = new Map();
    /** The local origin of the characters image */
    public origin: ƒ.ORIGIN2D;
    private definition: CharacterDefinition;

    private constructor(_character: CharacterDefinition) {
      super();
      this.origin = Reflect.get(_character, "origin") || ƒ.ORIGIN2D.BOTTOMCENTER;
      this.definition = _character;
      Character.characters.set(_character.name, this);
    }

    /**
     * Retrieves or creates the {@link Character} from the {@link CharacterDefinition} given
     */
    public static get(_character: CharacterDefinition): Character {
      let result: Character = Character.characters.get(_character.name);
      return result || new Character(_character);
    }

    /**
     * Retrieve the {@link Character} from the name given or null if not defined yet
     */
    public static getByName(_name: string): Character {
      return Character.characters.get(_name);
    }

    /**
     * Show the given {@link Character} in the specified pose at the given position. See {@link CharacterDefinition} for the definition of a character.
     */
    public static async show(_character: CharacterDefinition, _pose: RequestInfo, _position: Position): Promise<void> {
      let character: Character = Character.get(_character);
      let pose: ƒ.Node = await character.getPose(_pose);
      pose.mtxLocal.set(ƒ.Matrix4x4.TRANSLATION(_position.toVector3(0)));
      Base.middle.appendChild(pose);
    }

    /**
     * Hide the given {@link Character}
     */
    public static async hide(_character: CharacterDefinition): Promise<void> {
      let found: ƒ.Node[] = Base.middle.getChildrenByName(_character.name);
      if (found.length == 0)
        console.warn(`No character with name ${_character.name} to hide`);
      if (found.length > 1)
        console.warn(`Multiple characters with name ${_character.name} exist, removing first`);
      Base.middle.removeChild(found[0]);
    }

    /**
     * Animate the given {@link Character} in the specified pose using the animation given.
     */
    public static async animate(_character: CharacterDefinition, _pose: RequestInfo, _animation: AnimationDefinition): Promise<void> {
      let character: Character = Character.get(_character);
      let pose: ƒ.Node = await character.getPose(_pose);

      for (let cmpOldAnimator of pose.getComponents(ƒ.ComponentAnimator))
        pose.removeComponent(cmpOldAnimator);

      if (!_animation)
        return;

      let animation: ƒ.Animation = Animation.create(_animation);
      Base.middle.appendChild(pose);
      return Animation.attach(pose, animation, _animation.playmode);
    }

    /**
     * Remove all {@link Character}s and objects
     */
    public static hideAll(): void {
      Base.middle.removeAllChildren();
    }

    /**
     * Retrieves a node displaying the pose defined by the given url of an image file. Creates a new one if not yet existent.
     */
    public async getPose(_pose: RequestInfo): Promise<ƒ.Node> {
      let result: ƒ.Node = this.poses.get(_pose);
      return result || await this.createPose(_pose);
    }


    private async createPose(_pose: RequestInfo): Promise<ƒ.Node> {
      let pose: ƒ.Node = await Base.createImageNode(this.definition.name, _pose, this.origin);
      pose.addComponent(new ƒ.ComponentTransform());
      this.poses.set(_pose, pose);
      Reflect.set(pose, "origin", this.origin); // needed for save/load
      return pose;
    }
  }
}