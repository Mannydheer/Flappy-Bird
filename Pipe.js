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
  }

  //display background.
  drawPipes(ctx) {
    let image = document.getElementById("bottomPipe");
    let topImage = document.getElementById("topPipe");

    ctx.drawImage(
      image,
      0,
      0,
      this.pipeDimensions.width,
      250,
      this.position.x,
      GAME_HEIGHT,
      50,
      this.pipeDimensions.bottomPipe
    );
    //rotate.

    ctx.drawImage(
      topImage,
      0,
      0,
      this.pipeDimensions.width,
      250,
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
