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

let theWalkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw () {
  for (let someWalker of theWalkers) {
    someWalker.move();
    someWalker.display();
  }
}

function mousePressed() {
  let theGuy = new Walker(mouseX, mouseY);
  theGuy.colour = color(random(255), random(255), random(255));
  theWalkers.push(theGuy);
}

// Version with only 2 walkers

// let james;
// let vina;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   james = new Walker(width/2, height/2);
//   vina = new Walker(300, 500);
//   vina.colour = "green";
// }

// function draw() {
//   james.move();
//   vina.move();
//   james.display();
//   vina.display();
// }