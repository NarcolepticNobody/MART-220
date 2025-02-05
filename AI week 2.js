// Player properties
let playerX = 200, playerY = 575, playerSpeed = 5, playerSize = 20;

// Moving obstacles
let p = 1, r = 200, i = 100, m = 100;
let xspeed = 3, yspeed = 3, espeed = 3, ospeed = 3;

var x = 100, y = 200, e = 200, o = 300, l = 400;
var side = 10;

// Random movement for shapes
let lSpeedX, mSpeedY;
let changeInterval = 60; // Change direction every 60 frames

// Randomly moving shapes
let shapes = [];

function setup() {
  createCanvas(400, 600);

  // Initialize random speeds for the purple rectangle
  lSpeedX = random(-2, 2);
  mSpeedY = random(-2, 2);

  // Create multiple randomly moving shapes
  for (let i = 0; i < 3; i++) {
    shapes.push({
      x: random(50, 350),
      y: random(50, 550),
      size: random(20, 40),
      speedX: random(-2, 2),
      speedY: random(-2, 2),
      type: random(['circle', 'triangle']) // Random shape type
    });
  }
}

function draw() {
  

  // Move pink rect (up/down bouncing)
  y -= yspeed;
  if (y < 0 || y > height - 90) yspeed *= -1;
  fill(255, 0, 56);
  rect(p, y, 10, 90);

  // Move dark green rect (left/right bouncing)
  e -= espeed;
  if (e < 0 || e > height - 90) espeed *= -1;
  fill(5, 85, 5);
  rect(r, e, 10, 90);

  // Move dark blue rect (up/down bouncing)
  i -= ospeed;
  if (i < 0 || i > height - 90) ospeed *= -1;
  fill(5, 0, 156);
  rect(o, i, 10, 90);

  // Move purple rect randomly
  if (frameCount % changeInterval === 0) {
    lSpeedX = random(-2, 2);
    mSpeedY = random(-2, 2);
  }
  l += lSpeedX;
  m += mSpeedY;

  // Bounce off walls
  if (l < 0 || l > width - 10) lSpeedX *= -1;
  if (m < 0 || m > height - 90) mSpeedY *= -1;

  fill(128, 0, 128, 200);
  rect(l, m, 10, 90);

  // Move and draw randomly moving shapes
  for (let shape of shapes) {
    shape.x += shape.speedX;
    shape.y += shape.speedY;

    // Bounce off walls
    if (shape.x < 0 || shape.x > width - shape.size) shape.speedX *= -1;
    if (shape.y < 0 || shape.y > height - shape.size) shape.speedY *= -1;

    fill(255, 165, 0); // Orange color

    if (shape.type === 'circle') {
      ellipse(shape.x, shape.y, shape.size);
    } else if (shape.type === 'triangle') {
      triangle(
        shape.x, shape.y - shape.size / 2,
        shape.x - shape.size / 2, shape.y + shape.size / 2,
        shape.x + shape.size / 2, shape.y + shape.size / 2
      );
    }

    // Collision detection with player
    if (collides(playerX, playerY, playerSize, shape.x, shape.y, shape.size, shape.size)) {
      playerSize -= 0.2; // Shrink player
    }
  }

  // Moveable player
  fill(200, 200, 78);
  square(playerX, playerY, playerSize);

  // Player movement
  if (keyIsPressed) {
    if (key === 'a' && playerX > 0) playerX -= playerSpeed;
    if (key === 'd' && playerX < width - playerSize) playerX += playerSpeed;
    if (key === 'w' && playerY > 0) playerY -= playerSpeed;
    if (key === 's' && playerY < height - playerSize) playerY += playerSpeed;
  }

  // Reset player size if too small
  if (playerSize < 5) {
    playerSize = 20;
    playerX = 200;
    playerY = 575;
  }

  // Display text
  textSize(19);
  fill(255);
  text('Dodge the Moving Shapes!', 200, 550);
  textSize(35);
  text('Watch Out!', 10, 50);
}

// Collision detection function
function collides(px, py, psize, ox, oy, osizeX, osizeY) {
  return px < ox + osizeX && px + psize > ox &&
         py < oy + osizeY && py + psize > oy;
}