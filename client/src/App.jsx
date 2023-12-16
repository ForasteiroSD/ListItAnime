//Components
import "./App.css";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import { changeLogoTheme } from "./components/SmallLogo";

//Pages
import Animes from "./pages/Animes";
import TopAnimes from "./pages/TopAnimes";
import ToWatch from "./pages/ToWatch";
import Watched from "./pages/Watched";
import About from "./pages/About";
import ChangeData from "./pages/ChangeData";

//Packages
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import Axios from "axios";

//Css
import "./App.css";

//Util
import { toggleMode } from "./utils/toggleMode";
import Login from "./pages/Login";

function LogoutButton({ nickname }) {
  const [optionsDisplay, setOptionsDisplay] = useState(false);

  const removeCookie = () => {
    Cookies.remove("id");
    window.location.href = "/login";
  };

  return (
    <div
      className="userSettings"
      onBlur={() => {
        setTimeout(() => {
          setOptionsDisplay(false);
        }, 100);
      }}
    >
      <button
        className="user"
        onClick={() => setOptionsDisplay((state) => !state)}
        title="User Settings"
      >
        <FaUserCircle className="userIcon" />
      </button>
      <p>{nickname}</p>
      {optionsDisplay && (
        <div className="userOptions">
          <ul>
            <li>{nickname}</li>
            <li>
              <Link to="/changedata">Change Data</Link>
            </li>
            <li onClick={removeCookie}>
              Logout <TbLogout className="logoutIcon" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  const [themeIcon, setThemeIcon] = useState(<BsFillBrightnessHighFill />);
  const [nickname, setNickname] = useState();
  const [email, setEmail] = useState();

  const changeIcon = () => {
    const newMode = toggleMode();
    if (newMode === "dark") {
      setThemeIcon(<BsFillBrightnessHighFill />);
      Cookies.set("mode", "dark", { expires: 365 });
    } else {
      setThemeIcon(<MdDarkMode />);
      Cookies.set("mode", "white", { expires: 365 });
    }
    changeLogoTheme();
  };

  const getUserData = async () => {
    const response = (
      await Axios.get(
        "https://serverlistit.onrender.com/get/userData?id=" + Cookies.get("id")
      )
    ).data;
    if (response != "Database off, sorry") {
      setNickname(response.nickname);
      setEmail(response.email);
    }
  };

  useEffect(() => {
    //Change mode acording to use preference
    const mode = Cookies.get("mode");
    if (mode) {
      if (mode === "white") changeIcon();
    } else Cookies.set("mode", "dark", { expires: 365 });

    //get user data
    getUserData();
  }, []);

  return (
    <>
      <Router>
        <button className="toggleMode" onClick={changeIcon} title="Change mode">
          {themeIcon}
        </button>
        {Cookies.get("id") ? <LogoutButton nickname={nickname} /> : null}

        {Cookies.get("id") ? <NavBar /> : null}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Animes />} />
          <Route path="/topanimes" element={<TopAnimes />} />
          <Route path="/towatch" element={<ToWatch />} />
          <Route path="/watched" element={<Watched />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/changedata"
            element={<ChangeData setNickname={setNickname} setEmail={setEmail} email={email} nickname={nickname}/>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
