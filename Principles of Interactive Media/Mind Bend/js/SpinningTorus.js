class SpinningTorus extends threedshape {
  constructor(x, y, speedX, speedY, radius, angleOffset) {
    super(x, y, speedX, speedY);
    this.radius = radius;
    this.angleOffset = angleOffset;
    this.rotation = 0;
    this.hue = random(360);
    this.targetHue = random(360);
  }

  update(globalAngle) {
    this.rotation += 0.01;
    this.angle = globalAngle + this.angleOffset;

    this.hue = lerp(this.hue, this.targetHue, 0.09);
    if (frameCount % 120 === 0) {
      this.targetHue = random(360);
    }
  }

  display() {
    let x = cos(this.angle * 2) * 200;
    let z = sin(this.angle) * this.radius;
    let y = sin(this.angle * 2) * 200;

    let col = color(this.hue, 80, 100);

    push();
    translate(x, y, z);
    this.moveShape(); // Parent class adds extra rotation
    rotateY(this.rotation); // Your original vibe
    ambientMaterial(col);
    noStroke();
    torus(100, 1);//smaller number made it look like yarn!
    scale(800);
    pop();
  }
}
