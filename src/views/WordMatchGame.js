import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import '../css/WordMatchGame.css'
import WordService from "../services/WordService";

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
function WordMatchGame() {
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState('');
  const [words, setWords] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [highlightedPairs, setHighlightedPairs] = useState([]);
  const [checkMatch, setCheckMatch] = useState(false);
  const [rightAnswerCount, setRightAnswerCount] = useState(0); 
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0); 

    useEffect(()=>{
       return () => LoadAsync(); 
    },[])

    const LoadAsync = async () => {
        let service = new WordService();
        await service.getAllWordTop(5).then((result) => {
            console.log("getAllWordTop", result);
            const shuffledWords = shuffle([...result.response.data]);
            setWords(shuffledWords);
            setTranslations(shuffle(shuffledWords.map(word => word.translations[0])));
            //setLoaded(true);
        });
    }
  
    useEffect(() => {
      if (checkMatch) {
        const match = words.find(word => word.id === selectedWordId)?.translations.includes(selectedTranslation);
        if (match) {
            setRightAnswerCount(rightAnswerCount => rightAnswerCount +1);

            setWords(words.filter(word => word.id !== selectedWordId));
            setSelectedWordId(null);
            setSelectedTranslation('');
            setCheckMatch(false);
          
        } else {
            setWrongAnswerCount(wrongAnswerCount => wrongAnswerCount+1);
            setSelectedWordId(null);
            setSelectedTranslation('');
            setCheckMatch(false);
            

        }
        
      }
    }, [checkMatch, selectedWordId, selectedTranslation, words]);
  
    useEffect(()=>{
        if(rightAnswerCount === 5){
            showResult();
          }
    },[rightAnswerCount])
    let showResult = () => {
        const content =  "Doğru Cevap Sayısı: " +
            rightAnswerCount +
            " Yanlış Cevap Sayısı: " +
            wrongAnswerCount;
        const buttonText = "Tekrar oyna";
    
        
        let title = "Oyun bitti";
        let  iconType = "info";
        
    
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
            LoadAsync();
            setRightAnswerCount(0);
            setWrongAnswerCount(0);
        });
      };
    const handleWordSelection = (id) => {
      setSelectedWordId(id);
      if (selectedTranslation) {
        setCheckMatch(true);
      }
    };
  
    const handleTranslationSelection = (translation) => {
      setSelectedTranslation(translation);
      if (selectedWordId) {
        setCheckMatch(true);
      }
    };
  
    return (
      <div className="game-container">
        <div className="words-container">
          {words.map(word => (
            <button key={word.id}
                    className={`word-button ${selectedWordId === word.id ? 'selected' : ''}`}
                    onClick={() => handleWordSelection(word.id)}>
              {word.word}
            </button>
          ))}
        </div>
        <div className="translations-container">
          {words.map(word => (
            <button key={word.id}
                    className={`translation-button ${selectedTranslation === word.translations[0] ? 'selected' : ''}`}
                    onClick={() => handleTranslationSelection(word.translations[0])}>
              {word.translations[0]}
            </button>
          ))}
        </div>
      </div>
    );
}

export default WordMatchGame;