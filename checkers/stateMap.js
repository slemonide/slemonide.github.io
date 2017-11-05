/*
 * Records visited/seen states, state transitions and losing/winning paths.
 *
 * Based on that, suggests preferred moves in the future.
 */

stateMap = {
    currentPath: {
        states: [],
        transitions: []
    },
    states: [],
    stateTransitions: []
};

/**
 * Turns the board into a state
 * @param board
 */
function makeState(board) {
    // Convert current board state to a vector
    var brd = boardToVector(board);

    // Now project the board to our 2d basis
    var brdX = dotProduct(brd, b1) / (norm(brd) * norm(b1));
    var brdY = dotProduct(brd, b2) / (norm(brd) * norm(b1));

    return {
        vector:brd,
        x:brdX,
        y:brdY
    }
}

/**
 * Record board for the current game
 *
 * Use it after applying the transition
 * @param board
 */
stateMap.recordState = function (board) {
    let state = makeState(board);

    this.currentPath.states.push(state);

    let id = state.vector.toString();
    if (!s.graph.nodes(id)) {
        s.graph.addNode({
            // Main attributes:
            id: id,
            label: '',
            // Display attributes:
            x: state.x,
            y: state.y,
            size: 1,
            color: '#f00'
        });
    }
};

/**
 * Record transition for the current game
 *
 * Use it after applying the transition
 * @param stateTransition
 */
stateMap.recordTransition = function (stateTransition) {
    this.currentPath.transitions.push(stateTransition);

    var prev = this.currentPath.states[this.currentPath.states.length - 2].vector.toString();
    var next = this.currentPath.states[this.currentPath.states.length - 1].vector.toString();

    let id = prev + next;
    if (!s.graph.edges(id)) {
        s.graph.addEdge({
            id: id,
            // Reference extremities:
            source: prev,
            target: next,
            color: isWhite(turn) ? "#00b" : "#0e0"
        });

        s.refresh();
    }
};

/**
 * Lose all the recorded date for the current game and start from the beginning
 */
stateMap.restart = function () {
    this.currentPath.states = [];
    this.currentPath.transitions = [];
    this.recordState(currentBoard);
};

/**
 * Indicate that the game is ended and the side specified won
 * @param winningSide
 */
stateMap.recordGame = function (winningSide) {
    this.recordState(currentBoard);
    // TODO: finish
};