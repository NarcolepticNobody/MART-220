var animation = [];
var run = [];
var i = 0;
var k = 0;
var x = 200;
var y = 90;
var foodArray = [];


var idlestring = [];
var runstring = [];
var flipX = false;
var moving = false;
var keys = [];
var mySound;
var song;
var slider;
let score = 0;
let startTime;
let elapsedTime = 0;
let countdown = 30;
let timeLeft = 30; //the whole point is for this to count down not just say 30 it needs this for some reason?
let good;
let bad;
let end;




function preload() {
    
    //background music
    song = loadSound("assets/melody.mp3");
    //good food
    good = loadSound("assets/yes.mp3")
    //bad food
    bad = loadSound("assets/442602__topschool__ow-sound.mp3")
    //failed
    end = loadSound("assets/wampp.mp3")
    idlestring = loadStrings('idle.txt');
    runstring = loadStrings('run.txt');
    
    
    
}

function setup() {
    createCanvas(500, 600);
    startTime = millis(); // Start time when the game begins
    // Load idle animations
    for (let j = 0; j < idlestring.length; j++) {
        let mycharacter = new character(idlestring[j], x, y);
        animation.push(mycharacter);
    }
    // Load run animations
    for (let j = 0; j < runstring.length; j++) {
        let mycharacter = new character(runstring[j], x, y);
        run.push(mycharacter);
    }
   // Create food objects
   for (let i = 0; i < 9; i++) {
    let myFood = new food(random(0, 490), random(0, 490), 25, 34, 50);
    foodArray.push(myFood);
    }

   // Create bad food objects
   for (let i = 0; i < 9; i++) {
    let myFood = new food(random(10, 490), random(10, 490), 255, 0, 255);
    foodArray.push(myFood);
    }

    setInterval(updateIdleIndex, 100); // Idle animation updates slower
    setInterval(updateRunIndex, 50); // Run animation updates faster
  
}


function mousePressed() {
    if (song.isPlaying()) {

        song.loop();
    }
    else {
        song.play();  
    }
}

function draw() {
background(40, 100, 10);
loadFood();

// Handle movement
 handleMovement();
 collideRectCircle();

 
 textSize(20);
 fill(255, 50, 100)
 text("Pink food is bad, blue food is good!", width / 1 - 380, height / 1.1); 
 
 //Feed the Dino
 textSize(30);
 fill(0, 0, 0)
 text("Feed the Dino!", width / 1 - 350, height / 10); 





function loadFood() {
    for (let i = 0; i < foodArray.length -1; i++)

    foodArray[i].draw();
}
function foodFight() {
    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].x = random(100,200);
        foodArray[i].y = random(300,400);
    } 
}
   
  
//food array and collision
for (let j = 0; j < foodArray.length; j++) {
    if (collideRectCircle(animation[i].x, animation[i].y, animation[i].imageWidth, animation[i].imageHeight, foodArray[j].x, foodArray[j].y, 10, 10)) {
        if (foodArray[j].r == 25) {

            good.play();
            score +=  2;
            
        }

        else {
           bad.play(); 
           score = score -1;
        }
        foodArray.splice (j, 1);
    }



    let timePassed = int((millis() - startTime) / 1500);
    let timeLeft = max(countdown - timePassed, 0); // Prevents negative values

    // Choose correct animation
    let currentFrame = moving ? run[k] : animation[i];
    currentFrame.x = x;
    currentFrame.y = y;
    currentFrame.flipX = flipX;
    currentFrame.draw();

    // Display countdown timer
    textSize(20);
    fill(255);
    text("Score: " + score, 30, 35);
    text("Time Left: " + timeLeft + "s", width - 150, 30);


//trees   //why are my trees behind my text?
fill(153, 95, 30);
//1
rect(119, 200, 10, 130);
//2
rect(300, 400, 10, 130);
//3
rect(400, 200, 10, 120);

//green topper
fill(100, 150, 10);
//1
triangle(125, 150, 150, 300, 100, 300);
//2
triangle(270, 500, 300, 360, 340, 500);
//3
triangle(410, 150, 440, 300, 370, 300);

}

 // Check if time is up //why wont this display that I lost?
 if (timeLeft <= 0) {
    textSize(50);
    fill(255, 0, 0)
    text("You Big Lose!", width / 2 - 1, height / 100);
    noLoop(); // Stop the game when time runs out
    
}

// Check for win condition
if (score >= 15) {
    textSize(60);
    fill(255, 215, 0);
    text("YOU WIN!", width / 2 - 125, height / 2);
    noLoop(); // Stop the game
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

// Handle movement using key states
function handleMovement() {
    moving = false;

    if (keyIsPressed) {

        if (keys["a"]) {
            x -= 3;
            flipX = true;
            moving = true;
        }
        if (keys["d"]) {
            x += 3;
            flipX = false;
            moving = true;
        }
        if (keys["w"]) {
            y -= 3;
            moving = true;
        }
        if (keys["s"]) {
            y += 3;
            moving = true;
        }

    }

}

// Detect when a key is pressed
function keyPressed() {
    keys[key] = true;
}

// Detect when a key is released
function keyReleased() {
    keys[key] = false;

}