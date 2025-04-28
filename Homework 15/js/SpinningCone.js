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
    this.rotation += 0;
    this.angle = globalAngle + this.angleOffset;
  }

  display() {
    let x = cos(this.angle * 1) * 10;
    let z = sin(this.angle * 1) * 3;
    let y = sin(frameCount * 3) * 800;

    push();
    translate(x, y, z);
    rotateAxis(this.axis, this.rotation);

    noStroke();
    specularMaterial(220);
    shininess(80);
    cone(300, 400, 244, 100);
    pop();
  }
}
