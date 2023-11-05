export function toggleMode() {
    const root = document.querySelector(':root');
    console.log(root.style.getPropertyValue('--background'));
    if (root.style.getPropertyValue('--background') === '#121214') {
        root.style.setProperty('--background', '#e9e9e9');
        root.style.setProperty('--white', 'white');
        root.style.setProperty('--border-nav', 'rgb(225, 225, 225)');
        root.style.setProperty('--text', '#272D37');
        root.style.setProperty('--background-nav', 'rgb(241, 241, 241)');
        root.style.setProperty('--highlight', '#574EFA');
        root.style.setProperty('--skeleton', 'rgb(154, 154, 154)');
        root.style.setProperty('--image', 'url(./src/assets/Dark-Mode-Alto.png)');
        return 'white';
    } else {
        root.style.setProperty('--background', '#121214');
        root.style.setProperty('--white', 'black');
        root.style.setProperty('--border-nav', '#4c5158');
        root.style.setProperty('--text', 'white');
        root.style.setProperty('--background-nav', '#202024');
        root.style.setProperty('--highlight', '#4e84fa');
        root.style.setProperty('--skeleton', 'rgb(54, 54, 54)');
        root.style.setProperty('--image', 'url(./src/assets/White-Mode-Alto.png)');
        return 'dark';
    }
}