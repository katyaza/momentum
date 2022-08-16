
let setingsLanguage = document.querySelectorAll('.settings'); 
import showGreeting from "./greeting.js";
import initWeather from "./weather.js";
import showDate from "./date.js";
import changeQuotes from "./quotes.js";
let language = document.querySelector('.language'); 
localStorage.setItem('lang', language.textContent);

function initLAnguage(){
let nameCity = localStorage.getItem('lang');
console.log(nameCity)
let defaultlanguage='en';
language.type = "text";
if (nameCity) {
    if (nameCity == 0) {
        language.textContent = defaultlanguage;
        localStorage.setItem('lang', language.textContent);
    } else {
        language.textContent = localStorage.getItem('lang');
    }
} else {
    localStorage.setItem('lang', language.textContent);
    language.textContent = defaultlanguage;
}
}

function getLanguage(){
    initLAnguage()
    for (let i = 0; i<setingsLanguage.length; i++){
        setingsLanguage[i].addEventListener('click', function(event){
            let ev = event.target;
            language.textContent = ev.id;
            localStorage.setItem('lang', language.textContent);
            location.reload()
        })
    }
    showGreeting();
    initWeather()
    showDate()
    changeQuotes()
}
console.log(language.textContent)

export default getLanguage;
