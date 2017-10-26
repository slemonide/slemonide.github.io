// ================
// CONSTANTS

FPS = 50;
MIN_DELAY = 200;

BOARD_SIZE = 8;
CELL_SIZE = 64; // in px
WHITE_CELL_COLOR = 'rgb(200, 255, 200)';
DARK_CELL_COLOR = 'rgb(100, 155, 100)';
BLACK_PUCK = 'rgb(10, 10, 10)';
WHITE_PUCK = 'rgb(240, 240, 240)';

// ================
// DATA DEFINITIONS

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
}
var currentBoard = getNewBoard();


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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * Registers mouse events
 */
function registerMouseEvents() {
    canvas.onclick = function (me) {
        alert(me.toString());
    }
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
        update(dt)
    }
}

/**
 * Produce all valid moves for the side specified
 * @param side
 */
function getAllValidMoves(side) {

}

/**
 * Apply specified move to the current world state
 * @param move
 */
function doMove(move) {

}

/**
 * Makes a move for the side specified
 * @param side
 */
function makeMove(side) {
    var valid_moves = getAllValidMoves();
    doMove(valid_moves[Math.abs(valid_moves.length * Math.random())]);
}

/**
 * Updates the world by the given time difference
 * @param dt time difference
 */
function update(dt) {
    makeMove(turn);

    if (turn === "b") {
        turn = "w";
    } else {
        turn = "b";
    }
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


    renderBoard();
    renderPucks();
}