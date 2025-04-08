var shape1, shape2, shape3, shape4, shape5;
var shapes = [];
var currentNumber = 0;
function setup()
{
    createCanvas(800,800, WEBGL);
    shape1 = new Box(random(100,200),random(100,200), .02, .05, 50, 25);
    shape2 = new Torus(random(-50,-200),random(-10,-200), .01, .1, 30, 20);
    shape3 = new Torus(random(-50,-200),random(80,300), .08, .03, 80, 40);
    shape4 = new Torus(random(-20,-10),random(80,600), .09, .03, 70, 40);
    shape5 = new Torus(random(-10,-100),random(800,300), .08, .03, 80, 90);
    
    shapes[0] = shape1;
    shapes[1] = shape2;
    shapes[2] = shape3;
    shapes[3] = shape4;
    shapes[4] = shape5;



    setInterval(changeShape, 1000);
}

function draw()
{
    background(120,100, 40);
   // console.log(round(random(0,2)));
    
   shapes[currentNumber].draw();
      // Enable orbiting with the mouse.
  orbitControl();

  // Draw the cone.
  // Set its radius to 30 and height to 50.
  // Set its detailX to 24 and detailY to 2.
  cone(30, 50, 24, 2);
}



function changeShape()
{
    currentNumber = round(random(0,2));
}