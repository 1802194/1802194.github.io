// Project Title
// Your Name

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 2;
    this.colour = "red";
    this.speed = 5;
  }

  display() {
    fill(this.colour);
    stroke(this.colour);
    circle(this.x, this.y, this.diameter);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else {
      //right
      this.x += this.speed;
    }
  }
}

let james;
let vina;

function setup() {
  createCanvas(windowWidth, windowHeight);
  james = new Walker(width/2, height/2);
  vina = new Walker(300, 500);
  vina.colour = "green";
}

function draw() {
  james.move();
  vina.move();
  james.display();
  vina.display();
}