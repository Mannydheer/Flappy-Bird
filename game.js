//rendering context to draw to the element.
//need to clear canvas as new canvas gets re-rendered.
let gameEngine = new Engine();
window.onload = function () {
  window.requestAnimationFrame(gameEngine.gameLoop);
};
