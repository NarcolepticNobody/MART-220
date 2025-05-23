class character {
  constructor(x, y, w, h) {
  
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.currentAnimation;
    this.createAnimation();
    this.speed = 3;
    

  }

  // this creates the initial sprite
  createAnimation() {
    this.currentAnimation = createSprite(this.x, this.y);
  }


  // fill the animation frames into the current animation object
  loadAnimation(animationType, fileNames) {
console.log(fileNames[0]);
    this.currentAnimation.addAnimation(animationType, fileNames[0], fileNames[fileNames.length - 1]);
    // set the hit box
    this.currentAnimation.width = 200;
    this.currentAnimation.height = 100;

  }

  // draw the character sprite
  draw(animationType) {
  

    this.currentAnimation.frameDelay = 5;
    this.currentAnimation.scale = .19;
    this.currentAnimation.rotationLock = true;
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
      this.currentAnimation.velocity.y = 0; //
    }
  }


  // this gives direction in words
  updatePosition(direction) {
    this.direction = direction;
    let halfW = this.currentAnimation.width * this.currentAnimation.scale / 2;
    let halfH = this.currentAnimation.height * this.currentAnimation.scale / 2;
    

    
    this.currentAnimation.position.x = constrain(this.currentAnimation.position.x, 50, width - 50);
  this.currentAnimation.position.y = constrain(this.currentAnimation.position.y, 50, height - 50);



  }


  // using the overlap function in p5play for collision
  isColliding(myImage) {
   return this.currentAnimation.collides(myImage);
  }


}