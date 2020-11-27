let video;
let videoReady = false;
let posenet;
let pose;
let skeleton;

let brain;
let state = 'waiting';
let targetLabel;

let showTarget = 'Y';

function setup() {
    createCanvas(640, 480);
    background(0);
    video = createCapture(VIDEO, () => {
        videoReady = true;
    })
    video.hide()

    posenet = ml5.poseNet(video, () => {
        console.log('model loaded')
    });
    posenet.on('pose', gotPoses);

    let options = {
        inputs: 34,
        outputs: 4,
        task: 'classification',
        debug: true
    }
    brain = ml5.neuralNetwork(options);
    brain.load("./models/model.json", () => {
        console.log('model ready');
        classifyPoose();
    });
    /* brain.loadData('ymca-data.json', () => {
         brain.normalizeData();
         brain.train({ epochs: 50 }, () => {
             console.log('model trained');
             brain.save();
         });
     });*/
}

function classifyPoose() {
    if (pose) {
        let inputs = [];
        pose.keypoints.forEach(element => {
            inputs.push(element.position.x);
            inputs.push(element.position.y);
        });
        brain.classify(inputs, gotResults)
    }
    else {
        setTimeout(classifyPoose, 100);
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    // console.log(results);
    console.log(results[0].confidence);
    showTarget = results[0].label.toUpperCase();
    classifyPoose();
}

function draw() {
    image(video, 0, 0);

    if (pose) {
        pose.keypoints.forEach(element => {
            fill(0, 255, 0)
            ellipse(element.position.x, element.position.y, 10)

            skeleton.forEach(element => {
                let a = element[0].position;
                let b = element[1].position;
                strokeWeight(3);
                stroke(255);
                line(a.x, a.y, b.x, b.y);
                noStroke()
            });
        });
    }

    fill(255, 0, 255);
    noStroke();
    textSize(255)
    textAlign(CENTER, CENTER);
    text(showTarget, width / 2, height / 2)
}

function gotPoses(poses) {
    //  console.log(poses)
    if (poses.length > 0) {
        // we got at least one pose
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}