class Engine {
  constructor(gameApp) {
    this.gravity = 0.1;
    this.player = new Player(GAME_WIDTH, GAME_HEIGHT, this.gravity);
    this.gameRunning = true;
    this.scoreCounter = 0;
    this.gameOverImage = document.getElementById("gameover");
    this.gameApp = gameApp;
  }

  drawBackground(ctx, backgroundImage) {
    ctx.drawImage(backgroundImage, 0, 0, 200, 500, 0, 0, 700, 500);
  }
  
  // change constructor property using setter
  set end(bool){
    this.gameRunning = bool;
  }
  // change constructor property using function 
  endGame() {
    // request animation will stop running 
    this.gameRunning = false;
  }

  restartGame() {
    window.location.reload();
  }

  updateScoreCounter() {
    this.scoreCounter++;
  }
  getPreviousScore() {
    let getItem = JSON.parse(localStorage.getItem("score"));
    if (!getItem) {
      throw new Error("Nothing in local storage.");
    }
    let max = 0;
    getItem.forEach((item) => {
      if (item > max) {
        max = item;
      }
    });
    return max;
  }
  updateLocalStorage() {
    let localStorageArray = JSON.parse(localStorage.getItem("score"));
    let array = [];
    if (localStorageArray) {
      array.push(...localStorageArray, this.scoreCounter);
    } else {
      array = [this.scoreCounter];
    }
    localStorage.setItem("score", JSON.stringify(array));
  }
  gameOver(ctx) {
    ctx.drawImage(this.gameOverImage, 0, 0);
  }
  restartButton() {}

  //Just using a simple boolean is not efficient because it doesn't take into account the different
  //speeds that a computer can run the program.
}
