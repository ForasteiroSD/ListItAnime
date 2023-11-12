//Styles
import "./ShowInfoAnime.css";

//Packages
import Axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import GiveScore from "./GiveScore";

function ShowInfoAnime({ anime, setShow, setModalOpen }) {
  document.body.style.overflowY = "hidden";
  const [infoInsert, setInfoInsert] = useState();
  const [watched, setWatched] = useState(false);
  const [toWatch, setToWatch] = useState(false);
  const [score, setScore] = useState(false);
  let timer;

  async function insertAnime(list) {
    if (list === "To Watch" && toWatch === true) {
      setInfoInsert("error");
    } else if (list === "Watched" && watched) {
      setInfoInsert("error");
    } else {
      if (list === "To Watch") {
        const response = (
          await Axios.get("http://127.0.0.1:5000/insertToWatchWatched", {
            params: { userId: Cookies.get("id"), list: list, anime: anime },
          })
        ).data;
        if (response === "Anime inserted successfully") {
          setInfoInsert("ok");
          setToWatch(true);
        } else if (response === "Anime already watched") {
          console.log("aqui");
          setInfoInsert("watched");
          setToWatch(true);
          setWatched(true);
        } else setInfoInsert("error");
      } else {
        setScore(true);
      }
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      setInfoInsert(undefined);
    }, 5050);
  }

  function closeModal() {
    document.body.style.overflowY = "scroll";
    setShow(false);
    setModalOpen(false);
  }

  return (
    <div className="showinfoanime">
      <div className="back" onClick={closeModal} />
      <div className="modal">
        <div className="info">
          <button className="closeButton" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
          <figure>
            <img src={anime.images.jpg.large_image_url} alt="Anime picture" />
          </figure>

          <div className="data">
            <div>
              <h2>{anime.title}</h2>
              <p className="sinopse">{anime.synopsis}</p>
              <p>
                Anime Trailer:{" "}
                <a href={anime.trailer.url} target="_blank">
                  {anime.trailer.url}
                </a>
              </p>
            </div>
            <div className="bottom-info">
              <p className="score">
                MAL Score:
                <br />
                {anime.score} &#9733;
              </p>
              <div className="adds">
                <button
                  className="watch"
                  onClick={() => {
                    insertAnime("To Watch");
                  }}
                >
                  &#x2b; To Watch
                </button>
                <button
                  className="watched"
                  onClick={() => insertAnime("Watched")}
                >
                  &#x2b; Watched
                </button>
                {infoInsert &&
                  (infoInsert === "ok" ? (
                    <p className="alert inserted">
                      Anime inserted successfully
                    </p>
                  ) : infoInsert === "watched" ? (
                    <p className="alert not-inserted">
                      Can't add an anime that has already been watched
                    </p>
                  ) : (
                    <p className="alert not-inserted">
                      Anime already registered in list
                    </p>
                  ))}
              </div>
              {/* bottom info */}
            </div>
            {/* data */}
          </div>

          {/* info */}
        </div>

        {/* modal */}
      </div>
      {score && (
        <GiveScore
          setMarkWatched={setScore}
          animeTitle={anime.title}
          animeId={anime.mal_id}
          image={anime.images.webp.large_image_url}
          setAlreadyWatched={setWatched}
        />
      )}
    </div>
  );
}

export default ShowInfoAnime;
