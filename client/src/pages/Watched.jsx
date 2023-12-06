//Packages
import Axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

//Components
import Anime from "../components/Anime";

//Styles
import "./Watched.css";

function Skeleton() {
  return (
    <div className="skeletonElement">
      <div className="skeleton" />
      <p className="textSkeleton">Q de Quijo</p>
    </div>
  );
}

function Watched() {
  const [animes, setAnimes] = useState();
  const [render, setRender] = useState();
  const [order, setOrder] = useState();

  async function getAnimes() {
    const response = (
      await Axios.get("http://127.0.0.1:5000/getAnimesList", {
        params: { userId: Cookies.get("id"), list: "Watched" },
      })
    ).data;
    setAnimes(response);
  }


  function changeOrder() {
    if(animes) animes.reverse();
    setOrder(!order);
  }

  useEffect(() => {
    getAnimes();
  }, [render]);

  if (!Cookies.get("id")) window.location.href = "/login";
  else
    return (
      <div className="watched">
        <div className="animeBar">
          <h1 className="animeName">ANIMES WATCHED</h1>
          <div>
            <label htmlFor="order">Order By: </label>
            <select name="order" id="order" onChange={() => changeOrder()}>
              <option value="first">First Watched</option>
              <option value="last">Last Watched</option>
            </select>
          </div>
        </div>

        {animes ? (
          <div className="animes">
            {animes.length > 0 ? (
              animes.map((anime, i) => (
                <Anime
                  key={i}
                  mal_id={anime.mal_id}
                  image={anime.image}
                  sinopse={anime.synopsis}
                  toWatch={false}
                  title={anime.title}
                  watched={true}
                  setRenderAgain={setRender}
                />
              ))
            ) : (
              <h2 className="nothing-to-watch">
                Looks like you still did not finish to watch any anime
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

export default Watched;
