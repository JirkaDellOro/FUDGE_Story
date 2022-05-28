namespace Tutorial_SS22 {
  export async function GoodEnding(): ƒS.SceneReturn {
    console.log("GOOD ENDING");

    let text = {
      Aisaka: {
        T0000: "GUTES ENDE"
      }
    };


    await ƒS.Speech.tell(characters.aisaka, text.Aisaka.T0000);


    // Since you defined a next-scene in the scene hierarchy a return will not be needed
    // return "GameOver";



  }
}