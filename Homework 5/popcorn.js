class popcorn
{
    constructor(path)
    {
        this.path = path;
        // need the image
        this.myImage = loadImage(this.path);
    }

    draw()
    {
        // image draw
        image(this.myImage, 100,100);
    }


}