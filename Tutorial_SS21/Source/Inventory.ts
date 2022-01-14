namespace Tutorial {
  export async function Inventory(): ƒS.SceneReturn {
    console.log("Inventory");

    let text = {
      Narrator: {
        T0000: "",
        T0001: ""
      },
      Protagonist: {
        T0000: "",
        T0001: ""
      },
      Ryu: {
        T0000: "Willkommen.",
        T0001: ""
      }
    };


    
    document.getElementsByName("scoreRyu").forEach(meterStuff => meterStuff.hidden = true);
    document.getElementsByName("scoreForRyu").forEach(meterStuff => meterStuff.hidden = true);

    ƒS.Speech.hide();

    await ƒS.Location.show(locations.city);
    await ƒS.update(transition.clock.duration, transition.clock.alpha, transition.clock.edge);

    // ƒS.Inventory.add(items.Toy);
    // ƒS.Inventory.add(items.Toy);
    // ƒS.Inventory.add(items.Toy);
    // ƒS.Inventory.add(items.Toy);
    ƒS.Inventory.add(items.BlobBU);
    ƒS.Inventory.add(items.BlobRED);
    ƒS.Inventory.add(items.BlobGN);
    ƒS.Inventory.add(items.BlobDKBU);
    ƒS.Inventory.add(items.BlobYL);
    ƒS.Inventory.add(items.BlobPK);
    ƒS.Inventory.add(items.BlobOG);



    // console.log(await ƒS.Inventory.open());

    await ƒS.Inventory.open();
    // ƒS.Inventory.close();
  



    ƒS.Speech.hide();
    // await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positions.bottomcenter);
    await ƒS.Character.show(characters.Ryu, characters.Ryu.pose.normal, ƒS.positionPercent(30, 100));
    await ƒS.update(1);
    ƒS.Speech.show();
    await ƒS.Speech.tell(characters.Ryu, text.Ryu.T0000);
    await ƒS.Speech.tell(characters.Ryu, "Fremder.");
    await ƒS.Character.hide(characters.Ryu);
    await ƒS.update(1);








  }

}

