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
  x:7,
  y:7,
};
let grid;
let levelOne;

function preload() {
  levelOne = loadJSON("level-1.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (windowWidth <= windowHeight) {
    cellSize = windowWidth / COLS;
  }
  else {
    cellSize = windowHeight / ROWS;
  }
  grid = levelOne;

  //add player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === DIRT) {
        stroke("Brown");
        fill("Brown");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === OPEN_TILE) {
        stroke("Black");
        fill("Black");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === PLAYER) {
        stroke("Red");
        fill("Red");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
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