var markovMatrix = {};

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

function generate() {
    var input = document.getElementById('input');
    var output = document.getElementById('output');

    var words = input.value.split(" ");

    markovMatrix = {};

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

    renderMarkovMatrix(markovMatrix);
}