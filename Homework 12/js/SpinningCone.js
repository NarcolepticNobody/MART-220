class SpinningCone {
  constructor(x, y, z, axis) {
    this.pos = createVector(x, y, z);
    this.axis = axis;
    this.rotation = 0;
    this.hue = random(360);
    this.targetHue = random(360);
  }

  update() {
    this.rotation += 1;
    this.hue = lerp(this.hue, this.targetHue, 0.02);

    if (frameCount % 180 === 0) {
      this.targetHue = random(360);
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateAxis(this.axis, this.rotation);
    ambientMaterial(hue, 80, 100);
    noStroke();
    cone(30, 60);
    pop();
  }
}

function rotateAxis(axis, angle) {
  if (axis === 'x') rotateX(angle);
  else if (axis === 'y') rotateY(angle);
  else if (axis === 'z') rotateZ(angle);
}