class SpinningBox {
  constructor(radius, angleOffset) {
    this.centerX = random(-500, 500); 
    this.centerY = random(-200, 200);
    this.centerZ = random(-500, 500);
    this.radius = radius;
    this.angleOffset = angleOffset;
  }

  update(angle) {
    this.x = this.centerX + this.radius * cos(angle + this.angleOffset);
    this.z = this.centerZ + this.radius * sin(angle + this.angleOffset);
  }

  display() {
    push();
    translate(this.x, this.centerY, this.z);
    rotateY(frameCount * 0.1); // local spin (optional)
    fill(200, 80, 100);
    box(20);
    pop();
  }
}
