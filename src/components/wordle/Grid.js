import React, { useEffect } from 'react'
import Row from './Row'
export default function Grid({currentGuess,guesses, turn}) {

  return (
    <div>
      {guesses.map((g,i) => {
        if(turn === i){
          return <Row key={i} currentGuess={currentGuess}></Row>
        }
        return <Row key={i} guess={g}></Row>
      })}
    </div>

    
  )
}
