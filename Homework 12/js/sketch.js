let toruses = [];
let boxes = []; // ✅ Don't use 'box'

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
    boxes.push(new SpinningBox(x, y, z, axis)); // ✅ Use new name
  }
}

function draw() {
  background(30);
  lights();

  for (let t of toruses) {
    t.update();
    t.display();
  }

  for (let b of boxes) {
    b.update();
    b.display();
  }
}
