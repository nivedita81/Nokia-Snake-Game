const grid = document.querySelector(".grid");
const start = document.getElementById("start");
let score = document.getElementById("score");
let scoreVal = 0;
let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
let width = 10;
let appleIndex = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerID = 0;


//creating the play area(grid)
function createGrid() {
    for (let i=0; i<100; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        squares.push(square);
    }   
}
createGrid()

//adding snake class to all elements in snake array
currentSnake.forEach(index => squares[index].classList.add('snake'));

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));

    squares[appleIndex].classList.remove('apple')

    clearInterval(timerID)
    currentSnake = [2,1,0]
    scoreVal = 0

    score.textContent = scoreVal

    direction = 1
    intervalTime = 1000
    generateApples()
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    //making the snake move for every 1 second
    timerID = setInterval(move, intervalTime)
}

console.log(currentSnake)

//using unshift(), so as to move the snake in direction of the pressed key
function move() {
    if((currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) || 
        (currentSnake[0] % width === 0 && direction === -1) || 
        (currentSnake[0] - width < 0 && direction === -width) || 
        squares[currentSnake[0] + direction].classList.contains('snake')){
        score.textContent = "Better luck next time!!"
        return clearInterval(timerID)
    }

    const tail = currentSnake.pop()
    console.log(tail)
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction)
    console.log(currentSnake)

    if(squares[currentSnake[0]].classList.contains('apple')){
        //remove class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake');

        //grow our snake array
        currentSnake.push(tail)
        console.log(currentSnake)

        //generate new apple
        generateApples()

        //add one to the score
        scoreVal++
        score.textContent = scoreVal;

        //speeding up the snake when an apple is eaten
        clearInterval(timerID)
        intervalTime = intervalTime * speed
        timerID = setInterval(move, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake');
}

move()

function generateApples() {
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    }while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

generateApples()

function control(e) {
    if(e.keyCode === 39){
        console.log('right pressed')
        direction = 1
    }else if(e.keyCode === 38){
        console.log('up pressed')
        direction = -width
    }else if(e.keyCode === 37){
        console.log('left pressed')
        direction = -1
    }else if(e.keyCode === 40){
        console.log('down pressed')
        direction = +width
    }
}

document.addEventListener('keyup', control)
start.addEventListener('click', startGame)