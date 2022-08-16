
let setingsLanguage = document.querySelectorAll('.settings'); 
import showGreeting from "./greeting.js";
import initWeather from "./weather.js";
import showDate from "./date.js";
import changeQuotes from "./quotes.js";


function getLanguage(){
    localStorage.setItem('lang', 'en')
    for (let i = 0; i<setingsLanguage.length; i++){
        setingsLanguage[i].addEventListener('click', function(event){
            let ev = event.target;
            if(ev.classList.id == localStorage.getItem('lang')) {
                return;
            }
            localStorage.setItem('lang', ev.id);
            location.reload()
        })
    }
    showGreeting();
    initWeather()
    showDate()
    changeQuotes()
}

getLanguage()


export default getLanguage;