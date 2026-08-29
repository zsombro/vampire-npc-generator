import { Complex, Simple, SinglePool, SecondaryPlayerCharacter } from "../model/SPC"
import styles from "./Character.module.scss"

export default function Character({ character, onClose }: { character: SecondaryPlayerCharacter, onClose: () => void }) {
    return (
        <>
            <div className={styles.card}>
                <button className={styles.closeButton} type="button" onClick={onClose} aria-label={`Remove ${character.name}`} title="Remove character">&times;</button>
                {renderContent(character)}
            </div>
        </>
    )
}

function renderContent(character: SecondaryPlayerCharacter) {
    switch (character.type) {
        case "single_pool":
            return <SinglePoolCharacter character={character as SinglePool} />
        case "simple":
            return <SimpleCharacter character={character as Simple} />
        case "complex":
            return <ComplexCharacter character={character as Complex} />
    }
}

function SinglePoolCharacter({ character }: { character: SinglePool }) {
    return (
        <>
            <h3>{character.name}</h3>
            <div className={styles.basicStats}>
                <p>Health: {character.health}</p>
                <p>Willpower: {character.willpower}</p>
            </div>
            <div className={styles.attributes}>
                <p>General Difficulty: {character.generalDifficulty}</p>
                <p>Expert Difficulty: {character.expertDifficulty}</p>
            </div>
        </>
    )
}

function SimpleCharacter({ character }: { character: Simple }) {
    return (
        <>
            <h3>{character.name}</h3>
            <div className={styles.basicStats}>
                <p>Health: {character.health}</p>
                <p>Willpower: {character.willpower}</p>
            </div>
            <div className={styles.attributes}>
                <p>Physical: {character.physical}</p>
                <p>Mental: {character.mental}</p>
                <p>Social: {character.social}</p>
            </div>
        </>
    )
}

function ComplexCharacter({ character }: { character: Complex }) {
    return (
        <>
            <h3>{character.name}</h3>
            <p>Health: {character.health}</p>
            <p>Willpower: {character.willpower}</p>
            <div className={styles.attributes}>
                <p>Strength: {character.physical.strength}</p>
                <p>Dexterity: {character.physical.dexterity}</p>
                <p>Stamina: {character.physical.stamina}</p>
            </div>
            <div className={styles.attributes}>
                <p>Intelligence: {character.mental.intelligence}</p>
                <p>Wits: {character.mental.wits}</p>
                <p>Resolve: {character.mental.resolve}</p>
            </div>
            <div className={styles.attributes}>
                <p>Charisma: {character.social.charisma}</p>
                <p>Manipulation: {character.social.manipulation}</p>
                <p>Composure: {character.social.composure}</p>
            </div>
        </>)
}
