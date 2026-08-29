import { useState } from 'react'
import './App.css'
import { generateComplex, generateSimple, generateSinglePool } from './service/generator.service'
import { SinglePool, SecondaryPlayerCharacter } from './model/SPC'
import Character from './components/Character'
import { chanceOfSuccessAgainstDifficulty } from './service/roll.service'
import styles from './App.module.scss'

function App() {
  const [characters, setCharacters] = useState<SecondaryPlayerCharacter[]>([])
  const [threatLevel, setThreatLevel] = useState(1)
  const [attributeGroup, setAttributeGroup] = useState(1)
  const [dicePool, setDicePool] = useState(1)
  const [hunger, setHunger] = useState(0)
  const [characterType, setCharacterType] = useState("single_pool")

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

  function HungerPicker({ hunger }: { hunger: number }) {
    return (
      <input type="number" min="0" max="5" value={hunger} onChange={(e) => setHunger(parseInt(e.target.value) || 0)} />
    )
  }

  function CharacterTypePicker({ characterType }: { characterType: string }) {
    return (
      <>
        <select onChange={(e) => setCharacterType(e.target.value)} value={characterType}>
          <option value="single_pool">Single Pool</option>
          <option value="simple">Simple</option>
          <option value="complex">Complex</option>
        </select>
      </>
    )
  }

  function generateCharacter(): SecondaryPlayerCharacter {
    switch (characterType) {
      case "simple":
        return generateSimple()
      case "complex":
        return generateComplex()
      default:
        return generateSinglePool()
    }
  }
  
  return (
    <main className={styles.app}>
      <header className={styles.masthead}>
        <p className={styles.eyebrow}>Storyteller's ledger</p>
        <h1>Kindred <span>Generator</span></h1>
      </header>
      <section className={styles.settings} aria-label="Character generation settings">
        <p className={styles.settingsCopy}>
          Generate an <ThreatLevelPicker threatLevel={threatLevel} /> <CharacterTypePicker characterType={characterType} /> SPC against a character who primarily relies on <AttributeGroupPicker attributeGroup={attributeGroup} /> and has an average dice pool of <DicePoolPicker dicePool={dicePool} /> and <HungerPicker hunger={hunger} /> Hunger.
        </p>
        <button className={styles.generateButton} type="button" onClick={() => setCharacters([...characters, generateCharacter()])}>Generate</button>
      </section>
      <div className={styles.characterList}>
        {characters.map((character) => (
          <div key={character.name}>
          {character.type === "single_pool" && (
            <p className={styles.chance}>The player has a {Math.round(chanceOfSuccessAgainstDifficulty(dicePool, hunger, (character as SinglePool).expertDifficulty) * 100)}% chance of meeting the expert difficulty.</p>
          )}
          <Character 
            character={character}
            onClose={() => setCharacters(characters.filter((c) => c !== character))}
            />
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
