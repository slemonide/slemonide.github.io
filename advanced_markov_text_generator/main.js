/*
   This model uses two previous words to determine the next word instead of just one word
 */

var markovMatrix = {};
var firstWordGenerated = false;
var prevWord;

var pause = true;

function collectData(words) {
    for (let i = 0; i < words.length; i++) {
        if (words[i] !== "") {
            if (i < words.length - 2) {
                var key = words[i] + " " + words[i + 1];
                var val = words[i + 2];

                if (!markovMatrix[key]) {
                    markovMatrix[key] = {};
                }

                if (!markovMatrix[key][val]) {
                    markovMatrix[key][val] = 1;
                } else {
                    markovMatrix[key][val]++;
                }
            }
        }
    }
}

/**
 * Get the norm of a vector
 * @param vector
 */
function norm(vector) {
    let normSquared = 0;

    for (let key in vector) {
        normSquared += vector[key] * vector[key];
    }

    return Math.sqrt(normSquared);
}

function normalizeProbabilityVector(vector) {
    let tempNorm = norm(vector);
    for (let pos in vector) {
        vector[pos] = vector[pos] / tempNorm;
    }
}

function normalizeProbabilityVectors() {
    for (let key in markovMatrix) {
        normalizeProbabilityVector(markovMatrix[key]);
    }
}

function buildModel() {
    var input = document.getElementById('input');
    var words = input.value.split(" ");

    markovMatrix = {};
    collectData(words);
    normalizeProbabilityVectors();
}

function generateNextWord() {
    var row = markovMatrix[prevWord];

    var randomVar = Math.random();

    var continuousIndex = 0;
    for (let key in row) {
        continuousIndex += row[key] * row[key];
        if (randomVar <= continuousIndex) {
            return key;
        }
    }

    // can't find next word using markov matrix
    console.log("ERROR: can't find next word using markov matrix");
    return generateFirstWord().split(" ")[1];
}

function generateFirstWord() {
    var matrixSize = 0;

    for (let key in markovMatrix) {
        matrixSize++;
    }

    var selectedIndex = Math.floor(Math.random() * matrixSize);

    var index = 0;
    for (let key in markovMatrix) {
        if (selectedIndex === index) {
            return key;
        }
        index++;
    }

    return "";
}

function generate() {
    var output = document.getElementById('output');

    if (firstWordGenerated) {
        output.innerHTML += generateNextWord() + " ";
        prevWord = prevWord.split(" ")[1] + " " + generateNextWord();
    } else {
        prevWord = generateFirstWord();
        output.innerHTML += prevWord + " ";
        firstWordGenerated = true;
    }
}

function reset() {
    var output = document.getElementById('output');

    output.innerHTML = "";
    firstWordGenerated = false;
}

function load() {
    setInterval(function () {
        if (!pause) {
            generate();
        }
    }, 100)
}

function playStop() {
    pause = !pause;

    var playStopButton = document.getElementById("playStopButton");
    if (pause) {
        playStopButton.innerHTML = "Play";
    } else {
        playStopButton.innerHTML = "Pause";
    }
}