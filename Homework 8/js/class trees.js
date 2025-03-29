class tree {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
 
 isColliding(myImage) {
  return this.currentAnimation.overlap(myImage);
  
}
  display(img) {
    image(img, this.x, this.y, this.w, this.h);
  }
}