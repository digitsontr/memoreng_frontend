import { useEffect, useState } from "react";
import "../App.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Search from "./Search";

function Header() {
  const [loginType, setLoginType] = useState("login");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    const LoadFunc = () => {
      if(localStorage.getItem("tokens")){
        let tokens =   JSON.parse(localStorage.getItem("tokens"));
  
        let dateNow = new Date().getTime();
        let accesExpiration = new Date(tokens.accessTokenExpiration).getTime();
        let refreshExpiration = new Date(tokens.refreshTokenExpiration).getTime();
  
        if(localStorage.getItem("rememberMe") === "true"){
          if(dateNow <= refreshExpiration){
            setIsLogin(true)
          }else{
            setIsLogin(false)
          }
        }else{
          if (dateNow <= accesExpiration) {
            setIsLogin(true)
            
          } else{
            setIsLogin(false)
          }
        }
        
      }
    }
    LoadFunc()
  },[isLogin])
  return (
    <header className="header">
      <button className="header-menu">
        <i className="fa fa-bars"></i>
      </button>

      <div className="logo-wrapper">
        <a href="/" className="logo">
          <span>Memoreng</span>
        </a>
      </div>

      {/* <form action="" className="search">
                <input type="text" placeholder="Kelime Ara" id="search-input" className="ui-autocomplete-input" autocomplete="off"/>
        </form> */}
      <Search></Search>

      {/* {isLogin ? 
      (
        <div>Login olundu</div>
      ):
      (
        <>
        <div className="user-box">
        <a
          data-popup="login"
          data-id="1"
          className="user-btn"

          data-bs-toggle="modal"
          data-bs-target="#authModal"
          onClick={() => {setLoginType("login")}}
        >
          <span>Giriş yap</span>
          <i className="fa fa-user"></i>
        </a>
      </div>
    
      <div
        className="modal fade"
        tabIndex={-1}
        id="authModal"
        aria-labelledby="authModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {loginType === "login" ? (
              <LoginModal
                login={loginType}
                setLogin={setLoginType}
              ></LoginModal>
            ) : (
              <RegisterModal setLogin={setLoginType}></RegisterModal>
            )}
          </div>
        </div>
      </div>
      </>
      )

      } */}
    <div></div>
    </header>
  );
}

export default Header;
