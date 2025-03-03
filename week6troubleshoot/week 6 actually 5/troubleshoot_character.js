class character
{
    constructor(path, x,y)
    {
        this.path = path;
        this.x = x;
        this.y = y;
        this.imageWidth = 200;
        this.imageHight = 200;



        // need the image
        this.myImage = loadImage(this.path);
    }

    draw()
    {
        // image draw
        //image(this.myImage, 150, 200);
        image(this.myImage, this.x, this.y, 300, 300);
    }

    hasCollided(x2, y2, w2, h2) {
    return (

        this.x < x2 + w2 &&
        this.x + this.imageWidth > x2 &&
        this.y < y2 + h2 &&
        this.y + this.imageHight > y2 
    );

}
}