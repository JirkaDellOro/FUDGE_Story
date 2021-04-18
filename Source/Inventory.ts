namespace FudgeStory {
  // import ƒ = FudgeCore;

  export interface ItemDefinition {
    name: string;
    description: string;
    image: RequestInfo;
  }

  /**
   * Manages the inventory
   */
  export class Inventory extends HTMLDialogElement {
    private static ƒDialog: HTMLDialogElement;
    private static ƒused: string[];

    private static get dialog(): HTMLDialogElement {
      if (Inventory.ƒDialog)
        return Inventory.ƒDialog;

      Inventory.ƒDialog = <HTMLDialogElement>document.querySelector("dialog[type=inventory]");
      return Inventory.ƒDialog;
    }

    static add(_item: ItemDefinition): void {
      let item: HTMLLIElement = Inventory.dialog.querySelector(`[id=${_item.name}]`);
      if (item) {
        let amount: HTMLElement = item.querySelector("amount");
        amount.innerText = (parseInt(amount.innerText) + 1).toString();
        return;
      }
      item = document.createElement("li");
      item.id = _item.name;
      item.innerHTML = `<name>${_item.name}</name><amount>1</amount><description>${_item.description}</description><img src="${_item.image}"/>`;
      item.addEventListener("pointerdown", Inventory.hndUseItem);
      Inventory.dialog.querySelector("ul").appendChild(item);
    }

    /**
     * opens the inventory
     */
    public static async open(): Promise<string[]> {
      let dialog: HTMLDialogElement = Inventory.dialog;
      dialog.showModal();
      Inventory.ƒused = [];

      return new Promise((_resolve) => {
        let hndClose = (_event: Event) => {
          dialog.querySelector("button").removeEventListener(EVENT.POINTERDOWN, hndClose);
          dialog.close();
          _resolve(Inventory.ƒused);
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

    private static hndUseItem = (_event: PointerEvent): void => {
      let item: HTMLLIElement = <HTMLLIElement>_event.currentTarget;
      Inventory.ƒused.push(item.querySelector("name").textContent);

      let amount: HTMLElement = item.querySelector("amount");
      amount.innerText = (parseInt(amount.innerText) - 1).toString();
      if (amount.innerText == "0")
        Inventory.dialog.querySelector("ul").removeChild(item);
    }
  }
}