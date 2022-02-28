namespace FudgeStory {
  // import ƒ = FudgeCore;

  /**
   * Define an item to use with the inventory using this pattern:
   * ```text
   * {
   *    name: "Name of the item", // also used to identify it,
   *    description: "Short description to show in the inventory",
   *    image: "path to the image to be used as icon",
   *    static: true // if the item can't be consumed
   * }
   * ```
   */
  export interface ItemDefinition {
    name: string;
    description: string;
    image: RequestInfo;
    static?: boolean;
    handler?: (_event: CustomEvent) => void;
  }

  /**
   * Manages the inventory
   */
  //@ts-ignore
  export class Inventory extends (HTMLDialogElement) {
    private static ƒDialog: HTMLDialogElement;
    private static ƒused: string[];

    private static get dialog(): HTMLDialogElement {
      if (Inventory.ƒDialog)
        return Inventory.ƒDialog;

      Inventory.ƒDialog = <HTMLDialogElement>document.querySelector("dialog[type=inventory]");
      return Inventory.ƒDialog;
    }

    /**
     * Adds an item to the inventory
     */
    static add(_item: ItemDefinition): void {
      let item: HTMLLIElement = Inventory.getItemElement(_item);
      if (item) {
        let amount: HTMLElement = item.querySelector("amount");
        amount.innerText = (parseInt(amount.innerText) + 1).toString();
        return;
      }
      item = document.createElement("li");
      item.id = Inventory.replaceWhitespace(_item.name);
      item.innerHTML = `<name>${_item.name}</name><amount>1</amount><description>${_item.description}</description><img src="${_item.image}"/>`;
      if (!_item.static)
        item.addEventListener("pointerdown", Inventory.hndUseItem);
      if (_item.handler) {
        function custom(_event: PointerEvent): void {
          _item.handler(new CustomEvent(_event.type, { detail: _item.name }));
        }
        item.addEventListener("pointerup", custom);
        item.addEventListener("pointerdown", custom);
      }
      Inventory.dialog.querySelector("ul").appendChild(item);
    }

    /**
     * Retrieves the number of items specified by the parameter currently available in the inventory 
     */
    static getAmount(_item: ItemDefinition): number {
      let item: HTMLLIElement = Inventory.getItemElement(_item);
      if (item)
        return parseInt((<HTMLElement>item.querySelector("amount")).innerText);
      return 0;
    }

    /**
     * Opens the inventory and return a list of the names of consumed items when the inventory closes again
     */
    public static async open(): Promise<string[]> {
      let dialog: HTMLDialogElement = Inventory.dialog;
      //@ts-ignore
      dialog.showModal();
      Inventory.ƒused = [];

      return new Promise((_resolve) => {
        let hndClose = (_event: Event) => {
          dialog.querySelector("button").removeEventListener(EVENT.POINTERDOWN, hndClose);
          //@ts-ignore
          dialog.close();
          _resolve(Inventory.ƒused);
        };
        dialog.querySelector("button").addEventListener(EVENT.POINTERDOWN, hndClose);
      });
    }

    /**
     * Closes the inventory
     */
    public static close(): void {
      //@ts-ignore
      Inventory.dialog.close();
    }

    private static hndUseItem = (_event: PointerEvent): void => {
      _event.stopPropagation();
      let item: HTMLLIElement = <HTMLLIElement>_event.currentTarget;
      Inventory.ƒused.push(item.querySelector("name").textContent);

      let amount: HTMLElement = item.querySelector("amount");
      amount.innerText = (parseInt(amount.innerText) - 1).toString();
      if (amount.innerText == "0")
        Inventory.dialog.querySelector("ul").removeChild(item);
    }

    private static replaceWhitespace(_text: string): string {
      return _text.replaceAll(" ", "_");
    }

    private static getItemElement(_item: ItemDefinition): HTMLLIElement {
      return Inventory.dialog.querySelector(`[id=${Inventory.replaceWhitespace(_item.name)}]`);
    }
  }
}