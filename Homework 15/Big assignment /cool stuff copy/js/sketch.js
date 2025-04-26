let toruses = [];
let boxes = [];
let cones = [];
let spheres = [];
let globalAngle = 0;
let angle = 0;
let myFont;
let cam;
let font;

function preload() {
    font = loadFont('assets/inconsolata.otf'); // No slash at the beginning
  }



function setup() {
  createCanvas(1000, 700, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  colorMode(HSB, 360, 100, 100); // Enables HSB colors
  angleMode(DEGREES);

  cam = createCamera(); // hmmmmmm

  fill('deeppink');
  textFont(font);
  textSize(36);
  
  

   // Create and set up the camera
    cam = createCamera();
    cam.setPosition(800, 900, 1900);  // camera x, y, z
    cam.lookAt(100, 50, 290);         // point the camera looks at

  let numTorus = int(random(100, 70));
  let numBox = int(random(2, 7));

  for (let i = 0; i < 400; i++) {
    let radius = (700, 200);
    let angleOffset = map(i, 0, numTorus, 0, 100); //change to 100 for a noodle!
    toruses.push(new SpinningTorus(radius, angleOffset));
  }
  

  for (let i = 0; i < 900; i++) {
    let radius = (400, 900);
    let angleOffset = map(i, 80, numBox, 70, 900);
    boxes.push(new SpinningBox(radius, angleOffset)); //outer rim
  }

  for (let i = 0; i < 700; i++) {
    let radius = (200, 1200);
    let angleOffset = map(i, 80, numBox, 90, 1200);
    boxes.push(new SpinningBox(radius, angleOffset)); //outer rim2
  }

  for (let i = 0; i < 900; i++) {
    let radius = random(1, 800);
    let angleOffset = map(i, 800, numBox, 70, 900); //change to 900 for the cool thing
    boxes.push(new SpinningBox(radius, angleOffset));
  }


  for (let i = 0; i < 100; i++) {
    let radius = random(200, 800);
    let angleOffset = map(i, 1, numBox, 7, 900); //change to 900 for the cool thing
    let axisOptions = ['x', 'y', 'z'];
    let axis = random(axisOptions);
    cones.push(new SpinningCone(radius, angleOffset, axis));
  }
    
}

function draw() {
  background(30);
  orbitControl();

  // === Lighting ===

// Lights for metallic green vibe
ambientLight(50); // soft ambient base

// Slight green-ish tint from the top front
pointLight(100, 255, 100, 0, -200, 200);

// Cool bluish fill from the side
pointLight(100, 150, 255, -300, 0, 0);

// Neutral white highlight from top right
directionalLight(255, 255, 255, 1, -1, -1);

// Bright green light from below
pointLight(0, 255, 100, 0, 300, 0);

// Subtle rim light from the left side
directionalLight(150, 150, 255, -1, 0, 0);

/*    // === Camera rotation logic ===
let radius = 900; // Distance from center
let camX = radius * cos(angle * 0.1);
let camZ = radius * sin(angle * 0.1);
let camY = 200; // Keep camera slightly above center

cam.setPosition(camX, camY, camZ);
cam.lookAt(0, 0, 0); // Always look at the center
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
text("", 0, 0);
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
text("", 0, 0);
pop();

// Draw simple sparkly stars in the background
push();
resetMatrix(); // resets transforms so stars don't rotate with the scene
camera(); // resets the camera
noStroke();
for (let i = 0; i < 100; i++) {
  fill(255, random(150, 255)); // white with slight twinkle
  ellipse(random(width), random(height), random(1, 3));
}
pop();

    angle += 1;
    globalAngle += 0.01; // slowly orbit all cones
  
    for (let t of toruses) {
      t.update(angle);
      t.display();
    }
  
    for (let b of boxes) {
      b.update(angle);
      b.display();
    }
    
  
    for (let cone of cones) {
      cone.update(globalAngle);
      cone.display();
    }

    for (let s of spheres) {
      s.update();
      s.display();
    }
  }
  
  
  