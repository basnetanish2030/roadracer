//Importing Fighter Car Controls
import {moveCar, handleKeyDown, handleKeyUp} from './fighter.js';
import {carX, carY} from './fighter.js';

//Importing Enemy Car Functions
import {createEnemy, moveEnemy, score, highestScore} from './enemy.js';

export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

//Initializing all required global properties and values
export const carWidth = 50;
export const carHeight = 80;

export const carSound = new Audio('./assets/sound/carsound.mp3')

const roadImg = new Image();
roadImg.src = './assets/img/road.png';

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

    
    ctx.drawImage(roadImg,0,0,canvas.width,canvas.carHeight);

    // Draw the score
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
    ctx.fillText("Highest Score: " + highestScore, 10, 60);

    document.addEventListener("keypress", playPause);
}

let allowPause = false;

//Play and Pause Control
function playPause(event){
    if(event.code == "Space" && allowPause == false){
        console.log("Game Started!");
        allowPause = false;
        startGame();
    }
    else if(event.code == "Space" && allowPause==true){
        allowPause = false;
        drawScreen();
    }
}

//Function for Game Startup setups
function startGame(event){
    carSound.currentTime = 0;
    carSound.play();
    
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);    setInterval(createEnemy, 1000);
    updateCanvas();
}

//Function to Update Canvas
function updateCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.carHeight);
    
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);

    // Draw the score
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
    ctx.fillText("Highest Score: " + highestScore, 10, 60);
    
    //Draw Fighter Car
    const fighterCar = new Image();
    fighterCar.src = './assets/img/vehicles/Ford_GT40.png';
    ctx.drawImage(fighterCar, carX, carY, carWidth, carHeight);

    moveCar();
    moveEnemy();
    requestAnimationFrame(updateCanvas);
}

//Draws screen at initial stage
drawScreen();