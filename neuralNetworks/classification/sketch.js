let model;
let targetLabel = 'C';
let state = 'collection';

function setup() {
    createCanvas(600, 600)
    let options = {
        inputs: ['x', 'y'],
        outputs: ['label'],
        task: 'classification',
        debug: true,
        learningRate: 0.5
    }

    model = ml5.neuralNetwork(options);
    model.loadData('./mouse-data.json', dataLoaded);
    const modelInfo = {
        model: './models/mouse-model.json',
        metadata: './models/mouse-model_meta.json',
        weights: './models/mouse-model.weights.bin'
    };
    model.load('./models/model.json', () => {
        state = 'prediction'
    });
    background(225);
}

function dataLoaded() {
    let data = model.neuralNetworkData.data.raw;
    //console.log(data);
    data.forEach(element => {
        let input = element.xs;
        let target = element.ys;
        stroke(0);
        noFill();
        ellipse(input.x, input.y, 24);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(target.label, input.x, input.y);
    });
    //train()
}

function train() {
    state = 'training'
    console.log("training Started");
    model.normalizeData();

    let options = {
        epochs: 100
    }
    model.train(options, whileTraining, finishedTraining)
}

function keyPressed() {
    if (key == 't') {
        train()
    }
    else if (key == 's') {
        model.saveData('mouse-data');
    }
    else if (key == 'm') {
        model.save();
    }
    else {
        targetLabel = key.toUpperCase();
    }
}

function whileTraining(epoch, loss) {
    console.log(epoch);
}

function finishedTraining(epoch, loss) {
    state = 'prediction'
    console.log("finished training");
}

function mousePressed() {

    let inputs = {
        x: mouseX,
        y: mouseY
    }

    if (state == 'collection') {
        let target = {
            label: targetLabel
        }
        model.addData(inputs, target);


        stroke(0);
        noFill();
        ellipse(mouseX, mouseY, 24);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(targetLabel, mouseX, mouseY);
    }
    else if (state == 'prediction') {
        model.classify(inputs, gotResults);
    }
}


function gotResults(error, result) {
    if (error) {
        console.error(error)
        return;
    }
    else {
        console.log(result);
        stroke(0);
        fill(0, 0, 255, 100);
        ellipse(mouseX, mouseY, 24);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(result[0].label, mouseX, mouseY);
    }
}