
var animation = [];
var run = [];
var idleStrings = [];
var runStrings = [];
var foodArray = [];
var treeArray = [];
var logArray = [];
var logredArray = [];
var grassArray = [];
var attackArray = [];
let particles = [];
var flipX = false;
var moving = false;
var score = 0;
var scoreMax = 5;
var countdown = 30;
var timeLeft = 20;
var health = 100;
var redhealth = 50;
var maxHealth = 100;
var startTime;
var img, img2;
let good, bad, end, attack, wahoo;
var mySound;
var myAnimation;
var stomp; //log destroy
let gameOver = false;
var bites = 50;

// Preload assets
function preload() {

    soundFormats('mp3', 'ogg', 'wav');
    mySound = loadSound("assets/melody.mp3");
    good = loadSound("assets/yes.mp3");
    bad = loadSound("assets/442602__topschool__ow-sound.mp3");
    end = loadSound("assets/wampp.mp3");
    wahoo = loadSound('assets/wahoo.wav')

    idleStrings = loadStrings('txtfiles/idle.txt');
    runStrings = loadStrings('txtfiles/run.txt');
    treeStrings = loadStrings('txtfiles/tree.txt');
    logStrings = loadStrings('txtfiles/log.txt');
    logredStrings = loadStrings('txtfiles/logred.txt');
    grassStrings = loadStrings('txtfiles/grass.txt');
    attackStrings = loadStrings('txtfiles/attack2.txt');
    //img = loadImage('trees/PineTree 01.png');
    //img2 = loadImage('assets/log.png');

}

// Setup function
function setup() {
    createCanvas(1680, 900);

    startTime = millis();
    myAnimation = new character(150, 200);
    myAnimation.loadAnimation('idle', idleStrings);
    myAnimation.loadAnimation('run', runStrings);
    myAnimation.loadAnimation('attack', attackStrings);

    // Create food objects
  /*  for (let i = 0; i < 40; i++) {

        let isGood = random([true, false]);
        let myFood = new food(random(50, width - 50), random(50, height - 50), isGood);
        foodArray.push(myFood);
    }
        */

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

     // Create badlog objects
     for (let i = 0; i < logredStrings.length; i++) {

        let myLog = new logred(random(50, width - 50), random(50, height - 50), 40, 40);
        logredArray.push(myLog);
    }
    /*  // Create grass objects
      for (let i = 0; i < grassStrings.length; i++) {
        
        let myGrass = new grass(random(50, width - 50), random(50, height - 50), 40, 40);
        grassArray.push(myGrass);
    }
      */

}

function mousePressed() {
    if (mySound.isPlaying()) {
        mySound.stop();
    } else {
        mySound.loop();
    }
}

// Draw function
function draw() {
    background(40, 100, 10);

for (let i = 0; i < logredArray.length; i++) {
    logredArray[i].update(myAnimation.currentAnimation.position.x, myAnimation.currentAnimation.position.y);
  }
  
    updateHealth(health, maxHealth);
    collidesWithTree();

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
    if (kb.pressing('d')) { // 'D' key
        myAnimation.updatePosition('forward');
        myAnimation.draw('run');
    } else if (kb.pressing('a')) { // 'A' key
        myAnimation.updatePosition('reverse');
        myAnimation.draw('run');
    } else if (kb.pressing('w')) { // 'W' key
        myAnimation.updatePosition('up');
        myAnimation.draw('run');
    } else if (kb.pressing('s')) { // 'S' key
        myAnimation.updatePosition('down');
        myAnimation.draw('run');

    } else if (kb.pressing('shift')) {
        myAnimation.updatePosition('attack');
        myAnimation.draw('attack');
        //health = max(health - 10, 0);
        //attack.play();
        //attack.setVolume(0.7);
        //attack.setSpeed(0.1);

        // Check for nearby logs to destroy
        for (let i = logArray.length - 1; i >= 0; i--) {

            // want to check for "currentAnimation" since getCurrentAnimation() doesn't exist in your character.js file
            let d = dist(myAnimation.currentAnimation.position.x, myAnimation.currentAnimation.position.y, logArray[i].currentAnimation.position.x, logArray[i].currentAnimation.position.y
            );
           
            // needed a larger distance
            if (d < 80) {
                for (let j = 0; j < 20; j++) {
                    let p = new Particle(
                        logArray[i].currentAnimation.position.x,
                        logArray[i].currentAnimation.position.y
                    
                    );
                    particles.push(p);
                }

                logArray[i].health -= 1;

                if (logArray[i].health <= 0) {
                    logArray[i].currentAnimation.remove();
                    particles = [];
                    //logArray.splice(i, 1);
                }
                if (!wahoo.isPlaying()) {
                    wahoo.play(); // log breaking sound
                }
////////////////////////////////

        // Check for bad logs to destroy
        for (let i = logredArray.length - 1; i >= 0; i--) {

            // want to check for "currentAnimation" since getCurrentAnimation() doesn't exist in your character.js file
            let d = dist(myAnimation.currentAnimation.position.x, myAnimation.currentAnimation.position.y, logredArray[i].currentAnimation.position.x, logredArray[i].currentAnimation.position.y
            );
           
            // needed a larger distance
            if (d < 80) {
                for (let j = 0; j < 20; j++) {
                    let p = new Particle(
                        logredArray[i].currentAnimation.position.x,
                        logredArray[i].currentAnimation.position.y
                    
                    );
                    particles.push(p);
                }

                logredArray[i].redhealth -= 1;

                if (logredArray[i].redhealth <= 0) {
                    logredArray[i].currentAnimation.remove();
                    particles = [];
                    //logArray.splice(i, 1);
                }
                if (!wahoo.isPlaying()) {
                    wahoo.play(); // log breaking sound
                }    

            }}////

            }
        }
    }
    else {
        myAnimation.draw('idle');
    }

    // Display UI
    textSize(20);
    fill(255, 215, 0);
    text("Score: " + score, 405, 30);
    text("/" + scoreMax, 480, 30);
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

    if ((timeLeft <= 0 || health <= 0) && !gameOver) {
        textSize(50);
        fill(255, 0, 0);
        text("You Big Lose!", width / 2 - 125, height / 2);
        end.play();
        end.setVolume(2);
        noLoop();
        gameOver = true;
        mySound.stop();
    }

    // At the bottom of draw()
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();

        if (particles[i].finished()) {
            particles.splice(i, 1); // remove when done
        }
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

