let video;
let detector;
let detections = [];
let videoReady = false;
let modelReady = false;
let height = 720;
let width = 480;

function preload() {
    // img = loadImage('https://raw.githubusercontent.com/commaai/comma10k/master/imgs/0006_0c5c849415c7dba2_2018-08-12--10-26-26_5_1159.png');
    // img = loadImage('https://raw.githubusercontent.com/matterport/Mask_RCNN/master/images/12283150_12d37e6389_z.jpg');
    // img = loadImage('C:\Users\richa\Downloads\0002201705192\0002-20170519-2.mp4')
    detector = ml5.objectDetector('cocossd', () => {
        modelReady = true;
        console.log('model ready !');
    });
    video = createVideo('./drive_Trim_480.mp4', () => {
        videoReady = true;
        console.log('video ready !');
    });
}

function setup() {
    createCanvas(height, width);
    video.size(height, width)
    video.hide();
}

function draw() {
    image(video, 0, 0);
    if (videoReady && modelReady) {
        detector.detect(video, gotdetector)
        detections.forEach(element => {
            // console.log(element);
            stroke(0, 255, 0);
            strokeWeight(4);
            noFill();
            rect(element.x, element.y, element.width, element.height);
            noStroke();
            fill(255);
            textSize(24);
            text(element.label, element.x + 10, element.y + 24);
        });
    }
}

function mousePressed() {
    video.loop();
}

function gotdetector(error, result) {
    if (error) {
        console.error(error)
    }
    // console.log(result);
    detections = result;
}