let classifiermobilenet;
let video;
let label = '';
let prob = '';
let videoOk = false;

function setup() {
    createCanvas(600, 400);
    background(0);
    label = "Loading . . .";
    video = createCapture(VIDEO, () => {
        console.log("video created")
        videoOk = true;
    })
    video.hide();
    classifiermobilenet = ml5.imageClassifier('MobileNet', () => {
        console.log("Model ready !");
        classifiermobilenet.predict(video, gotresult);
    });
}

function draw() {
    image(video, 0, 0) // draw the video on the canvas
    fill(255)
    textSize(32)
    text(label, 10, height - 20)
}

function gotresult(error, result) {
    if (error) {
        console.error(error)
    }
    //console.log(result);
    label = result[0].label;
    prob = result[0].confidence;
    if (videoOk === true) {
        classifiermobilenet.predict(video, gotresult);
    }
}
