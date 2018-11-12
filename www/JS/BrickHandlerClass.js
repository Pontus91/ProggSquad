class BrickHandler {
  constructor(bricks){
    this._bricks = {};

    this.generateBricks(bricks);
  };

  generateBricks(bricks) {
    for (let brick of bricks){
      const brickId = guidGenerator();
      const newBrick = new Brick(
        brick.health,
        brick.color,
        brickId,
        this.destroyBrick
      );

      this._bricks[brickId] = {
        id: brickId,
        brick: newBrick
      }
    }
  };

  get bricks() {
    return this._bricks;
  };

  destroyBrick(id) {
    this.bricks[id].destroy();
    delete this.bricks[id];
  };
}