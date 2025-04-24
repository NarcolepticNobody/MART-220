function rotateAxis(axis, angle) {
  if (axis === 'x') rotateX(angle);
  else if (axis === 'y') rotateY(angle);
  else if (axis === 'z') rotateZ(angle);
}

class SpinningCone extends threedshape {
  constructor(x, y, z, axis, speedX, speedY) {
    super(x, y, speedX, speedY);
    this.z = z;
    this.baseY = y;
    this.axis = axis;
    this.rotation = 0;
    this.hue = random(360);
    this.targetHue = random(360);
  }

  update() {
    this.rotation += 3;
    this.hue = lerp(this.hue, this.targetHue, 0.02);

    if (frameCount % 180 === 0) {
      this.targetHue = random(360);
    }
  }

  display() {
    let bounceY = this.baseY + sin(frameCount * 2) * 300;
    let col = color(this.hue, 100, 100);

    push();
    translate(this.x, bounceY, this.z);

    // Inherited rotation from threedshape
    this.moveShape();

    // Axis-specific spin
    rotateAxis(this.axis, this.rotation);

    ambientMaterial(col);
    shininess(50);
    noStroke();
    cone(50, 90);
    pop();
  }

  get pos() {
    return createVector(this.x, this.baseY + sin(frameCount * 2) * 200, this.z);
  }
}
