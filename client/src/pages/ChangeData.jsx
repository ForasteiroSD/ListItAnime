import Cookies from "js-cookie";
import "./ChangeData.css";
import { z } from "zod";
import { useState } from "react";
import { sha256 } from "js-sha256";
import Axios from "axios";

function ChangeData({ nickname, email }) {
  const emailSchema = z.string().email();
  const [invalidData, setInvaliData] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [emailInUse, setEmailInUse] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [newPasswordInvalid, setNewPasswordInvalid] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [confirmData, setConfirmData] = useState();
  const [updated, setUpdated] = useState(false);

  async function Change() {
    if (updated) {
      setInvaliData("Data already changed, try again later");
      return;
    }

    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");
    const inputNickname = document.querySelector("#nickname");
    const inputNewPassword = document.querySelector("#new_password");

    const response = (
      await Axios.post("http://127.0.0.1:5000/changeData", {
        userId: Cookies.get("id"),
        email: inputEmail.value,
        password: sha256.hmac("lytuhiçjdswxafgqvbjanoikl", inputPassword.value),
        newPassword: sha256.hmac(
          "lytuhiçjdswxafgqvbjanoikl",
          inputNewPassword.value
        ),
        nickname: inputNickname.value,
      })
    ).data;
    if (response === "Invalid Data") setInvaliData("Wrong Password");
    else if (response === "Email already in use") setEmailInUse(true);
    else {
      setUpdated(true);
      setInvaliData("Data changed");
    }
  }

  function validate(e) {
    e.preventDefault();

    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");
    const inputNewPassword = document.querySelector("#new_password");
    try {
      const email = inputEmail.value;
      emailSchema.parse(email);
      if (inputPassword.value.length < 8) setPasswordInvalid(true);
      else if (inputNewPassword.value.length < 8) setNewPasswordInvalid(true);
      else
        inputNewPassword.value !== confirmData ? setConfirm(false) : Change();
    } catch (error) {
      setEmailValid(false);
    }
  }

  if (!Cookies.get("id")) window.location.href = "/login";
  else
    return (
      <div className="changedata">
        <div className="data">
          <h2>Logged to {nickname}</h2>
          <form onSubmit={validate}>
            <div className="login-data">
              <div className="inputs">
                <label htmlFor="email">Email</label>
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    defaultValue={email}
                    onChange={() => {
                      setEmailValid(true);
                      setEmailInUse(false);
                      setInvaliData(false);
                    }}
                    required
                  />
                  {!emailValid && <p className="alert">Email is not valid</p>}
                  {emailInUse && (
                    <p className="alert">This email has already been used</p>
                  )}
                </div>
              </div>
              <div className="inputs">
                <label htmlFor="nickname">Nickname</label>
                <div>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    placeholder="Enter the nickname you want use"
                    defaultValue={nickname}
                    required
                  />
                </div>
              </div>
              <div className="inputs">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="•••••••••••"
                  onChange={() => {
                    setPasswordInvalid(false);
                    setInvaliData(false);
                  }}
                  required
                />
                {passwordInvalid && (
                  <p className="alert password">
                    Password should have at least 8 characters
                  </p>
                )}
              </div>
              <div className="inputs">
                <label htmlFor="new_password">New Password</label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  placeholder="•••••••••••"
                  onChange={() => {
                    setNewPasswordInvalid(false);
                    setConfirm(true);
                  }}
                  required
                />
                {newPasswordInvalid && (
                  <p className="alert password">
                    Password should have at least 8 characters
                  </p>
                )}
              </div>
              <div className="inputs">
                <label htmlFor="confirmPass">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPass"
                  name="confirmPass"
                  placeholder="•••••••••••"
                  onChange={(e) => {
                    setConfirm(true);
                    setConfirmData(e.target.value);
                  }}
                  required
                />
                {!confirm && (
                  <p className="alert password">
                    Both passwords should be equal
                  </p>
                )}
              </div>
              <div className="buttons">
                <button>Change Data</button>
              </div>
              {invalidData ? (
                invalidData === "Data changed" ? (
                  <p className="right big-alert">Data changed</p>
                ) : (
                  <p className="wrong big-alert">{invalidData}</p>
                )
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
}

export default ChangeData;
