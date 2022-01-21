namespace TestTransition {
  console.log("Hallo");
  let cvsTransition: HTMLCanvasElement;
  let crcTransition: CanvasRenderingContext2D;
  let dataTransition: Uint8ClampedArray;
  let crcDestination: CanvasRenderingContext2D;
  let crcSource: CanvasRenderingContext2D;
  let crcResult: CanvasRenderingContext2D;
  let images: NodeListOf<HTMLImageElement>;
  window.addEventListener("load", init);

  function init(_event: Event): void {
    images = document.querySelectorAll("img");

    cvsTransition = <HTMLCanvasElement>document.querySelector("canvas#Transition");
    crcTransition = (<HTMLCanvasElement>document.querySelector("canvas#Transition")).getContext("2d");

    crcDestination = (<HTMLCanvasElement>document.querySelector("canvas#Destination")).getContext("2d");
    crcDestination.drawImage(images[0], 0, 0);
    crcSource = (<HTMLCanvasElement>document.querySelector("canvas#Source")).getContext("2d");
    crcSource.drawImage(images[2], 0, 0);

    crcResult = (<HTMLCanvasElement>document.querySelector("canvas#Result")).getContext("2d");

    document.querySelector("input[type=number]").addEventListener("input", mix);
    document.querySelector("input[type=range]").addEventListener("input", mix);
    document.querySelector("input[type=file]").addEventListener("change", hndFile);

    images[1].addEventListener("load", setTransition);
    setTransition();
  }

  function setTransition(): void {
    crcTransition.imageSmoothingEnabled = false;
    crcTransition.drawImage(images[1], 0, 0, images[1].width, images[1].height, 0, 0, 1280, 720);
    dataTransition = crcTransition.getImageData(0, 0, 1280, 720).data;
    mix();
  }

  async function hndFile(_event: InputEvent): Promise<void> {
    let filename: string = (<HTMLInputElement>_event.target).value;
    filename = filename.split("\\").pop();
    console.log(filename);
    images[1].src = filename;
  }

  async function mix(): Promise<void> {
    let stepper: HTMLInputElement = <HTMLInputElement>document.querySelector("input[type=number]");
    let scale = Math.pow(16, parseFloat(stepper.value) * 2) - 1;
    let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input[type=range]");
    let value = parseFloat(slider.value) * (scale + 1) - scale * 255;

    console.log(scale, value);

    crcResult.drawImage(crcDestination.canvas, 0, 0);

    let imageData: ImageData = crcSource.getImageData(0, 0, 1280, 720);
    for (let index = 0; index < dataTransition.length; index += 4) {
      let alpha: number = dataTransition[index];
      imageData.data[index + 3] = alpha * scale + value;
    }

    let source: ImageBitmap = await createImageBitmap(imageData);
    crcResult.drawImage(source, 0, 0);
  }
}