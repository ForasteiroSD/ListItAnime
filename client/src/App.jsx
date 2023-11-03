import "./App.css";
import NavBar from "./components/NavBar";
<<<<<<< Updated upstream
import Animes from "./components/Animes"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NotFound from "./components/NotFound";
=======
import NotFound from "./components/NotFound";

//Pages
import Animes from "./pages/Animes";
import TopAnimes from "./pages/TopAnimes";
import ListIt from "./pages/ListIt";
import ToWatch from "./pages/ToWatch";
import Watched from "./pages/Watched";

//Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Css
import "./App.css";
>>>>>>> Stashed changes

//Util
import { toggleMode } from "./utils/toggleMode";

function App() {
  return (
<<<<<<< Updated upstream
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Animes />} />
        <Route path="/topanimes" />
        <Route path="/listit" />
        <Route path="/towatch" />
        <Route path="/watched" />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
  )
=======
    <>
      <button className="toggleMode" onClick={toggleMode}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
        </svg>
      </button>
      <Router>
        <NavBar />
        <Routes>
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
>>>>>>> Stashed changes
}

export default App;
