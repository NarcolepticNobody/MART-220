class SpinningBox extends threedshape {
  constructor(x, y, speedX, speedY, radius, angleOffset) {
    super(x, y, speedX, speedY);
    this.radius = radius;
    this.angleOffset = angleOffset;
    this.rotation = 0;
    this.hue = random(360);
    this.targetHue = random(360);
  }

  update(globalAngle) {
    this.rotation += 2; // Fast spin
    this.angle = -globalAngle + this.angleOffset; // Reversed orbit

    this.hue = lerp(this.hue, this.targetHue, 0.02);
    if (frameCount % 150 === 0) {
      this.targetHue = random(360);
    }
  }

  display() {
    let x = cos(this.angle) * this.radius;
    let z = sin(this.angle) * this.radius;
    let y = cos(this.angle * 2) * 50;

    let col = color(this.hue, 100, 80);

    push();
    translate(x, y, z);

    // Use the shared shape movement
    this.moveShape();

    // Unique rotation for spinning
    rotateX(this.rotation);

    ambientMaterial(col);
    noStroke();
    box(100, 90);
    pop();
  }
}
