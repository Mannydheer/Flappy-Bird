class Pipe extends Engine {
  constructor(posX) {
    super();
    this.position = {
      x: posX,
      y: 0,
    };
    this.pipeDimensions = {
      width: 50,
      bottomPipe: -randomGenerator(200, 100),
      topPipe: randomGenerator(200, 100),
    };
    this.bottomPipeImage = document.getElementById("bottomPipe");
    this.topPipeImage = document.getElementById("topPipe");
  }

  //display background.
  drawPipes(ctx) {
    ctx.drawImage(
      this.bottomPipeImage,
      0,
      0,
      this.pipeDimensions.width,
      250,
      this.position.x,
      GAME_HEIGHT,
      50,
      this.pipeDimensions.bottomPipe
    );

    ctx.drawImage(
      this.topPipeImage,
      0,
      0,
      this.pipeDimensions.width,
      350,
      this.position.x,
      this.position.y,
      50,
      this.pipeDimensions.topPipe
    );
  }
  updatePipeMovement(deltaTime) {
    (this.position.x -= 1) / deltaTime;
    if (this.position.x <= 0) {
      this.createPipe();
    }
  }

  createPipe() {
    this.position.x = GAME_WIDTH - 50;
    //create a new pipe with random top and bottom heights.
    this.pipeDimensions.bottomPipe = -randomGenerator(200, 100);
    this.pipeDimensions.topPipe = randomGenerator(200, 100);
  }
}

const randomGenerator = (MAX, MIN) => {
  return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
};
