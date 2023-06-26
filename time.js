

var lastUpdate = Date.now();
var myInterval = setInterval(tick, 0);
var deltaTime;

function tick() {
    var now = Date.now();
    deltaTime = now - lastUpdate;
    lastUpdate = now;
}
tick();
requestAnimationFrame(tick);

window.getDeltaTime = function getDeltaTime()
{
    return deltaTime;
}