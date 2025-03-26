//character
var animation = [];
var loadAnimation = [];
var run = [];
var runAnimation = [];
var idleStrings = [];
var runStrings = [];
var moveCharacter;
var currentFrame;
//character stuff collision with food
var foodArray = [];
//cordinates?
var i = 0;
var k = 0;
var x = 200;
var y = 90;
var r = 0; //idk why I need this
//Hedge
var hedgeStrings = [];
var hedgeArray = [];
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
//img
let img;
let img2;
//Do I need this?
var loadImage;
//var imgSize = 100;


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

    img = loadImage('trees/PineTree.png');

    img2 = loadImage('assets/log.png')
   
}


function setup() {
    createCanvas(1280, 450);
    startTime = millis(); 
    myAnimation = new character(200, 200);
    myAnimation.loadAnimation('idle', idleStrings);
    myAnimation.loadAnimation('run', runStrings); 
    

    
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
    
  
//setInterval(updateIdleIndex, 100); // Idle animation updates slower
//setInterval(updateRunIndex, 50); // Run animation updates faster

//countDownInterval = setInterval(updateCountDown, 1000);
//setInterval(replayAnimation, 2000);

}

function draw() {

    background(40, 100, 10);

    updateHealth(health, maxHealth);

    stroke(0);

    strokeWeight(1);

    moveCharacter();

    //Tree upper left
    image(img, 100, 40, 190, 140);
    //Tree mid
    image(img, 400, 200, 190, 140);
    //Tree mid2
    image(img, 650, 100, 130, 110);
    //Tree lower right
    image(img, 900, 200, 160, 120);
    //Tree far right
    image(img, 1000, 1, 100, 100);
    //Tree farest right
    image(img, 1070, 40, 100, 100);

    //Upper right Log
    image(img2, 70, 100, 100, 100);
     //Upper right Log
     image(img2, 200, 300, 100, 100);
      //Upper right Log
      image(img2, 400, 300, 100, 100);
       //Upper right Log
       image(img2, 600, 100, 100, 100);
        //Upper right Log
        image(img2, 800, 300, 150, 100);
    



    //hedge upper dont need this now
    //image(img2, 80, 50, 30, 160);

// Check for win condition
if (score >= 10) {
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
}
function foodArray(i) {
   if (isood.play());
    health += 10;
    good.setLoop(false);
    good.remove();
    good.position.x = 10;
}
   
   /* function foodArray(i) {
    bad.play();
    health -= 10;
    bad.setLoop(false);
    bad.remove();
    bad.position.x = 10;
}
    */



//food array and collision
for (let j = 0; j < foodArray.length; j++) {
    if (myAnimation.isColliding(foodArray[j].foodPiece)) {
        if (foodArray[j] == 25) {

            score ++;
        }
        else {
           score --;
        }
        foodArray[j].foodPiece.remove();
    }
 }


function moveCharacter() {

    if (kb.pressing('d')) {
        myAnimation.updatePosition('forward');
        myAnimation.draw('run');
       
    }
    else if (kb.pressing('a')) {
        myAnimation.updatePosition('reverse');
        myAnimation.draw('run');
    }
    else if (kb.pressing('w')) {
        myAnimation.updatePosition('up');
        myAnimation.draw('run');
    }
    else if (kb.pressing('s')) {
        myAnimation.updatePosition('down');
        myAnimation.draw('run');
    }
    else {
    
        myAnimation.draw('idle');
        
    }


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
    text("Score: " + score, 30, 35);
    text("Time Left: " + timeLeft + "s", width - 150, 30);


let timePassed = int((millis() - startTime) / 1500);
timeLeft = max(countdown - timePassed, 0); // Prevents negative values

  
    /*//trees   //why are my trees behind my text?
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
*/

   

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

 function displayAnimation() {
    noFill();
    stroke(0, 0, 100);
    strokeWeight(1);
        
}

function displayFood() {
    for (let i = 0; i < foodArray.length; i++) {
    foodArray[i].draw();
}

}

function displayScore() {
    //fill(0);
    //textSize(24);
    //text("Score: " + score, 50, 50);
}

function updateIndex() {
    i++;
     if (i > idleStrings.length-1) {
        i = 0;
     }

}

function playBackgroundSound() {
    //mySound.play();
}

function updateCountDown() {
    countDown--;
if (countDown == 0) {
    clearInterval(countDownInterval);
}
}

function displayCountDown() {
    //textSize(24);
    //text("Time left: " + countDown, width - 200, 50);
}

function replayAnimation() {
//hmmmmm
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
}
}
}