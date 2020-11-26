let video;
let videoOk = false;
let features;
function setup() {
    createCanvas(600, 400);
    video = createCapture(VIDEO, () => {
        console.log("video created")
        videoOk = true;
    })
    video.hide();
    features = ml5.featureExtractor('MobileNet', () => {
        console.log("Model ready !");
    });
}

function draw() {
    image(video, 0, 0) // draw the video on the canvas
}

function mousePressed() {
    const logits = features.infer(video);
    // logits.print();
    // console.log(logits.dataSync())
}