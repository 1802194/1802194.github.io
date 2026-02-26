// Image Demo

let circleImg;

function preload() {
  circleImg = loadImage("purplecircle.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(0);
  image(circleImg, mouseX, mouseY, circleImg.width, circleImg.height);
}
