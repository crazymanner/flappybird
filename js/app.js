// project
//var projectPath = '../';
var projectPath = '/flappybird/';

// elemets
var game = document.getElementById('game');
var sky = document.getElementById('sky');
var pipeContainer = document.getElementById('pipe_container');
var flappy = document.getElementById('flappy');

// offset
var gameWidth = game.offsetWidth;
var gameHeight = game.offsetHeight;
var flappyWidth = flappy.offsetWidth;
var flappyHeight = flappy.offsetHeight;
var skyWidth = sky.offsetWidth;
var skyHeight = sky.offsetHeight;
var pipeWidth = skyWidth/10;
var safeHeight = skyHeight/4;

////////////////////////////////////////////////////////
// size
////////////////////////////////////////////////////////

function onResize(e) {
    skyWidth = sky.offsetWidth;
    skyHeight = sky.offsetHeight;
    pipeWidth = skyWidth/10;
    safeHeight = skyHeight/4; 
    setFlappySize();
}

////////////////////////////////////////////////////////
// flappy
////////////////////////////////////////////////////////

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
    //console.log('jump');
    var top = parseInt(flappy.style.top);
    top -= skyHeight/4;
    if (top < 0) {
        top = 0;
    }
    flappy.style.top = top + 'px';
}

////////////////////////////////////////////////////////
// Pipe
////////////////////////////////////////////////////////
function addPipe() {    
    var pipeTotalHeight = (skyHeight - safeHeight) - (safeHeight);
    var pipeTopHeight = (pipeTotalHeight * Math.random());
    var pipeBotHeight = pipeTotalHeight - pipeTopHeight;
    pipeTopHeight += safeHeight/2;
    pipeBotHeight += safeHeight/2;
    var pipeTop = document.createElement('div');
    pipeTop.classList.add('pipe');
    pipeTop.classList.add('pipe_top');
    pipeTop.style.top = 0 + 'px';
    pipeTop.style.left = skyWidth + 'px';
    pipeTop.style.width = pipeWidth + 'px';
    pipeTop.style.height = pipeTopHeight + 'px';
    pipeContainer.appendChild(pipeTop);

    var pipeBot = document.createElement('div');
    pipeBot.classList.add('pipe');
    pipeBot.classList.add('pipe_bot');
    pipeBot.style.bottom = 0 + 'px';
    pipeBot.style.left = skyWidth + 'px';
    pipeBot.style.width = pipeWidth + 'px';
    pipeBot.style.height = pipeBotHeight + 'px';
    pipeContainer.appendChild(pipeBot);
}

////////////////////////////////////////////////////////
// event
////////////////////////////////////////////////////////

function run() {
    gravity();
    movePipe();
}

function gravity() {
   var top = parseInt(flappy.style.top);
   top += skyHeight/15;
   if (top > skyHeight - flappyHeight) {
       top = skyHeight - flappyHeight;
   }
   flappy.style.top = top + 'px';
}

function movePipe() {
    var pipes = document.getElementsByClassName('pipe');
    for (var i = 0; i < pipes.length; i++) {
        var pipe = pipes[i];
        var left = parseInt(pipe.style.left);
        left -= skyWidth/30;
        pipe.style.left = left + 'px'; 
    }
}

////////////////////////////////////////////////////////
// main
////////////////////////////////////////////////////////

setFlappySize();
setFlappyPos();

setInterval(run, 100);
setInterval(addPipe, 1500);


// user event
game.ontouchstart = jumpFlappy;
game.onmousedown = jumpFlappy;
document.onkeydown = jumpFlappy;