namespace FudgeStory {
  import ƒ = FudgeCore;
  export type Scaling = ƒ.Vector2;

  export interface AnimationDefinition {
    start: { translation?: Position, rotation?: number, scaling?: Scaling, color?: ƒ.Color };
    end: { translation?: Position, rotation?: number, scaling?: Scaling, color?: ƒ.Color };
    duration: number;
    playmode: ƒ.ANIMATION_PLAYMODE;
    // curvature: ƒ.Vector2;
  }

  export class Animation {
    public static create(_animation: AnimationDefinition): ƒ.Animation {
      let mutator: ƒ.Mutator = {};
      let duration: number = _animation.duration * 1000;
      for (let key in _animation.start) {
        mutator[key] = {};
        let start: Position | Scaling | ƒ.Color | number = Reflect.get(_animation.start, key);
        let end: Position | Scaling | ƒ.Color | number = Reflect.get(_animation.end, key);
        if (!end)
          throw (new Error(`Property mismatch in animation: ${key} is missing at the end`));

        if (start instanceof ƒ.Vector2 || start instanceof ƒ.Color) {
          for (let dimension in <ƒ.Vector2>start) {
            let seq: ƒ.AnimationSequence = new ƒ.AnimationSequence();
            seq.addKey(new ƒ.AnimationKey(0, Reflect.get(<ƒ.Vector2>start, dimension)));
            seq.addKey(new ƒ.AnimationKey(duration, Reflect.get(<ƒ.Vector2>end, dimension)));
            mutator[key][dimension] = seq;
          }
        } else if (key == "rotation") {
          let seq: ƒ.AnimationSequence = new ƒ.AnimationSequence();
          seq.addKey(new ƒ.AnimationKey(0, start));
          seq.addKey(new ƒ.AnimationKey(duration, <number>end));
          mutator[key]["z"] = seq;
        }
      }

      let result: ƒ.Mutator = { components: {} };
      if (mutator.color) {
        result.components["ComponentMaterial"] = [{ "ƒ.ComponentMaterial": { clrPrimary: mutator.color } }];
        delete mutator.color;
      }
      if (mutator.tranlation || mutator.rotation || mutator.scaling)
        result.components["ComponentTransform"] = [{ "ƒ.ComponentTransform": { mtxLocal: mutator } }];

      console.log(result);
      let animation: ƒ.Animation = new ƒ.Animation("Animation", result);
      return animation;
    }
  }
}