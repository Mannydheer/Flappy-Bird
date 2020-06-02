// var canvas = document.getElementById("gameCanvas");
// //rendering context to draw to the element.
// var ctx = canvas.getContext("2d");

//Just using a simple boolean is not efficient because it doesn't take into account the different
//speeds that a computer can run the program.
var canvas = document.getElementById("gameCanvas");
//rendering context to draw to the element.
var ctx = canvas.getContext("2d");
let gameEngine = new Engine();
let pipe = new Pipe();
//player class.
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

  window.requestAnimationFrame(gameLoop);
};
const init = () => {
  window.requestAnimationFrame(gameLoop);
};

init();

//EVENT LISTNERE.
const handleKeyEvent = (e) => {
  if (e.code === "Space") {
    player.moveUp();
  }
};
window.addEventListener("keypress", handleKeyEvent);

//Handle all key events.

const handleCollisions = () => {
  let pipeDiff = GAME_HEIGHT - pipe.pipeDimensions.bottomHeight * -1;
  console.log(pipeDiff, "PIPE");
  console.log(player.position.y, "PLAYER");

  if (
    player.position.x >= pipe.position.x &&
    player.position.x <= pipe.position.x + 50 &&
    player.position.y <= GAME_HEIGHT &&
    player.position.y + 50 > pipeDiff
  ) {
    window.cancelAnimationFrame();
  }
};
