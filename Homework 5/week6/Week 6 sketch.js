var animation = [];
var i = 0;
var mycharacter;
function preload()
{

   
    for(var i = 1; i < 33; i++)
    {
        // concatenation - adding strings together
        mycharacter = new character("images/D (" + i + ").png");  
        animation.push(mycharacter);
    }

    
    }

function setup()
{
    createCanvas(800, 800);
    setInterval(updateIndex, 50);
}

function draw()
{

    background(120);
    //image(animation[i], 100,100);
    animation[i].draw();
    //character.draw();
}

function updateIndex()
{
    i++;
    if(i > 32)
    {
        i = 0;
    }
    
}