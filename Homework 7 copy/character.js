
class character
{
    constructor(path, x, y)
    {
        this.path = path;
        this.x = x;
        this.y = y;
        this.imageWidth = 75;
        this.imageHeight = 75;
        this.flipX = false;
        this.flipRun = false;

        // need the image
        this.myImage = loadImage(this.path);
    }

    draw()
    {
        push();
        if (this.flipX) {
        translate(this.imageWidth, 0);
        scale(-1, 1);
        image(this.myImage, -this.x, this.y, 100, 100); 

        }
        else {
        image(this.myImage, this.x, this.y, 100, 100);
        } 
        pop();
    }

}
