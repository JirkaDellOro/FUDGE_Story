namespace FudgeStory {
  import ƒ = FudgeCore;
  /**
   * Define a location using this pattern:
   * ```text
   *   id of the location: {
   *     name: "Name of the location" (optional),
   *     background: "path to the image to be used as the background",
   *     foreground: "path to the image to be used as the foreground" (optional),
   *   }
   * ```
   */
  export interface LocationDefinition {
    name?: string;
    background: string;
    foreground?: string;
  }

  /**
   * Define locations using this pattern:
   * ```text
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
   * Represents a location with foreground, background and the middle, where {@link Character}s show.
   */
  export class Location extends Base {
    private static locations: Map<Object, Location> = new Map();
    private background: ƒ.Node;
    private foreground: ƒ.Node;

    private constructor(_description: LocationDefinition) {
      super();
    }

    /**
     * Retrieves the {@link Location} associated with the given {@link LocationDefinition}
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
     * Show the location given by {@link LocationDefinition}.
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
      this.background = await Base.createImageNode(_location.name + "|" + "Background", _location.background, ƒ.ORIGIN2D.CENTER);
      if (Reflect.get(this, "foreground"))
        this.foreground = await Base.createImageNode(_location.name + "|" + "Foreground", _location.foreground, ƒ.ORIGIN2D.CENTER);
    }
  }
}