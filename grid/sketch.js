// Grid Demo
// Tyler Hiebert

let theGrid = [[1,1,1,1], 
               [1,1,1,1],
               [1,1,1,1],
               [1,1,1,1]];

const SQUARE_DIMENSIONS = theGrid.length;

let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = width/SQUARE_DIMENSIONS;
  }
  else {
    cellSize = height/SQUARE_DIMENSIONS;
  }
}

function draw() {
  background(220);
  showGrid();
}

function showGrid() {
  for (let y=0; y < SQUARE_DIMENSIONS; y++) {
    for (let x=0; x < SQUARE_DIMENSIONS; x++) {
      if (theGrid[y][x] === 1) {
        fill("black");
      }
      if (theGrid[y][x] === -1) {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function mouseClicked() {
  theGrid[mouseY][mouseX] *= -1;
}