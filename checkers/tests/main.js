QUnit.test( "Only even indexes are valid", function( assert ) {
    /*for (let i = 0; i < 30; i++) {

        makeMove();
        assert.equal(dotProduct(boardToVector(currentBoard),
            [1, 0, 1, 0, 1, 0, 1, 0,
             0, 1, 0, 1, 0, 1, 0, 1,
             1, 0, 1, 0, 1, 0, 1, 0,
             0, 1, 0, 1, 0, 1, 0, 1,
             1, 0, 1, 0, 1, 0, 1, 0,
             0, 1, 0, 1, 0, 1, 0, 1,
             1, 0, 1, 0, 1, 0, 1, 0,
             0, 1, 0, 1, 0, 1, 0, 1]), 0, "All indexes are even");
    }*/

    function formatTextField(brd) {
        let str = "";

        for (let i = 0; i < brd.length; i++) {
            if (i % BOARD_SIZE === 0) {
                str += "\n"
            }
            str += brd[i];
        }

        return str;
    }

    for (let i = 0; i < 50; i++) {

        makeMove();
        let validMoves = getAllValidMoves();
        for (let j = 0; j < validMoves.length; j++) {
            assert.equal((validMoves[j].add[0].x + validMoves[j].add[0].y) % 2, 1,
                "Transition from " + positionSetToString(validMoves[j].remove) +
                " to " + positionSetToString(validMoves[j].add) +
            "\nField: " + formatTextField(currentBoard));

        }
    }
});