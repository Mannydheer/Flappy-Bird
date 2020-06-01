class Player {
  constructor(GAME_WIDTH, GAME_HEIGHT) {
    (this.width = 50),
      (this.height = 50),
      (this.position = {
        x: GAME_WIDTH / 2,
        y: GAME_HEIGHT - 50,
      });
  }

  draw(ctx) {
    //this will make our player.
    ctx.fillStyle = "green";
    //creating player.
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    //velocity =  deltaDistance/deltaTime
    if (this.position.x < GAME_WIDTH - 50) {
      // this.position.x += 5 / deltaTime;
    } else {
      // this.position.x = GAME_WIDTH / 2;
    }
  }
}
