//Packages
import { useEffect, useState } from 'react'
import {AiFillStar} from 'react-icons/ai'

//Css
import './TopAnime.css'

function TopAnime({title, image, position, synopsis, score}) {

    const imageCss = {
        backgroundImage: "linear-gradient(to right, transparent 20%, var(--background)), url('" + image + "')"
    }

    return (
        <div className="TopAnime">
            <div className='animeImage' style={imageCss}/>
            <p className="position">{position}</p>
            <div className='info'>
                <h2 className='animeTitle'>{title}</h2>
                <p className='sinopse'>{synopsis}</p>
            </div>
            <div className='score'>
                <p >{score}</p>
                <AiFillStar />
            </div>
        </div>
    )
}

export default TopAnime