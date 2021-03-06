let video;
let detector;
let detections = [];
let videoOk = false;
function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO, () => {
        console.log("video created")
        videoOk = true;
    })
    video.size(640, 480)
    video.hide()
    detector = ml5.objectDetector('cocossd', () => {
        console.log('cocossd loaded');
    });
}

function draw() {
    image(video, 0, 0);

    detections.forEach(element => {
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(element.x, element.y, element.width, element.height);
        noStroke();
        fill(255);
        textSize(24);
        text(element.label, element.x + 10, element.y + 24);
    });
    if (videoOk) {
        detector.detect(video, gotdetector)
    }
}

function gotdetector(error, result) {
    if (error) {
        console.error(error)
    }
    detections = result;
}
