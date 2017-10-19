// ================
// CONSTANTS

FPS = 50;
MIN_DELAY = 200;
RADIUS = 20;

// ================
// DATA DEFINITIONS

/**
 * World is:
 * X = [Number]
 * Y = [Number]
 * VX = [Number]
 * VY = [Number]
 *
 * interp.
 *      ith element of X is the X position of ith ball, in RADIUS units
 *      ith element of Y is the Y position of ith ball, in RADIUS units
 *      ith element of VX is the X velocity of ith ball, in RADIUS per time
 *      ith element of VY is the Y velocity of ith ball, in RADIUS per time
 *
 * INVARIANT: lengths of X,Y,VX,VY are the same
 */

var World1 = {
    X: [],
    Y: [],
    VX: [],
    VY: []
}; // empty world

var World2 = {
    X: [1],
    Y: [2],
    VX: [3],
    VY: [4]
}; // world with one ball with position (1, 2) and velocity (3, 4)

var World3 = {
    X: [1, 4, 3],
    Y: [2, 5, 4],
    VX: [3, 0, 0],
    VY: [4, 2, -1]
};

// template
/*
function fn_for_world(world) {
    for (var i = 0; i < world.X.length; i++) {
        world.X[i]
        world.Y[i]
        world.VX[i]
        world.VY[i]
    }
}*/

// ================
// FUNCTIONS

var world;
function main() {
    init_environment();

    world = init_world();

    setInterval(function () {
        render(world);
        tick(world);
    }, 1000 / FPS);
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

function init_world() {
    return {
        X: [0, 10, 1, 2],
        Y: [0, 0, 2, 2],
        VX: [1, -1, 0, 0],
        VY: [0, 0, 0, 0]
    };
}

/**
 * Produce the next world state
 * @type {number}
 */
var lastTime = 0;
function tick(world) {

    var collided = [];
    for (var i = 0; i < world.X.length; i++) {
        for (var j = 0; j < world.X.length; j++) {
            if (balls_collide(i, j)) {
                collide(i, j);
                collided.push(i, j);
            }
        }
    }

    for (var p = 0; p < world.X.length; p++) {
        if (collided.find(p)) {
            world.X[p] += world.VX[p] / RADIUS;
            world.Y[p] += world.VY[p] / RADIUS;
        }
    }
}

/**
 * Checks if balls i and j collide
 * @param i
 * @param j
 */
function balls_collide(i, j) {
    return Math.abs(world.X[i] - world.X[j])
        +  Math.abs(world.Y[i] - world.Y[j])
        < 3;
}

/**
 * Collide balls i and j, exchanging momentum
 * @param i
 * @param j
 */
function collide(i, j) {
    // stub
}

/**
 * Render the world
 */
function render(world) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.fillStyle = 'rgb(200, 255, 0)';
    for (var i = 0; i < world.X.length; i++) {
        ctx.fillRect(world.X[i] * RADIUS, world.Y[i] * RADIUS, RADIUS, RADIUS);
    }
}