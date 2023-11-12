//Packages
import { useEffect, useState } from 'react'
import {AiFillStar} from 'react-icons/ai'

//Css
import './TopAnime.css'

function TopAnime({title, image, position, synopsis, score}) {
    const [positionColor, setPositionColor] = useState();

    const imageCss = {
        backgroundImage: "linear-gradient(to right, transparent 20%, var(--background)), url('" + image + "')"
    }

    useEffect(() => {
        let positionColor
        if(position === 1) positionColor = {color: 'lightgreen'}
        else if(position === 2) positionColor = {color: 'lightblue'}
        else if(position === 3) positionColor = {color: 'lightyellow'}
        else positionColor = {color: 'var(--text)'}
        setPositionColor(positionColor);
    }, []);

    return (
        <div className="TopAnime">
            <div className='info'>
                <div className='animeImage' style={imageCss}/>
                <p className="position">{position}</p>
                <div>
                    <h2 className='animeTitle'>{title}</h2>
                    <p className='sinopse'>{synopsis}</p>
                </div>
            </div>
            <div className='score'>
                {/* <p>Score</p> */}
                <p>{score}</p>
                <AiFillStar />
            </div>
        </div>
    )
}

export default TopAnime