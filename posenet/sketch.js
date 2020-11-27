let video;
let videoReady = false;
let posenet;
let pose;
let skeleton;
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
    posenet.on('pose', gotPoses)
}

function draw() {
    image(video, 0, 0);

    if (pose) {

        pose.keypoints.forEach(element => {
            fill(0, 255, 0)
            ellipse(element.position.x, element.position.y, 10)
        });

        skeleton.forEach(element => {
            let a = element[0].position;
            let b = element[1].position;
            strokeWeight(3);
            stroke(255);
            line(a.x, a.y, b.x, b.y);
            noStroke()
        });
    }
}


function gotPoses(poses) {
    //  console.log(poses)
    if (poses.length > 0) {
        // we got at least one pose
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}