//Packages
import { useState } from "react"

//css
import './SmallLogo.css'

let logo = "./src/assets/White-Mode-Baixo.png";

export function changeLogoTheme() {
    if(logo === "./src/assets/Dark-Mode-Baixo.png") logo = "./src/assets/White-Mode-Baixo.png";
    else logo = "./src/assets/Dark-Mode-Baixo.png";
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