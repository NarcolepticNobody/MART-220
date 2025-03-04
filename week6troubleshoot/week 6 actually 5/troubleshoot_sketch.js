var animation = [];
var run = [];
var i = 0;
var j = 0;
var x = 100;
var y = 100;
var foodArray = [];
var idlestring = [];
var runstring = [];
var foodFound = false;
var myfood;
var circle = 0;
var k = 0;
var runresult;
var result;

function preload() {
    idlestring = loadStrings('characteridle.txt');
    runstring = loadStrings('characterrun.txt');
    }

   


function setup() {
    createCanvas(800, 800);
    

     for (let j = 0; j < idlestring.length; j++) { // Use a different loop variable (j) to avoid conflicts
        let mycharacter = new character(idlestring[j], x, y);
        animation.push(mycharacter);
    }
      for (let j = 0; j < runstring.length; j++) { // Use a different loop variable (j) to avoid conflicts
        let mycharacter = new character(runstring[j], x, y);
        run.push(mycharacter);
      }
      console.log(run.length)
    for (let i = 0; i < 10 ; i++) {
        myFood = new food(random(19,600), random(500,100), 25);
        foodArray.push(myFood)

    
    }
    setInterval(updateIndex, 70);
    setInterval(updaterunIndex, 70);
}

function draw() {

    background(40, 100, 10); //this is the part to change the thing you like
   
for (let j = 0; j < foodArray.length; j++) {
    foodArray[j].draw();
}

if (keyIsPressed) {
    run[k].draw();

    if (key == "a") {
        x--;
        flipX = true;
    }
    if (key == "d") {
        x++;
        flipX = false;
    }
    if (key == "w") {
         y--;
    }
    if (key == "s") {
        y++;
    }
    // Update positions for all animation frames
    for (let j = 0; j < animation.length; j++) {
        animation[j].flipX = flipX;
        animation[j].x = x;
        animation[j].y = y;
        
        
    }
      // Update positions for all animation frames
      for (let k = 0; k < animation.length; k++) {
        animation[k].flipX = flipX;
        animation[k].x = x;
        animation[k].y = y;
    }
    
//food collisions
for (let k = 0; k < foodArray.length; k++) {
if (animation[i].hasCollided(foodArray[k].x, foodArray[k].y, 25, 25)) {
    foodArray.splice(k, 1);

}
}

}
else {
    if (animation.length > 0) {
        animation[i].draw();
    }
}

}
function updateIndex() {
    i++;
    if (i > animation.length-1) { 
        i = 0;
    }
}
function updaterunIndex() {
    k++;
    if (k > run.length-1) { 
        k = 0;
    }
}