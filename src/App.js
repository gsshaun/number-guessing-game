import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Number of Try
  const numberOfTry = 4;
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber()); // Random Number
  const [userGuess, setUserGuess] = useState(''); // User Input
  const [message, setMessage] = useState(''); // Message
  const [guessedNumbers, setGuessedNumbers] = useState([]); // user Input Array

  // Set First-Time Number
  useEffect(() => {
    handleStartNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate New Number
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Handle New Game
  function handleStartNewGame() {
    setRandomNumber(generateRandomNumber());
    setUserGuess('');
    setMessage('');
    setGuessedNumbers([]);
  }

  // Keep Focus
  function keepFocus(id) {
    return id.focus();
  }

  // Handle Submit
  function handleGuessSubmit() {
    const guessField = document.getElementById('guessField');

    if (userGuess === '') {
      setMessage('Please enter a valid guess.');
      keepFocus(guessField)
      // guessField.focus();
      return;
    }

    const guess = parseInt(userGuess, 10);

    if (guess === randomNumber) {
      setMessage('Congratulations! You guessed the correct number!');
    } else if (guess < randomNumber) {
      setMessage('Try again. Your guess is too low.');
    } else {
      setMessage('Try again. Your guess is too high.');
    }

    userGuess !== '' && setGuessedNumbers([...guessedNumbers, guess]);
    setUserGuess('');
    keepFocus(guessField)
  }

  return (
    <div className="container">
      <div className="box">
        <p className="rand">{guessedNumbers.length >= numberOfTry && randomNumber}</p>
        <h1>Number guessing game</h1>
        <p>
          We have selected a random number between 1 and 100. See if you can
          guess it in {numberOfTry} turns or fewer. We'll tell you if your guess was too
          high or too low.
        </p>
        <div className="guess">
          <label htmlFor="guessField">Enter a guess: </label>
          <input
            type="text"
            id="guessField"
            className="guessField"
            value={userGuess}
            disabled={guessedNumbers.length >= numberOfTry}
            onChange={(event) => {
              const inputValue = event.target.value.replace(/\D/g, "");
              setUserGuess(inputValue);
            }}
          />
          <input
            type="submit"
            className="guessSubmit"
            value="Submit guess"
            disabled={guessedNumbers.length >= numberOfTry}
            onClick={handleGuessSubmit}
          />
        </div>
        <div className="resultParas">
          {guessedNumbers.length !== 0 && <p className="guesses">
            Guessed Numbers: {guessedNumbers.join(', ')}
          </p>}
          {message && <p className={`lastResult ${message.includes('Congratulations!') ? 'correct' : ''}`}>{message}</p>}
          {guessedNumbers.length >= numberOfTry &&
            <div>
              <p className='gameOver'>Game Over</p>
              <button className="startNew" onClick={handleStartNewGame}>
                Start New Game
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
export default App;