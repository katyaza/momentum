const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

let language = document.querySelector('.language');
language = language.textContent


console.log(language)

const placeHolder = { 
  en: '[Enter your name]',
  ru: '[Введите ваше имя]',
}

function getTimeOfDay() {
  let partOfDay = {
    en: ['night', 'morning', 'afternoon', 'evening'],
    ru: ['ночи,', 'утро,', 'день,', 'вечер,']
  };
let greetingDate = new Date();
let hours = Number(greetingDate.getHours());

return (partOfDay[language][(Math.floor(hours/6))]);
}

function showGreeting(){
let greetingText ='';
if (language == 'en'){
    greetingText = `Good ${getTimeOfDay()}`;
} else { 
    if(getTimeOfDay() == 'ночи,'){
        greetingText = `Доброй ${getTimeOfDay()}`
    }else if (getTimeOfDay() == 'утро,'){
        greetingText = `Доброе ${getTimeOfDay()}`
    } else
    greetingText = `Добрый ${getTimeOfDay()}`
};

  name.setAttribute('placeholder', placeHolder[language]); 
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

