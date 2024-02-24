import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import WordService from "../services/WordService";
import "../css/FillInTheBlankGame.css";

function FillInTheBlankGame() {
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState("");
  const [rightAnswerCount, setRightAnswerCount] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [maxCount, setMaxCount] = useState(0);

  useEffect(() => {
    const Load = async () => {
      let service = new WordService();
      let data = await service.getAllWordTop(3);
      setResult(data.response.data);
      setMaxCount(data.response.data.length);
    };
    return () => Load();
  }, []);

  useEffect(() => {
    const CheckEnd = async () => {
      if (count === maxCount && maxCount > 0) {
        showResult(true, true);
      }
    };
    CheckEnd();
  }, [count]);

  let check = (isRight) => {
    if (isRight) {
      setRightAnswerCount(rightAnswerCount + 1);
      showResult(true);
    } else {
      setWrongAnswerCount(wrongAnswerCount + 1);
      showResult(false);
    }
  };

  const handleKeypress = (e, isRight) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13 && answer != "") {
      check(isRight);
    }
  };

  let showResult = (isRight, isGameOver) => {
    let title = isRight ? "Doğru Cevap" : "Yanlış Cevap";
    const content = isGameOver
      ? "Doğru Cevap Sayısı: " +
        rightAnswerCount +
        " Yanlış Cevap Sayısı: " +
        wrongAnswerCount
      : `Doğru Cevap ${result[count] ? result[count].translations[0] : ""}`;
    let iconType = isRight ? "success" : "error";
    const buttonText = isGameOver ? "Tekrar oyna" : "Devam Et";

    if (isGameOver) {
      title = "Oyun bitti";
      iconType = "info";
    }

    Swal.fire({
      title: title,
      icon: iconType,
      text: content,
      confirmButtonText: buttonText,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then(() => {
      if (isGameOver) {
        window.location.reload();
      }

      setCount(count + 1);
      setAnswer("");
    });
  };

  return (
    <div className="fill-in-the-blank-game">
      {result[count] ? (
        <div className="container-fill">
          {/* <h1 className="h1-fill">Boşluk Doldurma Oyunu</h1> */}
          <div className="game-container-fill">
            <div className="word-fill" id="word">
              {result[count].word}
            </div>
            <input
              className="input-fill"
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyUp={(e) => {
                handleKeypress(
                  e,
                  answer.toLowerCase().trim() ===
                    result[count].translations[0].toLowerCase().trim()
                );
              }}
            />
            <button
              className="button-fill"
              onClick={() => {
                check(
                  answer.toLowerCase().trim() ===
                    result[count].translations[0].toLowerCase().trim()
                );
              }}
            >
              Kontrol Et
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default FillInTheBlankGame;
