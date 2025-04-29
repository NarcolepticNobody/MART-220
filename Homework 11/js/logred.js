class logred {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.currentAnimation;
    this.createAnimation();
    this.redhealth = 50;
    this.normalSpeed = 0.2;
    this.lungeSpeed = 0.4;   
    this.isLunging = false;
    this.lungeCooldown = 7; 
  }

  createAnimation() {
    this.currentAnimation = createSprite(this.x, this.y, 'static');
    this.currentAnimation.img = 'logred/logred01.png'; 
    this.currentAnimation.scale = 0.1;
    this.currentAnimation.width = 12;
    this.currentAnimation.height = 12;
  }

  update(targetX, targetY) {
    // Update cooldown timer
    if (this.lungeCooldown > 0) {
      this.lungeCooldown--;
    }

    // Distance to player
    let d = dist(this.currentAnimation.position.x, this.currentAnimation.position.y, targetX, targetY);

  
    if (d < 150 && this.lungeCooldown === 0) {
      this.isLunging = true;
      this.lungeCooldown = 120; 
    }

    let speed = this.isLunging ? this.lungeSpeed : this.normalSpeed;

    let dir = createVector(targetX - this.currentAnimation.position.x, targetY - this.currentAnimation.position.y);
    dir.normalize();
    dir.mult(speed);

    this.currentAnimation.position.x += dir.x;
    this.currentAnimation.position.y += dir.y;

    // After lunging a little, go back to normal
    if (this.isLunging && d > 160) {
      this.isLunging = false;
    }
    this.currentAnimation.position.x = constrain(this.currentAnimation.position.x, 0 + 10, width - 10);
    this.currentAnimation.position.y = constrain(this.currentAnimation.position.y, 0 + 10, height - 10);

  }
}
