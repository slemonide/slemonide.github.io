var Game = {};

ALIVE_DENSITY = 0.9;
CHANGE_DIRECTION = 0.7;
RESET_DIRECTION = 0.9;
CELL_SIZE = 8;
MIN_DELAY = 100;

Game.init = function () {
    Game.fps = 50;
    Game.canvas = document.getElementById('main');
    Game.ctx = Game.canvas.getContext('2d');
    Game.ctx.canvas.width = window.innerWidth;
    Game.ctx.canvas.height = window.innerHeight;

    Game.lastTime = (new Date()).getTime();

    Game.height = Math.floor(Game.ctx.canvas.height / CELL_SIZE) * 2;
    Game.width = Math.floor(Game.ctx.canvas.width / CELL_SIZE) * 2;

    /**
     * A game of life field
     *
     * 1 means alive cell
     * 0 means dead cell
     * @type {Array}
     */
    Game.map = [];

    Game.observer = [];
    Game.observer.vx = 0;
    Game.observer.vy = 0;
    Game.observer.x = 0;
    Game.observer.y = 0;

    initializeGameField()
};

Game.isAlive = function (x, y) {
    x %= Game.width;
    y %= Game.height;

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
    var dt = (new Date()).getTime() - Game.lastTime;

    if (dt > MIN_DELAY) {
        Game.lastTime = (new Date()).getTime();

        Game.update(dt);
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
            Game.ctx.fillRect(
                (x + Game.observer.x) * CELL_SIZE,
                (y + Game.observer.y) * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE);
        }
    }
};

Game.update = function (dt) {
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

    function moveObserver() {
        if (Math.random() > CHANGE_DIRECTION) {
            Game.observer.vx += Math.random() - 0.5;
            Game.observer.vy += Math.random() - 0.5;
        }

        if (Math.random() > RESET_DIRECTION) {
            Game.observer.vx *= Math.random() * 1.5;
            Game.observer.vy *= Math.random() * 1.5;
        }

        Game.observer.x += Game.observer.vx * dt / 100;
        Game.observer.y += Game.observer.vy * dt / 100;

        Game.observer.x %= Game.width;
        Game.observer.y %= Game.height;
    }

    moveObserver();
};

function main() {
    Game.init();

    Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
}