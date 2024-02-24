import React from 'react'

export default function WordleModal({isCorrect, turn, solution}) {
  return (
    <div className='wordle-modal'>
        {isCorrect && (
            <div>
                <h1>Doğru Cevabı Buldunuz!</h1>
                <p className='solution'>{solution}</p>
                <p>{turn} denemede cevabı buldunuz :) </p>
                <button type='button' className='btn btn-info' onClick={()=> window.location.reload()}>Yeniden Oyna</button>
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>Doğru Cevabı Bulamadınız!</h1>
                <p className='solution'>{solution}</p>
                <p>Bir sonraki denemede bol şans! </p>
                <button type='button' className='btn btn-info' onClick={()=> window.location.reload()}>Yeniden Oyna</button>
            </div>
        )}
        
    </div>
  )
}
