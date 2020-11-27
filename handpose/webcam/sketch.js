let video;
let videoReady = false;

let brain;
let prediction;

function setup() {
    createCanvas(640, 480);
    background(0);
    video = createCapture(VIDEO, () => {
        videoReady = true;
    })
    video.hide()

    brain = ml5.handpose(video, () => {
        console.log('model loaded');
    })

    brain.on('predict', predict)
}

function predict(result) {
    prediction = result;
 //   console.log(result);
}

function draw() {
    image(video, 0, 0);

    if (prediction) {
        prediction.forEach(p => {
            p.landmarks.forEach(l => {
                fill(0, 255, 0)
                ellipse(l[0], l[1], 10)
            })
        });
    }
}
