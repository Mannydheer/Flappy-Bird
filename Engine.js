class Engine {
  constructor() {
    this.player = new Player(GAME_WIDTH, GAME_HEIGHT);
    this.gravity = 1;
    this.gameRunning = true;
    this.scoreCounter = 0;
  }

  drawBackground(ctx, backgroundImage) {
    ctx.drawImage(backgroundImage, 0, 0, 200, 500, 0, 0, 700, 500);
  }

  pauseGame() {
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
    if (localStorageArray.length > 0) {
      array.push(...localStorageArray, this.scoreCounter);
    } else {
      array = [this.scoreCounter];
    }
    console.log(array);

    localStorage.setItem("score", JSON.stringify(array));
  }

  //Just using a simple boolean is not efficient because it doesn't take into account the different
  //speeds that a computer can run the program.
}
