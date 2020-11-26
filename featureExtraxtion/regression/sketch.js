let mobilenet;
let predictor;
let video;
let value = '';
let prob = '';
let videoOk = false;
let slider;
let trainButton;
let addButton;

function setup() {
    createCanvas(600, 400);
    video = createCapture(VIDEO, () => {
        console.log("video created")
        videoOk = true;
    })
    video.hide();
    mobilenet = ml5.featureExtractor('MobileNet', () => {
        console.log("Model ready !");
    });
    predictor = mobilenet.regression(video, () => {
        console.log("video is ready")
    });

    slider = createSlider(0, 1, 0.5, 0.01)

    addButton = createButton('add example image');
    addButton.mousePressed(() => {
        predictor.addImage(slider.value())
    })

    trainButton = createButton('trainsmodel');
    trainButton.mousePressed(() => {
        predictor.train(whiletraining);
    })
}

function draw() {
    image(video, 0, 0) // draw the video on the canvas

    rectMode(CENTER)
    fill(255, 0, 200)
    rect(value * width, height / 2, 50, 50)

    fill(255)
    textSize(32)
    text(value, 10, height - 20)
}

function gotresult(error, result) {
    if (error) {
        console.error(error)
    }
    console.log(result);
    value = result.value;
    if (videoOk === true) {
        predictor.predict(video, gotresult);
    }
}

function whiletraining(loss) {
    // loss = "error" 
    if (loss === null) {
        console.log("training complete");
        predictor.predict(gotresult);
    }
    else {
        console.log(loss);
    }
}
