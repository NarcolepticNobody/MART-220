class food
{
    constructor(x, y, isGood)
    {
        this.x = x;
        this.y = y;
        this.isGood = isGood;
        // by creating a sprite (which we only do once, it will appear)
        this.foodPiece = new Sprite(x, y, 20);
        
  

    }

    // use color instead of fill
    draw()
    {
        if(this.isGood)
        {
           // fill(0, 255, 0);
        this.foodPiece.color = "green"
        }
        else
        {
           // fill(255, 0, 0);
            this.foodPiece.color = "red"
        
        }
       
    }
}