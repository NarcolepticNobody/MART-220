// Modify Character class
class character {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 40; // Adjust size based on character sprite
      this.height = 50; // Adjust accordingly
      this.animations = {};
  }

  loadAnimation(character, frames) {
      this.animations[character] = frames;
  }

  draw(state) {
      textSize(20);
      fill(255);
      text(state, this.x, this.y - 20);
  }

  updatePosition(direction) {
      let speed = 5;
      let newX = this.x;
      let newY = this.y;

      if (direction === 'forward') newX += speed;
      if (direction === 'reverse') newX -= speed;
      if (direction === 'up') newY -= speed;
      if (direction === 'down') newY += speed;

      // Check for collision before moving
      if (!this.collidesWithTree(newX, newY)) {
          this.x = constrain(newX, 0, width);
          this.y = constrain(newY, 0, height);
      }
  }

  collidesWithTree(newX, newY) {
      for (let tree of trees) {
          if (newX + this.width > tree.x &&
              newX < tree.x + tree.w &&
              newY + this.height > tree.y &&
              newY < tree.y + tree.h) {
              return true; // Collision detected
          }
      }
      return false;
  }

  isColliding(food) {
      return dist(this.x, this.y, food.x, food.y) < 20;
  }
}
