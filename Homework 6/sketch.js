var animation = [];
var i = 0;

function preload() {
    for (var j = 1; j < 33; j++) { // Use a different loop variable (j) to avoid conflicts
        let mycharacter = new character("images/waffle (" + j + ").png");
        animation.push(mycharacter);
    }
}

function setup() {
    createCanvas(800, 800);
    setInterval(updateIndex, 50);
}

function draw() {
    background(120);
    if (animation.length > 0) {
        animation[i].draw();
    }
    circle (100,100,100); 
    
}

function updateIndex() {
    i++;
    if (i >= animation.length) { // Ensure looping correctly
        i = 0;
    }
}