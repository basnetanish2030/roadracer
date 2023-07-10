import { carHeight, carWidth, canvas } from "./index.js";

export let carX=170;
export let carY=450;
let isMovingLeft = false;
let isMovingRight = false;
let isMovingUp = false;
let isMovingDown = false;
const shootSound = new Audio('./assets/sound/gunshot.mp3');

// Updating car position according to movement
export function moveCar() {
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
export function handleKeyDown(event) {
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
export function handleKeyUp(event) {
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
