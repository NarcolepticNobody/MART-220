
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
var scoreMax = 8;
var countdown = 90;
var timeLeft = 30;
var health = 100;
var redhealth = 50;
var maxHealth = 100;
var startTime;
var img, img2;
let good, bad, end, attack, wahoo, cheer;
var mySound;
var myAnimation;
var stomp; //log destroy 
let gameOver = false;
let gameWin = false;
var bites = 50;
const borderThickness = 15; // thickness of edge borders
let forestBackground;



// Preload assets
function preload() {

    soundFormats('mp3', 'ogg', 'wav');
    mySound = loadSound("assets/melody.mp3");
    good = loadSound("assets/yes.mp3");
    bad = loadSound("assets/442602__topschool__ow-sound.mp3");
    end = loadSound("assets/wampp.mp3");
    wahoo = loadSound('assets/wahoo.wav')
    cheer = loadSound('assets/cheer.wav')

    idleStrings = loadStrings('txtfiles/idle.txt');
    runStrings = loadStrings('txtfiles/run.txt');
    treeStrings = loadStrings('txtfiles/tree.txt');
    logStrings = loadStrings('txtfiles/log.txt');
    logredStrings = loadStrings('txtfiles/logred.txt');
    grassStrings = loadStrings('txtfiles/grass.txt');
    attackStrings = loadStrings('txtfiles/attack2.txt');
    grassStrings = loadStrings('txtfiles/grass.txt');
    //img = loadImage('trees/PineTree 01.png');
    //img2 = loadImage('assets/log.png');

}

// Setup function
function setup() {
    createCanvas(displayWidth, displayHeight);

    startTime = millis();
    myAnimation = new character(150, 200);
    myAnimation.loadAnimation('idle', idleStrings);
    myAnimation.loadAnimation('run', runStrings);
    myAnimation.loadAnimation('attack', attackStrings);
    myAnimation.loadAnimation('grass', grassStrings);

    // Create food objects
    /*  for (let i = 0; i < 40; i++) {
  
          let isGood = random([true, false]);
          let myFood = new food(random(50, width - 50), random(50, height - 50), isGood);
          foodArray.push(myFood);
      }
          */

    let treeW = 40; // your tree width
    let treeH = 50; // your tree height
    let x = random(treeW / 1, width - treeW / 1);
    let y = random(treeH / 1, height - treeH / 1);
    for (let i = 0; i < 21; i++) {
         x = random(treeW / 1, width - treeW / 1);
     y = random(treeH / 1, height - treeH / 1);

        let myTree = new tree(x, y, treeW, treeH);
        treeArray.push(myTree);
        let myGrass = new grass(x + 17, y + treeH, 40, 40);
        grassArray.push(myGrass);
    }


    // Create log objects
    for (let i = 0; i < logStrings.length; i++) {

        let myLog = new log(random(50, width - 50), random(50, height - 50), 40, 40);
        logArray.push(myLog);
    }

    // Create badlog objects
    for (let i = 0; i < 4; i++) {

        let myLog = new logred(random(50, width - 50), random(50, height - 50), 40, 40);
        logredArray.push(myLog);
    }
    
   //  // Create grass objects
     // for (let i = 0; i < grassStrings.length; i++) {
        
      //  let myGrass = new grass(random(50, width - 50), random(50, height - 50), 40, 40);
       // grassArray.push(myGrass);
   // }
     
   forestBackground = createGraphics(width, height);
   for (let x = 0; x < width; x += 40) {
       for (let y = 0; y < height; y += 40) {
           let shade = (random(30, 80));
           forestBackground.noStroke();
           //forestBackground.fill(shade, random(60, 120), shade / 2);
           forestBackground.rect(x, y, 60, 60);
       }
   }
   
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
    
    // DRAW THICK EDGE BORDERS (solid rectangles)
    noStroke();
    fill(0); // black border, or change color as needed

    // Top border
    rect(0, 0, width, borderThickness);

    // Bottom border
    rect(0, height - borderThickness, width, borderThickness);

    // Left border
    rect(0, 0, borderThickness, height);

    // Right border
    rect(width - borderThickness, 0, borderThickness, height);

 // Draw forest floor texture
for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
        let shade = (30, 80); // range of foresty greens/browns
        fill(shade, (60, 120), shade / 2);
        noStroke();
        rect(x, y, 40, 40);
 
        }

}


    updateHealth(health, maxHealth);
    collidesWithTree();


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
            if (logArray[i] != null) {
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

                    if (logArray[i] != null && logArray[i].health <= 0 && logArray[i].currentAnimation != null) {
                        logArray[i].currentAnimation.remove();
                        logArray[i] = null;
                        particles = [];
                        //logArray.splice(i, 1);
                        score++;
                        break;
                    }
                    if (!bad.isPlaying()) {
                        bad.play(); // log breaking sound
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
                            if (!bad.isPlaying()) {
                                bad.play(); // log breaking sound
                            }

                        }
                    }

                }
            }
        }
    }
    else {
        myAnimation.draw('idle');
    }

    for (let i = 0; i < logredArray.length; i++) {
        logredArray[i].update(myAnimation.currentAnimation.position.x, myAnimation.currentAnimation.position.y);

        let d = dist(myAnimation.currentAnimation.position.x, myAnimation.currentAnimation.position.y, logredArray[i].currentAnimation.position.x, logredArray[i].currentAnimation.position.y);

        if (d < 30 && !gameOver) {
            textSize(50);
            fill(255, 0, 0);
            text("You Big Lose!", width / 2 - 150, height / 2);
            end.play();
            end.setVolume(2);
            noLoop();
            mySound.stop();
            gameOver = true;
        }
    }

    // Check win condition
    if (score >= 8) {
        textSize(50);
        fill(255, 215, 0);
        text("YOU WIN!", width / 2 - 125, height / 2);
        cheer.play();
        cheer.setVolume(2);
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

    // ✅ TEXT SECTION LAST so it draws on top
    textSize(20);
    fill(255, 215, 0);
    text("Score: " + score, 405, 50);
    text("Time Left: " + timeLeft + "s", width - 500, 50);

    textSize(30);
    fill(255, 215, 0);
    text("Stomp on the sandwiches, and avoid the orange bois!", width / 2 - 320, height / 10);
    
}//end of draw
function findSafeSpawn() {
    let x, y;
    let safe = false;

    while (!safe) {
        x = random(50, width - 50);
        y = random(50, height - 50);

        safe = true; // assume it's safe first

        // Check against trees
        for (let tree of treeArray) {
            if (x + 40 > tree.x && x < tree.x + tree.w &&
                y + 50 > tree.y && y < tree.y + tree.h) {
                safe = false;
                break;
            }
        }

        // Check against normal logs
        for (let log of logArray) {
            if (dist(x, y, log.currentAnimation.position.x, log.currentAnimation.position.y) < 60) {
                safe = false;
                break;
            }
        }

        // Check against bad logs
        for (let redlog of logredArray) {
            if (dist(x, y, redlog.currentAnimation.position.x, redlog.currentAnimation.position.y) < 60) {
                safe = false;
                break;
            }
        }
    }

    return createVector(x, y);
}

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


}