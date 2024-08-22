function setup() {
  // Two-dimensional canvas, left is for before, right is for after
  createCanvas(800, 400);
  noStroke();
}

function drawGrid(cols, rows, gridSize, baseColor) {
  for (let i = 1; i < cols; i++) {
    baseColor.setGreen((255 * i) / cols);
    for (let j = 1; j < rows; j++) {
      baseColor.setBlue((255 * j) / rows);
      // Calculate the position of the point in the grid
      const x = (i * gridSize) / cols;
      const y = (j * gridSize) / rows;

      // Set the fill color before drawing the ellipse
      fill(baseColor);
      // Draw the point, map size with position in the grid
      const minSize = 5;
      const maxSize = 20;

      const sizeX = map(x, 0, gridSize, minSize, maxSize);
      const sizeY = map(y, 0, gridSize, minSize, maxSize);

      ellipse(x, y, sizeX, sizeY);
    }
  }
}

function drawReactive(cols, rows, gridSize, baseColor) {
  for (let i = 1; i < cols; i++) {
    baseColor.setGreen((255 * i) / cols);
    for (let j = 1; j < rows; j++) {
      baseColor.setBlue((255 * j) / rows);
      // Calculate the position of the point in the grid
      const x = (i * gridSize) / cols;
      const y = (j * gridSize) / rows;

      // Set the fill color before drawing the ellipse
      fill(baseColor);
      // Draw the point, map size with position in the grid
      const minSize = 5;
      const maxSize = 20;

      // map mouseX, change the size of the ellipse
      const mappingX = map(mouseX, 0, width, 0, gridSize);
      const mappingY = map(mouseY, 0, height, 0, gridSize);

      // Map the distance to the size of the ellipse
      let sizeX = map(mappingX, 0, gridSize, minSize, maxSize);
      let sizeY = map(mappingY, 0, gridSize, minSize, maxSize);

      // Placement in the grid influence the size
      const distance = dist(x, y, mappingX, mappingY);
      const maxSizeDistance = dist(0, 0, gridSize, gridSize);
      const sizeDistance = map(distance, 0, maxSizeDistance, maxSize, minSize);

      // The final size is the minimum of the two
      sizeX = min(sizeX, sizeDistance);
      sizeY = min(sizeY, sizeDistance);

      ellipse(x, y, sizeX, sizeY);
    }
  }
}

function draw() {
  const gridSize = 300;

  background(220);
  fill(0);
  text(`${mouseX}, ${mouseY}`, 10, 10);

  // First canvas
  translate(20, 20);
  drawGrid(15, 15, gridSize, color(255, 0, 0));

  // Move to the second canvas, draw the reactive
  translate(400 + 20, 0);
  drawReactive(15, 15, gridSize, color(0, 0, 255));
}
