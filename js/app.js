// project
//var projectPath = '../';
var projectPath = '/flappybird/';

var gameover = false;

// elemets
var game = document.getElementById('game');
var sky = document.getElementById('sky');
var pipeContainer = document.getElementById('pipe_container');
var flappy = document.getElementById('flappy');
var replay = document.getElementById('replay');
var passCount = document.getElementById('pass_count');
// offset
var gameWidth = game.offsetWidth;
var gameHeight = game.offsetHeight;
var flappyWidth = flappy.offsetWidth;
var flappyHeight = flappy.offsetHeight;
var skyWidth = sky.offsetWidth;
var skyHeight = sky.offsetHeight;
var pipeWidth = skyWidth/10;
var safeHeight = skyHeight/3;

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

function jumpKey(e) {
    if(e.keyCode == 32) {
        jumpFlappy(e);
    }
}

function jumpFlappy(e) {
    e.preventDefault();

    if(gameover) { return; }
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
    if(gameover) { return; }
    var pipeTotalHeight = (skyHeight - safeHeight) - (safeHeight);
    var pipeTopHeight = (pipeTotalHeight * Math.random());
    var pipeBotHeight = pipeTotalHeight - pipeTopHeight;
    pipeTopHeight += safeHeight/2;
    pipeBotHeight += safeHeight/2;
    var pipeTop = document.createElement('div');
    pipeTop.classList.add('pipe');
    pipeTop.style.top = 0 + 'px';
    pipeTop.style.left = skyWidth + 'px';
    pipeTop.style.width = pipeWidth + 'px';
    pipeTop.style.height = pipeTopHeight + 'px';
    var imgTop = document.createElement('img');
    imgTop.src = projectPath + 'img/pipe_top.png';
    imgTop.style.bottom = 0;
    pipeTop.appendChild(imgTop);
    pipeContainer.appendChild(pipeTop);
    // for pass count
    pipeTop.dataset.top = true;
    pipeTop.dataset.pass = false;

    var pipeBot = document.createElement('div');
    pipeBot.classList.add('pipe');
    pipeBot.style.bottom = 0 + 'px';
    pipeBot.style.top = pipeTopHeight + safeHeight + 'px';
    pipeBot.style.left = skyWidth + 'px';
    pipeBot.style.width = pipeWidth + 'px';
    pipeBot.style.height = pipeBotHeight + 'px';
    var imgBot = document.createElement('img');
    imgBot.src = projectPath + 'img/pipe_bot.png';
    imgBot.style.top = 0;
    pipeBot.appendChild(imgBot);
    pipeContainer.appendChild(pipeBot);
}

////////////////////////////////////////////////////////
// event
////////////////////////////////////////////////////////

function run() {
    if(gameover) { return; }
    gravity();
    movePipe();
    if (isCrash()) {
        console.log('crash');
        gameover = true;
        document.getElementById("sound_gameover").play();
        replay.style.display = 'block';
    }
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
    var flappyLeft = parseInt(flappy.style.left);
    var pipes = document.getElementsByClassName('pipe');
    var pipesRemove = [];
    for (var i = 0; i < pipes.length; i++) {
        var pipe = pipes[i];
        var left = parseInt(pipe.style.left);
        var right = left + pipeWidth;
        left -= skyWidth/30;
        pipe.style.left = left + 'px';
        if (right < flappyLeft && pipe.dataset.top && pipe.dataset.pass == 'false') {
            var count = parseInt(passCount.innerHTML);
            passCount.innerHTML = ++count;
            pipe.dataset.pass = true;
        }
        if (left < -pipeWidth) {
           pipesRemove.push(pipe);
        }
    }

    for (var i = 0; i < pipesRemove.length; i++) {
        var pipe = pipesRemove[i];
        pipeContainer.removeChild(pipe);
    }
}

function isCrash() {
    var flappyLeft = parseInt(flappy.style.left);
    var flappyRight = flappyLeft + flappyWidth;
    var flappyTop = parseInt(flappy.style.top);
    var flappyBot = flappyTop + flappyHeight;
    var pipes = document.getElementsByClassName('pipe');
    for(var i = 0; i < pipes.length; i++) {
        var pipe = pipes[i];
        var pipeLeft = parseInt(pipe.style.left);
        var pipeRight = pipeLeft + pipeWidth;
        var pipeTop = parseInt(pipe.style.top);
        var pipeBot = pipeTop + pipe.offsetHeight;
        if(!(pipeRight < flappyLeft || flappyRight < pipeLeft || flappyTop > pipeBot || flappyBot < pipeTop)) { 
            //console.log(flappyLeft, flappyRight, flappyTop, flappyBot);
            //console.log(pipeLeft, pipeRight, pipeTop, pipeBot);
            return true; 
        }
    }
    
    return false;
}

function replayGame() {
    gameover = false;
    setFlappyPos();
    replay.style.display = 'none';
    pipeContainer.innerHTML = '';
    passCount.innerHTML = '0';
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
document.onkeydown = jumpKey;