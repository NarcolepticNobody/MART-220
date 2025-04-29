class tree {
  constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.currentAnimation;
      this.createAnimation();

  }

   // this creates the initial sprite
   createAnimation() {
    this.currentAnimation = createSprite(this.x, this.y, 'static');
    this.currentAnimation.img = 'trees/PineTree01.png';
    this.currentAnimation.scale = .30;
    //hit box
    this.currentAnimation.width = 10;
    this.currentAnimation.height = 10;
  }
  }