import { useState } from "react";
import "../css/Section.css";
function GameSection() {
  return (
    <div className="game-section">
      <div className="game-section-row d-flex align-items-stretch border">
        <div className="flex-grow-1 h-100 align-items-center justify-content-center border">
          <div className="game-item multiple-choose h-100 d-flex align-items-center justify-content-center ">
            {" "}
            <a href="/multiple"><img className="multiple-icon" src="/multipleChooseIcon.png" alt="" /> <div >Çoktan Seçmeli</div></a>{" "}
          </div>
        </div>
        <div className="flex-grow-1 h-100 align-items-center border">
          <div className="game-item fill-blank h-100 d-flex align-items-center justify-content-center ">
            <a href="/fill"><img className="blank-icon" src="/fill-blank.png" alt="" /> <div >Boşluk Doldurma</div> </a>
          </div>
        </div>
        <div className="flex-grow-1 h-100 align-items-center text-align-center border">
          <div className="game-item wordle h-100 d-flex align-items-center justify-content-center">
           <a href="/wordle"><img className="wordle-icon" src="/wordle-icon.png" alt="" /> <div >Wordle</div></a> 
          </div>
        </div>
      </div>
      <div className="game-section-row d-flex align-items-center border">
        <div className="flex-grow-1 h-100 align-items-center justify-content-center border">
          <div className="game-item word-match h-100 d-flex align-items-center justify-content-center">
           <a href="/wordmatch"><img className="match-icon" src="/match-icon.png" alt="" /> <div>Kelime Eşleştirme</div></a> 
          </div>
        </div>
        <div className="flex-grow-1 h-100 align-items-center border">
          <div className="game-item word-list h-100 d-flex align-items-center justify-content-center">
            <a href="/wordlist"><img className="list-icon" src="/list-icon.png" alt="" /><div>Kelime Listesi</div></a> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSection;
