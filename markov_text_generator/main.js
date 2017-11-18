var markovMatrix = {};
var prevWord = false;

function renderMarkovMatrix(markovMatrix) {
    var output = document.getElementById('markovMatrix');
    output.innerHTML = "";

    function renderHeader() {
        output.innerHTML += "<tr>";

        for (let key in markovMatrix) {
            output.innerHTML += "<th>" + key + "</th>";
        }

        output.innerHTML += "</tr>";
    }

    renderHeader();
}

function collectData(words) {
    for (let i = 0; i < words.length; i++) {
        if (i < words.length - 1) {
            if (!markovMatrix[words[i]]) {
                markovMatrix[words[i]] = {};
            }

            if (!markovMatrix[words[i]][words[i + 1]]) {
                markovMatrix[words[i]][words[i + 1]] = 1;
            } else {
                markovMatrix[words[i]][words[i + 1]]++;
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

function generate() {
    var output = document.getElementById('output');

    function generateNextWord(prevWord) {
        var row = markovMatrix[prevWord];

        var randomVar = Math.random();

        var continuousIndex = 0;
        for (let key in row) {
            continuousIndex += row[key] * row[key];
            if (randomVar >= continuousIndex) {
                return key;
            }
        }

        return "";
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

    if (prevWord === false) {
        prevWord = generateNextWord(prevWord);
    } else {
        prevWord = generateFirstWord();
    }

    output.innerHTML += prevWord + " ";
}