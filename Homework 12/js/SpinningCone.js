class SpinningCone {
    constructor(x, y, z, axis = 'y') {
      this.x = x;
      this.y = y;
      this.z = z;
      this.axis = axis;
      this.angle = 0;
      this.col = color(random(255), random(255), random(255));
      this.noiseOffset = random(1000);
    }
  
    update() {
      let n = noise(this.noiseOffset);
      let speed = map(n, 0, 1, 0.5, 2);
      this.angle += speed;
      this.noiseOffset += 0.01;
    }
  
    display() {
      push();
      translate(this.x, this.y, this.z);
  
      if (this.axis === 'x') rotateX(this.angle);
      else if (this.axis === 'y') rotateY(this.angle);
      else if (this.axis === 'z') rotateZ(this.angle);
  
      specularMaterial(this.col);
      cone(30, 80, 24, 1); // ✅ correct usage
      pop();
    }
  }
  