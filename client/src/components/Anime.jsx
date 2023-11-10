import "./Anime.css";
import ShowInfoAnime from "./ShowInfoAnime";
import Axios from "axios";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function Anime({ mal_id, title, image, modalOpen, setModalOpen, toWatch }) {
  const [anime, setAnime] = useState();
  const [show, setShow] = useState(false);
  const [showToWatch, setShowToWatch] = useState(false);

  const getAnime = async (id) => {
    if (!modalOpen) {
      const response = await Axios.get("http://127.0.0.1:5000/anime?id=" + id);
      setAnime(response.data);
      setModalOpen(true);
      setShow(!show);
    }
  };

  return (
    <>
      {show ? (
        <ShowInfoAnime
          anime={anime}
          setShow={setShow}
          setModalOpen={setModalOpen}
        />
      ) : null}
      {toWatch ? (
        <div
          className="anime"
          onMouseEnter={() => setShowToWatch(true)}
          onMouseLeave={() => setShowToWatch(false)}
        >
          {showToWatch && (
            <div className="addWatch">
              <FaTrashAlt className="trash-can" />
              <button className="mark-watched">Mark as Watched</button>
            </div>
          )}

          <div>
            <figure>
              <img src={image} alt={title + " image"} />
            </figure>
          </div>
        </div>
      ) : (
        <div className="anime">
          <figure onClick={() => getAnime(mal_id)}>
            <img src={image} alt={title + " image"} />
          </figure>
          {title && <p className="text">{title}</p>}
        </div>
      )}
    </>
  );
}

export default Anime;
