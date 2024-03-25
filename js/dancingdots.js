let hoverSound = document.getElementById("hover-sound");
let clickSound = document.getElementById("click-sound");
let entrySound = document.getElementById("entry-sound");
let loopSound = document.getElementById("loop-sound");

window.onload = function () {
  entrySound.play();
};

entrySound.onended = function () {
  loopSound.play();
};

let menuEntries = document.getElementsByClassName("menu-entry");
for (let i = 0; i < menuEntries.length; i++) {
  menuEntries[i].addEventListener("mouseover", function () {
    hoverSound.play();
  });
  menuEntries[i].addEventListener("click", function (e) {
    clickSound.play();
  });
}

let circles = [];
let time = 0;
let rotation = 0;

function setup() {
  let canvas = createCanvas(windowWidth / 2.5, windowHeight, WEBGL);
  canvas.parent("canvas-container");
  frameRate(60);
  let speeds = [1, 1.5, 2];
  for (let i = 0; i < 6; i++) {
    circles.push(new Circle(i, speeds[i % 3]));
  }
}

function draw() {
  background(0, 2, 12);
  time += 0.01;
  rotation += 0.01;
  rotateY(rotation);
  circles.forEach((circle) => {
    circle.update();
    circle.display();
  });
}

class Circle {
  constructor(offset, speed) {
    this.offset = offset;
    this.speed = speed;
  }

  update() {
    let radius = 200;
    this.pos = createVector(
      radius * cos(time * this.speed + this.offset),
      radius * sin(time * this.speed + this.offset),
      0
    );
  }

  display() {
    stroke(0, 100, 255);
    strokeWeight(0.5);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(12);
    pop();
  }
}
