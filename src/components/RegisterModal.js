import { useEffect, useState } from "react";
import "../App.css";
import "../css/Modal.css";
import AuthService from "../services/AuthService";
import Swal from "sweetalert2";
function RegisterModal({ setLogin }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkKvkk, setCheckKvkk] = useState(false);
  const [checkMembership, setCheckMembership] = useState(false);

  const register = async () => {
    const service = new AuthService();
    if (checkKvkk === true && checkMembership === true) {
      let result = await service.register(name, surname, email, username, password);
      if (result.status === 200) {
        let loginResult = await service.login(email, password);
        if (loginResult.status === 200) {
          localStorage.setItem(
            "tokens",
            JSON.stringify(loginResult.response.data)
          );
          Swal.fire({
            icon: "success",
            title: "Kayıt ve Giriş Başarılı",
            confirmButtonText: "Tamam",
          }).then(() => {
            // window.$("#authModal").modal("hide");
            // window.$(".modal-backdrop").removeClass("show");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: loginResult.response.errors[0],
            confirmButtonText: "Tamam",
          }).then(() => {});
        }
      } else {
        Swal.fire({
          icon: "error",
          title: result.response.errors[0],
          confirmButtonText: "Tamam",
        }).then(() => {});
      }
    }
  };
  return (
    <>
      <div className="mModal">
        <div className="container">
          <div className="mModal-title">
            <h1 className="mTitle mt-3">Kayıt Ol</h1>
          </div>
          <hr className="mModal-divider"></hr>
          <div className="mModal-input">
            <div className="mt-5">
              <input
                type="text"
                placeholder="İsim"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Soyisim"
                onChange={(e) => setSurname(e.target.value)}
              ></input>
            </div>
            <div className="mt-4">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Kullanıcı Adı"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="mt-4">
              <input
                type="password"
                placeholder="Şifre"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="mModal-btn mt-4 row">
              <div className="col-md-8 form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => {
                    e.target.checked ? setCheckKvkk(true) : setCheckKvkk(false);
                  }}
                  value=""
                  id="privacyCheckbox"
                />
                <label
                  className="form-check-label checkBoxLabel"
                  for="privacyCheckbox"
                >
                  Kişisel Verilerin Korunmasına İlişkin Aydınlatma Metni'ni
                  okudum, onaylıyorum.
                </label>
              </div>
              <div className="col-md-4">
                <button
                  className="mModal-btn-login"
                  onClick={() => {
                    register();
                  }}
                >
                  Kayıt Ol
                </button>
              </div>
            </div>
            <div className="mModal-btn mt-2 row">
              <div className="col-md-8 form-check mb-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => {
                    e.target.checked
                      ? setCheckMembership(true)
                      : setCheckMembership(false);
                  }}
                  id="membershipCheckbox"
                />
                <label
                  className="form-check-label checkBoxLabel"
                  htmlFor="membershipCheckbox"
                >
                  MEMORENG Üyelik Sözleşmesi'ni okudum, onaylıyorum.
                </label>
              </div>
              <div className=" col-md-4">
                <a
                  className="registerLink mt-2"
                  onClick={() => setLogin("login")}
                >
                  Giriş Yap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterModal;
