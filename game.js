// var canvas = document.getElementById("gameCanvas");
// //rendering context to draw to the element.
// var ctx = canvas.getContext("2d");

//Just using a simple boolean is not efficient because it doesn't take into account the different
//speeds that a computer can run the program.
var canvas = document.getElementById("gameCanvas");
//rendering context to draw to the element.
var ctx = canvas.getContext("2d");
let gameEngine = new Engine();
//player class.
let player = gameEngine.player;
let lastTime;
//-------------------GAME LOOP-------------------
const gameLoop = (timeStamp) => {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  //time for
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  player.draw(ctx);
  player.update(deltaTime);
  window.requestAnimationFrame(gameLoop);
};
window.requestAnimationFrame(gameLoop);

// ----------------SPRITES ---------------------
// let tree = (document.getElementById(
//   "image"
// ).style.backgroundPosition = `-256px 0px`);
