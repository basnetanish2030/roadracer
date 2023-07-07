const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const carWidth = 50;
const carHeight = 80;
let carX= 170;
let carY=450;

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

    /*------Lane Divider-----*/
    

    /*------Road Lanes------*/
    ctx.fillStyle = "#2f2b5c";
    ctx.fillRect(25,0,345,550); 

}

drawScreen();
