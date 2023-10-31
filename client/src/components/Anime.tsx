import "./Anime.css"

interface Anime {
    mal_id: number;
    title: string;
    image: string;
}

function Anime({mal_id, title, image}: Anime) {
    function anime(id: number) {
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