let img;
let detector;

function preload() {
    img = loadImage('img/catAndDog.bmp');
    detector = ml5.objectDetector('cocossd');
}

function setup() {
    createCanvas(640, 480);
    console.log(detector);
    image(img, 0, 0);
    detector.detect(img, gotdetector)
}

function gotdetector(error, result) {
    if (error) {
        console.error(error)
    }
    result.forEach(element => {
        console.log(element);
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