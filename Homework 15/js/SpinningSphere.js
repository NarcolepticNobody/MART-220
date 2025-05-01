class SpinningSphere {
    constructor(radius, angleOffset) {
      this.centerX = random(-500, 500);  // assign fixed position
      this.centerY = random(-300, 300);
      this.centerZ = random(-500, 500);
      this.radius = radius;
      this.angleOffset = angleOffset;
    }
  
    update(angle) {
      this.x = this.centerX + this.radius * cos(angle + this.angleOffset);
      this.z = this.centerZ + this.radius * sin(angle + this.angleOffset);
    }
    
  
    display() {
      let x = cos(this.angle * 2) * 200;
      let z = sin(this.angle * 3) * 700;
      let y = sin(this.angle) * this.radius;
    
      let col = color(this.hue, 80, 100); // Convert from HSB
    
      push();
      translate(x, y, z);
      rotateX(this.rotation);
      rotateY(this.rotation);
      ambientMaterial(red(col), green(col), blue(col)); // Use RGB here
      noStroke();
      torus(15, 15);
      pop();
    }
    
  }