var Game = {};

ALIVE_DENSITY = 0.87;
CHANGE_DIRECTION = 0.99;
RESET_DIRECTION = 0.8;

Game.init = function () {
    Game.fps = 50;
    Game.canvas = document.getElementById('main');
    Game.ctx = Game.canvas.getContext('2d');
    Game.ctx.canvas.width = window.innerWidth;
    Game.ctx.canvas.height = window.innerHeight;

    Game.lastTime = (new Date()).getTime();

    Game.height = Math.floor(Game.ctx.canvas.height / Game.cellSize);
    Game.width = Math.floor(Game.ctx.canvas.width / Game.cellSize);

    /**
     * A game of life field
     *
     * [Natural[0,255],
     *  Natural[0,255],
     *  Natural[0,255]]
     *   means alive cell with a color
     * 0 means dead cell
     * @type {Array}
     */
    Game.world = [];

    Game.observer = [];
    Game.observer.vx = 0;
    Game.observer.vy = 0;
    Game.observer.x = 0;
    Game.observer.y = 0;

    initializeGameField()
};

Game.isAlive = function (x, y) {
    x = Math.floor(x + 0.5);
    y = Math.floor(y + 0.5);

    x %= Game.width;
    y %= Game.height;

    if (x < 0) {
        x += Game.width;
    }
    if (y < 0) {
        y += Game.height;
    }

    var i = y * Game.width + x;

    return Game.world[i];
};

function getRandomColor() {
    return [
        Math.floor(Math.random() + 0.5) * 255,
        Math.floor(Math.random() + 0.5) * 255,
        Math.floor(Math.random() + 0.5) * 255]
}

function initializeGameField() {
    for (var i = 0; i < Game.width * Game.height; i++) {
        if (Math.random() > ALIVE_DENSITY) {
            Game.world.push(getRandomColor())
        } else {
            Game.world.push(0)
        }
    }
}

Game.run = function () {
    var dt = (new Date()).getTime() - Game.lastTime;

    if (dt > Game.clockSpeed) {
        Game.lastTime = (new Date()).getTime();

        Game.update(dt);
        Game.render();
    }
};

Game.render = function () {
    Game.ctx.clearRect(0, 0, Game.canvas.clientWidth, Game.canvas.clientHeight);

    for (var x = 0; x < Game.width; x++) {
        for (var y = 0; y < Game.height; y++) {
            var color = Game.isAlive(x + Game.observer.x,
                y + Game.observer.y);
            if (color !== 0) {
                Game.ctx.fillStyle = 'rgb('+ color[0] +', ' + color[1] + ', ' + color[2] + ')';
                Game.ctx.fillRect(
                    (x - Game.observer.x % 1) * Game.cellSize,
                    (y - Game.observer.y % 1) * Game.cellSize,
                    Game.cellSize,
                    Game.cellSize);
            }
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
                            if (Game.isAlive(x + dx, y + dy) !== 0) {
                                count++;
                            }
                        }
                    }
                }

                return count;
            }

            return (numNeighbours(x,y) === 3) ||
                Game.isAlive(x,y) !== 0 &&
                (numNeighbours(x,y) >= 2) &&
                (numNeighbours(x,y) <= 3);
        }

        for (var y = 0; y < Game.height; y++) {
            for (var x = 0; x < Game.width; x++) {
                var i = y * Game.width + x;

                if (isAlive(x, y)) {
                    var color = Game.isAlive(x, y);
                    if (color === 0) {
                        color = [0,0,0];
                        var count = 0;

                        for (var dx = -1; dx <= 1; dx++) {
                            for (var dy = -1; dy <= 1; dy++) {
                                var neighbourColor = Game.isAlive(x + dx, y + dy);
                                if (neighbourColor !== 0) {
                                    count++;
                                    color[0] += neighbourColor[0];
                                    color[1] += neighbourColor[1];
                                    color[2] += neighbourColor[2];
                                }
                            }
                        }

                        color[0] /= count;
                        color[1] /= count;
                        color[2] /= count;

                        color[0] = Math.floor(color[0]);
                        color[1] = Math.floor(color[1]);
                        color[2] = Math.floor(color[2]);
                    }

                    nextMap[i] = color;
                } else {
                    nextMap[i] = 0;
                }
            }
        }

        return nextMap;
    }

    Game.world = nextMap();
};

function main(cellSize, clockSpeed) {
    Game.cellSize = cellSize;
    Game.clockSpeed = clockSpeed;
    Game.init();

    Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
}

function restart() {
    Game.world = [];
    initializeGameField();
}