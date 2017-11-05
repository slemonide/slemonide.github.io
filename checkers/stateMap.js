/*
 * Records visited/seen states, state transitions and losing/winning paths.
 *
 * Based on that, suggests preferred moves in the future.
 */

stateMap = {
    currentPath: [],
    states: [],
    stateTransitions: []
};

/**
 * Record board for the current game
 * @param board
 */
stateMap.recordState = function (board) {
    /**
     * Turns the board into a state
     * @param board
     */
    function makeState(board) {
        // Convert current board state to a vector
        var brd = boardToVector(currentBoard);

        // Now project the board to our 2d basis
        var brdX = dotProduct(brd, b1) / (norm(brd) * norm(b1));
        var brdY = dotProduct(brd, b2) / (norm(brd) * norm(b1));

        return {
            vector:brd,
            x:brdX,
            y:brdY
        }
    }

    this.currentPath.push(makeState(board));
};

/**
 * Record transition for the current game
 * @param stateTransition
 */
stateMap.recordTransition = function (stateTransition) {
    this.currentPath.push(stateTransition);
};

/**
 * Lose all the recorded date for the current game and start from the beginning
 */
stateMap.restart = function () {
    this.currentPath = []
};

/**
 * Indicate that the game is ended and the side specified won
 * @param winningSide
 */
stateMap.recordGame = function (winningSide) {
    // TODO: finish
};

stateMap.render = function () {
    var stateMapCanvas = document.getElementById("stateMap");
    var stateCtx = stateMapCanvas.getContext('2d');

    stateCtx.clearRect(0, 0, stateMapCanvas.width, stateMapCanvas.height);

    for (let i = 0; i < this.currentPath.length; i++) {
        let state = this.currentPath[i];

        stateCtx.fillStyle = 'red';
        stateCtx.fillRect(state.x * stateMapCanvas.width, state.y * stateMapCanvas.height, 2, 2);
    }
};