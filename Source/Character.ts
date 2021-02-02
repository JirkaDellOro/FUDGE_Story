namespace FudgeStory {
  import ƒ = FudgeCore;

  /**
   * ## Pattern for the definition of characters
   * Define characters to appear on the stage in various poses using this pattern 
   * ```plaintext
   * {
   *   id of the character: {
   *     name: "Name of the character to appear on the text board",
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
    /** Name of the character to appear on the text board */
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
   *  Holds the internal data needed to display a character
   */ 
  export class Character extends Base {
    private static characters: Map<string, Character> = new Map();

    public poses: Map<RequestInfo, ƒ.Node> = new Map();
    public origin: ƒ.ORIGIN2D;
    private definition: CharacterDefinition;

    private constructor(_character: CharacterDefinition) {
      super(_character.name);
      this.origin = Reflect.get(_character, "origin") || ƒ.ORIGIN2D.BOTTOMCENTER;
      this.definition = _character;
      Character.characters.set(_character.name, this);
    }

    /**
     * Retrieve the [[CharacterNode]] from the name defined in the [[Character]]-object given or creates a new [[CharacterNode]] using that object
     */
    public static get(_character: CharacterDefinition): Character {
      let result: Character = Character.characters.get(_character.name);
      return result || new Character(_character);
    }
    
    /**
     * Retrieve the [[CharacterNode]] from the name given or null if not defined yet
     */
    public static getByName(_name: string): Character {
      return Character.characters.get(_name);
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