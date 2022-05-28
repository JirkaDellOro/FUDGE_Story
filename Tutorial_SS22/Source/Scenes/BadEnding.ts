namespace Tutorial_SS22 {
  export async function BadEnding(): ƒS.SceneReturn {
    console.log("BAD ENDING");

    let text = {

      Aisaka: {
        T0000: "BAD ENDIIIING"
      }
    };



    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);



  }
}