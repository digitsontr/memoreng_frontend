import React, { useEffect, useState } from 'react'
import useWordle from '../../hooks/useWordle'
import Grid from './Grid'
import KeyPad from './KeyPad';
import WordleModal from './WordleModal';
function Wordle({solution}) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(()=>{
        window.addEventListener("keyup", handleKeyup);

        if(isCorrect){
            setTimeout(() => setShowModal(true),2000);
            window.removeEventListener("keyup", handleKeyup);
        }

        if(turn > 5){
            setTimeout(() => setShowModal(true),2000);
            window.removeEventListener("keyup", handleKeyup);
        }
        return () => window.removeEventListener("keyup", handleKeyup);

    },[handleKeyup,isCorrect,turn])

    return(
        <div className="wordle-letter">
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} ></Grid>
            <KeyPad usedKeys={usedKeys} solution={solution}></KeyPad>
            { showModal && <WordleModal isCorrect={isCorrect} turn={turn} solution={solution} ></WordleModal>}
        </div>
    )
}
export default Wordle;