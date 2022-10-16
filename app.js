let p1button = document.querySelector("#p1");
let p2button = document.getElementById("p2");
let numInput = document.querySelector("input");
let resetButton = document.getElementById("reset");
var h1 = document.querySelector("#p1score");
let num = document.querySelector("#num");
var h1 = document.querySelector("#p2score");
let paragraph = document.querySelector("#para");
let p1Score = 0;
let p2Score = 0;
let gameOver = false;
let winningScore = 5;

const exes = 'x';
const circles = 'circle';
const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn;
const btn = document.querySelector('#winButton');
const winningMessageTextElement = document.querySelector('#winning-Message');
const winnerDisplay = document.querySelector('.winningMessage');
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
startGame();
btn.addEventListener('click', startGame);
function startGame(){
    circleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(exes);
        cell.classList.remove(circles);
        cell.removeEventListener('click', doThings)
        cell.addEventListener('click', doThings, {once:true});
     });
     setBoardHoverClass();
     winnerDisplay.classList.remove('show');
     if(p1Score === winningScore || p2Score === winningScore){
        reset();
     }
}




function doThings(e){
    const cellE = e.target;
    const currentClass = circleTurn ? circles : exes;
    fillIn(cellE, currentClass);
    //check for win
    if(checkWin(currentClass)){
        increaseScore();
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        switchTurns();
        setBoardHoverClass();
    }
}

function increaseScore(){
    if(!gameOver){
        if(!circleTurn){
            p1Score++;
             if(p1Score === winningScore){
     p1score.classList.add("winner");
                 gameOver = true;
             }
         }
         p1score.textContent = p1Score;
    }

if(!gameOver){
    if(circleTurn){
        p2Score++;
         if(p2Score === winningScore){
 p2score.classList.add("winner");
             gameOver = true;
         }
     }
     p2score.textContent = p2Score;
}
}

function reset(){
    p1Score = 0;
    p2Score = 0;
    p1score.textContent = 0;
    p2score.textContent = 0;
    p1score.classList.remove("winner");
    p2score.classList.remove("winner");
    gameOver = false;
}

numInput.addEventListener("change", function(){
   num.textContent = numInput.value;
    winningScore = Number(numInput.value);
    reset();
});

function isDraw(){
    return [...cells].every(cell => {
        return cell.classList.contains(exes) ||
        cell.classList.contains(circles)
    })
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!!'
    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!!`
    }
    winnerDisplay.classList.add('show');
}


function fillIn(cellE, currentClass){
    cellE.classList.add(currentClass);
}

function switchTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(exes);
    board.classList.remove(circles);
    if(circleTurn){
        board.classList.add(circles);
    }else{
        board.classList.add(exes);
    }
}

function checkWin(currentClass){
    return combinations.some(combination =>{
        return combination.every(index =>{
            return cells[index].classList.contains(currentClass);
        })
    })
}
