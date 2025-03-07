class food
{
    constructor(x, y, size)
    {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw()
    {
        fill(22, 1, 120);
        circle(this.x, this.y, this.size);
    }



}