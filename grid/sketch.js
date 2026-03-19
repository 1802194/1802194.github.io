// Grid Demo
// Tyler Hiebert

// let theGrid = [[1,1,1,1], 
//                [1,1,1,1],
//                [1,1,1,1],
//                [1,1,1,1]];

let theGrid;
const SQUARE_DIMENSIONS = 10;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = width/SQUARE_DIMENSIONS;
  }
  else {
    cellSize = height/SQUARE_DIMENSIONS;
  }
  theGrid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
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
  theGrid[Math.floor(mouseY / cellSize)][Math.floor(mouseX / cellSize)] *= -1;
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y ++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x ++) {
      if (random(100) < 50) {
        newGrid[y].push(-1);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}