let players = {
    ['player1-wins']: 0,
    ['player2-wins']: 0
};
let player1Button = document.querySelector('.show-player1-wins-count');
let player2Button = document.querySelector('.show-player2-wins-count');

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
    if (firstValue === getPlayerName1()) {
        players['player1-wins']++;
        player1Button.innerHTML = `${firstValue} wins : <span class="wins-count">${players['player1-wins']}</span>`;

    } else if (firstValue === getPlayerName2()) {
        players['player2-wins']++;
        player2Button.innerHTML = `${firstValue} wins : <span class="wins-count">${players['player2-wins']}</span>`;

    }
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
                showWinner(firstValue);
                winnerFound = true;
                break;

            }

        }
    }
    if (!winnerFound) {
        paraElement.innerHTML = `No winner was found yet`;
    }

}

document.querySelector('.reset-btn')
    .addEventListener('click', () => {
        for (let button of btnEle) {
            button.innerText = '';
            enabledButton();

        }
        player1.value = '';
        player2.value = '';
        player1Button.innerHTML = `<span class="wins-count">Player1 wins :</span> ${players['player1-wins'] = 0}`;
        player2Button.innerHTML = `<span class="wins-count">Player2 wins :</span> ${players['player2-wins'] = 0}`;
        paraElement.innerHTML = `No winner was found yet`;
    });



function enabledButton() {
    for (let button of btnEle) {
        button.disabled = false;
    }
}

document.querySelector('.play-again-btn')
    .addEventListener('click', () => {
        for (let button of btnEle) {
            button.innerText = '';
            enabledButton();
        }
    });


function disabledButton() {
    for (let button of btnEle) {
        button.disabled = true;
    }
}
