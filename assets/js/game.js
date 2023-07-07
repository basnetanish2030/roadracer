const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//Initializing all required global properties and values
const carWidth = 50;
const carHeight = 80;
let carX= 170;
let carY=450;
let isMovingLeft = false;
let isMovingRight = false;
let isMovingUp = false;
let isMovingDown = false;
let pauseGame = false;

function drawScreen(){
    //Left Yard
    ctx.fillStyle = "#6d8c32";
    ctx.fillRect(0,0,25,550);

    //Right Yard
    ctx.fillStyle = "#6d8c32";
    ctx.fillRect(370,0,25,550);

    //Draw Fighter Car
    const fighterCar = new Image();
    fighterCar.src = './assets/img/vehicles/Ford_GT40.png';

    fighterCar.onload = () => {
        ctx.drawImage(fighterCar, carX, carY, carWidth, carHeight);
    }

  


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

    document.addEventListener("keypress", startGame);

}


enemyCars = [];

// Function to create enemy cars
function createEnemyCar() {
    const x = Math.random() * (canvas.width - 50);
    const enemyCar = {
      x: x,
      y: 0,
      width: 50,
      height: 80,
      color: "red",
      speed: 3,
    };
    enemyCars.push(enemyCar);
}

function enemyMove(){
    enemyCars.forEach((enemyCar) => {
        ctx.fillStyle = enemyCar.color;
        ctx.fillRect(enemyCar.x, enemyCar.y, enemyCar.width, enemyCar.height);
    
        // Move the enemy cars
        enemyCar.y += enemyCar.speed;
    
    });
}
  

// Updating car position according to movement
function moveCar() {
    if (isMovingLeft && carX > 25) {
        carX -= 5;
    } 
    else if (isMovingRight && carX + carWidth < canvas.width-25) {
        carX += 5;
    }
    else if (isMovingUp && carY > 0) {
        carY -= 5;
    }
    else if (isMovingDown && carY + carHeight < canvas.height) {
        carY += 5;
    }
}

// Handling keydown event of car movement
function handleKeyDown(event) {
    switch(event.key){
        case 'ArrowLeft':
            isMovingLeft = true;
            break;
        
        case 'ArrowRight':
            isMovingRight = true;
            break;

        case 'ArrowUp':
            isMovingUp = true;
            break;
        
        case 'ArrowDown':
            isMovingDown = true;
            break;
        
    }
}
  
// Handling keyup event of car movement
function handleKeyUp(event) {
    switch(event.key){
        case 'ArrowLeft':
            isMovingLeft = false;
            break;
        
        case 'ArrowRight':
            isMovingRight = false;
            break;

        case 'ArrowUp':
            isMovingUp = false;
            break;
        
        case 'ArrowDown':
            isMovingDown = false;
            break;
    }
}

//Function for Game Startup setups
function startGame(event){
    if(event.code == "Space"){
        console.log("Game Started!");
        setInterval(createEnemyCar, 1000);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        
        setInterval(updateCanvas, 10);
        
        //requestAnimationFrame(updateCanvas);
    }
}

//Function to Update Canvas
function updateCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.carHeight);
    enemyMove();
    moveCar();
    drawScreen();

    //requestAnimationFrame(updateCanvas);
    
}

//Draws screen at initial stage
drawScreen();
