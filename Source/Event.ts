namespace FudgeStory {
  export enum EVENT {
    KEYDOWN = "keydown",
    KEYUP = "keyup",
    POINTERDOWN = "pointerdown",
    POINTERUP = "pointerup"
  }

  export type Signal = () => Promise<Event>;

  export class Input {
    /**
     * Wait for the viewers input. See [[EVENT]] for predefined events to wait for.
     */
    public static async getInput(_eventTypes: string[]): Promise<Event> {
      return new Promise((resolve) => {
        let hndEvent = (_event: Event): void => {
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
  }
}   