class character {
    constructor(x, y) {
    
      this.x = x;
      this.y = y;
      this.currentAnimation;
      this.createAnimation();
      this.speed = 5;
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
    draw(animationType) {

  
      this.currentAnimation.frameDelay = 5; 
      this.currentAnimation.scale = .2;
      this.currentAnimation.changeAnimation(animationType);
      
      if (animationType == 'run' && this.direction == 'forward') {
        this.currentAnimation.direction = 0;
        this.currentAnimation.mirror.x = false;
        this.currentAnimation.speed = this.speed;
        
  
      }
      else if (animationType == 'run' && this.direction == 'reverse') {
  
        this.currentAnimation.mirror.x = true;
        this.currentAnimation.direction = 180;
        this.currentAnimation.speed = this.speed;
  
      }
      else if (animationType == 'run' && this.direction == 'down') {
  
        this.currentAnimation.mirror.x = false;
        this.currentAnimation.direction = -270;
        this.currentAnimation.speed = this.speed;
  
      }
      else if (animationType == 'run' && this.direction == 'up') {
  
        this.currentAnimation.mirror.x = false;
        this.currentAnimation.direction = 270;
        this.currentAnimation.speed = this.speed;
  
      }
      else {
        this.currentAnimation.velocity.x = 0;
        this.currentAnimation.velocity.y = 0;
      }
    }
  
    // this gives direction in words
    updatePosition(direction) {
      this.direction = direction;
    }
  
    // using the overlap function in p5play?
    isColliding(myImage) {
      return this.currentAnimation.overlap(myImage); //bad foods?
      
    }
   
  
  
  }