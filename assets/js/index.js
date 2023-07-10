//Importing Fighter Car Controls
import {moveCar, handleKeyDown, handleKeyUp} from './fighter.js';
import {carX, carY, projectile, fireProjectile} from './fighter.js';
//Importing Enemy Car Functions
import {createEnemy, moveEnemy, score, life} from './enemy.js';

export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

//Initializing all required global properties and values
export const carWidth = 50;
export const carHeight = 80;
export const carSound = new Audio('./assets/sound/carsound.mp3')
export var highestScore = localStorage.getItem("highestScore") || 0;


const roadImg = new Image();
roadImg.src = './assets/img/road.png';
let roadOffsetY = 0;
const roadSpeed = 3;

document.addEventListener("keypress", playPause);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);  


function drawScreen(){
    //Left Yard
    ctx.fillStyle = "#6d8c32";
    ctx.fillRect(0,0,25,550);

    //Right Yard
    ctx.fillStyle = "#6d8c32";
    ctx.fillRect(370,0,25,550);

    /*------Road Lanes------*/
    ctx.fillStyle = "#2f2b5c";
    ctx.fillRect(25,0,345,550); 

    /*------Lane Dividers-----*/
    ctx.setLineDash([20, 20]); // Set the dash pattern
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(140, 0);
    ctx.lineTo(140, 550);
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(255, 0);
    ctx.lineTo(255, 550);
    ctx.stroke();

    ctx.fillStyle = "yellow";
    ctx.font = "36px Arial";
    ctx.fillText("ROAD RACER", canvas.width / 2 - 100, canvas.height / 2);
    ctx.font = "24px Arial";
    ctx.fillText("Press ENTER to START", canvas.width / 2 -115, canvas.height / 2+36);
}

//Play and Pause Control
function playPause(event){
    if(event.code == "Enter"){
        console.log("Game Started!");
        startGame();
    }
}

//Function for Game Startup setups
function startGame(){
    carSound.currentTime = 0;
    carSound.loop = true;
    carSound.play();
    setInterval(createEnemy, 1000);
    updateCanvas();
}

//Function to Update Canvas
function updateCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.carHeight);
    
    roadOffsetY += roadSpeed;
    if (roadOffsetY > canvas.height) {
      roadOffsetY = 0;
    }

    ctx.drawImage(roadImg, 0, roadOffsetY, canvas.width, canvas.height);
    ctx.drawImage(roadImg, 0, roadOffsetY - canvas.height, canvas.width, canvas.height);

    //Draw Fighter Car
    const fighterCar = new Image();
    fighterCar.src = './assets/img/vehicles/Ford_GT40.png';
    ctx.drawImage(fighterCar, carX, carY, carWidth, carHeight);
    moveCar();
    moveEnemy();

    // Draw the scores
    const highest = new Image();
    highest.src = './assets/img/highest.png';
    ctx.drawImage(highest,30,20,40,40);
    ctx.fillText(highestScore, 80, 50);

    const scoreImg = new Image();
    scoreImg.src = './assets/img/score.png';
    ctx.drawImage(scoreImg,160,20,40,40);
    ctx.fillText(score, 210, 50);

    const lifeImg = new Image();
    lifeImg.src = './assets/img/life.png';
    ctx.drawImage(lifeImg,300,20,40,40);
    ctx.fillText(life, 350, 50);

    // Draw the projectile
    if (projectile.isFired) {
        ctx.fillStyle = projectile.color;
        ctx.fillRect(
        projectile.x,
        projectile.y,
        projectile.width,
        projectile.height
        );
        projectile.y -= projectile.speed;
    }
    requestAnimationFrame(updateCanvas);
}

export function gameOver(){
    clearInterval();
    if (score > highestScore) {
        highestScore = score;
        localStorage.setItem("highestScore", highestScore);
    }
    ctx.fillStyle = "white";
    ctx.font = "36px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    ctx.font = "24px Arial";
    ctx.fillText("Press ENTER to continue", canvas.width / 2 - 150, canvas.height / 2+36);
    // Reset the score
    score = 0;
    // Reset the game
    fighterCar.x = canvas.width / 2;
    fighterCar.y = canvas.height - 50;
    enemyCars.length = 0;
    projectile.isFired = false;
}
//Draws screen at initial stage
drawScreen();