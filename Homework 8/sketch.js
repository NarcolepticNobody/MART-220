//character
var animation = [];
var loadAnimation = [];
var run = [];
var runAnimation = [];
var idleStrings = [];
var runStrings = [];
var moveCharacter;
var currentFrame;
var checkCollision;
//character stuff collision with food
var foodArray = [];
//cordinates?
var i = 0;
var k = 0;
var x = 200;
var y = 90;
var r = 0; //idk why I need this

var flipX = false;
var moving = false;
//movement
var kb = [];
//time stuff
var countDown = [];
let score = 0;
let startTime;
let elapsedTime = 0;
let countdown = 20;
let timeLeft = 20; 
//sounds
var mySound;
var song;
let good;
let bad;
let end;
//health 
var foodHealth;
let health = 50;
let maxHealth = 100;



var loadImage;
var treeStrings = [];
var logStrings = [];

let trees = [];
let logs = [];



function preload() {
    
    soundFormats('mp3', 'ogg', 'wav');
    //background music
    song = loadSound("assets/melody.mp3");
    //good food
    good = loadSound("assets/yes.mp3")
    //bad food
    bad = loadSound("assets/442602__topschool__ow-sound.mp3")
    //failed
    end = loadSound("assets/wampp.mp3")
    
    idleStrings = loadStrings('idle.txt');

    runStrings = loadStrings('run.txt'); 

    treeStrings = loadStrings('tree.txt');

    logStrings = loadStrings('log.txt');

    attackStrings = loadStrings('attack.txt');

    img = loadImage('trees/PineTree 01.png');

    img2 = loadImage('assets/log.png')

   /* let tree = createSprite(x, y, 50, 50);
    tree.addImage(PineTree.png);
    tree.scale = 1.0;
    tree.collider = 'static';
    tree.push(tree);
   */
}


function setup() {
    createCanvas(1280, 450);
    startTime = millis(); 
    myAnimation = new character(200, 200);
    myAnimation.loadAnimation('idle', idleStrings);
    myAnimation.loadAnimation('run', runStrings); 
    //myAnimation.loadAnimation('tree', treeStrings); //strings don't work
    //myAnimation.loadAnimation('log', logStrings); //strings don't work
    
    
    
   // Create food objects
   for (let i = 0; i < 20; i++) {
    if(floor(random(0,2)) == 0) {
        myFood = new food(random(50, width - 50), random(50, height - 50), true);
        
    }
    else {
        myFood = new food(random(50, width - 50), random(50, height - 50), true);
        foodArray.push(myFood);
    }
    let timePassed = int((millis() - startTime) / 1500);
    timeLeft = max(countdown - timePassed, 0); // Prevents negative values
   }



     // Initialize trees     //I want these to be random
     trees = [
        new tree(300, 40, 190, 140),
        new tree(400, 200, 190, 140),
        new tree(650, 100, 130, 110),
        new tree(900, 200, 160, 120),
        new tree(1000, 1, 100, 100),
        new tree(1070, 40, 100, 100)
    ];
   

    // Initialize logs          //I want these to be random
    logs = [
        new log(70, 100, 100, 100),
        new log(200, 300, 100, 100),
        new log(400, 300, 100, 100),
        new log(600, 100, 100, 100),
        new log(800, 300, 150, 100)
    ];
}

  
//setInterval(updateIdleIndex, 100); // Idle animation updates slower
//setInterval(updateRunIndex, 50); // Run animation updates faster

//countDownInterval = setInterval(updateCountDown, 1000);
//setInterval(replayAnimation, 2000);



function draw() {   

    background(40, 100, 10);

    updateHealth(health, maxHealth);

    stroke(0);

    strokeWeight(1);

    moveCharacter();

    //myAnimation();

    checkCollision();

    //setCollider();

    // Draw the border without affecting other objects
    push(); // Save current style settings
    stroke(0); // Black border
    strokeWeight(10); // Thickness
    noFill();
    rect(0, 0, width, height);
    pop(); // Restore previous style settings



      // Display trees
      for (let tree of trees) {
        tree.display(img);
    }

    // Display logs
    for (let log of logs) {
        log.display(img2);
    }
 
      //Health bar 
      textSize(20);
      fill(255, 50, 100)
      text("Health bar", 600, 440); 
  //Feed the Dino
      textSize(30);
      fill(0, 0, 0)
      text("Feed the Dino!", width / 2 - 100, height / 12); 
  
  // Display countdown timer
      textSize(20);
      fill(255);
      text("Score: " + score, 400, 30);
      text("Time Left: " + timeLeft + "s", width - 500, 30);  
  }

    // Check for win condition
    if (score >= 20) {
    textSize(60);
    fill(255, 215, 0);
    text("YOU WIN!", width / 2 - 125, height / 2);
    noLoop(); // Stop the game
    
}
    // Check if time is up 
    if (timeLeft <= 1) {
    textSize(50);
    fill(255, 0, 0)
    text("You Big Lose!", width / 2 - 125, height / 2);
    noLoop(); // Stop the game when time runs out

     
 }
   
function updateHealth(health, maxHealth) {
   stroke(0);
   strokeWeight(4);
   noFill();
   rect(500, 400, 300, 10, map(health, 0, maxHealth, 0, 200),15);
   noStroke();
   fill(233, 0, 0);
   
}

function foodArray(i) {
   if (good.play());
    health += 10;
    good.setLoop(false);
    good.remove();
    good.position.x = 10;
}
   
//food array and collision
for (let j = 0; j < foodArray.length; j++) {
    if (myAnimation.isColliding(foodArray[j].foodPiece)) {
        if (foodArray[j].isGood) {
            score++;
        } else {
            score--;
        }

        // why doesn't this work?
        //myAnimation.currentAnimation.velocity.x = 0;
        //myAnimation.currentAnimation.velocity.y = 0;
        //myAnimation.currentAnimation.direction = 0;  // Reset direction
        //myAnimation.currentAnimation.rotation = 0;   // Ensure rotation is reset

        foodArray[j].foodPiece.remove();
    }
    
}
//on here twice
function checkCollision() {
    myAnimation.currentAnimation.rotationSpeed = 0;
    myAnimation.currentAnimation.rotation = 0;
}

function moveCharacter() {
    let newX = myAnimation.x;
    let newY = myAnimation.y;
    let speed = 5;

    if (kb.pressing('d')) newX += speed;
    if (kb.pressing('a')) newX -= speed;
    if (kb.pressing('w')) newY -= speed;
    if (kb.pressing('s')) newY += speed;

    
    // Create a temporary object to represent the character's future position
    let futurePosition = {
        x: newX,
        y: newY,
        width: 50,  // Adjust as per character size
        height: 50
    };

    // Check collision with trees
    let collision = trees.some(tree => tree.collidesWith(futurePosition));

    // If no collision, update position
    if (!collision) {
        myAnimation.x = newX;
        myAnimation.y = newY;
    }

    myAnimation.draw(moving ? 'run' : 'idle');
    //console.log("New X:", newX, "New Y:", newY, "Collision:", collision);
}

for(let i = 0; i < foodArray.length; i++) {

 foodArray[i].draw(); 

  if(myAnimation.isColliding(foodArray[i].foodPiece))
     {
        if(foodArray[i].isGood)
            {
                score++;
            }
            else
            {
                score--;
            }
            foodArray[i].foodPiece.remove();
     } 
    }

function displayFood() {
    for (let i = 0; i < foodArray.length; i++) {
    foodArray[i].draw();
}

}

function updateIndex() {
    i++;
     if (i > idleStrings.length-1) {
        i = 0;
     }

}

function updateCountDown() {
    countDown--;
if (countDown == 0) {
    clearInterval(countDownInterval);
}
}

// Idle animation update
function updateIdleIndex() {
    if (moving) {
        i = (i + 1) % animation.length; //this was animation.length
    }
}

// Running animation update
function updateRunIndex() {
    if (moving) {
        k = (k + 1) % run.length;
    }
}
function loadFood() {
    for (let i = 0; i < foodArray.length -1; i++) {

    foodArray[i].draw();
}
function foodFight() {
    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].x = random(100,200);
        foodArray[i].y = random(300,400);
    } 

    myAnimation.draw();
}
}
