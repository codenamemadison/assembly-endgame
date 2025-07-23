import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { languages } from "./languages.js"

import './App.css'

function App() {
  const [currentWord, setCurrentWord] = useState("react")
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

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

  const keyboardElements = alphabet.split("").map((letter) => (
    <button key={letter}>{letter.toUpperCase()}</button>
  ))
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
