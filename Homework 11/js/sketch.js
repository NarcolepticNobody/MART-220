
var animation = [];
var run = [];
var idleStrings = [];
var runStrings = [];
var foodArray = [];
var treeArray = [];
var logArray = [];
var attackArray = [];
var particles = [];
var flipX = false;
var moving = false;
var score = 0;
var countdown = 30;
var timeLeft = 20;
var health = 50;
var maxHealth = 100;
var startTime;
var img, img2;
let good, bad, end, song;
var myAnimation;

// Preload assets
function preload() {

    soundFormats('mp3', 'ogg', 'wav');
    song = loadSound("assets/melody.mp3");
    good = loadSound("assets/yes.mp3");
    bad = loadSound("assets/442602__topschool__ow-sound.mp3");
    end = loadSound("assets/wampp.mp3");
    idleStrings = loadStrings('txtfiles/idle.txt');
    runStrings = loadStrings('txtfiles/run.txt');
    treeStrings = loadStrings('txtfiles/tree.txt');
    logStrings = loadStrings('txtfiles/log.txt')
    attackStrings = loadStrings('txtfiles/attack2.txt')
    //img = loadImage('trees/PineTree 01.png');
    //img2 = loadImage('assets/log.png');

}

// Setup function
function setup() {
    createCanvas(1280, 600);

    startTime = millis();
    myAnimation = new character(150, 200);
    myAnimation.loadAnimation('idle', idleStrings);
    myAnimation.loadAnimation('run', runStrings);
    myAnimation.loadAnimation('attack', attackStrings);

    // Create food objects
    for (let i = 0; i < 30; i++) {

        let isGood = random([true, false]);
        let myFood = new food(random(50, width - 50), random(50, height - 50), isGood);
        foodArray.push(myFood);
    }
    
     // Create tree objects
     for (let i = 0; i < treeStrings.length; i++) {
        
        let myTree = new tree(random(50, width - 50), random(50, height - 50), 40, 40);
        treeArray.push(myTree);
    }

     // Create log objects
     for (let i = 0; i < logStrings.length; i++) {
        
        let myLog = new log(random(50, width - 50), random(50, height - 50), 40, 40);
        logArray.push(myLog);
    }

}



// Draw function
function draw() {

    background(40, 100, 10);
    updateHealth(health, maxHealth);
    collidesWithTree();

//particles
    for (let i = 0; i < 1; i++) {
        let p = new Particle();
        particles.push(p);

      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) {

          // remove this particle
          //particleArray[i].particlePiece.remove();
        }
      }

    // Border
    push();
    stroke(0);
    strokeWeight(20);
    noFill();
    rect(0, 0, width, height);
    pop();

    //Health Bar
    textSize(20);
    fill(255, 215, 0);
    text("Health Bar", width / 2 - 40, height / 1.04);

    // Display food
    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].draw();

        // Check collision with character
        if (myAnimation.isColliding(foodArray[i].foodPiece)) {
            if (foodArray[i].isGood) {
                score++;
                health = min(health + 5, maxHealth);
                good.play();
            } else {
                score--;
                health = max(health - 10, 0);
                bad.play();
            }
            foodArray[i].foodPiece.remove();
        }
    }

    // Keyboard controls
    if (keyIsDown(68)) { // 'D' key
        myAnimation.updatePosition('forward');
        myAnimation.draw('run');
    } else if (keyIsDown(65)) { // 'A' key
        myAnimation.updatePosition('reverse');
        myAnimation.draw('run');
    } else if (keyIsDown(87)) { // 'W' key
        myAnimation.updatePosition('up');
        myAnimation.draw('run');
    } else if (keyIsDown(83)) { // 'S' key
        myAnimation.updatePosition('down');
        myAnimation.draw('run');

    } else if (kb.pressing('x')) { // 'Shift' key
        myAnimation.updatePosition('attack');
        myAnimation.draw('attack');
        
    } 
   // if (dist(myAnimation.getCurrentAnimation().position.x, myAnimation.getCurrentAnimation().position.y, logArray.position.x, logArray.position.y) < 200) {
        //console.log("destroy");
   // }
    else {
        myAnimation.draw('idle');
    }

    // Display UI
    textSize(20);
    fill(255, 215, 0);
    text("Score: " + score, 400, 30);
    text("Time Left: " + timeLeft + "s", width - 500, 30);
    textSize(40);
    fill(255, 215, 0);
    text("Feed the Dino!", width / 2 - 125, height / 10);

    // Check win condition
    if (score >= 10) {
        textSize(60);
        fill(255, 215, 0);
        text("YOU WIN!", width / 2 - 125, height / 2);
        noLoop();
    }

    // Check time left
    let timePassed = int((millis() - startTime) / 1000);
    timeLeft = max(countdown - timePassed, 0);

    if (timeLeft <= 0 || health <= 0)  {
        textSize(50);
        fill(255, 0, 0);
        text("You Big Lose!", width / 2 - 125, height / 2);
        noLoop();
    }
   
}//end of draw


function collidesWithTree(newX, newY) {
    for (let tree of treeArray) {
        if (newX + 40 > tree.x && newX < tree.x + tree.w &&
            newY + 50 > tree.y && newY < tree.y + tree.h) {
            return true; // Collision detected
        }
    }
    return false;
 }

// Update health bar
function updateHealth(health, maxHealth) {
    
    noStroke();
    fill(233, 0, 0);
    rect(500, 500, map(health, 0, maxHealth, 0, 300), 8);

    stroke(0);
    strokeWeight(5);
    noFill();
    rect(500, 500, 300, 10);
    noStroke();
}


