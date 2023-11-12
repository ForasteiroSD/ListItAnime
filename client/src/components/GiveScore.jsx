import { useState } from "react";
import "./GiveScore.css";
import Axios from "axios";
import Cookies from "js-cookie";

function GiveScore({
  setMarkWatched,
  animeTitle,
  animeId,
  image,
  setAlreadyWatched,
  removeFromToWatch,
}) {
  document.body.style.overflowY = "hidden";
  const [info, setInfo] = useState();

  async function addToWatched() {
    const score = document.querySelector("#score").value;

    if (!score) {
      setInfo("Type something in score");
    } else if (score > 10 || score < 0) {
      setInfo("Score should be between 0 and 10");
    } else {
      const response = (
        await Axios.get("http://127.0.0.1:5000/insertToWatchWatched", {
          params: {
            userId: Cookies.get("id"),
            list: "Watched",
            anime: {
              mal_id: animeId,
              title: animeTitle,
              images: {
                webp: {
                  large_image_url: image,
                },
              },
            },
            score: score,
          },
        })
      ).data;

      if (response === "Anime inserted successfully") {
        if (setAlreadyWatched) setAlreadyWatched(true);
        else removeFromToWatch(animeId);
      }

      setInfo(response);
    }
  }

  return (
    <div className="giveScore showinfoanime">
      <div
        className="back"
        onClick={() => {
          setMarkWatched((state) => !state);
          document.body.style.overflowY = "auto";
        }}
      />
      <div className="modal">
        <button
          className="closeButton"
          onClick={() => {
            setMarkWatched((state) => !state);
            document.body.style.overflowY = "auto";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
        <h2>{animeTitle}</h2>
        <div className="score-data">
          <label htmlFor="score">
            Type the score you want to rate this anime from 0 to 10:
          </label>
          <input
            type="number"
            id="score"
            name="score"
            placeholder="Ex: 8.68"
            onChange={() => setInfo(undefined)}
          />
        </div>
        <button
          className="addWatched"
          onClick={() => {
            addToWatched();
          }}
        >
          Add
        </button>
        {info && <p className="alert">{info}</p>}
      </div>
    </div>
  );
}

export default GiveScore;
