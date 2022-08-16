const settingItemTitle = document.querySelectorAll('.setting__text');
const widgetItemText = document.querySelectorAll('.widget__name');
const settingsBtn = document.querySelector('.settings-img');
const settingsBlock = document.querySelector('.settings');
let languages = document.querySelector('.language');


let isOpen = 'false';

const wordsForTitle = {
    en: ['Apllication Language', 'Image Source', 'Widgets'],
    ru: ['Язык приложения', 'Источник фотографий', 'Виджеты'],
}

const wordsForText = {
    en: ['Player', 'Time', 'Date', 'Weather', 'Greeting'],
    ru: ['Плеер', 'Время', 'Дата', 'Погода', 'Приветствие'],
}

function openSettings() {
    if (isOpen == 'false'){
        settingsBlock.classList.add('settings-open')
        settingsBlock.classList.remove('settings-close')
        isOpen = 'true';
    } else {
        settingsBlock.classList.remove('settings-open')
        settingsBlock.classList.add('settings-close')
        isOpen = 'false';
    }
}



export default function initPanel() {
    settingsBtn.addEventListener('click', openSettings);


    for (let i = 0; i<settingItemTitle.length; i++){
        let language = languages.textContent
        settingItemTitle[i].innerHTML = wordsForTitle[language][i];
    }
    for (let i = 0; i<widgetItemText.length; i++){
        let language = languages.textContent
        widgetItemText[i].innerHTML = wordsForText[language][i];
    }
    return
}