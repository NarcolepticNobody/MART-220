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
    this.currentAnimation = createSprite(this.x, this.y);
  }


  display(img) {
      image(img, this.x, this.y, this.w, this.h);
  }

  collidesWith(character) {
      return (character.x < this.x + this.w &&
              character.x + character.width > this.x &&
              character.y < this.y + this.h &&
              character.y + character.height > this.y);
  }
              
}