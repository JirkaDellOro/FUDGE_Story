namespace FudgeStory {

  /**
   * Manages the inventory
   */
  export class Inventory extends HTMLDialogElement {
    private static get dialog(): HTMLDialogElement {
      return <HTMLDialogElement>document.querySelector("dialog[type=inventory]");
    }

    public static async print(_text: string): Promise<void> {
      let dialog: HTMLDialogElement = Inventory.dialog;
      dialog.close();
      dialog.innerHTML = _text;
      dialog.showModal();

      return new Promise((_resolve) => {
        let hndSelect = (_event: Event) => {
          if (_event.target != dialog)
            return;

          dialog.removeEventListener(EVENT.POINTERDOWN, hndSelect);
          dialog.close();
          _resolve();
        };
        dialog.addEventListener(EVENT.POINTERDOWN, hndSelect);
      });
    }

    /**
     * opens the inventory
     */
     public static async open(): Promise<string[]> {
      let dialog: HTMLDialogElement = Inventory.dialog;
      dialog.showModal();

      return new Promise((_resolve) => {
        let hndClose = (_event: Event) => {
          dialog.querySelector("button").removeEventListener(EVENT.POINTERDOWN, hndClose);
          dialog.close();
          _resolve(["Hallo"]);
        };
        dialog.querySelector("button").addEventListener(EVENT.POINTERDOWN, hndClose);
      });
    }
    /**
     * closes the inventory
     */
    public static close(): void {
      Inventory.dialog.close();
    } 
  }
}