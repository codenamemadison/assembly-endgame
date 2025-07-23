import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { languages } from "./languages.js"

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const languageElements = languages.map((lan) => {
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
        <div id="languages-container">
          {languageElements}
        </div>
    </main>
  )
}

export default App
