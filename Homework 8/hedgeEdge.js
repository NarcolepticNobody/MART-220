class edge
{
    constructor(x, y, hedge)
    {
        this.x = x;
        this.y = y;
        
        this.hedge = new Sprite(x, y, 20);
        
  

    }

    // use color instead of fill
    draw()
    {
        if(this.hedge)
        {
           // fill(0, 255, 0);
        this.hedgePiece.color = "green"
        }
        else
        {
           // fill(255, 0, 0);
            this.hedgePiece.color = "red"
        
        }
       // circle(this.x, this.y, 25);
    }
}