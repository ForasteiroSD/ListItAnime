import "./Anime.css"

function Anime({mal_id, title, image}) {
    function anime(id) {
        console.log(id);
    }

    return (
        <div onClick={() => anime(mal_id)} className="anime">
            <img className="images" src={image} alt={title + " image"} />
            <p className="text">{title}</p>
        </div>
    )
}

export default Anime;