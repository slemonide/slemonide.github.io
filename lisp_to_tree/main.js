var s;

// Get's the word after i in the lot
function getName(lot, i) {
    var word = "";

    var k = i;
    var done = false;
    while (k < lot.length && !done) {
        k++;
        if (lot[k] === " ") {
            done = true;
        } else {
            word += lot[k];
        }
    }

    return word;
}

function parseTree(lot) {
    // A path in the tree, made up of nodes
    var start = {
        id: 'start',
        label: '',
        x: 0,
        y: 0,
        size: 1,
        color: '#f57'
    };

    g.nodes.push(start);

    var path = [start];
    // how many times have we gone down and up the tree
    var jumpCounter = 0;

    for (var i = 0; i < lot.length; i++) {
        if (lot[i] === "(") {
            var node = {
                id: 'n' + i,
                label: getName(lot, i),
                x: jumpCounter * 0.1,
                y: path.length * 0.1,
                size: 1,
                color: '#666'
            };

            g.nodes.push(node);

            g.edges.push({
                id: i,
                source: path[path.length - 1].id,
                target: node.id,
                size: 1,
                color: '#ccc'
            });

            path.push(node);
        } else if (lot[i] === ")") {
            if (path.length > 0) {
                path.splice(path.length - 1, 1);
                jumpCounter++;
            } else {
                console.log("ERROR: invalid closing tag at " + i);
            }
        } else {
            // just go on
        }
    }
}

function generateTree() {
    if (s) {
        s.graph.clear();
    }

    g = {
        nodes: [],
        edges: []
    };

    var input = document.getElementById("input");

    parseTree(input.value);

    s = new sigma({
        graph: g,
        container: 'container'
    });
}