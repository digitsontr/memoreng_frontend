import { useEffect, useState } from "react";
import "../App.css";
import "../css/Modal.css";
import Swal from "sweetalert2";
import AuthService from "../services/AuthService";

function Modal({ login, setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPass, setValidPass] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"));
    }
  });
  const loginFunc = async () => {
    const service = new AuthService();
    let response = await service.login(email, password);
    if (response.status === 200) {
      localStorage.setItem("tokens", JSON.stringify(response.response.data));
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("rememberMe", "true");
      }
      Swal.fire({
        icon: "success",
        title: "Giriş Başarılı",
        confirmButtonText: "Tamam",
      }).then(() => {
        // window.$("#authModal").modal("hide");
        // window.$(".modal-backdrop").removeClass("show");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: response.response.errors[0],
        confirmButtonText: "Tamam",
      }).then(() => {});
    }
  };

  const changeEmailFunc = (value) => {};
  return (
    <>
      <div className="mModal">
        <div className="container">
          <div className="mModal-title">
            <h1 className="mTitle mt-3">Giriş Yap</h1>
          </div>
          <hr className="mModal-divider"></hr>
          <div className="mModal-input">
            <div className="mt-5">
              <input
                type="text"
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              ></input>
            </div>
            <div className="mt-4">
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Şifre"
              ></input>
            </div>
            <div className="mModal-btn mt-4 row">
              {/* <div className="col-md-4">
                    <a className="forgetPassword">
                        Şifremi Unuttum
                    </a>
                </div> */}
              <div className="col-md-4 form-check mb-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => {
                    e.target.checked
                      ? setRememberMe(true)
                      : setRememberMe(false);
                  }}
                  id="rememberMeCheckbox"
                />
                <label
                  className="form-check-label checkBoxLabel"
                  htmlFor="rememberMeCheckbox"
                >
                  Beni Hatırla
                </label>
              </div>
              <div className="offset-md-4 col-md-4">
                <button
                  className="mModal-btn-login"
                  onClick={() => {
                    loginFunc();
                  }}
                >
                  Giriş Yap
                </button>
              </div>
            </div>
            <div className="mModal-btn mt-2 row">
              <div className="offset-md-8 col-md-4">
                <a
                  className="registerLink mt-2"
                  onClick={() => setLogin("register")}
                >
                  Kayıt ol
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
