class Player {
  constructor(GAME_WIDTH, GAME_HEIGHT) {
    (this.width = 50),
      (this.height = 50),
      (this.position = {
        x: (GAME_WIDTH - 50) / 2,
        y: GAME_HEIGHT / 2,
      });
  }

  draw(ctx) {
    //this will make our player.
    ctx.fillStyle = "black";
    //creating player.
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  updateGravity(deltaTime, gravity) {
    // boundary for x.
    if (this.position.y < GAME_HEIGHT - 50) {
      (this.position.y += gravity) / deltaTime;
    } else {
      this.position.y = GAME_HEIGHT / 2;
    }
    //add error for when he passes the point.
  }

  moveUp() {
    this.position.y -= 30;
  }
}
