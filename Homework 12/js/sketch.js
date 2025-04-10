let toruses = [];
let boxes = [];
let cones = [];
let angle = 0;


function setup() {
  createCanvas(800, 600, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  

  let numTorus = int(random(3, 7));
  let numBox = int(random(3, 7));

  for (let i = 0; i < numTorus; i++) {
    let radius = random(150, 250);
    let angleOffset = map(i, 0, numTorus, 0, 360);
    toruses.push(new SpinningTorus(radius, angleOffset));
  }

  for (let i = 0; i < numBox; i++) {
    let radius = random(150, 250);
    let angleOffset = map(i, 0, numBox, 0, 360);
    boxes.push(new SpinningBox(radius, angleOffset));
  }

  for (let i = 0; i < 4; i++) {
    let x = random(-200, 200);
    let y = random(-150, 150);
    let z = random(-100, 100);
    let axis = random(['x', 'y', 'z']);
    cones.push(new SpinningCone(x, y, z, axis));
  }
}

function draw() {
    background(30);
    orbitControl();
  
    // Good lighting setup
    ambientLight(299, 0, 100);
    directionalLight(255, 255, 255, 0.25, 0.25, -1);
    pointLight(-1, 100, 5, 0, 0, 300);
  
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
  