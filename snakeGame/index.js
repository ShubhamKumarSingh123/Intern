const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const constrols = document.querySelectorAll(".controls i");

let foodX, foodY ;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let gameOver = false;
let setIntervalId ;
let score  = 0;

let snakeBody = [];

let highScore = localStorage.getItem('highScore') || 0;
highScoreElement.textContent = `High Score: ${highScore}`;

const getFood = () =>{
    foodX = Math.floor(Math.random() * 30)+1;
    foodY = Math.floor(Math.random() * 30)+1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay.........");
    location.reload();
}

const changeDirection = (e) =>{
    if(e.key === "w" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "s" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "a" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "d" && velocityX !=-1){
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}

constrols.forEach(key => {
    key.addEventListener("click", () => changeDirection({key : key.dataset.key}));
});

const initGame = () => {
    if(gameOver) return handleGameOver();
    // console.log(snakeBody);
    let food = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    if(snakeX === foodX && snakeY === foodY){
        getFood();
        snakeBody.push([foodX,foodY]);
        // console.log(snakeBody);
        score++;

        highScore = score>=highScore ? score : highScore;
        localStorage.setItem('highScore',highScore);
        scoreElement.textContent = `Score: ${score}`;
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
        // console.log(snakeBody[i]);
    }
    snakeBody[0] = [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <=0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) { gameOver = true;}

    for(let i = 0;i<snakeBody.length;i++){
        if(i==0){
            food += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        }else{
            food += `<div class="tail" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        }
        if(i!==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = food;
}
getFood();
setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown", changeDirection);