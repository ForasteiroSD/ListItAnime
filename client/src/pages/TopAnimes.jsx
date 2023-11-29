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
    const response = await Axios.post("http://127.0.0.1:5000/get/topAnimes", {userId: Cookies.get('id')});
    console.log(response.data)
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
        
          {animes ? (
            //Busca realizada
            animes.length > 0 ? (
              //Existem animes na lista
              <div className='animes'> {
                animes.map((anime, i) => {
                  let synopsis;
                  if(anime.synopsis) synopsis = anime.synopsis;
                  else synopsis = 'No synopsis found'
                  return <TopAnime key={anime.mal_id} title={anime.title} image={anime.image} position={i+1} synopsis={synopsis} score={anime.position_score}/>
                })}
              </div>
            ) : (
              //Não existem animes na lista
              <h2 className='noTopAnime'>Looks like you haven't rated any anime yet</h2>
            )
          ) : (
            //Carregando
            <h2 className='noTopAnime'>Loading...</h2>
          )}
        
      </section>
    </>
  )
}

export default TopAnimes;