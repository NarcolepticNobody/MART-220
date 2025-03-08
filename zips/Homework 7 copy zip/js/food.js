class food {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // Add a type property
    } 

    draw() {
        if (this.type === "blueberry") {
            fill(22, 1, 120); // Blue
            circle(this.x, this.y, 15);
        } 
        else if (this.type === "cherry") {
            fill(255, 0, 0); // Red
            circle(this.x, this.y, 15);
        }
                // Optional: Add a small detail on top
                fill(255, 0, 0);
                circle(this.x, this.y, 4);
            }
        }