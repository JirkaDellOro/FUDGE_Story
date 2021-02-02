namespace FudgeStory {
  import ƒ = FudgeCore;

  export interface LocationDefinition {
    name?: string;
    background: string;
    foreground?: string;
  }

  /**
   * Define locations using this pattern:
   * ```plaintext
   * {
   *   id of the location: {
   *     name: "Name of the location" (optional),
   *     background: "path to the image to be used as the background",
   *     foreground: "path to the image to be used as the foreground" (optional),
   *   },
   *   id of the location: {
   *     ... same pattern as above
   *   },
   *   ... more locations as above
   * }
   * ```
   */
  export interface LocationDefinitions {
    [id: string]: LocationDefinition;
  }

  /**
   * Holds internal data to effectively load and display the location images
   */
  export class Location extends Base {
    private static locations: Map<Object, Location> = new Map();
    public background: ƒ.Node;
    public foreground: ƒ.Node;

    private constructor(_description: LocationDefinition) {
      super();
    }

    /**
     * Retrieves the [[LocationNode]] associated with the given description
     */
    public static async get(_description: LocationDefinition): Promise<Location> {
      let result: Location = Location.locations.get(_description);
      if (result)
        return result;

      result = new Location(_description);
      await result.load(_description);
      return result;
    }

    
    /**
     * Show the given location on the [[Stage]]. See [[Location]] for the definition of a location.
     */
    public static async show(_location: LocationDefinition): Promise<void> {
      Base.back.removeAllChildren();

      let location: Location = await Location.get(_location);
      Base.back.appendChild(location.background);

      Base.front.removeAllChildren();
      if (location.foreground)
        Base.front.appendChild(location.foreground);
    }

    private async load(_location: LocationDefinition): Promise<void> {
      this.background = await Base.createImageNode(_location.name + "|" + "Background", _location.background, ƒ.ORIGIN2D.CENTER); //, Stage.getSize());
      if (Reflect.get(this, "foreground"))
        this.foreground = await Base.createImageNode(_location.name + "|" + "Foreground", _location.foreground, ƒ.ORIGIN2D.CENTER); //, Stage.getSize());
    }
  }
}