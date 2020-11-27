let video;
let videoSize = 10;
let ready = false;
let label = '';
let labelp;
let pixelBrain;

function setup() {
    createCanvas(450, 450);
    video = createCapture(VIDEO, () => {
        ready = true;
    });
    video.size(videoSize, videoSize);
    video.hide();

    let options = {
        inputs: videoSize * videoSize * 3,
        outputs: 2,
        task: 'classification',
        debug: true
    }
    pixelBrain = ml5.neuralNetwork(options);
    pixelBrain.loadData('data.json', () => {
        pixelBrain.train({
            epochs: 50
        }, () => {
            console.log('training complete');
            classifyVideo();
        });
    });
    labelp = createP(label);
}

function keyPressed() {
    if (key == 't') {
        pixelBrain.train({
            epochs: 50
        }, () => {
            console.log('training complete');
            classifyVideo();
        });
    }
    else if (key == 's') {
        pixelBrain.saveData();
    }
    else {
        addExample(key);
    }
}

function classifyVideo() {
    let inputs = []
    video.loadPixels();
    //could use the filter function instead
    for (let o = 0; o < video.pixels.length; o += 4) {
        //manual data normalization
        let r = video.pixels[o + 0] / 255;
        let g = video.pixels[o + 1] / 255;
        let b = video.pixels[o + 2] / 255;
        inputs.push(r, g, b);
    }
    pixelBrain.classify(inputs, (error, result) => {
        if (error) {
            console.error(error);
        }
        else {
            let l = result[0].label;
            if (l === 'n') {
                label = 'not in frame'
            }
            if (l === 'h') {
                label = 'in frame'
            }
            labelp.html(label);
            classifyVideo();
        }
    });
}

function addExample(label) {
    let inputs = []
    video.loadPixels();
    //could use the filter function instead
    for (let o = 0; o < video.pixels.length; o += 4) {
        //manual data normalization
        let r = video.pixels[o + 0] / 255;
        let g = video.pixels[o + 1] / 255;
        let b = video.pixels[o + 2] / 255;
        inputs.push(r, g, b);
    }
    let target = [label];
    pixelBrain.addData(inputs, target);
    console.log(inputs);
    console.log(target);
}

function draw() {
    background(0);
    if (ready) {
        // Render the low-res image
        let w = width / videoSize;
        video.loadPixels();
        for (let x = 0; x < video.width; x++) {
            for (let y = 0; y < video.height; y++) {
                let index = (x + y * video.width) * 4;
                let r = video.pixels[index + 0];
                let g = video.pixels[index + 1];
                let b = video.pixels[index + 2];
                noStroke();
                fill(r, g, b);
                rect(x * w, y * w, w, w);
            }
        }
    }
}