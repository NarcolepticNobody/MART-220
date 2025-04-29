let toruses = [];
let boxes = [];
let cones = [];
let angle = 0;
let myFont;
let cam;
let font;

function preload() {
  font = loadFont('assets/inconsolata.otf'); // No slash at the beginning
}

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  colorMode(HSB, 360, 100, 100); // Enables HSB colors
  angleMode(DEGREES);
  cam = createCamera(); // hmmmmmm
 
  textFont(font);
  textSize(36);
  fill('red');

  // Create and set up the camera
  cam = createCamera();
  cam.setPosition(600, 200, 900);  // camera x, y, z
  cam.lookAt(100, 50, 190);         // point the camera looks at
  //
  let numTorus = int(random(100, 70));
  let numBox = int(random(3, 7));
  //
  for (let i = 0; i < 100; i++) {
    let radius = (100, 300);
    let angleOffset = map(i, 0, numTorus, 0, 100); //change to 100 for a noodle!
    toruses.push(new SpinningTorus(radius, angleOffset));
  }

  /*for (let i = 0; i < 6; i++) {
    let radius = random(150, 250);
    let angleOffset = map(i, 0, numTorus, 70, 200);
    toruses.push(new SpinningTorus(radius, angleOffset));
  }
  */

  for (let i = 0; i < 400; i++) {
    let radius = (400, 300);
    let angleOffset = map(i, 800, numBox, 70, 900);
    boxes.push(new SpinningBox(radius, angleOffset));
  }


  for (let i = 0; i < 1; i++) {
    let x = (-10, -10);
    let y = (-100, -100);
    let z = (100, 100);
    let axis = (['x', 'y', 'z']);
    cones.push(new SpinningCone(x, y, z, axis));
  }
}


function draw() {
  background(30);
  //ambientLight(60);
  //pointLight(255, 255, 255, 0, -200, 300);
  //directionalLight(200, 200, 200, 1, -1, -1);


// Cheerful yellow sunlight from above
directionalLight(255, 255, 100, 0, -1, 0);

  // Warm orange sunset fill
  pointLight(255, 165, 0, -300, 0, 100);

  // Passionate red side glow
  pointLight(255, 50, 50, 300, 0, 0);
  
  // Bright golden-yellow highlight from above
  directionalLight(255, 255, 100, 0, -1, 0);
  //orbitControl();


  // === Camera rotation logic ===
  let radius = 900; // Distance from center
  let camX = radius * cos(angle * 0.1);
  let camZ = radius * sin(angle * 0.1);
  let camY = 200; // Keep camera slightly above center

  cam.setPosition(camX, camY, camZ);
  cam.lookAt(0, 0, 0); // Always look at the center

 /* ambientLight(299, 0, 100);
  directionalLight(255, 255, 255, 0.25, 0.25, -1);
  pointLight(-1, 100, 5, 0, 0, 300);
*/

  // "Flow" text
  push();
  let flowTextPos = createVector(0, -300, 0);
  let camPos = createVector(cam.eyeX, cam.eyeY, cam.eyeZ);
  let dir = p5.Vector.sub(camPos, flowTextPos);
  let thetaY = atan2(dir.x, dir.z);
  translate(flowTextPos.x, flowTextPos.y, flowTextPos.z);
  rotateY(thetaY);
  textFont(font);
  textSize(59);
  fill(320, 80, 100);
  textAlign(CENTER, CENTER);
  text("Abrupt", 0, 0);
  pop();


  // "how do you feel?" text
  push();
  let feelTextPos = createVector(-200, 300, 50);
  dir = p5.Vector.sub(camPos, feelTextPos);
  thetaY = atan2(dir.x, dir.z);
  translate(feelTextPos.x, feelTextPos.y, feelTextPos.z);
  rotateY(thetaY);
  textFont(font);
  textSize(59);
  fill(320, 80, 100);
  textAlign(CENTER, CENTER);
  text("how do you feel?", 0, 0);
  pop();



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
