import { canvas, ctx } from "./index.js";

// Enemy cars
const enemyCars = [];
const enemyCarWidth = 50;
const enemyCarHeight = 80;
const enemyCarSpeed = 3;

export function createEnemy(){
    const x = Math.random() * (canvas.width - enemyCarWidth);
    const enemyCar = {
        x: x,
        y: 0,
        width: enemyCarWidth,
        height: enemyCarHeight,
        img: new Image(),
        speed: enemyCarSpeed,
    };
    enemyCars.push(enemyCar);
}

export function moveEnemy(){
    enemyCars.forEach((enemyCar) => {
        enemyCar.img.src = './assets/img/vehicles/BMW.png';
        ctx.drawImage(enemyCar.img, enemyCar.x, enemyCar.y, enemyCar.width, enemyCar.height);

        // Move the enemy cars
        enemyCar.y += enemyCar.speed;
    });
}