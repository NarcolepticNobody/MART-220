class log {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.currentAnimation;
      this.createAnimation();
      this.health = 10;
      
      
    }
  
    // this creates the initial sprite
    createAnimation() {
      this.currentAnimation = createSprite(this.x, this.y, 'static');
      this.currentAnimation.img = 'log/log01.png';
      this.currentAnimation.scale = .14;
      //hit box//Needs particles
      this.currentAnimation.width = 12;
      this.currentAnimation.height = 12;
      
     
    }
  }