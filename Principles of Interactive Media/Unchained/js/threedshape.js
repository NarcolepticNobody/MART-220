class Glamtastic3DShape {
    constructor(x, y, speedX, speedY, blingFactor = 1.0) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.blingFactor = blingFactor; // Controls the fabulousness ✨
        this.hue = random(360); // For glam color cycling
    }

    moveShape() {
        push();

        // Move to position with a little sparkle ✨
        translate(this.x, this.y, sin(frameCount * 0.1) * 100 * this.blingFactor);

        // Rotate like a diva on the runway 💃
        rotateX(frameCount * this.speedX * 0.01 * this.blingFactor);
        rotateY(frameCount * this.speedY * 0.01 * this.blingFactor);
        rotateZ(sin(frameCount * 0.02) * 0.5); // A lil' shimmy

        // Optional scale pulsing
        let scalePulse = 1 + 0.1 * sin(frameCount * 0.1);
        scale(scalePulse);

        // Add some radiant color drama 🌈
        colorMode(HSB);
        fill(this.hue, 100, 100);
        stroke((this.hue + 180) % 360, 80, 100);
        this.hue = (this.hue + 1) % 360;

        // (Leave the actual shape drawing to the child class or sketch)
        // Example: box(50 * this.blingFactor);

        pop();

        // Fun debug logging if you want it
        // console.log(`GlamShape at (${this.x}, ${this.y}) twirling fabulously.`);
    }
}
