let mobilenet;
let classifier;
let video;
let label = '';
let prob = '';
let videoOk = false;
let obj1Button;
let obj2Button;
let trainButton;

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
    classifier = mobilenet.classification(video, () => {
        console.log("video is ready")
    });

    obj1Button = createButton('add obj1');
    obj1Button.mousePressed(() => {
        classifier.addImage('obj1');
    })

    obj2Button = createButton('add obj2');
    obj2Button.mousePressed(() => {
        classifier.addImage('obj2');
    })

    trainButton = createButton('trainsmodel');
    trainButton.mousePressed(() => {
        classifier.train(whiletraining);
    })
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
     console.log(result);
    label = result[0].label;
    prob = result[0].confidence;
    if (videoOk === true) {
        classifier.classify(video, gotresult);
    }
}

function whiletraining(loss) {
    // loss = "error" 
    if (loss === null) {
        console.log("training complete");
        classifier.classify(gotresult);
    }
    else {
        console.log(loss);
    }
}
