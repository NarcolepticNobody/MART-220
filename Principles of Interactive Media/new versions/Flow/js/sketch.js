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
  createCanvas(800, 600, WEBGL);
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
    cam.setPosition(600, 200, 900);  // camera x, y, z
    cam.lookAt(100, 50, 190);         // point the camera looks at

  let numTorus = int(random(100, 70));
  let numBox = int(random(3, 7));

  for (let i = 0; i < 45; i++) {
    let radius = (200, 200);
    let angleOffset = map(i, 0, numTorus, 0, 800); //change to 100 for a noodle!
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
    orbitControl();
  
    //ambientLight(255); // bright white ambient light
    pointLight(255, 100, 0, 100, 50, 0);   // red from right
    pointLight(255, 255, 255, -200, 255, 255);  // green from left
    pointLight(0, 0, 255, 0, -200, 0);  // blue from top
    spotLight(255, 255, -200, -300, -300, 300, 300, 100, -1, PI / 600, 500);

    //text
    push();
    translate(0, -200, 0); // Move text in 3D space
    rotateX(PI);           // Flip if needed (WEBGL flips Y axis)
    textFont(font);
    textSize(59);
    fill(320, 80, 100);    // HSB color if colorMode is HSB
    text("Flow", 0, 0); // Render at center
    pop();

        //text
        push();
        translate(-450, 300, 50); // Move text in 3D space
        rotateX(PI);           
        textFont(font);
        textSize(59);
        fill(320, 80, 100);    
        text("how do you feel?", 0, 0); 
        pop();
    
/*ambientLight(299, 0, 100);
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
  