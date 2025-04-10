let toruses = [];
let boxes = [];
let cones = [];
let angle = 0;
let myFont;

function setup() {
  createCanvas(800, 600, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  

  let numTorus = int(random(3, 7));
  let numBox = int(random(3, 7));

  for (let i = 0; i < 40; i++) {
    let radius = random(150, 250);
    let angleOffset = map(i, 0, numTorus, 0, 360);
    toruses.push(new SpinningTorus(radius, angleOffset));
  }

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
    orbitControl();
  
    
    pointLight(255, 100, 0, 100, 50, 0);   // red from right
    pointLight(255, 255, 255, -200, 255, 255);  // green from left
    pointLight(0, 0, 255, 0, -200, 0);  // blue from top
    spotLight(255, 255, 200, 300, -300, 300, 300, 100, -1, PI / 600, 500);
  
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
  