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
let enemies = [];
let enemy;
let enemySpawner; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  playerPos = createVector(windowWidth / 2, windowHeight / 2);
  playerVel = createVector(0, 0);
  spawnEnemy();
  enemySpawner = setInterval(spawnEnemy, 5000);

}

function draw() {
  background(220);

  playerDraw();
  playerControl();
  sprintController();
  sprintTrail();
  playerMove();
  mapBoundary();
  enemyManager();
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

function mapBoundary() {
  // Keeps the player from leaving the screen
  if (playerPos.x > windowWidth) {
    playerPos.x -= playerSpeed * sprintSpeed;
  }
  if (playerPos.x < 0) {
    playerPos.x += playerSpeed * sprintSpeed;
  }
  if (playerPos.y > windowHeight) {
    playerPos.y -= playerSpeed * sprintSpeed;
  }
  if (playerPos.y < 0) {
    playerPos.y += playerSpeed * sprintSpeed;
  }
}

function sprintController() {
  // Holding shift doubles speed
  if (keyIsDown(16)) { //shift
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

function spawnEnemy() {
  // Function that can be called in order to spawn an enemy
  enemy = {
    pos: createVector(0,0),
    vel: createVector(0,0),
    distanceFromPlayer: createVector(0,0),
    diameter: 50,
    health: 100,
    speed: 5
  };
  enemies.push(enemy);
}

function displayEnemy(theEnemy) {
  // Function that draws an enemy on the scene
  fill("red");
  circle(theEnemy.pos.x, theEnemy.pos.y, theEnemy.diameter);
}

function moveEnemy(theEnemy) {
  // Causes an enemy to move towards the player
  theEnemy.distanceFromPlayer.x = playerPos.x - theEnemy.pos.x;
  theEnemy.distanceFromPlayer.y = playerPos.y - theEnemy.pos.y;
  theEnemy.vel = theEnemy.distanceFromPlayer;
  theEnemy.vel.normalize();
  theEnemy.vel.x *= theEnemy.speed;
  theEnemy.vel.y *= theEnemy.speed;
  theEnemy.pos.add(theEnemy.vel);
  theEnemy.vel.x = 0;
  theEnemy.vel.y = 0;
}

function collisionDetection(theEnemy) {
  // Detects when an enemy makes contact with the player
  if (dist(theEnemy.pos.x, theEnemy.pos.y, playerPos.x, playerPos.y) < 45) {
    enemies.splice(theEnemy, 1);
  }
}

function enemyManager() {
  // Calls functions needed to keep enemies working properly
  for (let theEnemy of enemies) {
    displayEnemy(theEnemy);
    moveEnemy(theEnemy);
    collisionDetection(theEnemy);
  }
}