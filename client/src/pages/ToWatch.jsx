//Packages
import Axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Styles
import "./ToWatch.css";

//Components
import Anime from "../components/Anime";

function Skeleton() {
  return (
    <div className="skeletonElement">
      <div className="skeleton" />
      <p className="textSkeleton">Q de Quijo</p>
    </div>
  );
}

function ToWatch() {
  const [animes, setAnimes] = useState();

  async function getAnimes() {
    const response = (
      await Axios.get("http://127.0.0.1:5000/getAnimesList", {
        params: { userId: Cookies.get("id"), list: "To Watch" },
      })
    ).data;
    setAnimes(response);
  }

  useEffect(() => {
    getAnimes();
  }, [animes]);

  if (!Cookies.get("id")) window.location.href = "/login";
  else
    return (
      <div className="to-watch">
        <div className="animeBar">
          <h2 className="animeName">ANIMES TO WATCH</h2>
        </div>

        {animes ? (
          <div className="animes towatch-animes">
            {animes.length > 0 ? (
              animes.map((anime, i) => (
                <Anime
                  key={i}
                  mal_id={anime.mal_id}
                  image={anime.image}
                  toWatch={true}
                  title={anime.title}
                />
              ))
            ) : (
              <h2 className="nothing-to-watch">
                Looks like you're not planning to watch anything, try adding
                some new animes in the page <span className="link"><Link to='/'>Animes</Link></span>
              </h2>
            )}
          </div>
        ) : (
          <div className="animes">
            {Array.from({ length: 20 }).map((item, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}
      </div>
    );
}

export default ToWatch;
