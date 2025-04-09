let toruses = [];
let boxes = []; 
let cones = [];

function setup() {
  createCanvas(800, 600, WEBGL);
  angleMode(DEGREES);

  let numTorus = int(random(3, 7));
  let numBox = int(random(3, 7));

  for (let i = 0; i < numTorus; i++) {
    let x = random(-300, 300);
    let y = random(-200, 0);
    let z = random(-200, 200);
    let axis = random(['x', 'y', 'z']);
    toruses.push(new SpinningTorus(x, y, z, axis));
  }

  for (let i = 0; i < numBox; i++) {
    let x = random(-300, 300);
    let y = random(0, 200);
    let z = random(-200, 200);
    let axis = random(['x', 'y', 'z']);
    boxes.push(new SpinningBox(x, y, z, axis)); 
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
  lights();
  // Lights
  ambientLight(128);
  spotLight(2, 255, 25, 0, -height / 2, 1, 0, 0.5, -1, 30);

  orbitControl();

  for (let t of toruses) {
    t.update();
    t.display();
  }

  for (let b of boxes) {
    b.update();
    b.display();
  }
  for (let cone of cones) {
    cone.update();
    cone.display();
  }
}
