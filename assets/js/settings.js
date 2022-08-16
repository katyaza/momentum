
let language = document.querySelector('.language');
language = language.textContent

function setWidjets() {
    let defaultActiveWidjets = ['Player', 'Time', 'Date', 'Weather', 'Greeting'];
    for (let i = 0; i < defaultActiveWidjets.length; i++) {
        if (!localStorage.getItem(defaultActiveWidjets[i])) {
            localStorage.setItem(defaultActiveWidjets[i], 'true');
        }
    }
}

function initSettings() {
    let isOpen = 'false';
    setWidjets()
}

export default initSettings;

