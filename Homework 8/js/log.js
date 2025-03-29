class log {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  
    display(img2) {
      image(img2, this.x, this.y, this.w, this.h);
    }
  }