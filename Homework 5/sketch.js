var animation = [];
var i = 0;
var myPopcorn;
function preload()
{

    //myPopcorn = new popcorn("../images/Idle__000.png");
    for(var i = 1; i< 9; i++)
    {
        // concatenation - adding strings together
        myPopcorn = new myPopcorn("images/Dead (" + i + ").png");  
        animation.push(myPopcorn);
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
    //myPopcorn.draw();
}

function updateIndex()
{
    i++;
    if(i > 7)
    {
        i = 0;
    }
   
}