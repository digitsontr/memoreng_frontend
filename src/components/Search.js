import { useEffect, useState } from "react";
import "../css/Search.css";
import $ from "jquery"

function Search() {
  const [isTyping, setIsTyping] = useState(false);
  const [result, setResult] = useState([]);
  const [isShow, setIsShow] = useState(true);

  useEffect(()=>{
    let path = window.location.pathname;
    if(path === "/multiple" || path === "/fill" || path === "/wordle" || path === "/wordmatch"){
      setIsShow(false);
      $(".search input").css("display", "none");
    }else{
      setIsShow(true)
    }
  },[])
  const handleChange = (search) => {
    if (localStorage.getItem("words")) {
      let words = JSON.parse(localStorage.getItem("words"));
      setIsTyping(search.replace(/\s+/, "").length > 0);
      if (search) {
        setResult(
          words.filter((x) =>
            x.word.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setResult([]);
      }
    }
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Kelime Ara"
        id="search-input"
        className={isTyping ? "typing" : null}
        onChange={(e) => handleChange(e.target.value)}
        autoComplete="off"
      />
      {result && (
        <>
        {isShow ? (
          <div className="search-result">
          {result.map((item) => (
            <div className="search-result-item" key={item.id}>
              {item.word} - {item.translations[0]}
            </div>
          ))}
        </div>
        ):(
<div></div>
        )}
        </>
      )}
    </div>
  );
}

export default Search;
