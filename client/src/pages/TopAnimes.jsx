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
        <h2 className="text">TOP ANIMES</h2>
        <div className='animes'>
          {animes ? (
            animes.map((anime, i) => {
              let title, synopsis;
              console.log(anime.synopsis);
              if (anime.title.length > 50) title = anime.title.slice(0, 51) + "...";
              else title =  anime.title;
              if(anime.synopsis) {
                if (anime.synopsis.length > 100) synopsis =  anime.synopsis.slice(0, 101) + "...";
                else synopsis =  anime.synopsis;
              } else synopsis = 'No synopsis found'
              return <TopAnime key={anime.mal_id} title={title} image={anime.image} position={i+1} synopsis={synopsis} score={anime.score}/>
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
