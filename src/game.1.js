export default class Game {
  score = 0;
  lines = 0;
  level = 0;
  playField = this.createPlayField();

  /* [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
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
  ]; */

  activePiece = this.createPiece();

  nextPiece = this.createPiece();







  // Copying elements from block to playField
  getState() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    const playField = this.createPlayField();
    // const playField = this.playField; why won't work with this ????????

    for (let y = 0; y < this.playField.length; y++) {
      playField[y] = [];
      for (let x = 0; x < 10; x++) {
        playField[y][x] = this.playField[y][x];
      }
    }

    /* [0, 1, 0],
       [1, 1, 1],
       [0, 0, 0], */

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          playField[pieceY + y][pieceX + x] = blocks[y][x];
        }

      }
    }

    return {
      playField,
    }
  }


  // Creating the PlayField and filling it with 0s
  createPlayField() {
    const playField = [];

    for (let y = 0; y < 20; y++) {
      playField[y] = [];

      for (let x = 0; x < 10; x++) {
        playField[y][x] = 0;

      }
    }

    return playField;
  }


  createPiece() {
    return {
      x: 0, // initial position x
      y: 0, // initial position y

      get blocks() { // why only with get will work ?????????
        // return this.rotations[this.rotationIndex];
        return game.allTetroes().blocks[this.rotationIndex];
      },


      rotationIndex: 0,
      rotations: [
        [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 1],
          [0, 1, 0],
        ],
        [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
        ],
        [
          [0, 1, 0],
          [1, 1, 0],
          [0, 1, 0],
        ],
      ],

      //block: this.rotations[this.rotationIndex], why this won't work ???????
    }
  }


  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  }


  movePieceRight() {
    this.activePiece.x += 1;

    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  }


  movePieceDown() {
    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      this.updatePieces();

    }
  }


  rotatePiece() {
    this.activePiece.rotationIndex = this.activePiece.rotationIndex < 3 ? this.activePiece.rotationIndex + 1 : 0;

    if (this.hasCollision()) {
      this.activePiece.rotationIndex = this.activePiece.rotationIndex > 0 ? this.activePiece.rotationIndex - 1 : 3;
    }

    return this.activePiece.blocks;
  }


  hasCollision() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece; // destructuring

    /* [0, 1, 0],
       [1, 1, 1],
       [0, 0, 0], */

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] && // if inside the block there is 1
          ((this.playField[pieceY + y] === undefined || this.playField[pieceY + y][pieceX + x] === undefined) // if we are out from the (0-19) row range, or we are out of (0-9) column range
            || this.playField[pieceY + y][pieceX + x]) // ?????????????????
        ) {
          return true;
        }
      }
    }

    return false;
  }

  // Locking piece
  lockPiece() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playField[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }




  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }





  allTetroes() {
    const index = Math.floor(Math.random() * 7);
    const type = 'TJLOSZI'[index];
    const piece = { x: 0, y: 0, };

    switch (type) {
      case 'T':
        piece.blocks = [
          [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
          ],
          [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0],
          ],
          [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
          ],
          [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0],
          ],
        ];
        break;
      case 'J':
        piece.blocks = [
          [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
          ],
          [
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 1],
          ],
          [
            [1, 1, 0],
            [1, 0, 0],
            [1, 0, 0],
          ],
          [
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 0],
          ],
        ];
        break;
      case 'L':
        piece.blocks = [
          [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
          ],
          [
            [1, 1, 1],
            [1, 0, 0],
            [0, 0, 0],
          ],
          [
            [0, 1, 1],
            [0, 0, 1],
            [0, 0, 1],
          ],
          [
            [0, 0, 0],
            [0, 0, 1],
            [1, 1, 1],
          ],
        ];
        break;
      case 'O':
        piece.blocks = [
          [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0],
          ],
          [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0],
          ],
          [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0],
          ],
          [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0],
          ],
        ];
        break;
      case 'S':
        piece.blocks = [
          [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
          ],
          [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1],
          ],
          [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0],
          ],
          [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
          ],
        ];
        break;
      case 'Z':
        piece.blocks = [
          [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
          ],
          [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0],
          ],
          [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1],
          ],
          [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0],
          ],
        ];
        break;
      case 'I':
        piece.blocks = [
          [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
          ],
          [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
          ],
          [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
        ];
    }

    return piece;
  }





}









