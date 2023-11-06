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

//Css
import "./App.css";

//Util
import { toggleMode } from "./utils/toggleMode";
import Login from "./pages/Login";

function App() {
  const [themeIcon, setThemeIcon] = useState(<BsFillBrightnessHighFill />)

  const changeIcon = () => {
    const newMode = toggleMode();
    if(newMode === 'dark') setThemeIcon(<BsFillBrightnessHighFill />);
    else setThemeIcon(<MdDarkMode />);
    changeLogoTheme();
  }

  return (
    <>
      <button className="toggleMode" onClick={changeIcon}>
        {themeIcon}
      </button>
      <Router>
        <NavBar />
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
