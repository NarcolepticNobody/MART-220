function rotateAxis(axis, angle) {
  if (axis === 'x') rotateX(angle);
  else if (axis === 'y') rotateY(angle);
  else if (axis === 'z') rotateZ(angle);
}


class SpinningCone {
  constructor(radius, angleOffset, axis) {
    this.radius = radius;      // how far from center
    this.angleOffset = angleOffset; // starting angle
    this.axis = axis;          // spinning axis
    this.rotation = 0;
  }

  update(globalAngle) {
    this.rotation += 3;
    this.angle = globalAngle + this.angleOffset;
  }

  display() {
    let x = cos(this.angle * 1) * 800;
    let z = sin(this.angle * 9) * 800;
    let y = sin(frameCount * 0.05) * 50; // optional bounce

    push();
    translate(x, y, z);
    rotateAxis(this.axis, this.rotation);

    noStroke();
    specularMaterial(220);
    shininess(80);
    cone(40, 80, 24, 16);
    pop();
  }
}
