var canvas = document.getElementById("gameCanvas");
//rendering context to draw to the element.
var ctx = canvas.getContext("2d");

const GAME_WIDTH = 700;
const GAME_HEIGHT = 700;
//need to clear canvas as new canvas gets re-rendered.

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let player = new Player(GAME_WIDTH, GAME_HEIGHT);

//create player.
let timeStamp = new Date().getTime();

const gameLoop = (timeStamp) => {
  player.draw(ctx);
  window.requestAnimationFrame(gameLoop);
};
window.requestAnimationFrame(gameLoop);
