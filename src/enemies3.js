// Getting canvas Element from the DOM
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

// Gloabl Variables
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 700;
const numberOfEnemies = 50;
const enemiesArray = [];

let gameFrame = 0;

// created Enemy object
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "images/enemy3.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flipSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 500;
    this.angleSpeed = Math.random() * 1.5 + 0.5;
    // this.curve = Math.random() * 200 + 50;
  }
  update() {
    this.x =
      (canvas.width / 2) * Math.sin((this.angle * Math.PI) / 200) +
      (canvas.width / 2 - this.width / 2);
    this.y =
      (canvas.height / 2) * Math.cos((this.angle * Math.PI) / 300) +
      (canvas.height / 2 - this.height / 2);
    this.angle += this.angleSpeed;

    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flipSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    context.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
