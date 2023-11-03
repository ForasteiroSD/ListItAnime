import "./ShowInfoAnime.css";

function ShowInfoAnime({ anime, setShow, setModalOpen }) {
  const trailerUrl = anime.trailer.url;
  return (
    <div className="showinfoanime">
      <div
        className="back"
        onClick={() => {
          setShow((state) => !state);
          setModalOpen(false);
        }}
      />
      <div className="info">
        <figure>
          <img src={anime.images.jpg.large_image_url} alt="Anime picture" />
        </figure>
        <div className="data">
          <div>
            <h2>{anime.title}</h2>
            <p>{anime.synopsis}</p>
            <p>
              Anime Trailer:{" "}
              <a href={trailerUrl} target="_blank">
                {anime.trailer.url}
              </a>
            </p>
            <div className="bottom-info">
              <p className="score">
                MAL Score:
                <br />
                {anime.score} &#9733;
              </p>
              <div className="adds">
                <button
                  className="watch"
                  onClick={() => console.log("adicionar to watch")}
                >
                  &#x2b; To Watch
                </button>
                <button
                  className="watched"
                  onClick={() => console.log("adicionar watched")}
                >
                  &#x2b; Watched
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowInfoAnime;
