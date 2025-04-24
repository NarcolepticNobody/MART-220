class SpinningTorus {
  constructor(radius, angleOffset) {
    this.radius = radius;
    this.angleOffset = angleOffset;
    this.rotation = 0;
    this.hue = random(360);
    this.targetHue = random(360);
  }

  update(globalAngle) {
    this.rotation += 1;
    this.angle = globalAngle + this.angleOffset;

    this.hue = lerp(this.hue, this.targetHue, 0.09);
    if (frameCount % 120 === 0) {
      this.targetHue = random(360);
    }
  }

  display() {
    let x = cos(this.angle) * this.radius;
    let z = sin(this.angle) * this.radius;
    let y = sin(this.angle * 2) * 200;
  
    let col = color(this.hue, 80, 100); // Convert from HSB
  
    push();
    translate(x, y, z);
    rotateX(this.rotation);
    rotateY(this.rotation);
    ambientMaterial(red(col), green(col), blue(col)); // Use RGB here
    noStroke();
    torus(15, 15);
    pop();
  }
  
}