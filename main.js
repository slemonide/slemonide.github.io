var Game = {};

ALIVE_DENSITY = 0.9;
CELL_SIZE = 8;
MIN_DELAY = 1;

Game.init = function () {
    Game.fps = 50;
    Game.canvas = document.getElementById('main');
    Game.ctx = Game.canvas.getContext('2d');

    Game.lastTime = (new Date()).getTime();

    Game.height = 100;
    Game.width = 100;

    /**
     * A game of life field
     *
     * 1 means alive cell
     * 0 means dead cell
     * @type {Array}
     */
    Game.map = [];

    initializeGameField()
};

Game.isAlive = function (x, y) {
    if (x < 0) {
        x += Game.width;
    }
    if (y < 0) {
        y += Game.height;
    }

    var i = y * Game.width + x;

    return Game.map[i];
};

function initializeGameField() {
    for (var i = 0; i < Game.width * Game.height; i++) {
        if (Math.random() > ALIVE_DENSITY) {
            Game.map.push(1)
        } else {
            Game.map.push(0)
        }
    }
}

Game.run = function () {
    if ((new Date()).getTime() - Game.lastTime > MIN_DELAY) {
        Game.lastTime = (new Date()).getTime();

        Game.update();
        Game.render();
    }
};

Game.render = function () {
    Game.ctx.clearRect(0, 0, Game.canvas.clientWidth, Game.canvas.clientHeight);

    for (var i = 0; i < Game.map.length; i++) {
        var x = i % Game.width;
        var y = (i - x) / Game.width;

        var alive = Game.map[i];

        if (alive === 1) {
            Game.ctx.fillStyle = 'rgb(200, 255, 0)';
            Game.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
};

Game.update = function () {
    function nextMap() {
        nextMap = [];

        function isAlive(x, y) {
            function numNeighbours(x, y) {
                var count = 0;

                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx !== 0 || dy !== 0) {
                            if (Game.isAlive(x + dx, y + dy)) {
                                count++;
                            }
                        }
                    }
                }

                return count;
            }

            return (numNeighbours(x,y) === 3) ||
                Game.isAlive(x,y) &&
                (numNeighbours(x,y) >= 2) &&
                (numNeighbours(x,y) <= 3);
        }

        for (var i = 0; i < Game.map.length; i++) {
            var x = i % Game.width;
            var y = (i - x) / Game.width;

            if (isAlive(x, y)) {
                nextMap[i] = 1;
            } else {
                nextMap[i] = 0;
            }
        }

        return nextMap;
    }

    Game.map = nextMap();
};

function main() {
    Game.init();

    Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
}