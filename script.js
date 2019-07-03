import Game from './src/game.js';
import View from './src/view.js';

const root = document.querySelector('#root')

const game = new Game();
const view = new View(root, 280, 560, 20, 10);

window.game = game;
window.view = view;



// EVENT LISTENERS
document.addEventListener('keydown', event => {
  switch (event.which) {
    case 37: // Left
      game.movePieceLeft();
      view.render(game.getState());
      break;
    case 38: // Up
      game.rotatePiece();
      view.render(game.getState());
      break;
    case 39: // Right
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 40: // Down
      game.movePieceDown();
      view.render(game.getState());
      break;
  }
});

setInterval(() => {
  game.movePieceDown();
  view.render(game.getState());
  document.getElementById('sc-text').innerHTML = game.score;
}, 1000);

