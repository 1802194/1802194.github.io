let circleX;
let circleY;
let speed;
let diameter = 50;
let pos;
let vel;
let sprintSpeed;
let isSprinting = false;
let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  circleX = windowWidth / 2;
  circleY = windowHeight / 2;
  pos = createVector(circleX, circleY);
  vel = createVector(0, 0);
  speed = 10;
  sprintSpeed = 1;
}

function draw() {
  background(255);
  
  circleDraw();
  circleControl();
  sprintController();
  SprintTrail();
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
  vel.x *= speed * sprintSpeed;
  vel.y *= speed * sprintSpeed;
  pos.add(vel);
  vel.x = 0;
  vel.y = 0;
}

function sprintController() {
  if (keyIsDown(32)) { //spacebar
    isSprinting = true;
    sprintSpeed = 2;
  }
  else {
    isSprinting = false;
    sprintSpeed = 1;
  }
}

function SprintTrail() {
  trail.push([pos.x, pos.y]);
  if (isSprinting) {
    for (t=0; t<trail.length; t++) {
      let alpha = 255 * (t/trail.length/2);
      fill(0,0,0,alpha);
      console.log(alpha);
      circle(trail[t][0], trail[t][1], diameter);
    }
    if (trail.length > 5) {
      trail.shift();
    }
  }
  else {
    if (trail.length > 0) {
      trail.shift();
    }
  }
}