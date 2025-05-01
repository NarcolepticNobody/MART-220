class SpinningTorus {
  constructor(radius, angleOffset) {
    this.radius = radius;
    this.angleOffset = angleOffset;
    this.rotation = 0;
  }

  update(globalAngle) {
    this.rotation += 9;
    this.angle = globalAngle + this.angleOffset;
  }

  display() {
    let x = cos(this.angle * 2) * 900;
    let z = sin(this.angle * 3) * 900;
    let y = sin(this.angle * 2) * 900;

    push();
    translate(x, y, z);
    rotateX(this.rotation);
    rotateY(this.rotation);
    noStroke();
    ambientMaterial(200); // Neutral gray tone, or use specularMaterial() if shiny
    torus(15, 15);
    pop();
  }
}
