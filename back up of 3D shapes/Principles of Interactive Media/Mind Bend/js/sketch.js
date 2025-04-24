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
    cam = createCamera();
    cam.setPosition(600, 200, 900);
    cam.lookAt(100, 50, 190);
    textFont(font);
    textSize(36);
    fill('deeppink');
  
    let numTorus = 30;
    let numBox = int(random(3, 7));
  
    for (let i = 0; i < numTorus; i++) {
      let radius = random(200, 400);
      let angleOffset = map(i, 0, numTorus, 0, TWO_PI);
      let speedX = random(0.001, 0.01);
      let speedY = random(0.001, 0.01);
      toruses.push(new SpinningTorus(0, 0, speedX, speedY, radius, angleOffset));
    }
  
    for (let i = 0; i < 700; i++) {
      let radius = random(200, 250);
      let angleOffset = map(i, 0, numBox, 0, 50);
      boxes.push(new SpinningBox(radius, angleOffset));
    }
  
    for (let i = 0; i < 1; i++) {
      let x = 0;
      let y = 0;
      let z = 100;
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
    //pointLight(-1, 100, 5, 0, 0, 300);

    //text
    push();
    translate(0, -200, 0); // Move text in 3D space
    rotateX(PI); // Flip if needed (WEBGL flips Y axis)
    textFont(font);
    textSize(59);
    fill(320, 80, 100);    // HSB color if colorMode is HSB
    text("Mind Bend", 0, 0); // Render at center
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
  