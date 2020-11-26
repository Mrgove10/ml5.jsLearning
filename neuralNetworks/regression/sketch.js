let model;
let targetLabel = 'C';
let state = 'collection';

let notes = {
    H: 261.6256,
    C: 293.6648,
    R: 329.6276,
    U: 349.2282,
    B: 391.9954,
    P: 440.0000
}


function setup() {
    createCanvas(600, 600)
    let options = {
        inputs: ['x', 'y'],
        outputs: ['frequency'],
        task: 'regression',
        debug: true,
        learningRate: 0.5
    }

    model = ml5.neuralNetwork(options);
    model.loadData('./mouse-data-regression.json', dataLoaded);
    background(225);
}

function dataLoaded() {
    let data = model.neuralNetworkData.data.raw;
    console.log(data);
    data.forEach(element => {
        let input = element.xs;
        let target = element.ys;
        stroke(0);
        noFill();
        ellipse(input.x, input.y, 24);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(Math.floor(target.frequency), input.x, input.y);
    });
    train()
}

function train() {
    state = 'training'
    console.log("training Started");
    model.normalizeData();

    let options = {
        epochs: 50
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
        let targetFrequency = notes[targetLabel]
        let target = {
            frequency: targetFrequency
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
        model.predict(inputs, gotResults);
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
        text(Math.floor(result[0].frequency), mouseX, mouseY);
    }
}