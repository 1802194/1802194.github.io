// 2D Grid Project
// Tyler Hiebert
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 16;
const COLS = 16;
const OPEN_TILE = 0;
const DIRT = 1;
const PLAYER = 9;
let cellSize;
let thePlayer = {
  x:0,
  y:0,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (windowWidth <= windowHeight) {
    cellSize = windowWidth / COLS;
  }
  else {
    cellSize = windowHeight / ROWS;
  }
  grid = generateRandomGrid(COLS, ROWS);

  //add player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  displayGrid();
}

function generateRandomGrid(COLS, ROWS) {
  let newGrid = [];
  for (let y = 0; y <= ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x <= COLS; x ++) {
      if (random(100) < 50) {
        newGrid[y].push(DIRT);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === DIRT) {
        fill("Black");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === OPEN_TILE) {
        fill("White");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === PLAYER) {
        fill("Red");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //self
  toggleCell(x, y);
}

function toggleCell(x ,y) {
  //make sure the cell actually exists!
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    if (grid[y][x] === DIRT) {
      grid[y][x] = OPEN_TILE;
    }
    else if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = DIRT;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(COLS, ROWS);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  if (key === "e") {
    grid = generateEmptyGrid(COLS, ROWS);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  if (key === "s") {
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "w") {
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "a") {
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  if (key === "d") {
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function generateEmptyGrid(COLS, ROWS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}

function movePlayer(x, y) {
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    // Previous position
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;

    // Moving the player to new location
    thePlayer.x = x;
    thePlayer.y = y;
  
    // Adding player to grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;

    // reset the old location to be an open tile
    grid[oldY][oldX] = 0;
  }
}