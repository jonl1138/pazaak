var p_score = 0;
var cpu_score = 0;
var cpuStop = false;
var userStop = false;
var userWins = 0;
var cpuWins = 0;
function generateNewCard() {
    let randNum = Math.floor(Math.random() * 9) + 1;
    var newCard = document.createElement("div");
    newCard.classList.add("card")
    newCard.innerHTML += "<img src='images/pazaak.jpg'><span class='card-num'>" + randNum + "</span>";
    return(newCard)
}

function updateScore(player) {
    if (player == "cpu") {
        var countContainer = document.querySelector(".count-one");
        countContainer.textContent = cpu_score;
    } else {
        var countContainer = document.querySelector(".count-two")
        countContainer.textContent = p_score;
    }
}

function cpuMove() {
    var cpuContainer = document.querySelector(".board-one");
    var newCard = generateNewCard();
    cpu_score += Number(newCard.textContent);
    cpuContainer.appendChild(newCard)
    updateScore("cpu");
    if (21 - cpu_score < 4) {
        cpuStop = true;
    }
}

function userMove() {
    var userContainer = document.querySelector(".board-two");
    var newCard = generateNewCard();
    userContainer.appendChild(newCard);
    p_score += Number(newCard.textContent);
    userContainer.appendChild(newCard)
    updateScore("user");
}

// resets game state after end of round
function resetScores() { 
    p_score = 0;
    cpu_score = 0;
    updateScore("cpu");
    updateScore("user");
    document.querySelector(".board-one").innerHTML = "";
    document.querySelector(".board-two").innerHTML = "";
    cpuStop = false;
    userStop = false;
}

// resets entire game state after end of game
function resetGame() {
    resetScores()
    var scoreContainer1 = document.querySelector(".score-container-one")
    scoreContainer1.innerHTML = ""
    for (let i =0; i < 3; i++) {
        let img = document.createElement("img");
        img.src = "images/empty-score.png"
        img.classList.add("score1")
        scoreContainer1.appendChild(img)
    }
    let scoreDisplay = document.createElement("span")
    scoreDisplay.classList.add("count-one")
    scoreDisplay.textContent = "0"
    scoreContainer1.appendChild(scoreDisplay)
    // reset scoreboard 2
    var scoreContainer2 = document.querySelector(".score-container-two")
    scoreContainer2.innerHTML = ""
    scoreDisplay = document.createElement("span")
    scoreDisplay.classList.add("count-two")
    scoreDisplay.textContent = "0"
    scoreContainer2.appendChild(scoreDisplay)
    for (let i =0; i < 3; i++) {
        let img = document.createElement("img");
        img.src = "images/empty-score.png"
        img.classList.add("score2")
        scoreContainer2.appendChild(img)
    }
    cpuWins = 0;
    userWins = 0;
}
function endTurn() {
    if (p_score > 21 && cpu_score > 21) {
        alert("Draw!");
        resetScores();
    } else if (p_score > 21) {
        for (let i = 2; i >= 0; i--) {
            if (document.querySelectorAll('.score1')[i].src.includes("empty-score")) {
                document.querySelectorAll('.score1')[i].src = "images/filled-score.png";
                break;
            }
        }
        cpuWins ++;
        alert("Player loses with score: " + p_score + " to cpu score: " + cpu_score)
        resetScores();
    } else if (cpu_score > 21) {
        for (let i = 2; i >= 0; i--) {
            if (document.querySelectorAll('.score2')[i].src.includes("empty-score")) {
                document.querySelectorAll('.score2')[i].src = "images/filled-score.png";
                break;
            }
        }
        userWins ++;
        alert("Player wins with score: " + p_score + " to cpu score: " + cpu_score)
        resetScores()
    } else if (cpuStop && userStop) {
        if (cpu_score > p_score) {
            for (let i = 2; i >= 0; i--) {
                if (document.querySelectorAll('.score1')[i].src.includes("empty-score")) {
                    document.querySelectorAll('.score1')[i].src = "images/filled-score.png";
                    break;
                }
            }
            cpuWins++;
            alert("Player loses with score: " + p_score + " to cpu score: " + cpu_score)
            resetScores()
        } else if (cpu_score < p_score) {
            for (let i = 2; i >= 0; i--) {
                if (document.querySelectorAll('.score2')[i].src.includes("empty-score")) {
                    document.querySelectorAll('.score2')[i].src = "images/filled-score.png";
                    break;
                }
            }
            userWins++;
            alert("Player wins with score: " + p_score + " to cpu score: " + cpu_score)
            resetScores()
        } else {
            alert("Draw!");
            resetScores()
        }
    }
    if (cpuWins == 3) {
        alert("CPU wins!");
        resetGame()
    }
    if (userWins == 3) {
        alert("User wins!")
        resetGame()
    }
}

var startingDeck = document.querySelector(".hand-two") 
for (let i =0; i < 4; i++) {
    let randNum = Math.floor(Math.random() * 4) + 1
    let sign = Math.random();
    if (sign > 0.5) {
        randNum = -1 * randNum;
    }
    var newCard = document.createElement("div");
    newCard.classList.add("card")
    newCard.innerHTML += "<img src='images/pazaak.jpg'><span class='card-num'>" + randNum + "</span>";
    newCard.addEventListener("click", function () {
        newCard.classList.add("selected");
        console.log("clicked");
        console.log(newCard.classList);
    })
    startingDeck.appendChild(newCard);
}


// initiates a turn
document.querySelector('.next-turn').addEventListener("click", function() {
    if (cpuStop == false) {
        cpuMove();
    }
    userMove()
    console.log(p_score)
    console.log(cpu_score)
    endTurn()
});

document.querySelector(".hold").addEventListener("click", function() {
    userStop = true;
    while (cpuStop == false) {
        cpuMove();
    }
    endTurn()
})