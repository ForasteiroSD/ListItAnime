import "./Login.css";
import { z } from "zod";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import {sha256} from "js-sha256";

function Login() {
  const emailSchema = z.string().email();
  const [invalidData, setInvaliData] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [emailInUse, setEmailInUse] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [singUp, setSingUp] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [confirmData, setConfirmData] = useState();

  async function Sign() {
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");
    const inputNickname = document.querySelector("#nickname");
    let nickname;
    if (inputNickname) nickname = inputNickname.value;

    const response = (
      await Axios.post("http://127.0.0.1:5000/sign", {
        email: inputEmail.value,
        password: sha256.hmac('lytuhiçjdswxafgqvbjanoikl', inputPassword.value),
        nickname: nickname,
      })
    ).data;
    if (response === "Invalid Data") setInvaliData(true);
    else if (response === "Email already in use") setEmailInUse(true);
    else {
      Cookies.set("id", response.id, { expires: 30 });
      window.location.href = "/";
    }
  }

  function validate(e) {
    e.preventDefault();

    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");
    try {
      const email = inputEmail.value;
      emailSchema.parse(email);
      if (inputPassword.value.length < 8) {
        setPasswordInvalid(true);
      } else {
        if (confirmData === undefined) {
          Sign();
        } else {
          inputPassword.value !== confirmData ? setConfirm(false) : Sign();
        }
      }
    } catch (error) {
      setEmailValid(false);
    }
  }

  if (Cookies.get("id")) window.location.href = "/";
  else
    return (
      <div className="login">
        <div className="logo" />
        <form onSubmit={validate}>
          {!singUp ? (
            <div className="login-data">
              <div>
                <h1>Log In</h1>
                <p>Welcome! Please enter your details</p>
              </div>
              {invalidData && <p className="wrong">Wrong Email or Password</p>}
              <div className="inputs">
                <label htmlFor="email">Email</label>
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={() => {
                      setEmailValid(true);
                      setInvaliData(false);
                    }}
                    required
                  />
                  {!emailValid && <p className="alert">Email is not valid</p>}
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
              <div className="buttons">
                <button>Sign In</button>
              </div>
              <p className="create">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    document.querySelector("#email").value = '';
                    document.querySelector("#password").value = '';
                    setSingUp(true);
                    setEmailValid(true);
                    setPasswordInvalid(false);
                  }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          ) : (
            <div className="login-data signUp">
              <div>
                <h1>Sing Up</h1>
                <p>Please enter your details to create an account</p>
              </div>
              <div className="inputs">
                <label htmlFor="email">Email</label>
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={() => {
                      setEmailValid(true);
                      setEmailInUse(false);
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
                  onChange={() => setPasswordInvalid(false)}
                  required
                />
                {passwordInvalid && (
                  <p className="alert password">
                    Password should have at least 8 characters
                  </p>
                )}
              </div>
              <div className="inputs">
                <label htmlFor="confirmPass">Confirm Password</label>
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
                <button>Create Account</button>
              </div>
              <p className="create">
                Go back to{" "}
                <span
                  onClick={() => {
                    document.querySelector("#email").value = '';
                    document.querySelector("#nickname").value = '';
                    document.querySelector("#password").value = '';
                    document.querySelector("#confirmPass").value = '';
                    setSingUp(false);
                    setConfirmData(undefined);
                    setEmailValid(true);
                    setPasswordInvalid(false);
                    setInvaliData(false);
                  }}
                >
                  Log In
                </span>
              </p>
            </div>
          )}
        </form>
      </div>
    );
}

export default Login;
