// Ball Collision OOP

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(15, 30);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this. radius * 2);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    //check top/bottom for bounce
    if (this.y < 0 + this.radius || this.y > height - this.radius) {
      this.dy *= -1;
    }
    //left/right
    if (this.x < 0 + this.radius || this.x > width - this.radius) {
      this.dx *= -1;
    }
  }

  bounceOff(otherBall) {
    let radiiSum = this.radius + otherBall.radius;
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    if (radiiSum > distanceApart) {
      //hitting each other
      let tempx = this.dx;
      let tempy = this.dy;
      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      otherBall.dx = tempx;
      otherBall.dy = tempy;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  for (let ball of ballArray) {
    ball.move();
    for (let otherBall of ballArray) {
      //avoid detecting self
      if (ball !== otherBall) {
        ball.bounceOff(otherBall);
      }
    }
    ball.display();
  }
}

function mousePressed() {
  let theBall = new Ball(mouseX, mouseY);
  ballArray.push(theBall);
}