import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { languages } from "./languages.js"
import clsx from 'clsx'
import { getFarewellText, chooseWord } from './utils.js'

import './App.css'

function App() {
  // use lazy initialization to prevent excess re-renders
  // => after first render, doesnt run
  const [currentWord, setCurrentWord] = useState(() => chooseWord()) 
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessLetters, setGuessLetters] = useState([])
  
  // DERIVED VALUES
  let wrongGuessCount = 0
  for (let letter of guessLetters) {
    if (!currentWord.includes(letter)) wrongGuessCount++
  }
  const numGuessesLeft = languages.length - 1
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameWon = currentWord.split("").every(letter => guessLetters.includes(letter))
  const isGameOver = isGameLost || isGameWon
  // alternative to rendering message for last language killed off:
  const lastGuessedLetter = guessLetters[guessLetters.length - 1]
  // const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  function updateGuess(letter) {
    setGuessLetters(prevGuess => 
        prevGuess.includes(letter) ? 
            prevGuess : 
            [...prevGuess, letter]
    )
  }

  const langauges = languages.map((lan, index) => {
    const hideLang = index <= wrongGuessCount - 1
    const className = clsx("chip", {lost: hideLang})
    return (
        <span 
            className={className}
            style={{
                backgroundColor: lan.backgroundColor,
                color: lan.color
            }}
            key={lan.name}
        >{lan.name}</span>
    )
  })

  const word = currentWord.split('').map((letter, index) => {
    const isGuessed = guessLetters.includes(letter) // if we guessed the letter
    return (
    <span className="letter-box" key={index}>{isGuessed && letter.toUpperCase()}</span>
  )})

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessLetters.includes(letter)
    const isRight = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
        correct: isRight,
        wrong: isWrong
    })

    return (<button 
      onClick={() => updateGuess(letter)} 
      key={letter}
      className={className}
      disabled={isGameOver ? true : false}
      aria-disabled={guessLetters.includes(letter)}
      aria-label={`Letter ${letter}`}
    >{letter.toUpperCase()}</button>)
  })

  function renderGameStatus() {
    if (!isGameOver) {
      if (wrongGuessCount > 0) {
        const lostMessage = getFarewellText(languages[wrongGuessCount - 1].name)
        return (<h2>{lostMessage}</h2>)
      } else {
        return null
      }
    }
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    } else {
      return (
        <>
          <h2>You lose!</h2>
          <p>Better start learning Assembly 😭</p>
        </>
      )
    }
  }
  return (
    <main>
        <header>
            <h1>Assembly: Endgame</h1>
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </header>
        <section 
          id="status-bar"
          className={clsx({
              "won-status": isGameWon,
              "lose-status": isGameLost,
              "farewell-status": wrongGuessCount > 0 && !isGameOver
          })}
          aria-live="polite" 
          role="status" 
          >
            {renderGameStatus()}
          
        </section>
        <section id="languages-container">
          {langauges}
        </section>
        <section id="word-section">
          {word}
        </section>
        
        {/* Combined visually-hidden aria-live region for status updates */}
        <section 
          className="sr-only" 
          aria-live="polite" 
          role="status"
        >
            <p>
              {currentWord.includes(lastGuessedLetter) ? 
                  `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                  `Sorry, the letter ${lastGuessedLetter} is not in the word.`
              }
              You have {numGuessesLeft} attempts left.
            </p>
            <p>Current word: {currentWord.split("").map(letter => 
            guessLetters.includes(letter) ? letter + "." : "blank.")
            .join(" ")}</p>
        
        </section>
        <section id="keyboard"> 
          {keyboardElements}
        </section>
        {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}

export default App
