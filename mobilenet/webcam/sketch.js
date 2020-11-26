let classifiermobilenet;
let video;
let label = '';
let prob = '';
function modelReady() {
    console.log("Model ready !");
    classifiermobilenet.predict(video, gotresult);
}
function gotresult(error, result) {
    if (error) {
        console.error(error)
    }
    else {
        //console.log(result);
        label = result[0].label;
        prob = result[0].confidence;
        classifiermobilenet.predict(video, gotresult);
    }
}
function setup() {
    createCanvas(600, 400);
    background(0);
    console.log('ml5 version:', ml5.version);
    classifiermobilenet = ml5.imageClassifier('MobileNet', modelReady);
    label = "Loading . . .";
    video = createCapture(VIDEO)
    video.hide();
}

function draw() {
    image(video, 0, 0) // draw the video on the canvas
    fill(255)
    textSize(32)
    text(label, 10, height - 20)
}