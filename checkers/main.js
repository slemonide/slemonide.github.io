// ================
// CONSTANTS

FPS = 50;
MIN_DELAY = 200;

BOARD_SIZE = 8;
CELL_SIZE = 64; // in px
WHITE_CELL_COLOR = getColor(200, 255, 200);
DARK_CELL_COLOR = getColor(100, 155, 100);
BLACK_PUCK = getColor(10, 10, 10);
WHITE_PUCK = getColor(240, 240, 240);

// ================
// DATA DEFINITIONS

/*
 * Vector is array(number)
 * interp. a vector of arbitrary size
 */

// Randomly chosen 2d basis
var b1 = getRandomVector(BOARD_SIZE * BOARD_SIZE);
var b2 = getRandomVector(BOARD_SIZE * BOARD_SIZE);

// Turn is one of:
// - "b" -- black
// - "w" -- white
// interp. specifies which sides goes now
var turn = "w";

// CellState is one of:
// - "b" -- black
// - "w" -- white
// - "e" -- empty
// interp. cell state, either a puck of specified color or empty

/*
function fn_for_cellState(cellState) {
    if (isBlack(cellState)) {
        //...
    } else if (isWhite(cellState)) {
        //...
    } else {
        //...
    }
}
*/

function isBlack(cellState) {
    return (cellState === "b");
}

function isWhite(cellState) {
    return (cellState === "w");
}

function isEmpty(cellState) {
    return (cellState === "e");
}

// Board is an array of size BOARD_SIZE * BOARD_SIZE,
// filled with CellStates's
function getNewBoard() {
    return [
        "e", "b", "e", "b", "e", "b", "e", "b",
        "b", "e", "b", "e", "b", "e", "b", "e",
        "e", "b", "e", "b", "e", "b", "e", "b",
        "e", "e", "e", "e", "e", "e", "e", "e",
        "e", "e", "e", "e", "e", "e", "e", "e",
        "w", "e", "w", "e", "w", "e", "w", "e",
        "e", "w", "e", "w", "e", "w", "e", "w",
        "w", "e", "w", "e", "w", "e", "w", "e"

    ]
    // return [
    //     "e", "e", "e", "e", "e", "e", "e", "e",
    //     "e", "e", "e", "e", "e", "e", "e", "e",
    //     "e", "e", "e", "e", "e", "e", "e", "e",
    //     "e", "e", "e", "e", "e", "e", "e", "e",
    //     "e", "e", "e", "e", "e", "b", "e", "e",
    //     "e", "e", "e", "e", "w", "e", "e", "e",
    //     "e", "e", "e", "e", "e", "e", "e", "e",
    //     "e", "e", "e", "e", "e", "e", "e", "e"
    //
    // ]
}

var currentBoard = getNewBoard();

// Move is
// {"add": [Position],
//  "remove": [Position]}
// interp. move is a set of positions to be removed and to be added

// Pos is {{x: number, y: number}}
// interp. a position of a piece on the board

/**
 * Produce position from the given index
 * @param i
 * @returns {{x: number, y: number}}
 */
function indexToPos(i) {
    return {
        x: i % BOARD_SIZE,
        y: Math.floor(i / BOARD_SIZE)
    }
}

/**
 * Convert Position to index
 * @param pos
 */
function posToIndex(pos) {
    return pos.x + pos.y * BOARD_SIZE;
}

// ================
// FUNCTIONS

function main() {
    init_environment();
    setInterval(function () {
        render();
        tick();
    }, 1000 / FPS);
    //registerMouseEvents();
}

/**
 * Initialize the environment
 */
var canvas, ctx;
function init_environment() {
    canvas = document.getElementById('main');
    ctx = canvas.getContext('2d');
}

/**
 * Produce the next world state
 * @type {number}
 */
var lastTime = 0;
function tick() {
    var dt = (new Date()).getTime() - lastTime;

    if (dt > MIN_DELAY) {
        lastTime = (new Date()).getTime();
        update()
    }
}

/**
 * Checks if the given position is occupied
 * @param pos
 */
function isFree(pos) {
    return isEmpty(currentBoard[posToIndex(pos)]);
}

/**
 * Check if given position is on the board
 * @param pos
 */
function isOnBoard(pos) {
    return (pos.x >= 0 && pos.x < BOARD_SIZE) &&
           (pos.y >= 0 && pos.y < BOARD_SIZE)
}

/**
 * Return false if cell state at pos is either cellState or empty
 * @param cellState
 * @param pos
 */
function areOppositeColors(cellState, pos) {
    var brdCellState = currentBoard[posToIndex(pos)];

    if (isEmpty(brdCellState)) {
        return false;
    } else if (isWhite(brdCellState)) {
        return isBlack(cellState);
    } else if (isBlack(brdCellState)) {
        return isWhite(cellState);
    }
}

/**
 * Produce all valid moves for the current turn
 */
function getAllValidMoves() {
    var validMoves = [];

    function generateTrivialMoves(pos, cellState) {
        var add1, add2;

        if (isWhite(cellState)) {
            add1 = {
                x: pos.x + 1,
                y: pos.y - 1
            };

            add2 = {
                x: pos.x - 1,
                y: pos.y - 1
            };
        } else {
            add1 = {
                x: pos.x + 1,
                y: pos.y + 1
            };

            add2 = {
                x: pos.x - 1,
                y: pos.y + 1
            };
        }

        if (isOnBoard(add1) && isFree(add1)) {
            validMoves.push({
                remove: [pos],
                add: [add1]
            })
        }

        if (isOnBoard(add2) && isFree(add2)) {
            validMoves.push({
                remove: [pos],
                add: [add2]
            })
        }
    }

    function generateCapturingMoves(pos, cellState) {
        var capture1, capture2, add1, add2;

        if (isWhite(cellState)) {
            capture1 = {
                x: pos.x + 1,
                y: pos.y - 1
            };

            capture2 = {
                x: pos.x - 1,
                y: pos.y - 1
            };

            add1 = {
                x: pos.x + 2,
                y: pos.y - 2
            };

            add2 = {
                x: pos.x - 2,
                y: pos.y - 2
            };
        } else {
            capture1 = {
                x: pos.x + 1,
                y: pos.y + 1
            };

            capture2 = {
                x: pos.x - 1,
                y: pos.y + 1
            };

            add1 = {
                x: pos.x + 2,
                y: pos.y + 2
            };

            add2 = {
                x: pos.x - 2,
                y: pos.y + 2
            };
        }

        if (isOnBoard(add1) && isFree(add1) && areOppositeColors(cellState, capture1)) {
            validMoves.push({
                remove: [pos, capture1],
                add: [add1]
            })
        }

        if (isOnBoard(add2) && isFree(add2) && areOppositeColors(cellState, capture2)) {
            validMoves.push({
                remove: [pos, capture2],
                add: [add2]
            })
        }
    }

    for (var i = 0; i < currentBoard.length; i++) {
        var cellState = currentBoard[i];
        var pos = indexToPos(i);

        if (cellState === turn) {
            generateTrivialMoves(pos, cellState);
            generateCapturingMoves(pos, cellState);
        }
    }

    return validMoves;
}

/**
 * Add given puck to the board
 * @param color color to add
 * @param pos position at which to add it
 */
function placePuck(color, pos) {
    var i = posToIndex(pos);
    currentBoard[i] = color;
}

/**
 * Removes a puck at specified position
 * @param pos position at which to remove the puck at
 */
function removePuck(pos) {
    var i = posToIndex(pos);
    currentBoard[i] = "e";
}

/**
 * Apply specified move to the current world state
 * @param move
 */
function doMove(move) {
   for (var i = 0; i < move.add.length; i++) {
       placePuck(turn, move.add[i]);
   }

   for (var j = 0; j < move.remove.length; j++) {
       removePuck(move.remove[j]);
   }
}

/**
 * Makes a move
 */
function makeMove() {
    var valid_moves = getAllValidMoves();
    if (valid_moves.length > 0) {
        doMove(valid_moves[Math.floor(valid_moves.length * Math.random())]);
    } else {
        //alert("Game Over");
    }

    if (isBlack(turn)) {
        turn = "w";
    } else {
        turn = "b";
    }
}

/**
 * Updates the world by the given time difference
 * @param dt time difference
 */
var paused = true;
function update() {
    if (!paused) {
        makeMove();
    }
}

function playStop() {
    paused = !paused;

    var playStopButton = document.getElementById("playStopButton");
    if (paused) {
        playStopButton.innerHTML = "Play";
    } else {
        playStopButton.innerHTML = "Pause";
    }
}

function restart() {
    currentBoard = getNewBoard();
}

/**
 * Convert a position set to string
 * @param set
 */
function positionSetToString(set) {
    var str = "";

    for (var i = 0 ; i < set.length; i++) {
        str += "(" + set[i].x + ", " + set[i].y + ")";
    }

    return str;
}

/**
 * Produce a randomly chosen unit vector of specified size
 * @param size
 */
function getRandomVector(size) {
    var vector = [];

    for (var i = 0; i < size; i++) {
        vector.push(Math.random());
    }

    return vector;
}

/**
 * Converts cell state to a number
 * @param cellState
 */
function boardStateToNumber(cellState) {
    if (isBlack(cellState)) {
        return 1;
    } else if (isWhite(cellState)) {
        return 2;
    } else {
        return 0;
    }
}

/**
 * Convert the board to a vector
 * @param board
 */
function boardToVector(board) {
    var vectorBoard = [];

    for (var i = 0; i < board.length; i++) {
        vectorBoard.push(boardStateToNumber(board[i]));
    }

    return vectorBoard;
}

/**
 * Compute the dot product between two vectors
 * ASSUME: vectors are of the same size
 * @param v1
 * @param v2
 */
function dotProduct(v1, v2) {
    var productSoFar = 0;

    for (var i = 0; i < v1.length; i++) {
        productSoFar += v1[i] * v2[i];
    }

    return productSoFar;
}

/**
 * Produce the color string from the given integers, representing color components
 * REQUIRES: 0 <= r,g,b <= 255
 * @param r
 * @param g
 * @param b
 */
function getColor(r, g, b) {
    return 'rgb('+ r + ', ' + g + ', ' + b + ')';
}

/**
 * Produce the norm of a vector
 * @param vec
 */
function norm(vec) {
    var squareSum = 0;

    for (var i = 0; i < vec.length; i++) {
        squareSum += vec[i] * vec[i];
    }

    return Math.sqrt(squareSum);
}

/**
 * Render the world
 */
function render() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    /**
     * Renders the background image of the board
     */
    function renderBoard() {
        for (var x = 0; x < BOARD_SIZE; x++) {
            for (var y = 0; y < BOARD_SIZE; y++) {
                if ((x + y) % 2 === 0) {
                    ctx.fillStyle = DARK_CELL_COLOR;
                } else {
                    ctx.fillStyle = WHITE_CELL_COLOR;
                }
                ctx.fillRect(CELL_SIZE * x, CELL_SIZE * y, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    function renderPuckAt(x, y) {
        ctx.beginPath();
        ctx.arc(CELL_SIZE * (x + 0.5), CELL_SIZE * (y + 0.5), CELL_SIZE / 2 * 0.9, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#777777';
        ctx.stroke();
    }

    /**
     * Renders pucks on the board (uses currentBoard)
     */
    function renderPucks() {
        for (var i = 0; i < currentBoard.length; i++) {
            var x = i % BOARD_SIZE;
            var y = Math.floor(i / BOARD_SIZE);

            if (currentBoard[i] === "b") {
                ctx.fillStyle = BLACK_PUCK;
                renderPuckAt(x, y);
            } else if (currentBoard[i] === "w") {
                ctx.fillStyle = WHITE_PUCK;
                renderPuckAt(x, y);
            }
        }
    }

    function renderTurn()  {
        var turnField = document.getElementById('turn');
        if (isWhite(turn)) {
            turnField.innerHTML = "White";
        } else {
            turnField.innerHTML = "Black";
        }
    }

    function renderPossibleMoves() {
        var possibleMovesField = document.getElementById('possibleMoves');
        var validMoves = getAllValidMoves();

        possibleMovesField.innerHTML = "<tr><th>Remove</th><th>Add</th></tr>";

        document.getElementById('totalMovesPossible').innerHTML = validMoves.length;

        for (var i = 0; i < validMoves.length; i++) {
            possibleMovesField.innerHTML +=
                "<tr><td>" + positionSetToString(validMoves[i].remove) + "</td><td>" +
                positionSetToString(validMoves[i].add) + "</td></tr>";
        }
    }

    function renderStateMap() {
        var stateMapCanvas = document.getElementById("stateMap");
        var stateCtx = stateMapCanvas.getContext('2d');

        // Convert current board state to a vector
        var brd = boardToVector(currentBoard);

        // Now project the board to our 2d basis
        var brdX = dotProduct(brd, b1) / (norm(brd) * norm(b1));
        var brdY = dotProduct(brd, b2) / (norm(brd) * norm(b1));

        stateCtx.fillStyle = 'red';
        stateCtx.fillRect(brdX * stateMapCanvas.width, brdY * stateMapCanvas.height, 2, 2);
    }

    renderBoard();
    renderPucks();
    renderTurn();
    renderPossibleMoves();
    renderStateMap();
}