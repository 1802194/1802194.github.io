// Array/Object Notation Assignment
// Tyler Hiebert
// March 5/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerDiameter = 50;
let playerPos;
let playerVel;
let playerSpeed = 10;
let sprintSpeed = 1;
let isSprinting = false;
let playerTrail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  playerPos = createVector(windowWidth / 2, windowHeight / 2);
  playerVel = createVector(0, 0);
}

function draw() {
  background(220);

  playerDraw();
  playerControl();
  sprintController();
  sprintTrail();
  playerMove();
}

function playerDraw() {
  // Draws a moveable circle
  fill("black");
  circle(playerPos.x, playerPos.y, playerDiameter);
}

function playerControl() {
  // Sets the direction of movement based on the key pressed
  if (keyIsDown(87)) { //w
    playerVel.y = -1;
  }
  if (keyIsDown(65)) { //a
    playerVel.x = -1;
  }
  if (keyIsDown(83)) { //s
    playerVel.y = 1;
  }
  if (keyIsDown(68)) { //d
    playerVel.x = 1;
  }
}

function playerMove() {
  // Normalizes the velocity variable then moves the player
  playerVel.normalize();
  playerVel.x *= playerSpeed * sprintSpeed;
  playerVel.y *= playerSpeed * sprintSpeed;
  playerPos.add(playerVel);
  playerVel.x = 0;
  playerVel.y = 0;
}

function sprintController() {
  // Holding space doubles speed
  if (keyIsDown(32)) { //spacebar
    isSprinting = true;
    sprintSpeed = 2;
  }
  else {
    isSprinting = false;
    sprintSpeed = 1;
  }
}

function sprintTrail() {
  // While holding space the player has a ghost trail
  playerTrail.push([playerPos.x, playerPos.y]);
  // Only has the trail while sprinting
  if (isSprinting) {
    // Draws the trail and makes it fade out
    for (t=0; t<playerTrail.length; t++) {
      let alpha = 255 * (t/playerTrail.length/2);
      fill(0,0,0,alpha);
      circle(playerTrail[t][0], playerTrail[t][1], playerDiameter);
    }
    if (playerTrail.length > 5) {
      playerTrail.shift();
    }
  }
  else {
    if (playerTrail.length > 0) {
      playerTrail.shift();
    }
  }
}