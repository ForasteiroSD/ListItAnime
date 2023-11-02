//Components
import NavBar from "./components/NavBar";

//Pages
import Animes from "./pages/Animes"
import TopAnimes from "./pages/TopAnimes";
import ListIt from "./pages/ListIt";
import ToWatch from "./pages/ToWatch";
import Watched from "./pages/Watched";

//Packages
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

//Css
import "./App.css";

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Animes />} />
        <Route path="/topanimes" element={<TopAnimes />} />
        <Route path="/listit" element={<ListIt />} />
        <Route path="/towatch" element={<ToWatch />} />
        <Route path="*" element={<Watched />} />
      </Routes>
    </Router>
  )
}

export default App;
