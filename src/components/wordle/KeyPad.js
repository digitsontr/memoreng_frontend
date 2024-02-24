import React, { useState } from 'react'
import useWordle from '../../hooks/useWordle'

export default function KeyPad({usedKeys,solution}) {
    const {handleKeyup} = useWordle(solution);
    const [letters , setLetters] = useState([
        {'key':'a'},
        {'key':'b'},
        {'key':'c'},
        {'key':'d'},
        {'key':'e'},
        {'key':'f'},
        {'key':'g'},
        {'key':'h'},
        {'key':'i'},
        {'key':'j'},
        {'key':'k'},
        {'key':'l'},
        {'key':'m'},
        {'key':'n'},
        {'key':'o'},
        {'key':'p'},
        {'key':'q'},
        {'key':'r'},
        {'key':'s'},
        {'key':'t'},
        {'key':'u'},
        {'key':'v'},
        {'key':'w'},
        {'key':'x'},
        {'key':'y'},
        {'key':'z'},
    ])

    const handleKey = (key) => {
        window.dispatchEvent(new KeyboardEvent('keyup',{'key':key}))
    }
  return (
    <div className='keypad'>
        {letters && letters.map((l)=>{
            const color = usedKeys[l.key]
            return(
                <div key={l.key} className={color} onClick={()=> {handleKey(l.key);}} >{l.key.toUpperCase()}</div>
            )
        })}
        <div  className="Enter" onClick={()=> {handleKey("Enter");}} >Enter</div>
        <div  className="Backspace" onClick={()=> {handleKey("Backspace");}} >Backspace</div>
    </div>
  )
}
