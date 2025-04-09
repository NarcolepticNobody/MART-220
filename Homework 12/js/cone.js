class Cone extends threedshape{

    constructor(x, y, speedX, speedY, radius, coneRadius)
    {
        super(x,y, speedX, speedY);
        this.radius = radius;
        this.coneRadius = coneRadius;

    }

    draw()
    {
        push();
        //super.moveShape();
        torus(this.radius, this.coneRadius);
        pop();
    }
}