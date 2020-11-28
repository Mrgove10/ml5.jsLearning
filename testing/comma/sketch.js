let img;
let detector;
let a = 640 * 1.5;
let b = 480 * 1.5;

function preload() {
    img = loadImage('https://raw.githubusercontent.com/commaai/comma10k/master/imgs/0006_0c5c849415c7dba2_2018-08-12--10-26-26_5_1159.png');
    detector = ml5.objectDetector('cocossd');
}

function setup() {
    createCanvas(img.width, img.height);
    let canvasImage = image(img, 0, 0);

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