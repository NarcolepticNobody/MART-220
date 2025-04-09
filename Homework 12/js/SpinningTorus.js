class SpinningTorus {
  constructor(x, y, z, axis = 'y') {
    this.x = x;
    this.y = y;
    this.z = z;
    this.axis = axis;
    this.angle = 0;
    this.speed = random(0.5, 3); // 🎯 random speed
    this.col = color(random(255), random(255), random(255));
  }

  update() {
    this.angle += this.speed; // 🌀 use speed
  }

  display() {
    push();
    translate(this.x, this.y, this.z);

    if (this.axis === 'x') rotateX(this.angle);
    else if (this.axis === 'y') rotateY(this.angle);
    else if (this.axis === 'z') rotateZ(this.angle);

    ambientMaterial(this.col);
    torus(50, 15, 24, 16);
    pop();
  }
}
