class logred {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.currentAnimation;
    this.createAnimation();
    this.redhealth = 50;
  }

  createAnimation() {
    this.currentAnimation = createSprite(this.x, this.y, 'static');
    this.currentAnimation.img = 'logred/logred01.png'; // your red log image
    this.currentAnimation.scale = 0.14;
    this.currentAnimation.width = 12;
    this.currentAnimation.height = 12;
  }

  // New method to chase the player
  update(targetX, targetY) {
    let speed = 1; // red logs are faster to make them scarier!

    let dir = createVector(targetX - this.currentAnimation.position.x, targetY - this.currentAnimation.position.y);
    dir.normalize();
    dir.mult(speed);

    this.currentAnimation.position.x += dir.x;
    this.currentAnimation.position.y += dir.y;
  }
}
