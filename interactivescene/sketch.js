// Interactive Scene
// Tyler Hiebert
// Extra for experts: Using arrays to make a trail for the moveable circle
// Trail references:
// https://editor.p5js.org/move.mimi/sketches/H1flrLLVG
// https://editor.p5js.org/melodyloveless/sketches/l5GR7rWbF
// https://www.youtube.com/watch?v=XgHo-aoa5ts

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
  pos = createVector(windowWidth / 2, windowHeight / 2);
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
  // Draws a moveable circle
  fill("black");
  circle(pos.x, pos.y, diameter);
}

function circleControl() {
  // Sets the direction of movement based on the key pressed
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
  // Normalizes the velocity variable then moves the player
  vel.normalize();
  vel.x *= speed * sprintSpeed;
  vel.y *= speed * sprintSpeed;
  pos.add(vel);
  vel.x = 0;
  vel.y = 0;
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

function SprintTrail() {
  // While holding space the player has a ghost trail
  trail.push([pos.x, pos.y]);
  // Only has the trail while sprinting
  if (isSprinting) {
    // Draws the trail and makes it fade out
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

function speedControl() {
  mouseWheel();
}

function mouseWheel(scroll) {
  // Increases speed when you scroll up
  if (scroll.delta < 0) {
    speed += 1;
  }
  // Decreases speed when you scroll down
  if (scroll.delta > 0 && speed > 0) {
    speed -= 1;
  }
}