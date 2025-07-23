import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { languages } from "./languages.js"

import './App.css'

function App() {
  const [currentWord, setCurrentWord] = useState("react")

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
          {languages.map((lan) => {
            return (
                <div 
                    style={{
                        backgroundColor: lan.backgroundColor,
                        color: lan.color
                    }}
                    key={lan.name}
                >{lan.name}</div>
                )
            })}
        </section>
        <section id="word-section">
          {currentWord.split('').map((letter, index) => (
              <span className="letter-box" key={index}>{letter.toUpperCase()}</span>
          ))}
        </section>
    </main>
  )
}

export default App
