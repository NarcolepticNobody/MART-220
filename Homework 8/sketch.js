// Global Variables
var animation = [];
var run = [];
var idleStrings = [];
var runStrings = [];
var foodArray = [];
var trees = [];
var logs = [];
var flipX = false;
var moving = false;
var score = 0;
var countdown = 20;
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
    idleStrings = loadStrings('idle.txt');
    runStrings = loadStrings('run.txt');
    img = loadImage('trees/PineTree 01.png');
    img2 = loadImage('assets/log.png');

}

// Setup function
function setup() {
    createCanvas(1280, 450);
    startTime = millis();
    myAnimation = new Character(100, 100);
    myAnimation.loadAnimation('idle', idleStrings);
    myAnimation.loadAnimation('run', runStrings);
/*
//create idle animation
for (let i = 0; i < idleStrings.length; i++) {

    let mycharacter = new character(idleStrings[0], this.x, this.y);
    animation.push(mycharacter);
}

//create run animation
for (let j = 0; j < runStrings.length; j++) {

    let mycharacter = new character(runStrings[i], this.x, this.y);
    animation.push(mycharacter);
}

*/

    // Create food objects
    for (let i = 0; i < 20; i++) {
        let isGood = random([true, false]);
        let myFood = new Food(random(50, width - 50), random(50, height - 50), isGood);
        foodArray.push(myFood);
    }



   // Create static trees
   trees = [
    new tree(300, 40, 120, 100),
    new tree(400, 200, 60, 110),
    new tree(650, 100, 120, 100),
    new tree(900, 200, 70, 120),
    new tree(1000, 1, 80, 130),
    new tree(1070, 40, 120, 140)
];
}



// Draw function
function draw() {
    background(40, 100, 10);
    updateHealth(health, maxHealth);
    collidesWithTree();

    // Border
    push();
    stroke(0);
    strokeWeight(10);
    noFill();
    rect(0, 0, width, height);
    pop();

    // Display trees
    for (let tree of trees) {
        tree.display(img);
    }

    // Display food
    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].draw();

        // Check collision with character
        if (myAnimation.isColliding(foodArray[i])) {
            if (foodArray[i].isGood) {
                score++;
                health = min(health + 10, maxHealth);
                good.play();
            } else {
                score--;
                health = max(health - 10, 0);
                bad.play();
            }
            foodArray.splice(i, 1);
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
    } else {
        myAnimation.draw('idle');
    }
    function collidesWithTree(newX, newY) {
        for (let tree of trees) {
            if (newX + 40 > tree.x && newX < tree.x + tree.w &&
                newY + 50 > tree.y && newY < tree.y + tree.h) {
                return true; // Collision detected
            }
        }
        return false;
     }
     

    // Display UI
    textSize(20);
    fill(255);
    text("Score: " + score, 400, 30);
    text("Time Left: " + timeLeft + "s", width - 500, 30);

    // Check win condition
    if (score >= 20) {
        textSize(60);
        fill(255, 215, 0);
        text("YOU WIN!", width / 2 - 125, height / 2);
        noLoop();
    }

    // Check time left
    let timePassed = int((millis() - startTime) / 1000);
    timeLeft = max(countdown - timePassed, 0);

    if (timeLeft <= 0) {
        textSize(50);
        fill(255, 0, 0);
        text("You Big Lose!", width / 2 - 125, height / 2);
        noLoop();
    }
}

// Update health bar
function updateHealth(health, maxHealth) {
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(500, 400, 300, 10);
    noStroke();
    fill(233, 0, 0);
    rect(500, 400, map(health, 0, maxHealth, 0, 300), 10);
}

// Character Class
class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.animations = {};
    }

    loadAnimation(character, frames) {
        this.animations[char] = frames;
    }

    draw(state) {
        textSize(20);
        fill(255);
        text(state, this.x, this.y - 20);
    }

    updatePosition(direction) {
        let speed = 5;
        if (direction === 'forward') this.x += speed;
        if (direction === 'reverse') this.x -= speed;
        if (direction === 'up') this.y -= speed;
        if (direction === 'down') this.y += speed;
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    isColliding(food) {
        return dist(this.x, this.y, food.x, food.y) < 20;
    }
}

// Food Class
class Food {
    constructor(x, y, isGood) {
        this.x = x;
        this.y = y;
        this.isGood = isGood;
    }

    draw() {
        fill(this.isGood ? 'green' : 'red');
        ellipse(this.x, this.y, 20, 20);
    }
}

// Tree Class
class Tree {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    display(img) {
        image(img, this.x, this.y, this.w, this.h);
    }
}
