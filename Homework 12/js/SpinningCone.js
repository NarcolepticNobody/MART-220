function rotateAxis(axis, angle) {
  if (axis === 'x') rotateX(angle);
  else if (axis === 'y') rotateY(angle);
  else if (axis === 'z') rotateZ(angle);
}

class SpinningCone {
  constructor(x, y, z, axis) {
    this.position = createVector(x, y, z); // renamed from pos
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
    let bounceY = this.baseY + sin(frameCount * 2) * 200;

    push();
    translate(this.position.x, bounceY, this.position.z);
    rotateAxis(this.axis, this.rotation);
    ambientMaterial(this.hue, 80, 100);
    noStroke();
    cone(30, 60);
    pop();
  }

  get pos() {
    return createVector(
      this.position.x,
      this.baseY + sin(frameCount * 2) * 20,
      this.position.z
    );
  }
}
