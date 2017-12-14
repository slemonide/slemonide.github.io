// Game

var Game = {};
Game.world = [];

CELL_SIZE = 10;
MIN_DELAY = 200;

Game.addFloor = function (x, y) {
    let floor = Cell.makeFloor(x,y);

    if (!Game.world[floor]) {
        Game.world.push(floor);
        Game.world[floor] = true;
    }
};

Game.addWall = function (x, y) {
    let wall = Cell.makeWall(x,y);

    if (!Game.world[wall]) {
        Game.world.push(wall);
        Game.world[wall] = true;
    }
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
    return new function () {
        this.x = x;
        this.y = y;
        this.color = color;
        this.toString = function () {
            return this.x.toString() + " " + this.y.toString() + " " + this.color.toString();
        }
    };
};

Cell.makeWall = function (x, y) {
    return Cell.makeCell(x, y, 'rgb(200, 100, 150)')
};

Cell.makeFloor = function (x, y) {
    return Cell.makeCell(x, y, 'rgb(200, 200, 250)')
};

// Graph

function Position(x, y) {
    this.x = x;
    this.y = y;
    this.toString = function () {
        return x.toString() + " " + y.toString();
    }
}

var Node = {};
Node.makeNode = function (x, y) {
    return new Position(x, y);
};

// Labyrinth

Labyrinth = {};
Labyrinth.nodes = [];
Labyrinth.connections = {
    open: [],
    closed: []
};
Labyrinth.nextNodes = [];

/**
 * Adds a node at (x,y)
 * @param x
 * @param y
 */
Labyrinth.addNode = function (x, y) {
    let node = Node.makeNode(x, y);

    if (!Labyrinth.nodes[node]) {
        Labyrinth.nodes.push(node);
        Labyrinth.nextNodes.push(node);
        Labyrinth.nodes[node] = true;
    }
};

var Connection = {};
Connection.makeConnection = function (x0, y0, x1, y1) {
    return new Position(x0 + x1, y0 + y1);
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

        if (!Labyrinth.connections.open[Connection.makeConnection(x0, y0, x1, y1)]) {
            Labyrinth.connections.open.push(Connection.makeConnection(x0, y0, x1, y1));
            Labyrinth.connections.open[Connection.makeConnection(x0, y0, x1, y1)] = true;
        }

        [Node.makeNode(x0, y0), Node.makeNode(x1, y1)].forEach(
            function (nextNode) {
                if (!Labyrinth.nodes[nextNode]) {
                    Labyrinth.nextNodes.push(nextNode);
                    Labyrinth.nodes.push(nextNode);
                }
            }
        );
    } else {
        if (!Labyrinth.connections.closed[Connection.makeConnection(x0, y0, x1, y1)]) {
            Labyrinth.connections.closed.push(Connection.makeConnection(x0, y0, x1, y1));
            Labyrinth.connections.closed[Connection.makeConnection(x0, y0, x1, y1)] = true;
        }
    }
};

/**
 * Starts generating labyrinth at (x, y)
 * @param x
 * @param y
 */
Labyrinth.start = function (x, y) {
    Labyrinth.addNode(x,y);
    //Labyrinth.setConnection(x,y, x + 1, y, Math.random() > 0.75);
    //Labyrinth.setConnection(x,y, x - 1, y, Math.random() > 0.75);
    //Labyrinth.setConnection(x,y, x, y + 1, Math.random() > 0.75);
    //Labyrinth.setConnection(x,y, x, y - 1, Math.random() > 0.75);
};

Labyrinth.hasConnection = function (x0, y0, x1, y1) {
    return (Labyrinth.connections.closed[Connection.makeConnection(x0, y0, x1, y1)]
        || Labyrinth.connections.open[Connection.makeConnection(x0, y0, x1, y1)]);
};

Labyrinth.generate = function () {
    let currentNodes = Labyrinth.nextNodes.slice();
    Labyrinth.nextNodes = [];

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
    Labyrinth.nextNodes.forEach(function (node) {
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

    //setInterval(generate, 1);
}

function generate() {
    Labyrinth.generate();
    Labyrinth.write();
}