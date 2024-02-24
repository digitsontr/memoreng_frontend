import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import WordService from "../services/WordService";
import "../css/MultipleChooseGame.css";

function MultipleChooseGame() {
  const [result, setResult] = useState([]);
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(0);
  const [rightAnswerCount, setRightAnswerCount] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    return () => LoadAsync();
  }, []);

  const LoadAsync = async () => {
    let service = new WordService();
    await service.getAllWordTop(2).then((result) => {
      console.log("getAllWordTop", result);
      setResult(result.response.data);
      setOptions(getOptions(result.response.data));
      setCount(0);
      setRightAnswerCount(0);
      setWrongAnswerCount(0);
      setMaxCount(result.response.data.length);
      setLoaded(true);
    });
  };
  useEffect(() => {
    const LoadOptions = async () => {
      if (count === maxCount && maxCount > 0) {
        showResult(true, "", true);
      } else {
        console.log("girdi");
        if (result.length > !0 && loaded) {
          setOptions(getOptions(result));
        }
      }
    };
    LoadOptions();
  }, [count]);

  let showResult = (isRightAnswer, rightAnswer, isGameOver) => {
    let title = isRightAnswer ? "Doğru Cevap" : "Yanlış Cevap";
    const content = isGameOver
      ? "Doğru Cevap Sayısı: " +
        rightAnswerCount +
        " Yanlış Cevap Sayısı: " +
        wrongAnswerCount
      : `Doğru Cevap ${rightAnswer}`;
    let iconType = isRightAnswer ? "success" : "error";
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
        setLoaded(false);
        setResult([]);
        LoadAsync();
      }

      setCount(count + 1);
    });
  };

  let getOptions = (data) => {
    let _options = [];

    if (
      data[count] &&
      data[count].translations &&
      data[count].translations[0]
    ) {
      _options.push(data[count].translations[0]);
    } else {
      setCount(0);
    }
    var wrongAnswers = data
      .map((word) => {
        return !_options.includes(word.translations[0]) && word.translations[0];
      })
      .filter(Boolean)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    _options = _options.concat(wrongAnswers).sort(() => Math.random() - 0.5);

    return _options;
  };

  let check = (answer) => {
    var rightAnswer = result[count].translations[0];
    if (answer === rightAnswer) {
      setRightAnswerCount(rightAnswerCount + 1);
      showResult(true, rightAnswer);
    } else {
      setWrongAnswerCount(wrongAnswerCount + 1);
      showResult(false, rightAnswer);
    }
  };

  return (
    <div className="multiple-choose-game">
      {loaded ? (
        <div className="game-area">
          <div className="question-container">
            <h2>{(result[count] || {}).word}</h2>
          </div>
          <div className="options-container">
            {options.map((item, index) => (
              <div
                key={index}
                className="option"
                onClick={() => {
                  check(item);
                }}
              >
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="loading">Yükleniyor...</div>
      )}
    </div>
  );
}

export default MultipleChooseGame;
