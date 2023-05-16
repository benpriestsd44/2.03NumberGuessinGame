
let randomNumber = parseInt((Math.random()*1000)+1);
//selects a random number between 1-1000
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const answerStreak = document.querySelector('.streak');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');
const p = document.createElement('p');
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;
//this big chunk is assiging values to the variables

if (playGame){
    subt.addEventListener('click', function(e){
        e.preventDefault();
        //Grabs guess from user
        const guess = parseInt(userInput.value);
        //assigns the random number to be what the user is guessing
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if (isNaN(guess)){
        alert('Please enter a valid number');
        //this makes alerts the player that what they inputted doesn't work (letters, symbols, nothing etc.)
    } else if (guess < 1) {
        alert('Please enter a whole number greater than 0!');
        //alerts the player to input a number greater than or equal to 1.
    } else if (guess > 1000){
        alert('Please enter a whole number less than 1001!');
    } else {
        //This keeps record of the number of attempted guesses
        previousGuesses.push(guess);
        //Checks to see if the game is over
       
        if (numGuesses === 13){
            displayGuesses(guess);
            displayMessage(`Game Over! Number was ${randomNumber}`);
             answerStreak.innerHTML = 0;
            //resets the answer streak to 0
            endGame();
        } else {
        //Displays previous guessed numbers
        displayGuesses(guess);
        //Checks guess and displays if wrong
        checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    //Displays clue if guess is too high or too low
    if (guess === randomNumber){
        displayMessage(`You guessed correctly!`);
         answerStreak.innerHTML++;
        //adds to your answer streak
        endGame();
        //this makes it so that if the player gets the answer, the game ends.
    } else if (guess < randomNumber) {
        displayMessage(`Too low! Try again!`);
    } else if (guess > randomNumber) {
        displayMessage(`Too High! Try again!`);
    }
}

function displayGuesses(guess){
    //this function displays the amount of guesses you have left, as well as your previously guessed numbers.
    userInput.value = '';
    guessSlot.innerHTML += `${guess}  `;
    numGuesses++ ;
    remaining.innerHTML = `${13 - numGuesses}  `;
    //this allows for 12 guesses, and subtracts your amount of guesses from it.
}

function displayMessage(message){
        lowOrHi.innerHTML = `<h1>${message}</h1>`;
}

function endGame(){
    //Clears the user input
    userInput.value = '';
    //Disables the user input button
    userInput.setAttribute('disabled', '');
    //Displays the "Start New Game" Button.
          p.classList.add('button');
          p.innerHTML = `<h1 id="newGame">Start New Game</h1>`;
    startOver.appendChild(p);
    playGame = false;
    //this ends the game
    newGame();
 
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(){
        //Picks a new random number
        randomNumber = parseInt((Math.random()*1000)+1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${13 - numGuesses}  `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
        //This makes the game begin again with the restart button
    });
}

//Change DIV to a form so it can accept the enter key

//NOTES:
//NaN != NaN