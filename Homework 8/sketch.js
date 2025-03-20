var animation = [];
var run = [];
var i = 0;
var k = 0;
var x = 200;
var y = 90;
var foodArray = [];
var loadAnimation = [];
var runAnimation = [];
var idleStrings = [];
var runStrings = [];
var flipX = false;
var moving = false;
var moveCharacter = [];
var countDown = [];
var kb = [];
var mySound;
var song;
var slider;
var currentFrame;

let score = 0;
let startTime;
let elapsedTime = 0;
let countdown = 20;
let timeLeft = 20; 
let good;
let bad;
let end;





function preload() {
    
    soundFormats('mp3', 'ogg', 'wav');
    //background music
    song = loadSound("assets/melody.mp3");
    //good food
    good = loadSound("assets/yes.mp3")
    //bad food
    bad = loadSound("assets/442602__topschool__ow-sound.mp3")
    //failed
    //end = loadSound("assets/wampp.mp3")
    idleStrings = loadStrings('idle.txt');
    runStrings = loadStrings('run.txt');
    
    
    
}

function setup() {
    createCanvas(500, 600);
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

countDownInterval = setInterval(updateCountDown, 1000);
setInterval(replayAnimation, 2000);

}


function playBackgroundSound() {
//empty
}

function draw() {
background(40, 100, 10);


stroke(0);
strokeWeight(1);

displayFood();

moveCharacter();

displayScore();

displayCountDown();

displayAnimation();



function displayAnimation() {
    noFill();
    stroke(0, 0, 100);
    strokeWeight(5);
    
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

}

 collideRectCircle();
//do I need this?
 
 textSize(20);
 fill(255, 50, 100)
 text("Pink food is bad, blue food is good!", width / 1 - 400, height / 1.03); 
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
    if (myAnimation.isColliding(foodArray[i].foodPiece)) {
        if (foodArray[j].r == 25) {

           
            score ++;
            
        }

        else {
           
           score --;
        }
        foodArray[i].foodPiece.remove();
    }
 }


    let timePassed = int((millis() - startTime) / 1500);
    timeLeft = max(countdown - timePassed, 0); // Prevents negative values

    // Choose correct animation
   /* let currentFrame = moving ? run[k] : animation[i];
    currentFrame.x = x;
    currentFrame.y = y;
    currentFrame.flipX = flipX;
    currentFrame.draw();
*/
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

for(let i = 0; i < foodArray.length; i++)
{
    foodArray[i].draw();

  if(myAnimation.isColliding(foodArray[i].foodPiece))
     {
        if(foodArray[i].isGood)
            {
           

                score++;
                // play good sound
            }
            else
            {
          

                score--;
                // play bad sound
            }
            
            // use the remove function in p5play instead of splice now
            foodArray[i].foodPiece.remove();
           // foodArray.splice(i, 1);
        
         
     } 
    }

function displayFood() {
for (let i = 0; i < foodArray.length; i++) {
    foodArray[i].draw();
}

}

function displayScore() {
fill(0);
textSize(24);
text("Score: " + score, 50, 50);
}

function updateIndex() {
//i++;
// if (i > idleStrings.length-1) {
//    i = 0;
// }

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
textSize(24);
text("Time left: " + countDown, width - 200, 50);
}

function replayAnimation() {

}