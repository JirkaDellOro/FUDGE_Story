namespace FudgeStory {

  /**
   * Displays a longer narrative text to convey larger parts of the story not told by a character
   */
  export class Text extends HTMLDialogElement {
    private static get dialog(): HTMLDialogElement {
      return <HTMLDialogElement>document.querySelector("dialog[type=text]");
    }

    /**
     * Prints the text in a modal dialog stylable with css
     */
    public static async print(_text: string): Promise<void> {
      let dialog: HTMLDialogElement = Text.dialog;
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
     * sets the classname of the dialog to enable specific styling
     */
    public static setClass(_class: string): void {
      Text.dialog.className = _class;
    }

    /**
     * adds a classname to the classlist of the dialog to enable cascading styles
     */
    public static addClass(_class: string): void {
      Text.dialog.classList.add(_class);
    }

    /**
     * closes the text-dialog
     */
    public static close(): void {
      Text.dialog.close();
    }
  }
}