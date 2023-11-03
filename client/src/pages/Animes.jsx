import Axios from "axios";
import { useEffect, useState } from "react";
import Anime from "../components/Anime";
import "./Animes.css";

function Animes() {
  const [animes, setAnimes] = useState();
  const [buffer, setBuffer] = useState("");
  const [searchInterval, setSearchInterval] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getRecomendations = async () => {
    const response = await Axios.get("http://127.0.0.1:5000/animes");
    if(response.data.lenght === 0) {
      return (
        <h1>Something went wrong. Try again</h1>
      )
    }
    setAnimes(response.data);
  };

  const searchAnimes = async (e) => {
    const interval = setInterval(async () => {
      console.log("dentro da pesquisa - buffer: " + buffer);
      if (buffer === "") getRecomendations();
      else {
        const response = await Axios.get(
          "http://127.0.0.1:5000/search?name=" + buffer
        );
        const animes = response.data;
        setAnimes(animes);
      }
    }, 1000);
    setSearchInterval(interval);
  };

  const cancelSearchAnimes = () => {
    console.log("fora da pesquisa");
    clearInterval(searchInterval);
    setSearchInterval(null);
  };

  const handleSearchChange = (e) => {
    setBuffer(e.target.value.replaceAll(" ", "+"));
    console.log(buffer);
  };

  useEffect(() => {
    getRecomendations();
  }, []);

  if (animes) {
    return (
      <>
        <input
          type="text"
          onChange={handleSearchChange}
          onFocus={searchAnimes}
          onBlur={cancelSearchAnimes}
        />
        <div className="animes">
          {animes.map((anime) => (
            <Anime
              key={anime.mal_id}
              mal_id={anime.mal_id}
              title={anime.title}
              image={anime.image}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Animes;
