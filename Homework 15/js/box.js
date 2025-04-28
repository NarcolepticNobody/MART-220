class SpinningBox {
  constructor(radius, angleOffset) {
    this.radius = radius;
    this.angleOffset = angleOffset;
    this.rotation = 0;
  }

  update(globalAngle) {
    this.rotation += 2;
    this.angle = -globalAngle + this.angleOffset; // Opposite direction!
  }

  display() {
    let x = cos(this.angle * 1) * 900;
    let z = sin(this.angle * 1) * 800;
    let y = cos(this.angle) * this.radius;

    push();
    translate(x, y, z);
    rotateX(this.rotation);
    noStroke();
    specularMaterial(220);
    shininess(80);
    box(60);
    pop();
  }
}
