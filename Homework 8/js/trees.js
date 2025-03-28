class trees {
constructor(x, y) {
    
    this.x = x;
    this.y = y;
    this.currentAnimation;
    this.createAnimation();
    
    //this.isGood = isGood;
    this.rotationSpeed = 0;
  }

  // Sprite
  createAnimation() {
    this.currentAnimation = createSprite(this.x, this.y);
  }


  // fill the animation frames into the current animation object
  loadAnimation(animationType, fileNames) {

    this.currentAnimation.addAnimation(animationType, fileNames[0], fileNames[fileNames.length - 1]);
    // set the hit box
    this.currentAnimation.width = 300;
    this.currentAnimation.height = 150;

  }

  // draw the character sprite
  draw() {


    
  }
 


}