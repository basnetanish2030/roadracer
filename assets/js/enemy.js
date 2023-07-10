import { canvas, ctx, carHeight, carWidth, carSound, gameOver} from "./index.js";
import {carX, carY, projectile} from './fighter.js';

const crashSound = new Audio("./assets/sound/crash.mp3");
export var score = 0;
export var life = 3;

const enemyCars = [];
const enemyCarWidth = 50;
const enemyCarHeight = 80;
const enemyCarSpeed = 5;

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
        enemyCar.y += enemyCar.speed;
        if (
            carX < enemyCar.x + enemyCar.width &&
            carX + carWidth > enemyCar.x &&
            carY < enemyCar.y + enemyCar.height &&
            carY + carHeight > enemyCar.y
        ) {
            collided(enemyCar);
        }

        // Check for collision with projectile
        if (
            projectile.isFired &&
            projectile.x < enemyCar.x + enemyCar.width &&
            projectile.x + projectile.width > enemyCar.x &&
            projectile.y < enemyCar.y + enemyCar.height &&
            projectile.y + projectile.height > enemyCar.y
        ) {
            score++;
            enemyCars.splice(enemyCars.indexOf(enemyCar), 1);
            projectile.isFired = false;
            crashSound.currentTime = 0;
            crashSound.play();
        }
        // Check if enemy car has passed the fighter car
        if (enemyCar.y > canvas.height) {
            score++;
            enemyCars.splice(enemyCars.indexOf(enemyCar), 1);
        }
    });
}

function collided(enemyCar){
    if(life>1){
        life--;
        enemyCars.splice(enemyCars.indexOf(enemyCar), 1);
    }
    else{
        crashSound.currentTime = 0;
        crashSound.play();
        carSound.pause();
        gameOver();
    }
}