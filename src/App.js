import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AuthService from './services/AuthService';
import WordService from './services/WordService';

import MultipleChooseGame from './views/MultipleChooseGame';
import FillInTheBlankGame from './views/FillInTheBlankGame';
import HomePage from './views/HomePage';
import WordList from './views/WordList';
import WordlGame from './views/WordleGame';
import WordMatchGame from './views/WordMatchGame';
import Footer from './components/Footer';

function App() {
  useEffect(()=>{
    return () => WorkLoad()
  },[])

  const WorkLoad = () => {
    const service = new AuthService();
    const wordService = new WordService();

    service.createTokenByClient().then((res)=>{
      localStorage.setItem("tokenByClient",res.data.accessToken)
    })
    if(localStorage.getItem("tokens") && !window.isTokenCreated){
      window.isTokenCreated = true;
      
      let tokens = JSON.parse(localStorage.getItem("tokens"))
      let dateNow = new Date().getTime();
      let accesExpiration = new Date(tokens.accessTokenExpiration).getTime();
      let refreshExpiration = new Date(tokens.refreshTokenExpiration).getTime();
      if (dateNow <= accesExpiration) {
        wordService.getAllWord(tokens.accessToken).then((res)=>{
          localStorage.setItem("words",JSON.stringify(res.response.data))
        })
        
      } 
      else{
        if(dateNow <= refreshExpiration && localStorage.getItem("rememberMe") === "true"){
          service.refreshToken(tokens.refreshToken).then((result)=>{
            if(result.errors){

            }else{
              localStorage.setItem("tokens",JSON.stringify(result.data));
              wordService.getAllWord(result.data.accessToken)
            }
            
          })
        }else{
          localStorage.setItem("tokens","")
        }
      } 
    }else{
      let token = localStorage.getItem("tokenByClient")
      wordService.getAllWord(token).then((res)=>{
        localStorage.setItem("words",JSON.stringify(res.response.data))
      })
    }
  }
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route exact path="/"element={<HomePage />} />
          <Route path="/multiple"element={<MultipleChooseGame />} />
          <Route path="/fill" element={<FillInTheBlankGame />} />
          <Route path="/wordlist" element={<WordList />} />
          <Route path="/wordle" element={<WordlGame />} />
          <Route path="/wordmatch" element={<WordMatchGame />} />
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
