namespace FudgeStory {
  import ƒ = FudgeCore;

  export interface Location {
    name?: string;
    background: string;
    foreground?: string;
  }

  /**
   * Define locations to use on the stage using this pattern:
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
  export interface Locations {
    [id: string]: Location;
  }

  /**
   * Holds internal data to effectively load and display the location images
   */
  export class LocationNodes extends Base {
    private static locations: Map<Object, LocationNodes> = new Map();
    public background: ƒ.Node;
    public foreground: ƒ.Node;

    private constructor(_description: Location) {
      super(_description.name);
    }

    /**
     * Retrieves the [[LocationNode]] associated with the given description
     */
    public static async get(_description: Location): Promise<LocationNodes> {
      let result: LocationNodes = LocationNodes.locations.get(_description);
      if (result)
        return result;

      result = new LocationNodes(_description);
      await result.load(_description);
      return result;
    }

    private async load(_location: Location): Promise<void> {
      this.background = await Base.createImageNode(_location.name + "|" + "Background", _location.background, ƒ.ORIGIN2D.CENTER); //, Stage.getSize());
      if (Reflect.get(this, "foreground"))
        this.foreground = await Base.createImageNode(_location.name + "|" + "Foreground", _location.foreground, ƒ.ORIGIN2D.CENTER); //, Stage.getSize());
    }
  }
}