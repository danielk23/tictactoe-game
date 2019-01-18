
// SEARCH ELEMENT AND ASSIGN THEM

// select all boxes
var boxField = document.querySelectorAll('li');

// select player count
var p1ScoreCount = document.querySelector('.player-1-score');
var p2ScoreCount = document.querySelector('.player-2-score');
var winner = document.querySelector('.player-win-name');


var p1Score = 0;
var p2Score = 0;

// restart/reset button

var reStartBtn = document.querySelector('.restart-btn')


// PLAYER AND GAME FUNCTIONS VARIABLE

var numberOfMoves = 0;

var player1 = [];
var player2 = [];

var winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// FUNCTION WHO TARGETS AND MANIPULATE AN ELEMENT 


var restart = function() {

    if (p1Score === 3 || p2Score === 3) {
        winner.textContent = '';
        p1Score = 0;
        p2Score = 0;
        p1ScoreCount.textContent = p1Score;
        p2ScoreCount.textContent = p2Score;
    }

    numberOfMoves = 0;
    player1 = [];
    player2 = [];


    winner.textContent = ''


    for (var i = 0; i < boxField.length; i++) {
        boxField[i].addEventListener('click', nextPlayer);
    }

    for (var i = 0; i < boxField.length; i++) {
        if (boxField[i].classList.contains('clicked-player-1')) {
            boxField[i].classList.remove('clicked-player-1');
        } else if (boxField[i].classList.contains('clicked-player-2')) {
            boxField[i].classList.remove('clicked-player-2');
        }
    }
};  


// check Round win
var checkWin = function(array) {
    var roundwinCount = [];
    var won = false
    //loop through winning combo array
    for (var i = 0; i < winningCombo.length; i++) {
        //loop through each number of winningcombo array
        for (var j = 0; j < winningCombo[i].length; j++) {
            // if p1 = player1 / p2 = player2 as one of the winningCombo = wins
            if (array.includes(winningCombo[i][j])) {
                roundwinCount.push('x')                
            } 
        }

        if (roundwinCount.length === 3) {
            if (numberOfMoves % 2 !== 0) {
                p1Score +=1;
                p1ScoreCount.textContent = p1Score;
                for (i = 0; i < boxField.length; i++) {
                    boxField[i].removeEventListener('click', nextPlayer);
                }
                var won = true
            } else {
                p2Score +=1;
                p2ScoreCount.textContent = p2Score;
                for (i = 0; i < boxField.length; i++) {
                    boxField[i].removeEventListener('click', nextPlayer);
                }
                var won = true
            } 
        } else {
            roundwinCount = []
        }    
    }
    if (p1Score === 3) {
        winner.textContent = 'Player 1 wins!'
    } else if (p2Score === 3) {
        winner.textContent = 'Player 2 wins!'
    } 
    return won
};


var drawCheck = function() {
    if (numberOfMoves === 9 && checkWin(player1) === false && checkWin(player1) === false) {
        winner.textContent = "It's a draw"
    }
}


var nextPlayer = function(event) {
    if (event.target.classList.contains('clicked-player-1') || event.target.classList.contains('clicked-player-2')) {
    return
    }
    
    numberOfMoves +=1;
    if (numberOfMoves % 2 !== 0) {
        event.target.classList.add('clicked-player-1');
        player1.push(parseInt(event.target.classList[1]));
        checkWin(player1); //true or false
        drawCheck();

    } else {
        event.target.classList.add('clicked-player-2');
        player2.push(parseInt(event.target.classList[1]));
        checkWin(player2);
        drawCheck();
    }
};

for (i = 0; i < boxField.length; i++) {
    boxField[i].addEventListener('click', nextPlayer);
}






// EVENT LISTENER 

reStartBtn.addEventListener('click', restart);






