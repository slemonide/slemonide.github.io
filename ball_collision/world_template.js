// ================
// CONSTANTS

FPS = 50;
MIN_DELAY = 200;

// ================
// DATA DEFINITIONS

// ================
// FUNCTIONS

function main() {
    init_environment();

    var world = init_world();
    setInterval(function () {
        render();
        tick();
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
    return "";
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
 * Updates the world by the given time difference
 * @param dt time difference
 */
function update(dt) {

}

/**
 * Render the world
 */
function render() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.fillStyle = 'rgb(200, 255, 0)';
    ctx.fillRect(10, 10, 20, 20);
}