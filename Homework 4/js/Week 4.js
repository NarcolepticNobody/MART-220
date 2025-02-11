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
let imgSpeed = 2;

let lSpeedX, mSpeedY;
let myFont;

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
// Star Citizen image position and speed
var starX = 150;
var starY = 300;
var starSpeedX = 2;
var starSpeedY = 2;

// Pickle image movement variables
var pickleX = 0;
var pickleY = 0;
var pickleSpeed = 2;
var pickleDirection = "right";

function preload() {
  img1 = loadImage("Chicken.png");
  img2 = loadImage("pickle.png");
  img3 = loadImage("Star citizen.png");
}

function setup() {
  createCanvas(500, 700);
}

function draw() {
  background(255);

  //chicken
  image(img1, 0, 0, 250, 300);

  //pickle
  // Move pickle around the border
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

  //bright blue rect
  fill(5, 0, 200);
  rect(o, i, 10, 90);
  i -= ospeed;

  if (i < 0 || i > height - 90) {
    ospeed *= -1;
  }
  // Move and bounce Star Citizen image
  image(img3, starX, starY, 250, 200);
  starX += starSpeedX;
  starY += starSpeedY;

  // Bounce off edges
  if (starX <= 0 || starX + 250 >= width) {
    starSpeedX *= -1;
  }
  if (starY <= 0 || starY + 200 >= height) {
    starSpeedY *= -1;
  }

  // Draw the purple circle
  fill(i, 0, 33, 90);
  circle(i, l, 11);

  //pink rect
  fill(255, 0, 56);
  rect(p, y, 10, 90);

  if (y < 0 || y > height - 90) {
    yspeed *= -1;
  }

  //dark green rect
  fill(5, y, 5);
  rect(r, e, 10, 90);
  e -= espeed;
  if (e < 0 || e > height - 90) {
    espeed *= -1;
  }

  //moveable player
  fill(25, 100, 78);
  square(playerX, playerY, 20);

  if (keyIsPressed)
    if (key == "a") {
      playerX -= playerSpeed;
    } else if (key == "d") {
      playerX += playerSpeed;
    } else if (key == "w") {
      playerY -= playerSpeed;
    } else if (key == "s") {
      playerY += playerSpeed;
    }

  textSize(50);
  fill(0);
  textFont('Lobster'); 
  text("Alexis", 100, 400);

  // Function to randomly move Star Citizen
  function moveStarCitizen() {
    starX = random(0, width - 250); 
    starY = random(0, height - 200); 
  }
}
