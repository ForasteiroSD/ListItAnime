import "./Anime.css";
import ShowInfoAnime from "./ShowInfoAnime";
import Axios from "axios";
import { useState } from "react";

function Anime({ mal_id, title, image, modalOpen, setModalOpen }) {
  const [anime, setAnime] = useState();
  const [show, setShow] = useState(false);

  const getAnime = async (id) => {
    if (!modalOpen) {
      setModalOpen(true);
      const response = await Axios.get("http://127.0.0.1:5000/anime?id=" + id);
      setAnime(response.data);
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
      <div onClick={() => getAnime(mal_id)} className="anime">
        <img className="images" src={image} alt={title + " image"} />
        <p className="text">{title}</p>
      </div>
    </>
  );
}

export default Anime;
