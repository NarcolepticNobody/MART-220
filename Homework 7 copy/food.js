class food
{
    constructor(x, y, size)
    {
        this.x = x;
        this.y = y;
        
    }

    draw()
    {
        fill(22, 1, 120);
        circle(this.x, this.y, 25);
    }
}