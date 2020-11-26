let classifiermobilenet;
let puffin;

function modelReady() {
    console.log("Model ready !");
    classifiermobilenet.predict(puffin, (error, result) => {
        if (error) {
            console.error(error)
        }
        else {
            console.log(result);
            let label = result[0].label;
            let prob = result[0].confidence;
            fill(0)
            textSize(64)
            text(label, 10, height - 50)
            createP(label);
            createP(prob);
        }
    });
}

function setup() {
    createCanvas(600, 400);
    background(150);
    console.log('ml5 version:', ml5.version);
    puffin = createImg('images/toucan.bmp', () => {
        image(puffin, 0, 0, width, height); //width and height of the canvas
    });
    puffin.hide();
    classifiermobilenet = ml5.imageClassifier('MobileNet', modelReady);
}
