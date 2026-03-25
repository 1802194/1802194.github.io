// Character in Grid Demo
// Tyler Hiebert

const CELL_SIZE = 50;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
let grid;
let rows;
let cols;
let thePlayer = {
  x:0,
  y:0,
};
let pathImg;
let wallImg;

function preload() {
  pathImg = loadImage("paving 5.png");
  wallImg = loadImage("rock 2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height / CELL_SIZE);
  cols = Math.floor(width / CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  //add player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  displayGrid();
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y <= rows; y++) {
    newGrid.push([]);
    for (let x = 0; x <= cols; x ++) {
      if (random(100) < 50) {
        newGrid[y].push(IMPASSIBLE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === IMPASSIBLE) {
        image(wallImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      if (grid[y][x] === OPEN_TILE) {
        image(pathImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      if (grid[y][x] === PLAYER) {
        fill("Red");
        rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);
}

function toggleCell(x ,y) {
  //make sure the cell actually exists!
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === IMPASSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
    else if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
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

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}

function movePlayer(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE) {
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