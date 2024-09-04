import { useState } from 'react'
import './App.css'
import { generateSinglePool } from './service/generator.service'
import { SinglePool, SPC } from './model/SPC'
import Character from './components/Character'
import { changeOfWinningContest } from './service/roll.service'

function App() {
  const [characters, setCharacters] = useState<SPC[]>([])
  const [threatLevel, setThreatLevel] = useState(1)
  const [attributeGroup, setAttributeGroup] = useState(1)
  const [dicePool, setDicePool] = useState(1)

  function ThreatLevelPicker({ threatLevel }: { threatLevel: number }) {
    return (
      <>
        <select onChange={(e) => setThreatLevel(parseInt(e.target.value))} value={threatLevel}>
          <option value="1">Non-threatening</option>
          <option value="2">Equally matched</option>
          <option value="3">Threatening</option>
        </select>
      </>
    )
  }

  function AttributeGroupPicker({ attributeGroup }: { attributeGroup: number }) {
    return (
      <>
        <select onChange={(e) => setAttributeGroup(parseInt(e.target.value))} value={attributeGroup}>
          <option value="1">Physical</option>
          <option value="2">Mental</option>
          <option value="3">Social</option>
        </select>
      </>
    )
  }

  function DicePoolPicker({ dicePool }: { dicePool: number }) {
    return (
      <>
        <input type="number" value={dicePool} onChange={(e) => setDicePool(parseInt(e.target.value))} />
      </>
    )
  }

  return (
    <>
      <div id="settings">
        Generate an <ThreatLevelPicker threatLevel={threatLevel} /> SPC against a character who primarily relies on <AttributeGroupPicker attributeGroup={attributeGroup} /> and has an average dicepool of <DicePoolPicker dicePool={dicePool} />
        <button onClick={() => setCharacters([...characters, generateSinglePool()])}>Generate</button>
      </div>
      <div className="card">
      </div>
      <div>
        {characters.map((character) => (
          <>
          The player has a {Math.round(changeOfWinningContest(dicePool, (character as SinglePool).expertDifficulty) * 100)}% chance of winning.
          <Character key={character.name} character={character} />
          </>
        ))}
      </div>
    </>
  )
}

export default App
