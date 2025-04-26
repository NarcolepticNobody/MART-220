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
    let x = cos(this.angle * 1) * 200;
    let z = sin(this.angle * 1) * 800;
    let y = cos(this.angle) * this.radius;

    push();
    translate(x, y, z);
    rotateX(this.rotation);
    noStroke();
    shininess(80);
    ambientMaterial(200); // simple neutral gray, or use specularMaterial() for shiny
    box(40);
    pop();
  }
}
