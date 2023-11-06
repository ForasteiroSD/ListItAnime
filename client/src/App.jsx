//Components
import "./App.css";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import {changeLogoTheme} from "./components/SmallLogo";

//Pages
import Animes from "./pages/Animes";
import TopAnimes from "./pages/TopAnimes";
import ListIt from "./pages/ListIt";
import ToWatch from "./pages/ToWatch";
import Watched from "./pages/Watched";

//Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react'
import {MdDarkMode} from 'react-icons/md';
import {BsFillBrightnessHighFill} from 'react-icons/bs';
import {TbLogout} from 'react-icons/tb';
import Cookies from 'js-cookie';

//Css
import "./App.css";

//Util
import { toggleMode } from "./utils/toggleMode";
import Login from "./pages/Login";

function LogoutButton() {
  const removeCookie = () => {
    Cookies.remove('id');
    window.location.href = "/login"
  }

  return (
    <button className="Logout" onClick={removeCookie} title="Logout">
      <TbLogout className="logoutIcon" />
    </button>
  )
}

function App() {
  const [themeIcon, setThemeIcon] = useState(<BsFillBrightnessHighFill />)

  const changeIcon = () => {
    const newMode = toggleMode();
    if(newMode === 'dark') {
      setThemeIcon(<BsFillBrightnessHighFill />);
      Cookies.set('mode', 'dark', {expires: 365});
    } else {
      setThemeIcon(<MdDarkMode />);
      Cookies.set('mode', 'white', {expires: 365});
    }
    changeLogoTheme();
  }

  useEffect(() => {
    toggleMode();
    const mode = Cookies.get('mode');
    if(mode) {
      if(mode === 'white') changeIcon();
    } else Cookies.set('mode', 'dark', {expires: 365});
  }, [])

  return (
    <>
      <button className="toggleMode" onClick={changeIcon} title="Change mode">
        {themeIcon}
      </button>
      {Cookies.get('id') ? <LogoutButton /> : null}
      <Router>
        {Cookies.get('id') ? <NavBar /> : null}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Animes />} />
          <Route path="/topanimes" element={<TopAnimes />} />
          <Route path="/listit" element={<ListIt />} />
          <Route path="/towatch" element={<ToWatch />} />
          <Route path="/watched" element={<Watched />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
