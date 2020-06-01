class Engine {
  constructor() {
    this.player = new Player(GAME_WIDTH, GAME_HEIGHT);
  }

  //Just using a simple boolean is not efficient because it doesn't take into account the different
  //speeds that a computer can run the program.
  gameLoop(timeStamp) {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    let lastTime = 0;
    let deltaTime;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    deltaTime = timeStamp - lastTime;
    // this.lastTime = timeStamp;
    // this.player.draw(this.ctx);
    // this.player.update(this.deltaTime);
    window.requestAnimationFrame(this.gameLoop);
  }

  //display background.
}
