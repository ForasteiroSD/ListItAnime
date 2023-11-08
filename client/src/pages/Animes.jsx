import { useEffect, useState } from "react";

//Packages
import Axios from "axios";
import * as Ai from "react-icons/ai";
import Cookies from 'js-cookie';

//Components
import Anime from "../components/Anime";
import "./Animes.css";

//Css
import "./Animes.css";



function Skeleton() {
  return (
    <div className="skeletonElement">
      <div className="skeleton" />
      <p className="textSkeleton">Q de Quijo</p>
    </div>
  );
}



function Animes() {
  const [animes, setAnimes] = useState();
  const [buffer, setBuffer] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [animeName, setAnimeName] = useState("THIS SEASON ANIME...");
  const [searchIcon, setSearchIcon] = useState(<Ai.AiOutlineSearch className="searchIcon" />);
  const [modalOpen, setModalOpen] = useState(false);

  async function getThisSeasonAnimes() {
    setAnimeName("THIS SEASON ANIME...");
    const timeout = setTimeout(async () => {
      const response = await Axios.get("http://127.0.0.1:5000/animes");
      setAnimes(response.data);
    }, 750);
    setSearchTimeout(timeout);
  }

  async function searchAnimes() {
    setAnimeName("SEARCHING...")
    const timeout = setTimeout(async () => {
      const response = await Axios.get("http://127.0.0.1:5000/search?name=" + buffer.replaceAll(" ", "+"));
      if (buffer.length > 30) setAnimeName("RESULTS FOR: " + buffer.slice(0, 31) + "...");
      else setAnimeName("RESULTS FOR: " + buffer);
      setAnimes(response.data);
    }, 750);
    setSearchTimeout(timeout);
  }

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setBuffer(search);
    if (search === "") setSearchIcon(<Ai.AiOutlineSearch className="searchIcon" />);
    else setSearchIcon( <Ai.AiOutlineClose onClick={deleteSearch} className="searchIcon, closeIcon" />);
  };

  const deleteSearch = () => {
    setBuffer("");
    setSearchIcon(<Ai.AiOutlineSearch className="searchIcon" />);
  };

  useEffect(() => {
    clearTimeout(searchTimeout);
    setSearchTimeout(null);
    setAnimes(null);
    if (buffer === "") getThisSeasonAnimes()
    else searchAnimes()
  }, [buffer]);

  if(!Cookies.get('id')) window.location.href = "/login";
  else return (
    <>
      <div className="animeBar">
        <h2 className="animeName">{animeName}</h2>
        <div className="boxSearchBar">
          <input
            type="text"
            onChange={handleSearchChange}
            className="searchBar"
            value={buffer}
          />
          {searchIcon}
        </div>
      </div>

      {animes ? (
        <div className="animes">
          {animes.length > 0 ? (
            animes.map((anime, i) => (
              <Anime
                key={i}
                mal_id={anime.mal_id}
                title={anime.title}
                image={anime.image}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              />
            ))
          ) : (
            <h2>Sorry, we could not find this anime.</h2>
          )}
        </div>
      ) : (
        <div className="animes">
          {Array.from({ length: 28 }).map((item, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}
    </>
  );
}

export default Animes;