const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

function getLanguage(){
    let language = '';
    if (navigator.language || navigator.userLanguage == 'ru-RU'){
        return language = 'ru';
    } else return language = 'en';
}

function getTimeOfDay() {
    const greetingDate = new Date();
    const hours = greetingDate.getHours();
    const partOfDay = {
        'en': ['night,', 'morning,', 'afternoon,', 'evening,'],
        'ru': ['ночи,', 'утро,', 'день,', 'вечер,']
    };
    return (partOfDay[getLanguage()][Math.floor(hours / 6)])
}

function showGreeting(){
let greetingText ='';
if (getLanguage() == 'en'){
    greetingText = `Good ${getTimeOfDay()}`;
} else { 
    if(getTimeOfDay() == 'ночи,'){
        greetingText = `Доброй ${getTimeOfDay()}`
    }else if (getTimeOfDay() == 'утро,'){
        greetingText = `Доброе ${getTimeOfDay()}`
    } else
    greetingText = `Добрый ${getTimeOfDay()}`
};
  return greeting.innerHTML = greetingText;
}

export default showGreeting;

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage)

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}

