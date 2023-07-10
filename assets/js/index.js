//Importing Fighter Car Controls
import {moveCar, handleKeyDown, handleKeyUp} from './fighter.js';
import {carX, carY} from './fighter.js';

//Importing Enemy Car Functions
import {createEnemy, moveEnemy, score} from './enemy.js';

export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

//Initializing all required global properties and values
export const carWidth = 60;
export const carHeight = 100;
 
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

    // Draw the score
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    document.addEventListener("keypress", playPause);

}

//Play and Pause Control
function playPause(event){
    let allowPause = false;
    if(event.code == "Space" && allowPause == false){
        console.log("Game Started!");
        allowPause = true;
        startGame();
    }
    else if(event.code == "Space" && allowPause==true){
        drawScreen();
    }
}

//Function for Game Startup setups
function startGame(event){
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    setInterval(createEnemy, 1000);
    updateCanvas();
}

//Function to Update Canvas
function updateCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.carHeight);
    drawScreen();
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