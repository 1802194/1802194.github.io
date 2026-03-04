// Ball Array Demo

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  for (let ball of ballArray) {
    //move
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x > windowWidth + ball.radius) {
      ball.x = 0 - ball.radius;
    }
    if (ball.x < 0 - ball.radius) {
      ball.x = windowWidth + ball.radius;
    }
    if (ball.y > windowHeight + ball.radius) {
      ball.y = 0 - ball.radius;
    }
    if (ball.y < 0 - ball.radius) {
      ball.y = windowHeight + ball.radius;
    }

    //display
    fill(ball.r,ball.g,ball.b);
    circle(ball.x, ball.y, ball.radius * 2);
  }
}

function mousePressed() {
  spawnBall(mouseX, mouseY);
}

function spawnBall(_x, _y) {
  let someBall = {
    x:_x,
    y:_y,
    dx:random(-5, 5),
    dy:random(-5, 5),
    radius:random(10, 30),
    r:random(0,255),
    g:random(0,255),
    b:random(0,255),

  };
  ballArray.push(someBall);
}