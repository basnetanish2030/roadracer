import { canvas, ctx, carHeight, carWidth } from "./index.js";
import {carX, carY} from './fighter.js';

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

        // Check for collision with fighter car
        if (
            carX < enemyCar.x + enemyCar.width &&
            carX + carWidth > enemyCar.x &&
            carY < enemyCar.y + enemyCar.height &&
            carY + carHeight > enemyCar.y
        ) {
            // Collision detected
            alert("Game Over");
            // Reset the game
            carX = canvas.width / 2;
            carY = canvas.height - 50;
            enemyCars.length = 0;
        }
    });

    
}