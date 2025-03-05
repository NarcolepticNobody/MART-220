var animation = [];
var run = [];
var i = 0;
var k = 0;
var x = 100;
var y = 100;
var foodArray = [];
var idlestring = [];
var runstring = [];
var flipX = false;
var moving = false;
var keys = []; 

function preload() {
    idlestring = loadStrings('characteridle.txt');
    runstring = loadStrings('characterrun.txt');
}

function setup() {
    createCanvas(800, 800);

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
        let myFood = new food(random(19, 600), random(100, 500), 25);
        foodArray.push(myFood);
    }
    
    setInterval(updateIdleIndex, 100); // Idle animation updates slower
    setInterval(updateRunIndex, 50); // Run animation updates faster
}

function draw() {
    background(40, 100, 10);

    // Draw food
    for (let j = 0; j < foodArray.length; j++) {
        foodArray[j].draw();
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
    for (let j = 0; j < foodArray.length; j++) {
        if (currentFrame.hasCollided(foodArray[j].x, foodArray[j].y, 25, 25)) {
            foodArray.splice(j, 1); 
            
        }
        
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
    
if (keyIsPressed){
    


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
    /*for (let i = 0; i < run.length; i++) {
        run[i].x=x 
        run[i].y=y
    }
    for (let i = 0; i < animation.length; i++) {
        animation[i].x=x 
        animation[i].y=y
    }
    */
    

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