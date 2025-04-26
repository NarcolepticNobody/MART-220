class SpinningBox {
    constructor(radius, angleOffset) {
      this.radius = radius;
      this.angleOffset = angleOffset;
      this.rotation = 0;
      this.hue = random(360);
      this.targetHue = random(360);
    }
  
    update(globalAngle) {
      this.rotation += 2;
      this.angle = -globalAngle + this.angleOffset; // Opposite direction!
  
      this.hue = lerp(this.hue, this.targetHue, 0.02);
      if (frameCount % 150 === 0) {
        this.targetHue = random(360);
      }
    }
    display() {
        let x = cos(this.angle) * this.radius;
        let z = sin(this.angle * 1) * 200; //) * this.radius;
        let y = cos(this.angle * 1) * 200;
      
        //let col = color(this.hue, 80, 100); // Convert from HSB
        let col = color(this.hue, 100, 80); // Unique box coloring
        ambientMaterial(red(col), green(col), blue(col));
        
        push();
        translate(x, y, z);
        rotateX(this.rotation);
        ambientMaterial(red(col), green(col), blue(col)); // Use RGB here too
        noStroke();
        box(20);
        //box(90);
        pop();
      }
      
  }