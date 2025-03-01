var animation = [];
var i = 0;
var j = 0;
var x = 100;
var y = 100;
var foodArray = [];
var foodFound = false;
var myfood;
var circle = 0;
var idlestring = [];
var runstring = [];

var result;

function preload() {
    idlestring = loadStrings("images1/Idle (1).png")
    runstring = loadStrings("images/Run (1).png")
    }

   


function setup() {
    createCanvas(800, 800);
    

    for (var j = 0; j < idlestring.length; j++) { // Use a different loop variable (j) to avoid conflicts
        let mycharacter = new character(idlestring[j], x, y);
        animation.push(mycharacter);
    }
      for (var j = 0; j < runstring.length; j++) { // Use a different loop variable (j) to avoid conflicts
        let mycharacter = new character(runstring[j], x, y);
        animation.push(mycharacter);
      }
      
    for (let i = 0; i < 10 ; i++) {
        myFood = new food(random(19,600), random(500,100), 25);
        foodArray.push(myFood)

    }
    setInterval(updateIndex, 70);
}

function draw() {

    background(40, 100, 10); //this is the part to change the thing you like
    if (animation.length > 0) {
        animation[i].draw();
    }
for (let j = 0; j < foodArray.length; j++) {
    foodArray[j].draw();
}

if (keyIsPressed) {
    if (key == "a") {
        x--;
    }
    if (key == "d") {
        x++;
    }
    if (key == "w") {
         y--;
    }
    if (key == "s") {
        y++;
    }
    // Update positions for all animation frames
    for (let j = 0; j < animation.length; j++) {
        animation[j].x = x;
        animation[j].y = y;
    }
    
//food collisions
for (let k = 0; k < foodArray.length; k++) {
if (animation[i].hasCollided(foodArray[k].x, foodArray[k].y, 25, 25)) {
    foodArray.splice(k, 1);

}
}

}

}
function updateIndex() {
    i++;
    if (i = (i + 1)) { // Ensure looping correctly
        i = 0;
    }
}