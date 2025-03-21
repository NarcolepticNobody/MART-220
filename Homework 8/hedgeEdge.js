class hedge{
    constructor(x, y) {
    
      this.x = x;
      this.y = y;
      this.path = path;
      this.imageWidth = 150;
      this.imageHeight = 200;
      this.myImage = loadImage(this.path);
  
    }
  
    // Sprite
    hedgeAnimation() {
      this.hedgeAnimation = createSprite(this.x, this.y);
    }

    // use color instead of fill
    draw()
    {
       
        
    }
}