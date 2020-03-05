const URL = "http://localhost:3000";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "/model";
    const metadataURL = URL + "/metadata";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(500, 500, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    prediction[0].className = "Safe";
    prediction[1].className = "Unsafe";
    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //     prediction[i].className + ": " + prediction[i].probability.toFixed(2) * 100 + "%";
    //     labelContainer.childNodes[i].innerHTML = classPrediction;
    // }

    labelContainer.childNodes[0].innerHTML = "<h5 class='safe'>" + prediction[0].className + ":</h5>" + prediction[0].probability.toFixed(2) * 100 + "%";
    labelContainer.childNodes[1].innerHTML = "<h5 class='unsafe'>" + prediction[1].className + ":</h5>" + prediction[1].probability.toFixed(2) * 100 + "%";
}