let video;
let videoReady = false;

function setup() {
    createCanvas(640, 480);
    background(0);
    video = createCapture(VIDEO, () => {
        videoReady = true;
    })
    video.hide()
}

function draw() {
    image(video, 0, 0);
}