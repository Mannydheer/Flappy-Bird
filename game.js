// var canvas = document.getElementById("gameCanvas");
// //rendering context to draw to the element.
// var ctx = canvas.getContext("2d");

//Just using a simple boolean is not efficient because it doesn't take into account the different
//speeds that a computer can run the program.
let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
let cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;
let canvas = document.getElementById("gameCanvas");
//rendering context to draw to the element.
let ctx = canvas.getContext("2d");
var requestId = null;
let gameEngine = new Engine();
let pipe = new Pipe();

let player = gameEngine.player;
let lastTime;

//-------------------GAME LOOP-------------------
const gameLoop = (timeStamp) => {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  //time for
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  //make out player.
  player.draw(ctx);
  player.updateGravity(deltaTime, gameEngine.gravity);
  pipe.drawPipes(ctx);
  pipe.updatePipeMovement(deltaTime);

  //COLLISIONS.
  handleCollisions();
  if (gameEngine.gameRunning) {
    requestId = requestAnimationFrame(gameLoop);
  }
};

requestId = requestAnimationFrame(gameLoop);

//EVENT LISTNERE.
const handleKeyEvent = (e) => {
  if (e.code === "Space") {
    player.moveUp();
  }
};
window.addEventListener("keypress", handleKeyEvent);

//Handle all key events.

const handleCollisions = () => {
  let bottomPipeHeight = GAME_HEIGHT - pipe.pipeDimensions.bottomHeight * -1;

  if (
    (player.position.x >= pipe.position.x - 50 &&
      player.position.x - 50 <= pipe.position.x &&
      player.position.y <= GAME_HEIGHT &&
      player.position.y + 50 >= bottomPipeHeight) ||
    //TOP
    (player.position.x >= pipe.position.x - 50 &&
      player.position.x - 50 <= pipe.position.x &&
      player.position.y <= pipe.pipeDimensions.topHeight &&
      player.position.y >= 0)
  ) {
    gameEngine.pauseGame();
  }
};
const restartGame = () => {
  gameEngine.restartGame();
};

let restart = document.getElementById("restart");
restart.innerHTML = "Restart?";
restart.addEventListener("click", restartGame);
