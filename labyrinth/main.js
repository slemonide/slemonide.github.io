// Game

var Game = {};
Game.world = new Set();

CELL_SIZE = 16;
MIN_DELAY = 200;

Game.addFloor = function (x, y) {
    Game.world.add(Cell.makeFloor(x,y));
};

Game.addWall = function (x, y) {
    Game.world.add(Cell.makeWall(x,y));
};

Game.init = function () {
    Game.fps = 50;
    Game.canvas = document.getElementById('main');
    Game.ctx = Game.canvas.getContext('2d');
    Game.ctx.canvas.width = window.innerWidth;
    Game.ctx.canvas.height = window.innerHeight;

    Game.lastTime = (new Date()).getTime();

    Game.height = Math.floor(Game.ctx.canvas.height / CELL_SIZE);
    Game.width = Math.floor(Game.ctx.canvas.width / CELL_SIZE);
};

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

    Game.world.forEach(function (cell) {
        Game.ctx.fillStyle = cell.color;
        Game.ctx.fillRect(
            cell.x * CELL_SIZE + Game.canvas.width/2,
            cell.y * CELL_SIZE + Game.canvas.height/2,
            CELL_SIZE,
            CELL_SIZE);
    })
};

Game.update = function () {
    // pass
};

// Cell

var Cell = {};
Cell.makeCell = function (x, y, color) {
    return {
        x: x,
        y: y,
        color : color
    }
};

Cell.makeWall = function (x, y) {
    return Cell.makeCell(x, y, 'rgb(200, 100, 150)')
};

Cell.makeFloor = function (x, y) {
    return Cell.makeCell(x, y, 'rgb(200, 200, 250)')
};

// Graph

var Node = {};
Node.makeNode = function (x, y) {
    return {
        x: x,
        y: y
    }
};

// Labyrinth

Labyrinth = {};
Labyrinth.nodes = new Set();
Labyrinth.connections = {
    open: new Set(),
    closed: new Set()
};
Labyrinth.nextNodes = new Set();

/**
 * Adds a node at (x,y)
 * @param x
 * @param y
 */
Labyrinth.addNode = function (x, y) {
    Labyrinth.nodes.add(Node.makeNode(x, y));
};

var Connection = {};
Connection.makeConnection = function (x0, y0, x1, y1) {
    return {
        x: x0 + x1,
        y: y0 + y1
    }
};

/**
 * Set connection between nodes (x0, y0) and (x1, y1) to open or close
 * @param x0
 * @param y0
 * @param x1
 * @param y1
 * @param open either true or false
 */
Labyrinth.setConnection = function (x0, y0, x1, y1, open) {
    if (open) {
        Labyrinth.connections.open.add(Connection.makeConnection(x0, y0, x1, y1));

        [Node.makeNode(x0, y0), Node.makeNode(x1, y1)].forEach(
            function (nextNode) {
                if (!Labyrinth.nodes.has(nextNode)) {
                    Labyrinth.nextNodes.add(nextNode);
                    Labyrinth.nodes.add(nextNode);
                }
            }
        );
    } else {
        Labyrinth.connections.closed.add(Connection.makeConnection(x0, y0, x1, y1))
    }
};

/**
 * Starts generating labyrinth at (x, y)
 * @param x
 * @param y
 */
Labyrinth.start = function (x, y) {
    Labyrinth.addNode(x,y);
    Labyrinth.setConnection(x,y, x + 1, y, Math.random() > 0.5);
    Labyrinth.setConnection(x,y, x - 1, y, Math.random() > 0.5);
    Labyrinth.setConnection(x,y, x, y + 1, Math.random() > 0.5);
    Labyrinth.setConnection(x,y, x, y - 1, Math.random() > 0.5);
};

Labyrinth.hasConnection = function (x0, y0, x1, y1) {
    return (Labyrinth.connections.closed.has(Connection.makeConnection(x0, y0, x1, y1))
        || Labyrinth.connections.open.has(Connection.makeConnection(x0, y0, x1, y1)));
};

Labyrinth.generate = function () {
    let currentNodes = new Set(Labyrinth.nextNodes);
    Labyrinth.nextNodes.clear();

    currentNodes.forEach(function (nextNode) {
        let x = nextNode.x;
        let y = nextNode.y;

        if (!Labyrinth.hasConnection(x, y, x + 1, y)) {
            Labyrinth.setConnection(x, y, x + 1, y, Math.random() > 0.5);
        }

        if (!Labyrinth.hasConnection(x, y, x - 1, y)) {
            Labyrinth.setConnection(x, y, x - 1, y, Math.random() > 0.5);
        }


        if (!Labyrinth.hasConnection(x, y, x, y + 1)) {
            Labyrinth.setConnection(x, y, x, y + 1, Math.random() > 0.5);
        }


        if (!Labyrinth.hasConnection(x, y, x, y - 1)) {
            Labyrinth.setConnection(x, y, x, y - 1, Math.random() > 0.5);
        }
    })
};

/**
 * Actually add the cells to the world
 */
Labyrinth.write = function () {
    Labyrinth.nodes.forEach(function (node) {
        Game.addFloor(node.x * 2, node.y * 2);

        Game.addWall(node.x * 2 + 1, node.y * 2 + 1);
        Game.addWall(node.x * 2 + 1, node.y * 2 - 1);
        Game.addWall(node.x * 2 - 1, node.y * 2 + 1);
        Game.addWall(node.x * 2 - 1, node.y * 2 - 1);
    });

    Labyrinth.connections.closed.forEach(function (connection) {
        Game.addWall(connection.x, connection.y);
    });

    Labyrinth.connections.open.forEach(function (connection) {
        Game.addFloor(connection.x, connection.y);
    });
};

// User functions

function main() {
    Game.init();
    Labyrinth.start(0, 0);
    Labyrinth.write();

    Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
}

function generate() {
    Labyrinth.generate();
    Labyrinth.write();
}