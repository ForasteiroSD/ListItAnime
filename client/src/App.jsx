import Axios from 'axios'
import { useEffect, useState } from 'react';
import Anime from './components/Anime';
import './App.css'

function App() {
  const [animes, setAnimes] = useState();

  useEffect(() => {
    getRecomendations();
  }, [])

  const getRecomendations = async () => {
    const response = await Axios.get('http://127.0.0.1:5000/recomendations');
    const animes = response.data;
    setAnimes(animes);
  }

  if(animes) {
    return (
      <div className='recomendations'>
        {animes.map((anime) => (<Anime key={anime.mal_id} mal_id={anime.mal_id} title={anime.title} image={anime.image}/>))}
      </div>
    )
  }

}

export default App