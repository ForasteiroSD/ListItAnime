import "./App.css";
import NavBar from "./components/NavBar";
import Animes from "./components/Animes"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NotFound from "./components/NotFound";

function App() {

  return (
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
}

export default App;
