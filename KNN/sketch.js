let video;
let videoOk = false;
let features;
let knn;
let labels;
let ready = false;

function setup() {
    createCanvas(600, 400);
    video = createCapture(VIDEO, () => {
        console.log("video created")
        videoOk = true;
    })
    video.hide();
    features = ml5.featureExtractor('MobileNet', () => {
        console.log("Model ready !");
        knn = ml5.KNNClassifier();
        knn.load('model.json', () => {
            console.log("knn data loaded");
            classify();
        });
    });
    createP("press key r for training right hand up");
    createP("press key l for training left hand up");
    createP("press key u for training no hand");
    createP("press key s to save the model");
    labels = createP("need trainig data");
}

function draw() {
    image(video, 0, 0) // draw the video on the canvas
    if (videoOk && !ready && knn != undefined && knn.getNumLabels() > 0) {
        classify();
        ready = true;
    }
}

function classify() {
    const logits = features.infer(video);

    knn.classify(logits, (error, result) => {
        if (error) {
            console.error(error);
        }
        else {
            // console.log(result);
            labels.html(result.label);
            classify();
        }
    });
}

function keyPressed() {
    const logits = features.infer(video);

    if (key === "l") {
        knn.addExample(logits, "left");
        console.log("left");
    }
    if (key === "r") {
        knn.addExample(logits, "right");
        console.log("right");
    }
    if (key === "u") {
        knn.addExample(logits, "up");
        console.log("up");
    }
    if (key === "s") {
        knn.save("model.json");
    }
    // logits.print();
    // console.log(logits.dataSync())
}