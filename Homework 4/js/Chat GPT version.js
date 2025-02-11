let p = 1;
let r = 300;
let i = 100;
let z = 700;
let v = 500;

let xspeed = 3;
let yspeed = 3;
let espeed = 3;
let ospeed = 3;
let nspeed = 3;
let wspeed = 2;
let hspeed = 2;

let playerX = 200;
let playerY = 575;
let playerSpeed = 5;
let img1, img2, img3;

var x = 100;
var y = 200;
var e = 200;
var o = 300;
var l = 400;
var m = 100;
var w = 500;
var h = 700;

var side = 10;
var img;

// Star Citizen image variables (event timer movement)
var starX = 150;
var starY = 300;

// Pickle image movement variables (border movement)
var pickleX = 0;
var pickleY = 0;
var pickleSpeed = 2;
var pickleDirection = "right"; // Initial direction

// Chicken image movement (Bouncing effect)
let chickenY = 0;
let chickenSpeed = 1;

// Purple Circle (Pulsating effect)
let circleSize = 11;
let growing = true;

function preload() {
  img1 = loadImage("Chicken.png");
  img2 = loadImage("pickle.png");
  img3 = loadImage("Star citizen.png");
}

function setup() {
  createCanvas(500, 700);

  // Set a timer to change the position of Star Citizen every 2 seconds
  setInterval(moveStarCitizen, 2000);
}

function draw() {
  background(255);

  // Chicken image (Bobs up and down)
  chickenY += chickenSpeed;
  if (chickenY > 10 || chickenY < -10) {
    chickenSpeed *= -1; // Reverse direction
  }
  image(img1, 0, chickenY, 250, 300);

  // Star Citizen image moves every 2 seconds
  image(img3, starX, starY, 250, 200);

  // Pickle image moves around the border
  image(img2, pickleX, pickleY, 100, 100);

  if (pickleDirection === "right") {
    pickleX += pickleSpeed;
    if (pickleX + 100 >= width) {
      pickleDirection = "down";
    }
  } else if (pickleDirection === "down") {
    pickleY += pickleSpeed;
    if (pickleY + 100 >= height) {
      pickleDirection = "left";
    }
  } else if (pickleDirection === "left") {
    pickleX -= pickleSpeed;
    if (pickleX <= 0) {
      pickleDirection = "up";
    }
  } else if (pickleDirection === "up") {
    pickleY -= pickleSpeed;
    if (pickleY <= 0) {
      pickleDirection = "right";
    }
  }

  // Bright blue rectangle (Moves left & right)
  fill(5, 0, 200);
  rect(o, i, 10, 90);
  i -= ospeed;
  if (i < 0 || i > height - 90) {
    ospeed *= -1;
  }

  // Purple circle (Pulsates)
  fill(i, 0, 33, 90);
  circle(i, 400, circleSize);
  if (growing) {
    circleSize += 0.5;
    if (circleSize > 30) growing = false;
  } else {
    circleSize -= 0.5;
    if (circleSize < 10) growing = true;
  }

  // Pink rectangle (Moves up & down, speeds up randomly)
  fill(255, 0, 56);
  rect(p, y, 10, 90);
  y += yspeed;
  if (y < 0 || y > height - 90) {
    yspeed = random(2, 6) * -yspeed; // Random speed change
  }

  // Dark green rectangle (Moves diagonally, bounces off edges)
  fill(5, y, 5);
  rect(r, e, 10, 90);
  e += espeed;
  r += espeed;
  if (e < 0 || e > height - 90 || r < 0 || r > width - 10) {
    espeed *= -1;
  }

  // Moveable player (Controlled by user)
  fill(25, 100, 78);
  square(playerX, playerY, 20);

  if (keyIsPressed) {
    if (key == 'a') {
      playerX -= playerSpeed;
    } else if (key == 'd') {
      playerX += playerSpeed;
    } else if (key == 'w') {
      playerY -= playerSpeed;
    } else if (key == 's') {
      playerY += playerSpeed;
    }
  }

  // Text with custom font
  textSize(19);
  textFont('Lobster'); // Use the font directly
  fill(0);
  text('Alexis Huotte', 250, 550);


}

// Function to randomly move Star Citizen every 2 seconds
function moveStarCitizen() {
  starX = random(0, width - 250);
  starY = random(0, height - 200);
}
