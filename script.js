"use strict";

/**
 * Declaring a couple of variables. coinImg is the image element for the coin in the html.
 * coinFlipSound is the audio sound of a coin flipping. carsonScoreCount is the element holding Carson's score
 * in the scoreboard. chadScoreCount stores Chad's score. mainComment stores the "Chad Wins!" or
 * "Carson Wins!" or "Flipping..." or "Click to flip coin" messages.
 */
const coinImg = document.getElementById("coinImg");
const chadScoreCount = document.getElementById("ChadScore");
const carsonScoreCount = document.getElementById("CarsonScore");
const mainComment = document.getElementById("outcome");
let coinFlipSound = new Audio("sounds/coinflip.mp3");
let carsonScore = 0;
let chadScore = 0;

/**
 * Wait for click of flip coin button to run the flipCoin function.
 */
coinImg.addEventListener("click", flipCoin);

/**
 * Function getRandom to randomly get 0 or 1 to randomize the coin flip.
 * It returns 0 or 1 into randomIndex.
 */
function getRandom() {
    let randomIndex = Math.floor(Math.random() * 2);
    return randomIndex;
}

/**
 * resetSpin function is run when the reset button is clicked.
 * I want to remove the spin class from the image so I can put it
 * back in later to make the coin look to spin.
 * I want to tell the user we are ready to flip again.
 */
function resetSpin() {
    coinImg.classList.remove("spin");
    mainComment.innerHTML = "Ready to flip.";
}

/**
 * Function to flip a coin. It plays a coin flipping sound.
 * It changes the class name of the coin image to spin to call that css function.
 * It calls the funciton pickWinner which prints out the correct final
 * coin image and prints the wwinner.
 */
function flipCoin() {
    coinFlipSound.play();
    mainComment.innerHTML = "Flipping. . .";
    coinImg.className = "spin";
    pickWinner();
}

/**
 * The pickWinner function picks the appropriate winner from the getRandom function.
 * It calls the displayCoin function passing in the correct winning coin.
 *
 */
function pickWinner() {
    if (getRandom() == 0) {
        displayCoin("chad");
    } else {
        displayCoin("carson");
    }
}

/**
 * The displayCoin function passes in the string argument for the winner of the coin toss.
 * It uses a switch-case to get the file image for the correct winning coin.
 * It changes the HTML text to the appropriate winner text.
 *
 * setTimeOut causes it to wait 2.2 seconds before it declares the winner and removes the spin class.
 * This was needed to not do those things until it has completed the spin animation.
 * A async/await or something like that is probably better, but I'm not good at those yet.
 *
 * @param {String} winner
 */
function displayCoin(winner) {
    let fileName;
    let alt;
    switch (winner) {
        case "chad":
            fileName = "images/ChadCoin.png";
            alt = "Chad coin face image";
            setTimeout(function () {
                declareChadWins();
                coinImg.classList.remove("spin");
            }, 2200);
            break;
        case "carson":
            fileName = "images/CarsonCoin.png";
            alt = "Carson coin face image";
            setTimeout(function () {
                declareCarsonWins();
                coinImg.classList.remove("spin");
            }, 2200);

            break;
        default:
            alert("Invalid. Did you flip a coin?");
            break;
    }

    /**
     * The declareChadWins function prints out that Chad wins.
     * It also adds one to the score for Chad and prints that.
     */
    function declareChadWins() {
        mainComment.innerHTML = "Chad wins!";
        carsonScore = carsonScore;
        chadScore = chadScore + 1;
        chadScoreCount.innerHTML = chadScore;
        carsonScoreCount.innerHTML = carsonScore;
    }

    /**
     * The declareCarsonWins function prints out that Carson wins.
     * It also adds one to the score for Carson and prints that.
     */
    function declareCarsonWins() {
        mainComment.innerHTML = "Carson wins!";
        carsonScore = carsonScore + 1;
        chadScore = chadScore;
        chadScoreCount.innerHTML = chadScore;
        carsonScoreCount.innerHTML = carsonScore;
    }

    // coinImg is located and declared at top of the screen
    // coinImg is a holder image that will be completed with this information.
    coinImg.src = fileName;
    coinImg.alt = alt;
}
