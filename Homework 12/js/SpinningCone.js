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
    this.hue = random(360);          // starting hue
    this.targetHue = random(200, 255, 255);    // color shifting
  }

  update() {
    this.rotation += 3;
    this.hue = lerp(this.hue, this.targetHue, 0.02); // smooth color transition

    if (frameCount % 180 === 0) {
      this.targetHue = random(360); // new target color every 3 seconds
    }
  }

  display() {
    let bounceY = this.baseY + sin(frameCount * 2) * 400;

    push();
    translate(this.position.x, bounceY, this.position.z);
    rotateAxis(this.axis, this.rotation);
    
   
    
    shininess(50); // optional
    
    noStroke();
    cone(50, 70);
    pop();
  }

  get pos() {
    // Match bounce height to display()
    return createVector(
      this.position.x,
      this.baseY + sin(frameCount * 2) * 200,
      this.position.z
    );
  }
}
