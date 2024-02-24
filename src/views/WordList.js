import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import WordService from "../services/WordService";
import '../css/WordList.css'

function WordList() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    return () => handleSetWords();
    
  }, []);

  const handleSetWords = () => {
    if (localStorage.getItem("words")) {
      setWords(JSON.parse(localStorage.getItem("words")));
    } else {
      setWords([]);
    }
  };
  return (
    
    <div className="word-list-detail">
      <h1 className="h1-list">Kelimeler ve Çevirileri</h1>
      <table className="word-list-table">
      <thead>
        <tr>
          <th>Kelime</th>
          <th>Çeviri</th>
        </tr>
        </thead>
        <tbody>
        {words.map((item) => (
          <tr key={item.id}>
            <td>{item.word}</td>
            <td>
              {item.translations[0]}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default WordList;
