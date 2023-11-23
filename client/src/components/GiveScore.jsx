import { useState } from "react";
import "./GiveScore.css";
import Axios from "axios";
import Cookies from "js-cookie";

function GiveScore({
  setMarkWatched,
  animeTitle,
  animeId,
  image,
  sinopse,
  setAlreadyWatched,
  setRenderAgain,
  editScore,
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
              synopsis: sinopse,
            },
            score: score,
          },
        })
      ).data;

      if (response === "Anime inserted successfully") {
        if (setAlreadyWatched) {
          setMarkWatched(false);
          setAlreadyWatched(true);
        }
        else {
          document.body.style.overflowY = "auto";
          setMarkWatched(false);
          setRenderAgain((state) => !state);
        }
      }

      setInfo(response);
    }
  }

  async function editAnimeScore() {
    const score = document.querySelector("#score").value;

    if (!score) {
      setInfo("Type something in score");
    } else if (score > 10 || score < 0) {
      setInfo("Score should be between 0 and 10");
    } else {
      const response = (
        await Axios.get("http://127.0.0.1:5000/editScore", {
          params: {
            userId: Cookies.get("id"),
            animeId: animeId,
            score: score,
          },
        })
      ).data;

      if (response === "Score edited succesfully") {
        document.body.style.overflowY = "auto";
        setMarkWatched(false);
      } else {
        setInfo(response);
      }
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editScore) editAnimeScore();
            else addToWatched();
          }}
        >
          <h2>{animeTitle}</h2>
          <div>
            <label htmlFor="score">
              Type the score you want to rate this anime from 0 to 10:
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.01"
              id="score"
              name="score"
              placeholder="Ex: 8.68"
              onChange={() => setInfo(undefined)}
            />
          </div>
          <button className="addWatched">{!editScore ? "Add" : "Edit"}</button>
        </form>
        {info && (
          <p
            className="alert"
            style={
              info === "Anime inserted successfully" ||
              info === "Score edited succesfully"
                ? { color: "green" }
                : { color: "#B02817" }
            }
          >
            {info}
          </p>
        )}
      </div>
    </div>
  );
}

export default GiveScore;
