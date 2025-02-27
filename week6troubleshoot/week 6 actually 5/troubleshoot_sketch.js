var animation = [];
var i = 0;
var x = 100;
var y = 100;
var foodArray = [];
var foodFound = false;
var myfood;
var circle = 0;

function preload() {
    for (var j = 1; j < 10; j++) { // Use a different loop variable (j) to avoid conflicts
        let mycharacter = new character("images/Run (" + j + ").png",x,y);
        animation.push(mycharacter);
    }
  console.log(animation.length)
    }


function setup() {
    createCanvas(800, 800);
    setInterval(updateIndex, 70);

    for (let i = 0; i < 9 ; i++) {
        myFood = new food(random(50,600), random(500,200), 25);
        foodArray.push(myFood)

    }
}

function draw() {
    background(40, 100, 10); //this is the part to change the thing you like
    if (animation.length > 0) {
        animation[i].draw();
    }
for (let i = 0; i < foodArray.length; i++) {
    foodArray[i].draw();
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
  for (let i = 0; i < 9; i++) {
    animation[i].x = x;
    animation[i].y = y;
    }

for (let k = 0; k < foodArray.length; k++) {
if (animation[i].hasCollided(foodArray[k].x, foodArray[k].y, 25,25)) {
    foodArray.splice(k, 1);

}
}

}


    

}
function updateIndex() {
    i++;
    if (i >= animation.length) { // Ensure looping correctly
        i = 0;
    }
}