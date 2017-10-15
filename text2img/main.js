PIXEL_SIZE = 10;
FPS = 50;

function main() {
    var input = document.getElementById('input');
    var output = document.getElementById('output');

    var ctx = output.getContext('2d');
    ctx.fillStyle = 'rgb(0, 200, 0)';

    var render = function () {
        ctx.clearRect(0, 0, output.width, output.height);

        var x = 0;
        var y = 0;

        var text = input.value;
        for (var i = 0; i < text.length; i++) {
            if (text[i] === "1" || text[i] === "#") {
                ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
                x++;
            } else if (text[i] === "\n") {
                x = 0;
                y++;
            } else {
                x++;
            }
        }
    };

    setInterval(render, 1000 / FPS);
}