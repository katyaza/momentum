const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const weatherInfo = document.querySelector('.weather__info');



async function getWeather() {
  
  if (city.textContent.length !== 0){
  weatherInfo.style.display = 'flex';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=aa5a4f124612c42ba55c337a61534ec7&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;

      
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;

  weatherWind.innerHTML = `Скорость ветра: ${data.wind.speed.toFixed(0)} м/c`;
  weatherHumidity.innerHTML = `Влажность: ${data.main.humidity.toFixed(0)} %`;
  } else {
    weatherInfo.style.display = 'none';
    alert("Введите свой город")
  };
}

function setLocalStorage() {
  localStorage.setItem('city', city.textContent);
}
function getLocalStorage() {
  if(localStorage.getItem('city')) {
    city.textContent = localStorage.getItem('city');
  }
}

function setCity(event) {
  if (event.code === 'Enter') {
    setLocalStorage()
    getWeather();
    city.blur();
}
document.addEventListener('click', (e)=>{
  const withinBondaries = e.composedPath().includes(city);
  if (!withinBondaries){
    setLocalStorage()
    getWeather();
    city.blur();
  }
 })
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);


window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage)

getLocalStorage()

export default function initWeather() {
  setCity();
}


