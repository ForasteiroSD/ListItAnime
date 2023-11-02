import "./App.css";
import NavBar from "./components/NavBar";
import Animes from "./components/Animes"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Animes />} />
        <Route path="/topanimes" />
        <Route path="/listit" />
        <Route path="/towatch" />
        <Route path="*" />
      </Routes>
    </Router>
  )
}

export default App;
