import React, { useEffect, useState } from 'react'
import '../css/WordleGame.css'
import WordService from '../services/WordService'
import Wordle from '../components/wordle/Wordle'

function WordlGame(){

    const [solution,setSolution] = useState(null)
    
    useEffect(()=>{
        return  () => LoadAsync();
    },[setSolution])

    const LoadAsync = async () => {
        let service = new WordService();
        await service.getWordleWord(1).then((result) => {
          console.log("getAllWordTop", result);
          if(result.status === 200){
            setSolution(result.response.data[0].word.toLowerCase());
          }
        });
      };

    return(
        <div className="wordle-game">
            
            {solution && <Wordle solution={solution}></Wordle>}
           
        </div>
    )
}
export default WordlGame;