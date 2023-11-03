
export function toggleMode() {
    const root = document.querySelector(':root');
    if (root.style.getPropertyValue('--background') === '#121214') {
        root.style.setProperty('--background', '#F8F9FB');
        root.style.setProperty('--white', 'white');
        root.style.setProperty('--border-nav', '#EFEFF1');
        root.style.setProperty('--text', '#272D37');
        root.style.setProperty('--background-nav', 'white');
        root.style.setProperty('--highlight', '#574EFA');
    } else {
        root.style.setProperty('--background', '#121214');
        root.style.setProperty('--white', 'black');
        root.style.setProperty('--border-nav', '#4c5158');
        root.style.setProperty('--text', 'white');
        root.style.setProperty('--background-nav', '#202024');
        root.style.setProperty('--highlight', '#4e84fa');
    }
}