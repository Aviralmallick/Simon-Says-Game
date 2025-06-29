let gameSeq = [];
let userSeq = [];
let highScr = [];
let max = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("#inst");
let high = document.querySelector("#highScore");

document.addEventListener("keypress",function () {
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function (){
        btn.classList.remove("gameFlash")
    },250);
};

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function (){
        btn.classList.remove("userFlash")
    },250);
};

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. <br> Press any key to start.`;
        highScr.push(level);
        highScore(highScr);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

// applying event listeners to all btns
let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}  

function highScore (score){
    max = Math.max(...score);
    high.innerHTML = `HIGHEST SCORE : ${max}`;
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}