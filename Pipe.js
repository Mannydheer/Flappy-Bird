class Pipe extends Engine {
  constructor() {
    super();
    this.position = {
      x: GAME_WIDTH - 50,
      y: 0,
    };
    this.pipeDimensions = {
      width: 50,
      bottomHeight: -randomGenerator(200, 100),
      topHeight: randomGenerator(200, 100),
    };
  }

  //display background.
  drawPipes(ctx) {
    Engine.prototype.ctx = ctx;
    ctx.fillStyle = "green";
    //top pipe
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.pipeDimensions.width,
      this.pipeDimensions.topHeight
    );
    //bottom pipe.
    ctx.fillRect(
      this.position.x,
      GAME_HEIGHT,
      this.pipeDimensions.width,
      this.pipeDimensions.bottomHeight
    );
  }
  updatePipeMovement(deltaTime) {
    if (this.position.x + 50 > 0) {
      (this.position.x -= 3) / deltaTime;
    } else {
      this.position.x = GAME_WIDTH - 50;
      this.pipeDimensions.bottomHeight = -randomGenerator(200, 100);
      this.pipeDimensions.topHeight = randomGenerator(200, 100);
    }
  }
}

const randomGenerator = (MAX, MIN) => {
  return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
};
