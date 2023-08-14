import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const numberOfTry = 3;

  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [guessedNumbers, setGuessedNumbers] = useState([]);

  useEffect(() => {
    handleStartNewGame();
  }, []);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function handleStartNewGame() {
    setRandomNumber(generateRandomNumber());
    setUserGuess('');
    setMessage('');
    setGuessedNumbers([]);
  }

  function handleGuessSubmit() {
    if (userGuess === '') {
      setMessage('Please enter a valid guess.');
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

    userGuess != '' && setGuessedNumbers([...guessedNumbers, guess]);
    setUserGuess('');
  }

  return (
    <div className="container">
      <div className="box">
        <p className="rand">{randomNumber}</p>
        <h1>Number guessing game</h1>
        <p>
          We have selected a random number between 1 and 100. See if you can
          guess it in 3 turns or fewer. We'll tell you if your guess was too
          high or too low.
        </p>
        <div className="guess">
          <label htmlFor="guessField">Enter a guess: </label>
          <input
            type="number"
            id="guessField"
            className="guessField"
            value={userGuess}
            disabled={guessedNumbers.length >= numberOfTry}
            onChange={(e) => setUserGuess(e.target.value)}
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
          {guessedNumbers.length != 0 && <p className="guesses">
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
