let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
let canvas = document.getElementById("gameCanvas");
//rendering context to draw to the element.
let ctx = canvas.getContext("2d");
//Engine instantiatio
let gameEngine = new Engine(document.getElementById("gameApp"));
//Pipe instantiation
let pipe = new Pipe(GAME_WIDTH);
let pipe1 = new Pipe(GAME_WIDTH + 200);
let pipe2 = new Pipe(GAME_WIDTH + 400);
//Player instantiation.
let player = gameEngine.player;
//GET PREVIOUS SCORE.
//-------------------GAME LOOP-------------------
let lastTime;
//background.
let backgroundImage = document.getElementById("background");
const gameLoop = (timeStamp) => {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  //backgorund.
  gameEngine.drawBackground(ctx, backgroundImage);

  //time for
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  //PIPE.
  player.draw(ctx);
  player.updateGravity(deltaTime, gameEngine.gravity);
  pipe.drawPipes(ctx);
  pipe.updatePipeMovement(deltaTime);
  pipe1.drawPipes(ctx);
  pipe1.updatePipeMovement(deltaTime);
  pipe2.drawPipes(ctx);
  pipe2.updatePipeMovement(deltaTime);
  //SCOREBOARD INCREMENT.
  handleScoreBoard();

  //COLLISIONS.
  handleCollisions();
  if (gameEngine.gameRunning) {
    requestAnimationFrame(gameLoop);
  } else {
    //gameOvermessage.
    gameEngine.gameOver(ctx);
    handleRestartButton();
  }
};
requestAnimationFrame(gameLoop);
//------------------------EVENTLISTENER---------------
//FUNCTION TRIGGERED FROM EVENT LISTENER.
const handleKeyEvent = (e) => {
  if (e.code === "Space") {
    player.moveUp();
  }
};
window.addEventListener("keypress", handleKeyEvent);

//---------------------COLLISIONS---------------------
//CHECKING FOR COLLISIONS WITH PIPE.
//give the array the same name as the pipe instantiations above.
let pipeArray = [pipe, pipe1, pipe2];
const handleCollisions = () => {
  //Loop through each of the pipes and check for collisions,
  pipeArray.forEach((pipe) => {
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
      gameEngine.endGame(); //bool will be false
      //update score to local storage.
      gameEngine.updateLocalStorage();
      //show Gameover button.
    }
    //When the X position is equal to the any of the pipes, it will increment by one.
    else if (player.position.x === pipe.position.x) {
      gameEngine.updateScoreCounter();
    }
  });
};

//------------------RESTART-----------------
const restartGame = () => {
  gameEngine.restartGame();
};
const handleRestartButton = () => {
  let restart = document.createElement("button");
  restart.id = "restart";
  gameEngine.gameApp.appendChild(restart);
  restart.innerHTML = "Restart?";
  restart.addEventListener("click", restartGame);
};

// ------------- SCOREBOARD.-------------------
let score = document.createElement("div");
score.id = "scoreBoard";
gameEngine.gameApp.appendChild(score);
//handle score incrementing.
const handleScoreBoard = () => {
  score.innerText = `CurrentScore: ${gameEngine.scoreCounter}`;
};
//---------------GET PREVIOUS SCORE. -------------------
let previousScore = document.createElement("div");
previousScore.id = "previousScore";
gameEngine.gameApp.appendChild(previousScore);
const handlePreviousScore = () => {
  previousScore.innerText = `PreviousScore: ${gameEngine.getPreviousScore()}`;
};
handlePreviousScore();
