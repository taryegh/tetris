export default class Game {
  score = 0;
  lines = 0;
  level = 0;
  playField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  activePiece = {
    x: 0,
    y: 0,
    blocks: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  }

  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.isPieceOutOfBounds()) {
      this.activePiece.x += 1;
    }
  }


  movePieceRight() {
    this.activePiece.x += 1;

    if (this.isPieceOutOfBounds()) {
      this.activePiece.x -= 1;
    }
  }


  movePieceDown() {
    this.activePiece.y += 1;

    if (this.isPieceOutOfBounds()) {
      this.activePiece.y -= 1;
    }
  }


  isPieceOutOfBounds() {
    const playField = this.playField;
    const { x, y } = this.activePiece;

    // will return true if y is out of (0-19) range or if x is out of (0-9) range
    return playField[y] === undefined || playField[y][x] === undefined
  }

  
  lockPiece() {
    const { x: pieceX, y: pieceY, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        this.playField[pieceY + y][pieceX + x] = blocks[y][x];
      }
    }
  }

}





