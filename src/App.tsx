import { useState } from 'react'
import './App.css'
import { generateSinglePool } from './service/generator.service'
import { SPC } from './model/SPC'
import Character from './components/Character'

function App() {
  const [characters, setCharacters] = useState<SPC[]>([])

  return (
    <>
      <div className="card">
        <button onClick={() => setCharacters([...characters, generateSinglePool()])}>
          add character
        </button>
      </div>
      <div>
        {characters.map((character) => (
          <Character key={character.name} character={character} />
        ))}
      </div>
    </>
  )
}

export default App
