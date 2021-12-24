///<reference path="Base.ts"/>
namespace FudgeStory {
  import ƒ = FudgeCore;
  export type Scaling = ƒ.Vector2;
  export type Color = ƒ.Color;
  export let Color = ƒ.Color;
  export let ANIMATION_PLAYMODE = ƒ.ANIMATION_PLAYMODE;

  /**
   * ## Pattern for the definition of an animation
   * Define the animation of the transformation or the color over time 
   * ```text
   * {
   *    start: {
   *      translation:  the position at the start of the animation, 
   *      rotation:     the angle of rotation at the start of the animation, 
   *      scaling:      the size at the start of the animation, 
   *      color:        the color at the start of the animation,
   *    },
   *    end: {
   *      same as above but for the end of the animation
   *    },
   *    duration: the duration of one animation-cylce in seconds,
   *    playmode: the mode to play the animation in, see ANIMATION_PLAYMODE
   * }
   * ```
   * ## Example
   * ```typescript
   * let animation: ƒS.AnimationDefinition = {
   *    start: {translation: ƒS.positions.bottomleft, rotation: -20, scaling: new ƒS.Position(0.5, 1.5), color: ƒS.Color.CSS("white", 0)},
   *    end: {translation: ƒS.positions.bottomright, rotation: 20, scaling: new ƒS.Position(1.5, 0.5), color: ƒS.Color.CSS("red")},
   *    duration: 1,
   *    playmode: ƒS.ANIMATION_PLAYMODE.REVERSELOOP
   *};
   * ```
   */
  export interface AnimationDefinition {
    start: { translation?: Position, rotation?: number, scaling?: Scaling, color?: Color };
    end: { translation?: Position, rotation?: number, scaling?: Scaling, color?: Color };
    duration: number;
    playmode: ƒ.ANIMATION_PLAYMODE;
  }

  /**
   * Handles animation
   */
  export class Animation extends Base {
    private static activeComponents: ƒ.ComponentAnimator[] = [];

    /**
     * Returns true if an animation is being played
     */
    public static get isPending(): boolean {
      return (Animation.activeComponents?.length > 0);
    }

    /**
     * Creates a FUDGE-Animation from an {@link AnimationDefinition}
     */
    public static create(_animation: AnimationDefinition): ƒ.Animation {
      let mutator: ƒ.Mutator = {};
      let duration: number = _animation.duration * 1000;
      for (let key in _animation.start) {
        mutator[key] = {};
        let start: Position | Scaling | Color | number = Reflect.get(_animation.start, key);
        let end: Position | Scaling | Color | number = Reflect.get(_animation.end, key);
        if (!end)
          throw (new Error(`Property mismatch in animation: ${key} is missing at the end`));

        if (start instanceof ƒ.Mutable) {
          let mutatorStart: ƒ.Mutator = start.getMutator();
          let mutatorEnd: ƒ.Mutator = (<ƒ.Mutable>end).getMutator();
          for (let subKey in mutatorStart) {
            let seq: ƒ.AnimationSequence = new ƒ.AnimationSequence();
            seq.addKey(new ƒ.AnimationKey(0, mutatorStart[subKey]));
            seq.addKey(new ƒ.AnimationKey(duration, mutatorEnd[subKey]));
            mutator[key][subKey] = seq;
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
      if (mutator.translation || mutator.rotation || mutator.scaling)
        result.components["ComponentTransform"] = [{ "ƒ.ComponentTransform": { mtxLocal: mutator } }];

      // console.log(result);
      let animation: ƒ.Animation = new ƒ.Animation("Animation", result);
      animation.setEvent("animationStart", 1);
      animation.setEvent("animationEnd", duration - 1);
      return animation;
    }

    /**
     * Attaches the given FUDGE-Animation to the given node with the given mode.  
     * Used internally by Character.
     */
    public static async attach(_pose: ƒ.Node, _animation: ƒ.Animation, _playmode: ƒ.ANIMATION_PLAYMODE): Promise<void> {
      // TODO: Mutate must not initiate drawing, implement render event at component to animate  
      // _pose.cmpTransform.addEventListener(ƒ.EVENT.MUTATE, () => Base.viewport.draw());
      // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, () => Base.viewport.draw());
      let cmpAnimator: ƒ.ComponentAnimator = new ƒ.ComponentAnimator(_animation, _playmode);
      _pose.addComponent(cmpAnimator);
      cmpAnimator.addEventListener(ƒ.EVENT.COMPONENT_ACTIVATE, Animation.trackComponents);
      cmpAnimator.addEventListener(ƒ.EVENT.COMPONENT_DEACTIVATE, Animation.trackComponents);
      cmpAnimator.activate(true);

      return new Promise((resolve) => {
        cmpAnimator.addEventListener(
          _playmode == ƒ.ANIMATION_PLAYMODE.REVERSELOOP ? "animationStart" : "animationEnd",
          () => resolve()
        );
      });
    }

    private static trackComponents = (_event: Event): void => {
      let index: number = Animation.activeComponents.indexOf(<ƒ.ComponentAnimator>_event.target);

      if (_event.type == ƒ.EVENT.COMPONENT_DEACTIVATE && index > -1) {
        Animation.activeComponents.splice(index, 1);
        return;
      }

      if (index > -1)
        return;

      Animation.activeComponents.push(<ƒ.ComponentAnimator>_event.target);
      // console.log(Animation.activeComponents);
    }
  }
}