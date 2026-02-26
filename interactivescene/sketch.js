let circleX;
let circleY;
let speed;
let diameter = 50;
let pos;
let vel;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  circleX = windowWidth / 2;
  circleY = windowHeight / 2;
  pos = createVector(circleX, circleY);
  vel = createVector(0, 0);
  speed = 10;
}

function draw() {
  background(255);
  
  circleDraw();
  circleControl();
  circleMove();
}

function circleDraw() {
  fill("black");
  circle(pos.x, pos.y, diameter);
}

function circleControl() {
  if (keyIsDown(87)) { //w
    vel.y = -1;
  }
  if (keyIsDown(65)) { //a
    vel.x = -1;
  }
  if (keyIsDown(83)) { //s
    vel.y = 1;
  }
  if (keyIsDown(68)) { //d
    vel.x = 1;
  }
}

function circleMove() {
  vel.normalize();
  vel.x *= speed;
  vel.y *= speed;
  pos.add(vel);
  vel.x = 0
  vel.y = 0
}