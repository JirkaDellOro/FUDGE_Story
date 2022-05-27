namespace Tutorial_SS22 {
  export async function EndingOne(): ƒS.SceneReturn {
    console.log("GOOD ENDING");

    let text = {
      Aisaka: {
        T0000: "GUTES ENDING"
      }
    };


    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);





  }
}