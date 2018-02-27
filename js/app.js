// project
//var projectPath = '../';
var projectPath = '/flappybird/';

// elemets
var game = document.getElementById('game');
var sky = document.getElementById('sky');
var flappy = document.getElementById('flappy');

// offset
var gameWidth = game.offsetWidth;
var gameHeight = game.offsetHeight;
var flappyWidth = flappy.offsetWidth;
var flappyHeight = flappy.offsetHeight;
var skyWidth = sky.offsetWidth;
var skyHeight = sky.offsetHeight;

function onResize(e) {
    // game size update
    skyWidth = sky.offsetWidth;
    skyHeight = sky.offsetHeight;
    // flappy size update
    setFlappySize();
}

function setFlappySize() {
    flappy.style.width = skyWidth/11 + 'px';
    flappyWidth = flappy.offsetWidth;
    flappyHeight = flappy.offsetHeight;
}

function setFlappyPos() {
    flappy.style.top = (skyHeight/2 - flappyHeight * 2) + 'px';
    flappy.style.left = flappyWidth * 2 + 'px';
}

function jumpFlappy() {
    var top = parseInt(flappy.style.top);
    top -= 300;
    if (top < 0) {
        top = 0;
    }
    flappy.style.top = top + 'px';
}

function gravity() {
   var top = parseInt(flappy.style.top);
   top += 50;
   if (top > skyHeight - flappyHeight) {
       top = skyHeight - flappyHeight;
   }
   flappy.style.top = top + 'px';
}

setFlappySize();
setFlappyPos();

setInterval(gravity, 100);

// event
game.ontouchstart = jumpFlappy;
game.onmousedown = jumpFlappy;