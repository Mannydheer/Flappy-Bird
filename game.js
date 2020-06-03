let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let canvas = document.getElementById("gameCanvas");
//rendering context to draw to the element.
let ctx = canvas.getContext("2d");
//Engine instantiatio
let gameEngine = new Engine();
//Pipe instantiation
let pipe = new Pipe(GAME_WIDTH - 50);
//Player instantiation.
let player = gameEngine.player;
//-------------------GAME LOOP-------------------
let lastTime;
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
    requestAnimationFrame(gameLoop);
  }
};
requestAnimationFrame(gameLoop);

//FUNCTION TRIGGERED FROM EVENT LISTENER.
const handleKeyEvent = (e) => {
  if (e.code === "Space") {
    player.moveUp();
  }
};
//EVENT LISTENER FOR WINDOW.
window.addEventListener("keypress", handleKeyEvent);

//CHECKING FOR COLLISIONS WITH PIPE.
const handleCollisions = () => {
  let bottomPipeHeight = GAME_HEIGHT - pipe.pipeDimensions.bottomPipe * -1;
  if (
    //BOTTOM PIPE COLLISION.
    (player.position.x >= pipe.position.x - 50 &&
      player.position.x - 50 <= pipe.position.x &&
      player.position.y <= GAME_HEIGHT &&
      player.position.y + 50 >= bottomPipeHeight) ||
    //TOP PIPE COLLISION
    (player.position.x >= pipe.position.x - 50 &&
      player.position.x - 50 <= pipe.position.x &&
      player.position.y <= pipe.pipeDimensions.topPipe &&
      player.position.y >= 0)
  ) {
    //IF THERE IS A COLLUSION.
    gameEngine.pauseGame();
  }
};

//------------------RESTART-----------------
const restartGame = () => {
  gameEngine.restartGame();
};
let restart = document.getElementById("restart");
restart.innerHTML = "Restart?";
restart.addEventListener("click", restartGame);

// ------------- CREATING  A PIPE.-------------------
setInterval(() => {
  pipe.createPipe();
}, 7000);
