// FIRST
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"]

let started = false;
let level = 0;

let highScore = localStorage.getItem("highScore") || 0;

let h2 = document.querySelector("h2");

h2.innerText = `Press any key to start the game (High Score: ${highScore})`;

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

// THIRD
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

// SIXTH
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}

// SECOND
function levelUp() {
    userSeq = [];
    level ++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

// SEVENTH
function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {

        if(level - 1 > highScore) {
            highScore = level - 1;
            localStorage.setItem("highScore", highScore);
        }

        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b>
        <br>High Score : ${highScore} <br>Press any key to start.`; 
        document.querySelector("body"). style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body"). style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// FIFTH
function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

// FOURTH
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// EIGHTH
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0; 
}

function resetHighScore() {
    localStorage.removeItem("highScore");
    highScore = 0;
    let h2 = document.querySelector("h2");
    h2.innerText = `Press any key to start (High Score: ${highScore})`;
    alert("High Score has been reset!");
}