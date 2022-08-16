const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const weatherInfo = document.querySelector('.weather__info');

let language = localStorage.getItem('lang')

async function getWeather() {
  
  if (city.textContent.length !== 0){
  weatherInfo.style.display = 'flex';
  let nameCity = localStorage.getItem('city');
  let defaultCity='Minsk';
  city.type = "text";
  city.classList.add('city');
  if (nameCity) {
      if (nameCity == 0) {
          city.textContent = defaultCity;
      } else {
          city.value = localStorage.getItem('city');
      }
  } else {
      city.value = defaultCity;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=${language}&appid=aa5a4f124612c42ba55c337a61534ec7&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  
  let translation = {
    wind: {
        ru: "Скорость ветра: ",
        en: "Wind speed: "
    },
    humidity: {
      ru: "Влажность: ",
      en: "Humidity: "
    },
    speed: {
        ru: " м/c",
        en: " m/s"
    },
  }    
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  weatherWind.innerHTML = `${translation.wind[language]} ${Math.round(data.wind.speed)} ${translation.speed[language]}`;
  weatherHumidity.innerHTML = `${translation.humidity[language]} ${data.main.humidity.toFixed(0)} %`;
  weatherDescription.innerHTML = data.weather[0].description;
  }
};


function setLocalStorage() {
  localStorage.setItem('city', city.textContent);
}
function getLocalStorage() {
  if(localStorage.getItem('city')) {
    city.textContent = localStorage.getItem('city');
  }
}

function sendCity(){
function setCity(event) {
  if (event.code === 'Enter') {
    setLocalStorage()
    getWeather();
    city.blur();
  }
}

document.addEventListener('click', (e)=>{
  const withinBondaries = e.composedPath().includes(city);
  if (!withinBondaries){
    setLocalStorage()
    getWeather();
    city.blur();
  }
 })


document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

}


function initWeather(){
  getWeather()
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage)
  sendCity();
  getWeather()

}

getWeather()
export default initWeather;
