export default class View {
  static colors = {
    "1": "#FD7272", // T
    "2": "#f6b93b", // J
    "3": "#78e08f", // L
    "4": "#60a3bc", // O
    "5": "#CDDC39", // S
    "6": "#6a89cc", // Z
    "7": "#079992" // I
  };

  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");

    this.blockWidth = this.width / columns;
    this.blockHeight = this.height / rows;

    this.element.appendChild(this.canvas);
  }

  render({ playField }) {
    // from where it is restructured ????????????/
    this.clearScreen();
    this.renderPlayField(playField);
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderPlayField(playField) {
    for (let y = 0; y < playField.length; y++) {
      const line = playField[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];

        if (block) {
          this.renderBlock(
            x * this.blockWidth,
            y * this.blockHeight,
            this.blockWidth,
            this.blockHeight,
            View.colors[block]
          );
        }
      }
    }
  }

  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = "black";
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}
