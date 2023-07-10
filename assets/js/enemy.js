import { canvas, ctx, carHeight, carWidth, carSound, startGame } from "./index.js";
import {carX, carY} from './fighter.js';

const crashSound = new Audio("./assets/sound/crash.mp3");

// Enemy cars
const enemyCars = [];
const enemyCarWidth = 50;
const enemyCarHeight = 80;
const enemyCarSpeed = 3;
export var score = 0;

export function createEnemy(){
    const x = Math.random() * (canvas.width - 50 - enemyCarWidth);
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
        ){
            
            crashSound.currentTime = 0;
            crashSound.play();
            carSound.pause();

            // Reset the game
            carX = 170;
            carY = 450;
            enemyCars = [];
            
        }

        // Check if enemy car has passed the fighter car
        if (enemyCar.y > canvas.height) {
            score++;
            enemyCars.splice(enemyCars.indexOf(enemyCar), 1);
        }
    });
}