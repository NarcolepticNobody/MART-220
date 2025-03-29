class tree {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
 
 isColliding(myImage) {
  return this.currentAnimation.collide(myImage);
  
}
  display(img) {
    image(img, this.x, this.y, this.w, this.h);
  }
}
/*
for (let i = 0; i < 3; i++) {
  let x, y;
  do {
    x = random(50, 750);
    y = random(400, 550);
  } while (!isSafeSpawn(x, y));
  let tombstone = createSprite(x, y, 50, 50);
  tombstone.addImage(tombstoneImg2);
  tombstone.scale = 1.0;
  tombstone.collider = 'static';
  tombstones.push(tombstone);
}
  */