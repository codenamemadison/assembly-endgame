import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { languages } from "./languages.js"
import clsx from 'clsx'

import './App.css'

function App() {
  const [currentWord, setCurrentWord] = useState("react")
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guess, setGuess] = useState([])
    
  function updateGuess(letter) {
    setGuess(prevGuess => 
        prevGuess.includes(letter) ? 
            prevGuess : 
            [...prevGuess, letter]
    )
  }

  const langauges = languages.map((lan) => {
    return (
        <div 
            style={{
                backgroundColor: lan.backgroundColor,
                color: lan.color
            }}
            key={lan.name}
        >{lan.name}</div>
    )
  })

  const word = currentWord.split('').map((letter, index) => (
    <span className="letter-box" key={index}>{letter.toUpperCase()}</span>
  ))

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guess.includes(letter)
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
    >{letter.toUpperCase()}</button>)
})
  return (
    <main>
        <header>
            <h1>Assembly: Endgame</h1>
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </header>
        <section id="status-bar">
            <h2>You win! </h2>
            Well done 🎉
        </section>
        <section id="languages-container">
          {langauges}
        </section>
        <section id="word-section">
          {word}
        </section>
        <section id="keyboard"> 
          {keyboardElements}
        </section>
        <button className="new-game">New Game</button>
    </main>
  )
}

export default App
