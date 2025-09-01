let players = {
    ['player1-wins']: 0,
    ['player2-wins']: 0
};
let player1Button = document.querySelector('.show-player1-wins-count');
let player2Button = document.querySelector('.show-player2-wins-count');
const resetButton = document.querySelector('.reset-btn');
const playButton = document.querySelector('.play-again-btn');
const buttonContainer = document.querySelector('.button-container');

let winsMatch = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[2, 4, 6], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
const btnEle = document.querySelectorAll('.box');

let player1 = document.querySelector('.first-player');
function getPlayerName1() {
    return player1.value.trim();
}
let player2 = document.querySelector('.second-player');
function getPlayerName2() {
    return player2.value.trim();
}


let enteredValue = false;
btnEle.forEach((value, index) => {
    value.addEventListener('click', () => {
        if (!enteredValue) {
            value.innerHTML = `<span class="style-of-x">${getPlayerName1()}</span>`;
            enteredValue = true;
            if (player1.value === '') {
                alert(`Please enter player1 name`);
                value.disabled = false;
            }
        } else {
            value.innerHTML = `<span class="style-of-o">${getPlayerName2()}</span>`;
            if (player2.value === '') {
                alert(`Please enter player2 name`);
                value.disabled = false;
            }
            enteredValue = false;
        }
        value.disabled = true;
        checkWinnersMatch();

    });
});

const paraElement = document.querySelector('.show-winner');
function showWinner(firstValue) {
    paraElement.innerHTML = `The winner is : <span class="winners-identifier">${firstValue}</span>`;
    let winnersIdentifier = document.querySelector('.winners-identifier');
    if (firstValue === getPlayerName1()) {
        enteredValue = false; // this line make sure that winner gets the first turn after winning, it makes (!enteredValue) true and the first player gets turn again if wins
        players['player1-wins']++;
        player1Button.innerHTML = `${firstValue} wins : <span class="wins-count">${players['player1-wins']}</span>`;
        winnersIdentifier.classList.add('style-of-x');

    } else if (firstValue === getPlayerName2()) {
        enteredValue = true; // this line make sure that winner gets the first turn after winning, it makes (!enteredValue) true and the second player gets turn again if wins
        players['player2-wins']++;
        player2Button.innerHTML = `${firstValue} wins : <span class="wins-count">${players['player2-wins']}</span>`;
        winnersIdentifier.classList.add('style-of-o');

    }
}

let congratsContainer = document.querySelector('.congrats-container');
let gridContainer = document.querySelector('.grid-container');
function congrastTheWinner(firstValue) {
    setTimeout(() => {
        btnEle.forEach((boxes) => {
            boxes.classList.add('boxes-grid-visibility');
        });
        if (firstValue === getPlayerName1()) {
            congratsContainer.innerHTML = `<span class="style-of-o">Congratulations!</span>  <span class="style-of-x">${firstValue}</span>`;
        } else if (firstValue === getPlayerName2()) {
            congratsContainer.innerHTML = `<span class="style-of-x">Congratulations!</span>  <span class="style-of-o">${firstValue}</span>`;
        }
        buttonContainer.classList.add('button-container-position');
    },300);
}


function checkWinnersMatch() {
    let winnerFound = false;
    for (let winnerPattern of winsMatch) {
        let firstValue = btnEle[winnerPattern[0]].innerText;
        let secondValue = btnEle[winnerPattern[1]].innerText;
        let thirdValue = btnEle[winnerPattern[2]].innerText;
        if (firstValue != '' && secondValue != '' && thirdValue != '') {
            if (firstValue === secondValue && secondValue === thirdValue) {
                disabledButton();
                winnerFound = true;
                showWinner(firstValue);
                congrastTheWinner(firstValue);
                break;

            }

        }
    }
    if (!winnerFound) {
        paraElement.innerHTML = `No winner so far`;
    }

}

resetButton.addEventListener('click', () => {
    for (let button of btnEle) {
        button.innerText = '';
        enabledButton();
        button.classList.remove('boxes-grid-visibility');

    }
    player1.value = '';
    player2.value = '';
    player1Button.innerHTML = `<span class="wins-count">Player1 wins :</span> ${players['player1-wins'] = 0}`;
    player2Button.innerHTML = `<span class="wins-count">Player2 wins :</span> ${players['player2-wins'] = 0}`;
    paraElement.innerHTML = `No winner so far`;
    congratsContainer.innerHTML = '';
    buttonContainer.classList.add('button-container-position');
    enteredValue = false; // this line make the game start from player1 after resetting and this line if (!enteredValue) runs 
});



function enabledButton() {
    for (let button of btnEle) {
        button.disabled = false;
    }
}
playButton.addEventListener('click', () => {
    for (let button of btnEle) {
        button.innerText = '';
        enabledButton();
        button.classList.remove('boxes-grid-visibility');

    }
    congratsContainer.innerHTML = '';
    buttonContainer.classList.add('button-container-position');

});


function disabledButton() {
    for (let button of btnEle) {
        button.disabled = true;
    }
}
