let circleX;
let circleY;
let speedX
let speedY
let diameter = 50;
let pos
let vel
let accelX = 1
let accelY = 1

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  circleX = windowWidth / 2
  circleY = windowHeight / 2
  pos = createVector(circleX, circleY)
  vel = createVector(0, 0)
  speedX = 0
  speedY = 0
}

function draw() {
  background(255);
  
  circleDraw();
  circleMove();
  vel.y = speedY
  vel.x = speedX
  pos.add(vel)
  friction()
  speedLimit()
  
}

function circleMove() {
  if (keyIsDown(87)) { //w
    speedY -= accelY;
  }
  if (keyIsDown(65)) { //a
    speedX -= accelX;
  }
  if (keyIsDown(83)) { //s
    speedY += accelY
  }
  if (keyIsDown(68)) { //d
    speedX += accelX;
  }
}

function circleDraw() {
  fill("black")
  circle(pos.x, pos.y, diameter)
}

function friction() {
  if (speedX > 0) {
    speedX -= (accelX / 2)
  }
  if (speedX < 0) {
    speedX += (accelX / 2)
  }
  if (speedY > 0) {
    speedY -= (accelY / 2)
  }
  if (speedY < 0) {
    speedY += (accelY / 2)
  }
}

function speedLimit() {
  if (speedX > 10) {
    speedX -= (accelX / 2)
  }
  if (speedX < -10) {
    speedX += (accelX / 2)
  }
  if (speedY > 10) {
    speedY -= (accelY / 2)
  }
  if (speedY < -10) {
    speedY += (accelY / 2)
  }
}