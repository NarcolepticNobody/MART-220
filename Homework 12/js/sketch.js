let toruses = [];
let boxes = [];
let cones = [];
let angle = 0;
let myFont;
let cam;

function setup() {
  createCanvas(800, 600, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  colorMode(HSB, 360, 100, 100); // Enables HSB colors
  angleMode(DEGREES);
    // Create and set up the camera
    cam = createCamera();
    cam.setPosition(700, 200, 900);  // camera x, y, z
    cam.lookAt(100, 50, 10);         // point the camera looks at
  

  let numTorus = int(random(3, 7));
  let numBox = int(random(3, 7));

  for (let i = 0; i < 40; i++) {
    let radius = random(200, 400);
    let angleOffset = map(i, 0, numTorus, 0, 900);
    toruses.push(new SpinningTorus(radius, angleOffset));
  }
  /*for (let i = 0; i < 6; i++) {
    let radius = random(150, 250);
    let angleOffset = map(i, 0, numTorus, 70, 200);
    toruses.push(new SpinningTorus(radius, angleOffset));
  }
*/
  for (let i = 0; i < 30; i++) {
    let radius = random(150, 250);
    let angleOffset = map(i, 0, numBox, 0, 360);
    boxes.push(new SpinningBox(radius, angleOffset));
  }

  for (let i = 0; i < 9; i++) {
    let x = random(-100, 100);
    let y = random(-100, 100);
    let z = random(-100, 100);
    let axis = (['x', 'y', 'z']);
    cones.push(new SpinningCone(x, y, z, axis));
  }
}

function draw() {
    background(30);
    //orbitControl();
  
    
    pointLight(255, 100, 0, 100, 50, 0);   // red from right
    pointLight(255, 255, 255, -200, 255, 255);  // green from left
    pointLight(0, 0, 255, 0, -200, 0);  // blue from top
    spotLight(255, 255, 200, 300, -300, 300, 300, 100, -1, PI / 600, 500);

  /*
   ambientLight(299, 0, 100);
   directionalLight(255, 255, 255, 0.25, 0.25, -1);
   pointLight(-1, 100, 5, 0, 0, 300);
  */

   
    angle += 1;
  
 
 

    for (let t of toruses) {
      t.update(angle);
      t.display();
    }
  
    for (let b of boxes) {
      b.update(angle);
      b.display();
    }
  
    for (let cone of cones) {
      cone.update();
      cone.display();
    }
   



  }
  