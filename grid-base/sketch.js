// 2D Grid Project
// Tyler Hiebert
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 16;
const COLS = 16;
const OPEN_TILE = 0;
const DIRT = 1;
const BOULDER = 2;
const ENEMY = 8;
const PLAYER = 9;
let cellSize;
let thePlayer = {
  x:7,
  y:7,
};
let grid;
let levelOne;
let theEnemy = {
  x:0,
  y:0,
  isHunting:false,
};
let gameState = 0;

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
  // Only keeps the game running until you win or lose
  if (gameState === 0) {
    displayGrid();
  }
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === DIRT) {
        stroke("rgb(80, 47, 4)");
        fill("rgb(80, 47, 4)");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === OPEN_TILE) {
        stroke("Black");
        fill("Black");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === BOULDER) {
        stroke("Gray");
        fill("Gray");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        if (grid[y+1][x] === OPEN_TILE || grid[y+1][x] === ENEMY) {
          grid[y][x] = OPEN_TILE;
          grid[y+1][x] = BOULDER;
        }
      }
      if (grid[y][x] === PLAYER) {
        stroke("Blue");
        fill("Blue");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === ENEMY) {
        stroke("red");
        fill("red");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function keyPressed() {
  if (key === "s") {
    // Moves down
    enemyContact(thePlayer.x, thePlayer.y + 1);
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "w") {
    // Moves up
    enemyContact(thePlayer.x, thePlayer.y - 1);
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "a") {
    // Moves left
    enemyContact(thePlayer.x - 1, thePlayer.y);
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  if (key === "d") {
    // Moves Right
    enemyContact(thePlayer.x + 1, thePlayer.y);
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS && grid[y][x] !== BOULDER) {
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

function enemyContact(x, y) {
  // Ends the game when the player touches an enemy
  if (grid[y][x] === ENEMY) {
    gameState = 1;
  }
}