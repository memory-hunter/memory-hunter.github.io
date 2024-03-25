function playSound() {
  document.getElementById("startSound").play();
  new p5(sketch);
  document.getElementById("startButton").style.display = "none";
  document.getElementById("unleash").style.display = "none";
  document.getElementById("textOverlay").style.display = "block";
}
var sketch = function (p) {
  var blocks = [];
  var blockSize = 25;
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.frameRate(60);
    var numBlocksX = p.floor(p.windowWidth / blockSize) / 4;
    var numBlocksY = (p.floor(p.windowHeight / blockSize) / 4) * 1.5;
    p.camera(0, -700, 0, 0, 0, 0, 0, 0, 1);
    for (let i = 0; i < numBlocksX * numBlocksY; i++) {
      blocks.push({
        x: (i % numBlocksX) * blockSize - (numBlocksX * blockSize) / 2,
        y: p.floor(i / numBlocksX) * blockSize - (numBlocksY * blockSize) / 2,
        h: p.random(20, 100),
      });
    }
  };
  p.draw = function () {
    p.background(0, 2, 12);
    let time = p.millis();
    let duration = 8000;
    let angle = p.map(time, 0, duration, 0, 0.5);
    if (time < duration - 1000) {
      let x = p.map(time, 0, duration, -p.width / 2, p.width / 2);
      p.pointLight(255, 255, 255, x, -450, 0);
      p.push();
      p.rotateY(angle);

      for (let i = 0; i < blocks.length; i++) {
        p.push();
        p.translate(blocks[i].x, -blocks[i].h / 2 - 200, blocks[i].y);
        p.ambientMaterial(0, 100, 255);
        p.box(20, blocks[i].h, 20);
        p.pop();
      }

      p.pop();

      let height;
      if (time < duration / 2) {
        height = p.lerp(-700, -600, time / (duration / 2));
      } else {
        height = p.lerp(-600, 0, (time - duration / 2) / (duration / 2));
      }
      p.camera(0, height, 0, 0, 0, 0, 0, 0, 1);
    } else {
      if (!window.location.href.includes("index2.html")) {
        window.location.href = "index2.html";
        p.noLoop();
      }
    }
  };
};
