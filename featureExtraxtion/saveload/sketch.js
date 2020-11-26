let mobilenet;
let classifier;
let video;
let label = 'loading model';
let prob = '';
let videoOk = false;
let obj1Button;
let obj2Button;
let trainButton;
let saveButton;

function setup() {
    createCanvas(600, 400);
    video = createCapture(VIDEO, () => {
        console.log("video created")
        videoOk = true;
    })
    video.hide();
    mobilenet = ml5.featureExtractor('MobileNet', () => {
        console.log("Model ready !");
        classifier.load('/featureExtraxtion/saveload/model.json', () => {
            console.log("Custom Model ready !");
            label = 'model ready';
        });
    });
    classifier = mobilenet.classification(video, () => {
        console.log("video is ready")
        classifier.classify(video, gotresult);
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
        classifier.classify(video, gotresult);
    }
}
