class BrickHandler {
  static setBrickRowNumbers(bricks){
    return Array.isArray(bricks[0])
      ? bricks.length
      : 1;
  }

  constructor(bricks, brickRoot){
    this._bricks = {};
    this._brickRoot = brickRoot;
    this._rootDemensions = {
      width: document.getElementById(brickRoot).offsetWidth,
      height: document.getElementById(brickRoot).offsetHeight
    };
    this._rowsOfBricks = BrickHandler.setBrickRowNumbers(bricks);

    this.generateBricks(bricks);
  };

  /**
   * Returns object with bricks
   * @returns {{}}
   */
  get bricks() {
    return this._bricks;
  };

  /**
   * Returns brick rows
   * @returns {*}
   */
  get rowsOfBricks() {
    return this._rowsOfBricks;
  }

  /**
   * Get root width
   * @returns {number | *}
   */
  get rootWidth() {
    return this._rootDemensions.width;
  }

  /**
   * Get root height
   * @returns {number | *}
   */
  get rootHeight(){
    return this._rootDemensions.height;
  }

  /**
   * Get a brick by index
   * @param index
   * @returns {*}
   */
  fetchBrickByIndex(index) {
    return this.getBricksAsArray()[index];
  };

  /**
   * Register damage to a brick
   * @param brickId
   * @param dmg
   */
  registerBrickDamage(brickId, dmg){
    this.bricks[brickId].registerDamage(dmg);
  }

  /**
   * Generate object of bricks with ids as keys
   * @param bricks
   */
  generateBricks(bricks) {
    let i = 0;

    for (let brick of bricks){
      const brickId = guidGenerator();
      this._bricks[brickId] = new Brick(
        brick.health,
        brick.color,
        brickId,
        this.destroyBrick.bind(this),
        this.setBrickDimensions(bricks.length),
        i
      );

      i++;
    }
  };

  /**
   * Deprecated
   * @param bricksInRow
   * @returns {{width: number, height: number}}
   */
  setBrickDimensions(bricksInRow){
    return {
      width: this.rootWidth / bricksInRow,
      height: this.rootHeight / this.rowsOfBricks > 30
        ? 30
        : this.rootHeight / this.rowsOfBricks
    }
  }

  /**
   * Returns all the bricks as an array
   * @returns {Bricks[]}
   */
  getBricksAsArray(){
    return Object.keys(this.bricks).map((item) => this.bricks[item]);
  }

  /**
   * Append all the bricks to a given rootDiv
   */
  appendBrickToRoot() {
    Object.keys(this.bricks).forEach((brickId) => {
      document.getElementById(this._brickRoot).appendChild(this.bricks[brickId].brick);
      this.bricks[brickId].setBrickCords();
    });
  }

  /**
   * Destroys a brick and removes it
   * @param id
   */
  destroyBrick(id) {
    this.bricks[id].destroy();
    delete this.bricks[id];
  };
}