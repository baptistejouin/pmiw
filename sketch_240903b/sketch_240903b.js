// https://youtu.be/JSRaZshSaI8

const gridSize = 300;
const radius = 200;
let rightBaseColor;

function setup() {
  createCanvas(800, 400);
  noStroke();

  rightBaseColor = randomBaseColor()
}

function drawGrid(cols, rows, baseColor) {
  for (let i = 1; i < cols; i++) {
    baseColor.setGreen((255 * i) / cols);
    for (let j = 1; j < rows; j++) {
      baseColor.setBlue((255 * j) / rows);

      const x = (i * gridSize) / cols;
      const y = (j * gridSize) / rows;

      fill(baseColor);

      const size = map(x, 0, gridSize, 5, 20);

      ellipse(x, y, size, size);
    }
  }
}

function drawReactive(cols, rows, baseColor) {
  for (let i = 1; i < cols; i++) {
    baseColor.setGreen((255 * i) / cols);
    for (let j = 1; j < rows; j++) {
      baseColor.setBlue((255 * j) / rows);

      const x = (i * gridSize) / cols;
      const y = (j * gridSize) / rows;

      fill(baseColor);

      const minSize = 5;
      const maxSize = 20;

      const distance = dist(x, y, mouseX - 420, mouseY); // adjust mouse coordinates for the right grid

      let size = minSize;
      if (distance < radius) {
        const growthFactor = map(distance, 0, radius, 20, 5);
        size = growthFactor;
      }

      ellipse(x, y, size, size);
    }
  }
}

function randomBaseColor() {
  let hue = random(360);
  let saturation = random(60, 100); // keep saturation high for vibrant colors
  let brightness = random(70, 100); // keep brightness high for a lighter (more pleasant gradient)
  return color(hue, saturation, brightness);
}

function draw() {
  background(220);
  fill(0);
  text(`Mouse coords: x:${mouseX}, y:${mouseY}`, 10, 10);

  // first grid
  translate(20, 20);
  drawGrid(15, 15, color(140, 60, 10));

  // second grid
  translate(400, 0);
  drawReactive(15, 15, rightBaseColor);
}

function mousePressed() {
  rightBaseColor = randomBaseColor();
}
