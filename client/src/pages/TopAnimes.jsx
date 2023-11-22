//Components
import TopAnime from '../components/TopAnime'

//Packages
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie';
import Axios from 'axios';

//Css
import './TopAnimes.css'

function TopAnimes() {
  const [animes, setAnimes] = useState()

  async function getThisSeasonAnimes() {
    const response = await Axios.get("http://127.0.0.1:5000/get/topAnimes");
    setAnimes(response.data);
  }

  useEffect(() => {
    getThisSeasonAnimes();
  }, []);

  if(!Cookies.get('id')) window.location.href = "/login";
  else return (
    <>
      <section className='TopAnimes'>
        <h1 className="text">TOP ANIMES</h1>
        <div className='animes'>
          {animes ? (
            animes.map((anime, i) => {
              let synopsis;
              if(anime.synopsis) synopsis = anime.synopsis;
              else synopsis = 'No synopsis found'
              return <TopAnime key={anime.mal_id} title={anime.title} image={anime.image} position={i+1} synopsis={synopsis} score={anime.score}/>
            })
          ) : (
            <h2>No anime watched has received a rating yet.</h2>
          )}
        </div>
      </section>
    </>
  )
}

export default TopAnimes;
