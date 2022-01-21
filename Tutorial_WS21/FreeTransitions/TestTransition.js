var TestTransition;
(function (TestTransition) {
    console.log("Hallo");
    let cvsTransition;
    let crcTransition;
    let dataTransition;
    let crcDestination;
    let crcSource;
    let crcResult;
    let images;
    window.addEventListener("load", init);
    function init(_event) {
        images = document.querySelectorAll("img");
        cvsTransition = document.querySelector("canvas#Transition");
        crcTransition = document.querySelector("canvas#Transition").getContext("2d");
        crcDestination = document.querySelector("canvas#Destination").getContext("2d");
        crcDestination.drawImage(images[0], 0, 0);
        crcSource = document.querySelector("canvas#Source").getContext("2d");
        crcSource.drawImage(images[2], 0, 0);
        crcResult = document.querySelector("canvas#Result").getContext("2d");
        document.querySelector("input[type=number]").addEventListener("input", mix);
        document.querySelector("input[type=range]").addEventListener("input", mix);
        document.querySelector("input[type=file]").addEventListener("change", hndFile);
        images[1].addEventListener("load", setTransition);
        setTransition();
    }
    function setTransition() {
        crcTransition.imageSmoothingEnabled = false;
        crcTransition.drawImage(images[1], 0, 0, images[1].width, images[1].height, 0, 0, 1280, 720);
        dataTransition = crcTransition.getImageData(0, 0, 1280, 720).data;
        mix();
    }
    async function hndFile(_event) {
        let filename = _event.target.value;
        filename = filename.split("\\").pop();
        console.log(filename);
        images[1].src = filename;
    }
    async function mix() {
        let stepper = document.querySelector("input[type=number]");
        let scale = Math.pow(16, parseFloat(stepper.value) * 2) - 1;
        let slider = document.querySelector("input[type=range]");
        let value = parseFloat(slider.value) * (scale + 1) - scale * 255;
        console.log(scale, value);
        crcResult.drawImage(crcDestination.canvas, 0, 0);
        let imageData = crcSource.getImageData(0, 0, 1280, 720);
        for (let index = 0; index < dataTransition.length; index += 4) {
            let alpha = dataTransition[index];
            imageData.data[index + 3] = alpha * scale + value;
        }
        let source = await createImageBitmap(imageData);
        crcResult.drawImage(source, 0, 0);
    }
})(TestTransition || (TestTransition = {}));
