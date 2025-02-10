let p = 1;
let r = 200;
let i = 100;

let xspeed = 3;
let yspeed = 3;
let espeed = 3;
let ospeed = 3;
let nspeed = 3;
let changeInterval = 60; // Change direction every 60 frames
let lSpeedX, mSpeedY;


let playerX = 200; 
let playerY = 575; 
let playerSpeed = 5;


var x = 100;
var y = 200;
var e = 200;
var o = 300;
var l = 400;
var m = 100;
var side = 10;

function setup() 
{
  createCanvas(400,600);
   lSpeedX = random(-3, 3);
  mSpeedY = random(-3, 3);
  
}

function draw() 
{

   // Change direction every 'changeInterval' frames
  if (frameCount % changeInterval === 0) {
    lSpeedX = random(-3, 3);
    mSpeedY = random(-3, 3);
  }

  // Move the purple rectangle
  l += lSpeedX;
  m += mSpeedY;

  // Boundary check to make it bounce off edges
  if (l < 0 || l > width - 10) lSpeedX *= -1;
  if (m < 0 || m > height - 90) mSpeedY *= -1;

  // Draw the purple rectangle
  fill(i, 0, 56, 90);
  rect(l, m, 10, 90);
  
  
  // Draw the purple rectangle
  fill(i, 0, 33, 90);
  circle(i, l, 11);
  
  
  y -= yspeed;

 
  //pink rect
  fill(255,0,56);
  rect(p,y,10,90);
  
    if (y < 0 || y > height - 90)
{
    yspeed*= -1;
}
  
 //purple rect 
  fill(p,r,56,90);//add p,y,56,90
  rect(l,m,10,90);
    l -= nspeed;
      if (l < 0 || l > height - 90)
{
    nspeed*= -1;
}
  
  
 //dark green rect 
  fill(5,y,5);
  rect(r,e,10,90);
  e -= espeed;
      if (e < 0 || e > height - 90)
{
    espeed*= -1;
}
  
 //bright blue rect 
   fill(5,0,200);
  rect(o,i,10,90); 
    i -= ospeed;

    if (i < 0 || i > height - 90)
{
    ospeed*= -1;
}
   //dark blue rect 
   fill(5,0,56);
  rect(x,y,10,90); 
  if (rect.x > width || rect.x < 0) 
    
    {
   rect.xspeed = rect. xspeed * -1
    }
  
   if (rect.y > width || rect.y < 0)  
  
     
     
     
  //moveable player 
  fill(25,100,78);
  square(playerX,playerY,20);
  
 if (keyIsPressed) 
 
    if (key == 'a') {
      playerX -= playerSpeed;
    } else if (key == 'd') {
      playerX += playerSpeed;
    } else if (key == 'w') {
      playerY -= playerSpeed;
    } else if (key == 's') {
      playerY += playerSpeed; 
 }
  textSize(19);
  fill(0)
  text('Alexis Huotte', 250,550);
   textSize(50);
  fill(0)
  text('slice', 1,50);
  

}