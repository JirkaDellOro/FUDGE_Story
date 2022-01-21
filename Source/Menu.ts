namespace FudgeStory {
  export class Menu {
    private dialog: HTMLDialogElement;
    private callback: (_option: string) => void;


    private constructor(_options: Object, _callback: (_option: string) => void, _cssClass?: string) {
      this.dialog = Menu.createDialog(_options, _cssClass);
      this.callback = _callback;
      //@ts-ignore
      this.dialog.show();
      this.dialog.addEventListener(EVENT.POINTERDOWN, this.hndSelect);
    }

    /**
     * Displays a modal dialog showing buttons with the texts given as values with the options-object to be selected by the user.
     * Use with `await` to receive the text the user selected while the dialog closes.
     * The class-parameter allows for specific styling with css.
     */
    public static async getInput(_options: Object, _cssClass?: string): Promise<string> {
      let dialog: HTMLDialogElement = Menu.createDialog(_options, _cssClass);
      //@ts-ignore
      dialog.showModal();
      dialog.addEventListener("cancel", (_event: Event) => {
        _event.preventDefault();
        _event.stopPropagation();
      });

      let promise: Promise<string> = new Promise<string>((_resolve) => {
        let hndSelect = (_event: Event) => {
          _event.stopPropagation();
          if (_event.target == dialog)
            return;

          dialog.removeEventListener(EVENT.POINTERDOWN, hndSelect);
          //@ts-ignore
          dialog.close();
          _resolve(Reflect.get(_event.target, "innerHTML"));
        };
        dialog.addEventListener(EVENT.POINTERDOWN, hndSelect);
      });

      return promise;
    }

    /**
     * Displays a non-modal dialog showing buttons with the texts given as values with the options-object to be selected by the user.
     * When the user uses a button, the given callback function is envolde with the key the selected text is associated with. The class-parameter allows for specific styling with css.
     * Returns a {@link Menu}-object. 
     */
    public static create(_options: Object, _callback: (_option: string) => void, _cssClass?: string): Menu {
      return new Menu(_options, _callback, _cssClass);
    }

    private static createDialog(_options: Object, _cssClass?: string): HTMLDialogElement {
      // let dialog: HTMLDialogElement = document.querySelector("dialog#menu");
      let dialog: HTMLDialogElement = document.createElement("dialog", {});
      console.log(dialog);
      dialog.classList.add(_cssClass);
      dialog.innerHTML = "";

      for (let option in _options) {
        let dom: HTMLButtonElement = document.createElement("button");
        dom.innerHTML += Reflect.get(_options, option);
        dom.id = option;
        dialog.appendChild(dom);
      }
      document.body.appendChild(dialog);
      return dialog;
    }

    public close(): void {
      this.dialog.removeEventListener(EVENT.POINTERDOWN, this.hndSelect);
      document.body.removeChild(this.dialog);
    }

    public open(): void {
      this.dialog.addEventListener(EVENT.POINTERDOWN, this.hndSelect);
      document.body.appendChild(this.dialog);
    }

    private hndSelect = (_event: Event) => {
      _event.stopPropagation();
      if (_event.target == this.dialog)
        return;

      if (this.callback)
        this.callback(Reflect.get(_event.target, "innerHTML"));
    }
  }
}