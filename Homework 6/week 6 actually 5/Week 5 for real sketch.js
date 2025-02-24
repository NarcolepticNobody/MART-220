var animation = [];
var i = 0;
var x = 100;
var y = 100;
var foodArray = [];
var foodFound = false;
var myfood;
var circle = 0;

function preload() {
    for (var j = 1; j < 33; j++) { // Use a different loop variable (j) to avoid conflicts
        let mycharacter = new character("images/D (" + j + ").png",x,y);
        animation.push(mycharacter);
    }
  console.log(animation.length)
    }


function setup() {
    createCanvas(800, 800);
    setInterval(updateIndex, 80);

    for (let i = 0; i < 5; i++) {
        myFood = new food(random(50,600), random(100,690), 25);
        foodArray.push(myFood)

    }
}

function draw() {
    background(40,100,1, 10);
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
  for (let i = 0; i < 32; i++) {
    animation[i].x = x;
    animation[i].y = y;
    }
}




    

}
function updateIndex() {
    i++;
    if (i >= animation.length) { // Ensure looping correctly
        i = 0;
    }
}