class SpinningTorus {
    constructor(x, y, z, axis = 'y') {
      this.x = x;
      this.y = y;
      this.z = z;
      this.axis = axis;
      this.angle = 0;
    }
  
    update() {
      this.angle += 1; // spin speed
    }
  
    display() {
      push();
      translate(this.x, this.y, this.z);
  
      // Spin on selected axis
      if (this.axis === 'x') {
        rotateX(this.angle);
      } else if (this.axis === 'y') {
        rotateY(this.angle);
      } else if (this.axis === 'z') {
        rotateZ(this.angle);
      }
  
      ambientMaterial(255, 150, 0);
      torus(50, 15, 24, 16);
      pop();
    }
  }
  