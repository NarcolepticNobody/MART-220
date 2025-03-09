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
let score = 0;
let startTime;
let elapsedTime = 0;
let countdown = 15;
let song;


function preload() {
    idlestring = loadStrings('characteridle.txt');
    runstring = loadStrings('characterrun.txt');
   
}

function setup() {
    createCanvas(500, 600);
    song = loadSound('218181__qubodup__cat-eating-dry-food');

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
        let myFood = new food(random(0, 490), random(0, 490), 25);
        foodArray.push(myFood);
    }
    // Create food objects
    for (let i = 0; i < 9; i++) {
        let myFood = new food(random(0, 490), random(0, 490), 25);
        foodArray.push(myFood);
    }
   

    setInterval(updateIdleIndex, 100); // Idle animation updates slower
    setInterval(updateRunIndex, 50); // Run animation updates faster

    
}



function draw() {
    background(40, 100, 10);

    function mousePressed() {
        if (song.isPlaying()) {
          // .isPlaying() returns a boolean
          song.stop();
          background(255, 0, 0);
        } else {
          song.play();
          background(0, 255, 0);
        }
    }

    let timePassed = int((millis() - startTime) / 1000);
    let timeLeft = max(countdown - timePassed, 0); // Prevents negative values

    function loadFood() {
    
    // Draw food
    for (let j = 0; j < foodArray.length; j++) {

        foodArray[j].draw();
    }
 
//food fight?

function bgSound() {
    bgmusic.play();
    bgmusic.loop();
    bgmusic.setVolume(0.1);
    userStartAudio();
}




    // Handle movement
    handleMovement();

    // Choose correct animation
    let currentFrame = moving ? run[k] : animation[i];
    currentFrame.x = x;
    currentFrame.y = y;
    currentFrame.flipX = flipX;
    currentFrame.draw();


    // Check for food collision
  /*for (let j = 0; j < foodArray.length; j++) {
        if (currentFrame.hasCollided(foodArray[j].x, foodArray[j].y, 25, 25)) {
            foodArray.splice(j, 1);
            score += 10;  // Increase score
        }
*/
for (let j = 0; j < foodArray.length; j++) 
    if(collideRectCircle(animation[i].x, animation[i].y, animation[i].imageWidth, animation[i].imageHeight, foodArray[j].x, foodArray[j].y, 10,))      
    {
        if (foodArray[j].r==34) {
            eat.play();
            score = score + 1;
        }
        else {
            retch.play();
            score = score -1;
        }
        foodArray.splice(j, 1);
    }
  


    textSize(30);
    fill(255, 255, 255)
    text("Feed the Dino!", 10, 40); 
    }
      //trees   
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

      

      // Display countdown timer
      fill(255);
      textSize(20);
      text("Score: " + score, 380, 60);
      text("Time Left: " + timeLeft + "s", width - 150, 30);

      // Check if time is up
      if (timeLeft <= 0) {
          textSize(50);
          fill(255, 0, 0)
          text("You Big Lose!", width / 2 - 150, height / 2);
          noLoop(); // Stop the game when time runs out
      }
      // Check for win condition
      if (score >= 90) {
          textSize(60);
          fill(255, 215, 0);
          text("YOU WIN!", width / 2 - 125, height / 2);
          noLoop(); // Stop the game
          return;
      }
}

// Idle animation update
function updateIdleIndex() {
    if (moving) {
        i = (i + 1) % animation.length;
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


