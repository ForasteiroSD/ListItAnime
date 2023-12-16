import darkLogoImg from "../assets/White-Mode-Alto.png"
import whiteLogoImg from "../assets/Dark-Mode-Alto.png"

export function toggleMode() {
    const root = document.querySelector(':root');
    if (root.style.getPropertyValue('--background') === '#e9e9e9') {
        root.style.setProperty('--background', '#121214');
        root.style.setProperty('--white', 'black');
        root.style.setProperty('--border-nav', '#4c5158');
        root.style.setProperty('--text', 'white');
        root.style.setProperty('--background-nav', '#202024');
        root.style.setProperty('--highlight', '#4e84fa');
        root.style.setProperty('--skeleton', 'rgb(54, 54, 54)');
        root.style.setProperty('--anime-position', 'rgb(185, 185, 185)');
        root.style.setProperty('--image', 'url(' + whiteLogoImg + ')');
        return 'dark';
    } else {
        root.style.setProperty('--background', '#e9e9e9');
        root.style.setProperty('--white', 'white');
        root.style.setProperty('--border-nav', 'rgb(165, 165, 165)');
        root.style.setProperty('--text', '#272D37');
        root.style.setProperty('--background-nav', 'rgb(241, 241, 241)');
        root.style.setProperty('--highlight', '#574EFA');
        root.style.setProperty('--skeleton', 'rgb(154, 154, 154)');
        root.style.setProperty('--anime-position', 'rgb(105, 105, 105)');
        root.style.setProperty('--image', 'url(' + darkLogoImg + ')');
        return 'white';
    }
}