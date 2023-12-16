import darkLogoImg from "../assets/White-Mode-Baixo.png"
import whiteLogoImg from "../assets/Dark-Mode-Baixo.png"

//css
import './SmallLogo.css'

let logo = darkLogoImg;

export function changeLogoTheme() {
    if(logo === darkLogoImg) logo = whiteLogoImg;
    else logo = darkLogoImg;
}

export default function SmallLogo() {
    return (
        <>
            <figure className="logoFigure">
                <img src={logo} alt="Logo List It Anime" className="logoImg"/>
            </figure>
        </>
    )
}