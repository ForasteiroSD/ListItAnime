import { useEffect, useState } from "react";

//Packages
import Axios from "axios";
import * as Ai from 'react-icons/ai';

//Components
import Anime from "../components/Anime";
import "./Animes.css";

//Css
import './Animes.css';

function Animes() {
  const [animes, setAnimes] = useState();
  const [buffer, setBuffer] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [animeName, setAnimeName] = useState('');
  const [searchIcon, setSearchIcon] = useState(<Ai.AiOutlineSearch className="searchIcon"/>);
  const [modalOpen, setModalOpen] = useState(false);

  function PromiseTimeout(delayms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delayms);
    });
  }

  async function getRecomendations() {
    setAnimeName('THIS SEASON ANIME...');
    const response = await Axios.get('http://127.0.0.1:5000/animes');
    let animes = response.data;
    setAnimes(animes);
  }

  useEffect(() => {
      console.log(animes)
  }, [animes])


  const handleSearchChange = (e) => {
    const search = e.target.value;
    setBuffer(search);
    if(search === '') setSearchIcon(<Ai.AiOutlineSearch className="searchIcon"/>)
    else setSearchIcon(<Ai.AiOutlineClose onClick={deleteSearch} className="searchIcon, closeIcon"/>)
  }

  const deleteSearch = () => {
    setBuffer('');
    setSearchIcon(<Ai.AiOutlineSearch className="searchIcon"/>)
  }

  useEffect(() => {
    clearTimeout(searchTimeout);
    setSearchTimeout(null);
    const timeout = setTimeout(async () => {
      if(buffer === '') {
        getRecomendations();
      } else {
        const response = await Axios.get('http://127.0.0.1:5000/search?name=' + buffer.replaceAll(' ', '+'));
        const animes = response.data;
        if(buffer.length > 30) setAnimeName('RESULTS FOR: ' + buffer.slice(0, 31) + '...');
        else setAnimeName('RESULTS FOR: ' + buffer);
        setAnimes(animes);
      }
    }, 750);
    setSearchTimeout(timeout);
  }, [buffer])
  
  if(animes) {
    return (
      <>
        <div className="animeBar">
          <h2 className="animeName" onClick={getRecomendations}>{animeName}</h2>
          <div className="boxSearchBar">
            <input type="text" onChange={handleSearchChange} className="searchBar" value={buffer} />
            {searchIcon}
          </div>
        </div>

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
          ))) : (
            <h2>Sorry, we could not find this anime.</h2>
          )}
        </div>
      </>
    );
  }
}

export default Animes;