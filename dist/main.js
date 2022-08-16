/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/date.js":
/*!***************************!*\
  !*** ./assets/js/date.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const date = document.querySelector('.date');

let language = document.querySelector('.language');
language = language.textContent

function showDate() {
  const newDate = new Date;
  const options = { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' };
  const currentDate = newDate.toLocaleDateString(language, options);
  date.innerHTML = currentDate;
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showDate);


/***/ }),

/***/ "./assets/js/greeting.js":
/*!*******************************!*\
  !*** ./assets/js/greeting.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showGreeting);

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



/***/ }),

/***/ "./assets/js/player.js":
/*!*****************************!*\
  !*** ./assets/js/player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _playlist_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist.js */ "./assets/js/playlist.js");



const audio = new Audio();
let audioVolume = document.querySelector('.volume-line');
let musicTitle = document.querySelector('.music__title');
let audioMute = document.querySelector('.audio-mute');
let musicPlayList = document.querySelector('.play-list');
let musicButtonPlay = document.querySelector('.play');
let musicButtonNext = document.querySelector('.play-next');
let musicButtonPrev = document.querySelector('.play-prev');
let timeline = document.querySelector('.timeline');
let currentBar = document.querySelector('.current')
let progressBar = document.querySelector(".progress")
let audioLength = document.querySelector(".length")
let currentVolume;
let currentTimeGlobal = 0;
let isPlay = false;
let musicNumber = 0;
let listItem;
let miniBtn;


function initPlayList() {
    _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(function (el) {
        const li = document.createElement('li');
        const miniBtn = document.createElement('span');
        miniBtn.classList.add('play-mini');
        miniBtn.classList.add('mini-btn');

        li.classList.add('play-item');
        li.innerHTML = el.title;
        musicPlayList.append(li);
        li.append(miniBtn);
        }
    )
    listItem =  document.querySelectorAll('.play-item');
    miniBtn = document.querySelectorAll('.mini-btn');
}


function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }


function setDurationTime(duration) {
    audioLength.innerHTML = getTimeCodeFromNum(duration);
}

function setIntervalAudio(){
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    currentTimeGlobal = audio.currentTime;
    currentBar.innerHTML = getTimeCodeFromNum(currentTimeGlobal);
    setTimeout(setIntervalAudio, 500);
};

function setTime() {
  currentTimeGlobal = audio.currentTime;
  currentBar.innerHTML = getTimeCodeFromNum(currentTimeGlobal);
}

function playMusic(){
    audio.src = _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"][musicNumber].src;
    audio.currentTime = currentTimeGlobal;
    setDurationTime(_playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"][musicNumber].duration);
    if(isPlay == false) {
        musicTitle.innerHTML = _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"][musicNumber].title;
        audio.volume = audioVolume.value/100;
        isPlay = true;
        audio.play();
        musicButtonPlay.classList.add('pause');
        listItem[musicNumber].classList.add('item-active');
        miniBtn[musicNumber].classList.add('pause-mini');
    } else {
        audio.pause();
        musicButtonPlay.classList.remove('pause');
        isPlay = false;
        listItem[musicNumber].classList.remove('item-active');
        miniBtn[musicNumber].classList.remove('pause-mini');
        setTime();
    };
}


function changeAudio () {
    for (let i = 0; i<listItem.length; i++){        
        listItem[i].addEventListener('click', function() {
            if (i == musicNumber && isPlay) {
                listItem[musicNumber].classList.add('item-active');
                miniBtn[musicNumber-1].classList.remove('pause-mini');
                isPlay = true;
                currentTimeGlobal = 0;
                playMusic();
            } else{
                listItem[musicNumber].classList.remove('item-active');
                miniBtn[musicNumber].classList.remove('pause-mini');
                listItem.forEach((item) => item.classList.remove('pause'))
                musicNumber = i;
                isPlay = false;
                currentTimeGlobal = 0;
                playMusic();
            }
        })
    }
}


function changeAudioOnBtn() {
    for (let i = 0; i<miniBtn.length; i++){        
        miniBtn[i].addEventListener('click', function() {
            currentTimeGlobal = audio.currentTime;
            if (i == musicNumber && isPlay) {
                isPlay = false;
                setTime();
                console.log(currentTimeGlobal)
                miniBtn[i].classList.remove('pause-mini');
                playMusic();
            } else{
                miniBtn.forEach((item) => item.classList.remove('pause-mini'))
                miniBtn[i].classList.add('pause-mini');
                musicNumber = i;
                isPlay = true;
                playMusic();
            }
        })
    }
}

//click to prev song
function playPrev(){
    currentTimeGlobal = 0;
    isPlay = false;
    listItem[musicNumber].classList.remove('item-active');
    if (musicNumber==0) {
        miniBtn[musicNumber].classList.remove('pause-mini');
        musicNumber = _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"].length-1;
    } else {
        miniBtn[musicNumber].classList.remove('pause-mini');
        musicNumber--;    
    }
    if (!musicButtonPlay.classList.contains('pause')) {
        musicButtonPlay.classList.add('pause');
    }
    playMusic();
}

//click to next song
function playNext(){
    currentTimeGlobal = 0;
    isPlay = false;
    listItem[musicNumber].classList.remove('item-active');
    if (musicNumber==_playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"].length-1) {
        miniBtn[musicNumber].classList.remove('pause-mini');
        musicNumber = 0;
    } else {
        miniBtn[musicNumber].classList.remove('pause-mini');
        musicNumber++;    
    }
    if (!musicButtonPlay.classList.contains('pause')) {
        musicButtonPlay.classList.add('pause');
    }
    playMusic();
}

//click on timeline
function movetimeline(e){
    if(!isFinite()){
    const timelineWidth = window.getComputedStyle(timeline).width;
    console.log(timelineWidth)
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    console.log(e.offsetX)
    audio.currentTime = timeToSeek;
  } else false;
}



//value

function setValue() {
    audio.volume = audioVolume.value/100;
}

function muteAudio() {
    if (audioVolume.value > 0) {
        currentVolume = audioVolume.value;
        audioVolume.value = 0;
        setValue();
    } else {
        audioVolume.value = currentVolume;
        setValue();
    }
}


function startPlayList() {  
    initPlayList(); 
    musicButtonPlay.addEventListener('click', playMusic);
    // music.addEventListener('ended', playNext);
    musicButtonNext.addEventListener('click', playNext);
    musicButtonPrev.addEventListener('click', playPrev);
    timeline.addEventListener('click', movetimeline)
    audioVolume.addEventListener('input', setValue);
    audioMute.addEventListener('click', muteAudio);
    changeAudio();
    changeAudioOnBtn()
    setIntervalAudio()
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startPlayList);




/***/ }),

/***/ "./assets/js/playlist.js":
/*!*******************************!*\
  !*** ./assets/js/playlist.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const playList = [
    {
        title: 'Aqua Caelestis',
        src: '../assets/sounds/Aqua Caelestis.mp3',
        duration: 39,
    },
    
    {
        title: 'Ennio Morricone',
        src: '../assets/sounds/Ennio Morricone.mp3',
        duration: 97,
    },
    
    {      
        title: 'River Flows In You',
        src: '../assets/sounds/River Flows In You.mp3',
        duration: 97
    },

    {      
        title: 'Summer Wind',
        src: '../assets/sounds/Summer Wind.mp3',
        duration: 39
    },

]

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playList);

/***/ }),

/***/ "./assets/js/quotes.js":
/*!*****************************!*\
  !*** ./assets/js/quotes.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const textOfQuote = document.querySelector('.quote');
const authorOfQuote = document.querySelector('.author');
const buttonChangeQuote = document.querySelector('.change-quote');

let language = document.querySelector('.language');
language = language.textContent

function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}


function getQuotes() {
    const quotes = '/momentum/data.json';
    fetch(quotes)
      .then(res => res.json())
      .then(data => { 
        textOfQuote.innerHTML = data[language][getRandomNum(data[language].length)].text;
        authorOfQuote.innerHTML = data[language][getRandomNum(data[language].length)].author;
    });
}

function changeQuotes() {
  getQuotes()
  buttonChangeQuote.addEventListener('click', getQuotes);
}
changeQuotes()
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (changeQuotes);

/***/ }),

/***/ "./assets/js/settinglist.js":
/*!**********************************!*\
  !*** ./assets/js/settinglist.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initPanel)
/* harmony export */ });
const settingItemTitle = document.querySelectorAll('.setting__text');
const widgetItemText = document.querySelectorAll('.widget__name');
const settingsBtn = document.querySelector('.settings-img');
const settingsBlock = document.querySelector('.settings');

let language = document.querySelector('.language');
language = language.textContent

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



function initPanel() {
    settingsBtn.addEventListener('click', openSettings);


    for (let i = 0; i<settingItemTitle.length; i++){
        settingItemTitle[i].innerHTML = wordsForTitle[language][i];
    }
    for (let i = 0; i<widgetItemText.length; i++){
        widgetItemText[i].innerHTML = wordsForText[language][i];
    }
    return
}

/***/ }),

/***/ "./assets/js/settings.js":
/*!*******************************!*\
  !*** ./assets/js/settings.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initSettings);



/***/ }),

/***/ "./assets/js/slider.js":
/*!*****************************!*\
  !*** ./assets/js/slider.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

let randomNumGlobal = getRandomNum(20);
const prevSlideButtom = document.querySelector('.slide-prev');
const nextSlideButtom = document.querySelector('.slide-next');
const body = document.querySelector('body');
const img = new Image();


function getRandomNum(max) {
  return Math.floor(Math.random() * max + 1);
}

function showPartOfDay(){
  const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const currentDate = new Date;
  const hours = currentDate.getHours();
  return timeOfDay[Math.floor(hours / 6)];
}

function BackgroungSlaider(){

  function getSlaiderNumber(randomNumGlobal){
   let randomNum = randomNumGlobal;
   return randomNum;
  }
  
    
  prevSlideButtom.addEventListener('click', getSlidePrev)
  nextSlideButtom.addEventListener('click', getSlideNext)

  function getSlidePrev(){
    (randomNumGlobal == 1) ? randomNumGlobal = 20 : randomNumGlobal--;
    getSlaiderNumber(randomNumGlobal);
    setBG()
  }
  function getSlideNext(){
    (randomNumGlobal == 20) ? randomNumGlobal = 1 : randomNumGlobal++;
    getSlaiderNumber(randomNumGlobal);
    setBG()
  }


  function setBG(){
    let random = (String(getSlaiderNumber(randomNumGlobal))).padStart(2, "0");
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${showPartOfDay()}/${random}.jpg`
    img.onload = () => {      
      body.style.backgroundImage = `url(${img.src})` 
    }; 
  }

//   async function setBgUnsplah() {
//     const img = new Image();
//     const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${showPartOfDay()}&client_id=lESpxNVnT20zj4Odjhq4i2a5hdm8-JdfPGMmgOXLGDw`;
//     const res = await fetch(url);
//     const data = await res.json();
//     img.src = data.urls.regular;
//     img.onload = () => {
//         body.style.backgroundImage = `url(${img.src})`;
//     }
// }
// async function setBgUnsplah() {
//   const img = new Image();
//   const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b698b1387ff6c0bd891e30f016959b55&tags=${showPartOfDay()}&extras=url_l&format=json&nojsoncallback=1`;
//   const res = await fetch(url);
//   const data = await res.json();
//   img.src = data.photos.photo[getRandomNum(100)].url_l;
//   img.onload = () => {
//       body.style.backgroundImage = `url(${img.src})`;
//   }
// }


//   let linkSetting = localStorage.getItem('link');
//   switch(linkSetting) {
//       case 'github': 
//           setBgFromGitHub(random)
//           break;
//       case 'unsplash': 
//           setBgFromUnsplah();
//           break;
//       case 'flickr':
//           setBgFromFLickR()
//           break;
//   }
// }
setBG()
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackgroungSlaider);


/***/ }),

/***/ "./assets/js/time.js":
/*!***************************!*\
  !*** ./assets/js/time.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showTime)
/* harmony export */ });
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ "./assets/js/date.js");

const time = document.querySelector('.time');


(0,_date_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

function showTime() {
  const dates = new Date;
  const currentTime = dates.toLocaleTimeString();
  time.innerHTML = currentTime;
  setTimeout(showTime, 1000);
  setTimeout(_date_js__WEBPACK_IMPORTED_MODULE_0__["default"], 1000);
}

/***/ }),

/***/ "./assets/js/translate.js":
/*!********************************!*\
  !*** ./assets/js/translate.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _greeting_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./greeting.js */ "./assets/js/greeting.js");
/* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weather.js */ "./assets/js/weather.js");
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./date.js */ "./assets/js/date.js");
/* harmony import */ var _quotes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./quotes.js */ "./assets/js/quotes.js");

let setingsLanguage = document.querySelectorAll('.settings'); 




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
    (0,_greeting_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_weather_js__WEBPACK_IMPORTED_MODULE_1__["default"])()
    ;(0,_date_js__WEBPACK_IMPORTED_MODULE_2__["default"])()
    ;(0,_quotes_js__WEBPACK_IMPORTED_MODULE_3__["default"])()
}
console.log(language.textContent)

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLanguage);


/***/ }),

/***/ "./assets/js/weather.js":
/*!******************************!*\
  !*** ./assets/js/weather.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const weatherInfo = document.querySelector('.weather__info');

let language = document.querySelector('.language');
language = language.textContent

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initWeather);


/***/ }),

/***/ "./css/owfont-regular.css":
/*!********************************!*\
  !*** ./css/owfont-regular.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./assets/js/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_owfont_regular_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/owfont-regular.css */ "./css/owfont-regular.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css/style.css */ "./css/style.css");
/* harmony import */ var _settinglist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settinglist.js */ "./assets/js/settinglist.js");
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.js */ "./assets/js/settings.js");
/* harmony import */ var _translate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./translate.js */ "./assets/js/translate.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./time.js */ "./assets/js/time.js");
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./date.js */ "./assets/js/date.js");
/* harmony import */ var _greeting_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./greeting.js */ "./assets/js/greeting.js");
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./slider.js */ "./assets/js/slider.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./player.js */ "./assets/js/player.js");
/* harmony import */ var _quotes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./quotes.js */ "./assets/js/quotes.js");
/* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./weather.js */ "./assets/js/weather.js");





(0,_settinglist_js__WEBPACK_IMPORTED_MODULE_2__["default"])()

;
(0,_settings_js__WEBPACK_IMPORTED_MODULE_3__["default"])()

;
(0,_translate_js__WEBPACK_IMPORTED_MODULE_4__["default"])()

;
(0,_time_js__WEBPACK_IMPORTED_MODULE_5__["default"])();


(0,_date_js__WEBPACK_IMPORTED_MODULE_6__["default"])();


(0,_greeting_js__WEBPACK_IMPORTED_MODULE_7__["default"])();


(0,_slider_js__WEBPACK_IMPORTED_MODULE_8__["default"])();


(0,_player_js__WEBPACK_IMPORTED_MODULE_9__["default"])();


(0,_quotes_js__WEBPACK_IMPORTED_MODULE_10__["default"])()

;











})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNUO0FBQzVCO0FBQ0E7QUFDd0M7QUFDeEMsMkRBQVM7QUFDVDtBQUNBLENBQXdDO0FBQ3hDLHdEQUFZO0FBQ1o7QUFDQSxDQUF5QztBQUN6Qyx5REFBVztBQUNYO0FBQ0EsQ0FBaUM7QUFDakMsb0RBQVE7QUFDUjtBQUNpQztBQUNqQyxvREFBUTtBQUNSO0FBQ3lDO0FBQ3pDLHdEQUFZO0FBQ1o7QUFDZ0M7QUFDaEMsc0RBQUs7QUFDTDtBQUN3QztBQUN4QyxzREFBYTtBQUNiO0FBQ3VDO0FBQ3ZDLHVEQUFZO0FBQ1o7QUFDQSxDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvZ3JlZXRpbmcuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvcGxheWVyLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3BsYXlsaXN0LmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3F1b3Rlcy5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9zZXR0aW5nbGlzdC5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvdGltZS5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy90cmFuc2xhdGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvd2VhdGhlci5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Nzcy9vd2ZvbnQtcmVndWxhci5jc3M/MzBhNCIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Nzcy9zdHlsZS5jc3M/ZWE3OCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0ZScpO1xyXG5cclxubGV0IGxhbmd1YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxhbmd1YWdlJyk7XHJcbmxhbmd1YWdlID0gbGFuZ3VhZ2UudGV4dENvbnRlbnRcclxuXHJcbmZ1bmN0aW9uIHNob3dEYXRlKCkge1xyXG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZTtcclxuICBjb25zdCBvcHRpb25zID0geyB3ZWVrZGF5OiAnbG9uZycsIGRheTogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCB0aW1lWm9uZTogJ1VUQycgfTtcclxuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ld0RhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKGxhbmd1YWdlLCBvcHRpb25zKTtcclxuICBkYXRlLmlubmVySFRNTCA9IGN1cnJlbnREYXRlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hvd0RhdGU7XHJcbiIsImNvbnN0IGdyZWV0aW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWV0aW5nJyk7XHJcbmNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZScpO1xyXG5cclxubGV0IGxhbmd1YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxhbmd1YWdlJyk7XHJcbmxhbmd1YWdlID0gbGFuZ3VhZ2UudGV4dENvbnRlbnRcclxuXHJcblxyXG5jb25zb2xlLmxvZyhsYW5ndWFnZSlcclxuXHJcbmNvbnN0IHBsYWNlSG9sZGVyID0geyBcclxuICBlbjogJ1tFbnRlciB5b3VyIG5hbWVdJyxcclxuICBydTogJ1vQktCy0LXQtNC40YLQtSDQstCw0YjQtSDQuNC80Y9dJyxcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGltZU9mRGF5KCkge1xyXG4gIGxldCBwYXJ0T2ZEYXkgPSB7XHJcbiAgICBlbjogWyduaWdodCcsICdtb3JuaW5nJywgJ2FmdGVybm9vbicsICdldmVuaW5nJ10sXHJcbiAgICBydTogWyfQvdC+0YfQuCwnLCAn0YPRgtGA0L4sJywgJ9C00LXQvdGMLCcsICfQstC10YfQtdGALCddXHJcbiAgfTtcclxubGV0IGdyZWV0aW5nRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbmxldCBob3VycyA9IE51bWJlcihncmVldGluZ0RhdGUuZ2V0SG91cnMoKSk7XHJcblxyXG5yZXR1cm4gKHBhcnRPZkRheVtsYW5ndWFnZV1bKE1hdGguZmxvb3IoaG91cnMvNikpXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dHcmVldGluZygpe1xyXG5sZXQgZ3JlZXRpbmdUZXh0ID0nJztcclxuaWYgKGxhbmd1YWdlID09ICdlbicpe1xyXG4gICAgZ3JlZXRpbmdUZXh0ID0gYEdvb2QgJHtnZXRUaW1lT2ZEYXkoKX1gO1xyXG59IGVsc2UgeyBcclxuICAgIGlmKGdldFRpbWVPZkRheSgpID09ICfQvdC+0YfQuCwnKXtcclxuICAgICAgICBncmVldGluZ1RleHQgPSBg0JTQvtCx0YDQvtC5ICR7Z2V0VGltZU9mRGF5KCl9YFxyXG4gICAgfWVsc2UgaWYgKGdldFRpbWVPZkRheSgpID09ICfRg9GC0YDQviwnKXtcclxuICAgICAgICBncmVldGluZ1RleHQgPSBg0JTQvtCx0YDQvtC1ICR7Z2V0VGltZU9mRGF5KCl9YFxyXG4gICAgfSBlbHNlXHJcbiAgICBncmVldGluZ1RleHQgPSBg0JTQvtCx0YDRi9C5ICR7Z2V0VGltZU9mRGF5KCl9YFxyXG59O1xyXG5cclxuICBuYW1lLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwbGFjZUhvbGRlcltsYW5ndWFnZV0pOyBcclxuICByZXR1cm4gZ3JlZXRpbmcuaW5uZXJIVE1MID0gZ3JlZXRpbmdUZXh0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaG93R3JlZXRpbmc7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgc2V0TG9jYWxTdG9yYWdlKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBnZXRMb2NhbFN0b3JhZ2UpXHJcblxyXG5mdW5jdGlvbiBzZXRMb2NhbFN0b3JhZ2UoKSB7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hbWUnLCBuYW1lLnZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKCkge1xyXG4gIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lJykpIHtcclxuICAgIG5hbWUudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpO1xyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHBsYXlMaXN0IGZyb20gXCIuL3BsYXlsaXN0LmpzXCI7XHJcblxyXG5cclxuY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oKTtcclxubGV0IGF1ZGlvVm9sdW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZvbHVtZS1saW5lJyk7XHJcbmxldCBtdXNpY1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm11c2ljX190aXRsZScpO1xyXG5sZXQgYXVkaW9NdXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1ZGlvLW11dGUnKTtcclxubGV0IG11c2ljUGxheUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1saXN0Jyk7XHJcbmxldCBtdXNpY0J1dHRvblBsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheScpO1xyXG5sZXQgbXVzaWNCdXR0b25OZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktbmV4dCcpO1xyXG5sZXQgbXVzaWNCdXR0b25QcmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktcHJldicpO1xyXG5sZXQgdGltZWxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUnKTtcclxubGV0IGN1cnJlbnRCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpXHJcbmxldCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NcIilcclxubGV0IGF1ZGlvTGVuZ3RoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sZW5ndGhcIilcclxubGV0IGN1cnJlbnRWb2x1bWU7XHJcbmxldCBjdXJyZW50VGltZUdsb2JhbCA9IDA7XHJcbmxldCBpc1BsYXkgPSBmYWxzZTtcclxubGV0IG11c2ljTnVtYmVyID0gMDtcclxubGV0IGxpc3RJdGVtO1xyXG5sZXQgbWluaUJ0bjtcclxuXHJcblxyXG5mdW5jdGlvbiBpbml0UGxheUxpc3QoKSB7XHJcbiAgICBwbGF5TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBjb25zdCBtaW5pQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIG1pbmlCdG4uY2xhc3NMaXN0LmFkZCgncGxheS1taW5pJyk7XHJcbiAgICAgICAgbWluaUJ0bi5jbGFzc0xpc3QuYWRkKCdtaW5pLWJ0bicpO1xyXG5cclxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdwbGF5LWl0ZW0nKTtcclxuICAgICAgICBsaS5pbm5lckhUTUwgPSBlbC50aXRsZTtcclxuICAgICAgICBtdXNpY1BsYXlMaXN0LmFwcGVuZChsaSk7XHJcbiAgICAgICAgbGkuYXBwZW5kKG1pbmlCdG4pO1xyXG4gICAgICAgIH1cclxuICAgIClcclxuICAgIGxpc3RJdGVtID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5LWl0ZW0nKTtcclxuICAgIG1pbmlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWluaS1idG4nKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFRpbWVDb2RlRnJvbU51bShudW0pIHtcclxuICAgIGxldCBzZWNvbmRzID0gcGFyc2VJbnQobnVtKTtcclxuICAgIGxldCBtaW51dGVzID0gcGFyc2VJbnQoc2Vjb25kcyAvIDYwKTtcclxuICAgIHNlY29uZHMgLT0gbWludXRlcyAqIDYwO1xyXG4gICAgY29uc3QgaG91cnMgPSBwYXJzZUludChtaW51dGVzIC8gNjApO1xyXG4gICAgbWludXRlcyAtPSBob3VycyAqIDYwO1xyXG4gIFxyXG4gICAgaWYgKGhvdXJzID09PSAwKSByZXR1cm4gYCR7bWludXRlc306JHtTdHJpbmcoc2Vjb25kcyAlIDYwKS5wYWRTdGFydCgyLCAwKX1gO1xyXG4gICAgcmV0dXJuIGAke1N0cmluZyhob3VycykucGFkU3RhcnQoMiwgMCl9OiR7bWludXRlc306JHtTdHJpbmcoc2Vjb25kcyAlIDYwKS5wYWRTdGFydCgyLCAwKX1gO1xyXG4gIH1cclxuXHJcblxyXG5mdW5jdGlvbiBzZXREdXJhdGlvblRpbWUoZHVyYXRpb24pIHtcclxuICAgIGF1ZGlvTGVuZ3RoLmlubmVySFRNTCA9IGdldFRpbWVDb2RlRnJvbU51bShkdXJhdGlvbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEludGVydmFsQXVkaW8oKXtcclxuICAgIHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gYXVkaW8uY3VycmVudFRpbWUgLyBhdWRpby5kdXJhdGlvbiAqIDEwMCArIFwiJVwiO1xyXG4gICAgY3VycmVudFRpbWVHbG9iYWwgPSBhdWRpby5jdXJyZW50VGltZTtcclxuICAgIGN1cnJlbnRCYXIuaW5uZXJIVE1MID0gZ2V0VGltZUNvZGVGcm9tTnVtKGN1cnJlbnRUaW1lR2xvYmFsKTtcclxuICAgIHNldFRpbWVvdXQoc2V0SW50ZXJ2YWxBdWRpbywgNTAwKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldFRpbWUoKSB7XHJcbiAgY3VycmVudFRpbWVHbG9iYWwgPSBhdWRpby5jdXJyZW50VGltZTtcclxuICBjdXJyZW50QmFyLmlubmVySFRNTCA9IGdldFRpbWVDb2RlRnJvbU51bShjdXJyZW50VGltZUdsb2JhbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXlNdXNpYygpe1xyXG4gICAgYXVkaW8uc3JjID0gcGxheUxpc3RbbXVzaWNOdW1iZXJdLnNyYztcclxuICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWVHbG9iYWw7XHJcbiAgICBzZXREdXJhdGlvblRpbWUocGxheUxpc3RbbXVzaWNOdW1iZXJdLmR1cmF0aW9uKTtcclxuICAgIGlmKGlzUGxheSA9PSBmYWxzZSkge1xyXG4gICAgICAgIG11c2ljVGl0bGUuaW5uZXJIVE1MID0gcGxheUxpc3RbbXVzaWNOdW1iZXJdLnRpdGxlO1xyXG4gICAgICAgIGF1ZGlvLnZvbHVtZSA9IGF1ZGlvVm9sdW1lLnZhbHVlLzEwMDtcclxuICAgICAgICBpc1BsYXkgPSB0cnVlO1xyXG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICBtdXNpY0J1dHRvblBsYXkuY2xhc3NMaXN0LmFkZCgncGF1c2UnKTtcclxuICAgICAgICBsaXN0SXRlbVttdXNpY051bWJlcl0uY2xhc3NMaXN0LmFkZCgnaXRlbS1hY3RpdmUnKTtcclxuICAgICAgICBtaW5pQnRuW211c2ljTnVtYmVyXS5jbGFzc0xpc3QuYWRkKCdwYXVzZS1taW5pJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgbXVzaWNCdXR0b25QbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlJyk7XHJcbiAgICAgICAgaXNQbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgbGlzdEl0ZW1bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ2l0ZW0tYWN0aXZlJyk7XHJcbiAgICAgICAgbWluaUJ0blttdXNpY051bWJlcl0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgIHNldFRpbWUoKTtcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VBdWRpbyAoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaTxsaXN0SXRlbS5sZW5ndGg7IGkrKyl7ICAgICAgICBcclxuICAgICAgICBsaXN0SXRlbVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBtdXNpY051bWJlciAmJiBpc1BsYXkpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtW211c2ljTnVtYmVyXS5jbGFzc0xpc3QuYWRkKCdpdGVtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWluaUJ0blttdXNpY051bWJlci0xXS5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZS1taW5pJyk7XHJcbiAgICAgICAgICAgICAgICBpc1BsYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWVHbG9iYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgcGxheU11c2ljKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtW211c2ljTnVtYmVyXS5jbGFzc0xpc3QucmVtb3ZlKCdpdGVtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWluaUJ0blttdXNpY051bWJlcl0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZScpKVxyXG4gICAgICAgICAgICAgICAgbXVzaWNOdW1iZXIgPSBpO1xyXG4gICAgICAgICAgICAgICAgaXNQbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZUdsb2JhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICBwbGF5TXVzaWMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VBdWRpb09uQnRuKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8bWluaUJ0bi5sZW5ndGg7IGkrKyl7ICAgICAgICBcclxuICAgICAgICBtaW5pQnRuW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lR2xvYmFsID0gYXVkaW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIGlmIChpID09IG11c2ljTnVtYmVyICYmIGlzUGxheSkge1xyXG4gICAgICAgICAgICAgICAgaXNQbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VGltZUdsb2JhbClcclxuICAgICAgICAgICAgICAgIG1pbmlCdG5baV0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgICAgICAgICAgcGxheU11c2ljKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIG1pbmlCdG4uZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZS1taW5pJykpXHJcbiAgICAgICAgICAgICAgICBtaW5pQnRuW2ldLmNsYXNzTGlzdC5hZGQoJ3BhdXNlLW1pbmknKTtcclxuICAgICAgICAgICAgICAgIG11c2ljTnVtYmVyID0gaTtcclxuICAgICAgICAgICAgICAgIGlzUGxheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwbGF5TXVzaWMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vY2xpY2sgdG8gcHJldiBzb25nXHJcbmZ1bmN0aW9uIHBsYXlQcmV2KCl7XHJcbiAgICBjdXJyZW50VGltZUdsb2JhbCA9IDA7XHJcbiAgICBpc1BsYXkgPSBmYWxzZTtcclxuICAgIGxpc3RJdGVtW211c2ljTnVtYmVyXS5jbGFzc0xpc3QucmVtb3ZlKCdpdGVtLWFjdGl2ZScpO1xyXG4gICAgaWYgKG11c2ljTnVtYmVyPT0wKSB7XHJcbiAgICAgICAgbWluaUJ0blttdXNpY051bWJlcl0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgIG11c2ljTnVtYmVyID0gcGxheUxpc3QubGVuZ3RoLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pbmlCdG5bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlLW1pbmknKTtcclxuICAgICAgICBtdXNpY051bWJlci0tOyAgICBcclxuICAgIH1cclxuICAgIGlmICghbXVzaWNCdXR0b25QbGF5LmNsYXNzTGlzdC5jb250YWlucygncGF1c2UnKSkge1xyXG4gICAgICAgIG11c2ljQnV0dG9uUGxheS5jbGFzc0xpc3QuYWRkKCdwYXVzZScpO1xyXG4gICAgfVxyXG4gICAgcGxheU11c2ljKCk7XHJcbn1cclxuXHJcbi8vY2xpY2sgdG8gbmV4dCBzb25nXHJcbmZ1bmN0aW9uIHBsYXlOZXh0KCl7XHJcbiAgICBjdXJyZW50VGltZUdsb2JhbCA9IDA7XHJcbiAgICBpc1BsYXkgPSBmYWxzZTtcclxuICAgIGxpc3RJdGVtW211c2ljTnVtYmVyXS5jbGFzc0xpc3QucmVtb3ZlKCdpdGVtLWFjdGl2ZScpO1xyXG4gICAgaWYgKG11c2ljTnVtYmVyPT1wbGF5TGlzdC5sZW5ndGgtMSkge1xyXG4gICAgICAgIG1pbmlCdG5bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlLW1pbmknKTtcclxuICAgICAgICBtdXNpY051bWJlciA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pbmlCdG5bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlLW1pbmknKTtcclxuICAgICAgICBtdXNpY051bWJlcisrOyAgICBcclxuICAgIH1cclxuICAgIGlmICghbXVzaWNCdXR0b25QbGF5LmNsYXNzTGlzdC5jb250YWlucygncGF1c2UnKSkge1xyXG4gICAgICAgIG11c2ljQnV0dG9uUGxheS5jbGFzc0xpc3QuYWRkKCdwYXVzZScpO1xyXG4gICAgfVxyXG4gICAgcGxheU11c2ljKCk7XHJcbn1cclxuXHJcbi8vY2xpY2sgb24gdGltZWxpbmVcclxuZnVuY3Rpb24gbW92ZXRpbWVsaW5lKGUpe1xyXG4gICAgaWYoIWlzRmluaXRlKCkpe1xyXG4gICAgY29uc3QgdGltZWxpbmVXaWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRpbWVsaW5lKS53aWR0aDtcclxuICAgIGNvbnNvbGUubG9nKHRpbWVsaW5lV2lkdGgpXHJcbiAgICBjb25zdCB0aW1lVG9TZWVrID0gZS5vZmZzZXRYIC8gcGFyc2VJbnQodGltZWxpbmVXaWR0aCkgKiBhdWRpby5kdXJhdGlvbjtcclxuICAgIGNvbnNvbGUubG9nKGUub2Zmc2V0WClcclxuICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gdGltZVRvU2VlaztcclxuICB9IGVsc2UgZmFsc2U7XHJcbn1cclxuXHJcblxyXG5cclxuLy92YWx1ZVxyXG5cclxuZnVuY3Rpb24gc2V0VmFsdWUoKSB7XHJcbiAgICBhdWRpby52b2x1bWUgPSBhdWRpb1ZvbHVtZS52YWx1ZS8xMDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG11dGVBdWRpbygpIHtcclxuICAgIGlmIChhdWRpb1ZvbHVtZS52YWx1ZSA+IDApIHtcclxuICAgICAgICBjdXJyZW50Vm9sdW1lID0gYXVkaW9Wb2x1bWUudmFsdWU7XHJcbiAgICAgICAgYXVkaW9Wb2x1bWUudmFsdWUgPSAwO1xyXG4gICAgICAgIHNldFZhbHVlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF1ZGlvVm9sdW1lLnZhbHVlID0gY3VycmVudFZvbHVtZTtcclxuICAgICAgICBzZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc3RhcnRQbGF5TGlzdCgpIHsgIFxyXG4gICAgaW5pdFBsYXlMaXN0KCk7IFxyXG4gICAgbXVzaWNCdXR0b25QbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheU11c2ljKTtcclxuICAgIC8vIG11c2ljLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgcGxheU5leHQpO1xyXG4gICAgbXVzaWNCdXR0b25OZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheU5leHQpO1xyXG4gICAgbXVzaWNCdXR0b25QcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheVByZXYpO1xyXG4gICAgdGltZWxpbmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtb3ZldGltZWxpbmUpXHJcbiAgICBhdWRpb1ZvbHVtZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHNldFZhbHVlKTtcclxuICAgIGF1ZGlvTXV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG11dGVBdWRpbyk7XHJcbiAgICBjaGFuZ2VBdWRpbygpO1xyXG4gICAgY2hhbmdlQXVkaW9PbkJ0bigpXHJcbiAgICBzZXRJbnRlcnZhbEF1ZGlvKClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RhcnRQbGF5TGlzdFxyXG5cclxuXHJcbiIsImNvbnN0IHBsYXlMaXN0ID0gW1xyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiAnQXF1YSBDYWVsZXN0aXMnLFxyXG4gICAgICAgIHNyYzogJy4uL2Fzc2V0cy9zb3VuZHMvQXF1YSBDYWVsZXN0aXMubXAzJyxcclxuICAgICAgICBkdXJhdGlvbjogMzksXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdFbm5pbyBNb3JyaWNvbmUnLFxyXG4gICAgICAgIHNyYzogJy4uL2Fzc2V0cy9zb3VuZHMvRW5uaW8gTW9ycmljb25lLm1wMycsXHJcbiAgICAgICAgZHVyYXRpb246IDk3LFxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgeyAgICAgIFxyXG4gICAgICAgIHRpdGxlOiAnUml2ZXIgRmxvd3MgSW4gWW91JyxcclxuICAgICAgICBzcmM6ICcuLi9hc3NldHMvc291bmRzL1JpdmVyIEZsb3dzIEluIFlvdS5tcDMnLFxyXG4gICAgICAgIGR1cmF0aW9uOiA5N1xyXG4gICAgfSxcclxuXHJcbiAgICB7ICAgICAgXHJcbiAgICAgICAgdGl0bGU6ICdTdW1tZXIgV2luZCcsXHJcbiAgICAgICAgc3JjOiAnLi4vYXNzZXRzL3NvdW5kcy9TdW1tZXIgV2luZC5tcDMnLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzOVxyXG4gICAgfSxcclxuXHJcbl1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYXlMaXN0OyIsImNvbnN0IHRleHRPZlF1b3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1b3RlJyk7XHJcbmNvbnN0IGF1dGhvck9mUXVvdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aG9yJyk7XHJcbmNvbnN0IGJ1dHRvbkNoYW5nZVF1b3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYW5nZS1xdW90ZScpO1xyXG5cclxubGV0IGxhbmd1YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxhbmd1YWdlJyk7XHJcbmxhbmd1YWdlID0gbGFuZ3VhZ2UudGV4dENvbnRlbnRcclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbU51bShtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0UXVvdGVzKCkge1xyXG4gICAgY29uc3QgcXVvdGVzID0gJy9tb21lbnR1bS9kYXRhLmpzb24nO1xyXG4gICAgZmV0Y2gocXVvdGVzKVxyXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgLnRoZW4oZGF0YSA9PiB7IFxyXG4gICAgICAgIHRleHRPZlF1b3RlLmlubmVySFRNTCA9IGRhdGFbbGFuZ3VhZ2VdW2dldFJhbmRvbU51bShkYXRhW2xhbmd1YWdlXS5sZW5ndGgpXS50ZXh0O1xyXG4gICAgICAgIGF1dGhvck9mUXVvdGUuaW5uZXJIVE1MID0gZGF0YVtsYW5ndWFnZV1bZ2V0UmFuZG9tTnVtKGRhdGFbbGFuZ3VhZ2VdLmxlbmd0aCldLmF1dGhvcjtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VRdW90ZXMoKSB7XHJcbiAgZ2V0UXVvdGVzKClcclxuICBidXR0b25DaGFuZ2VRdW90ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdldFF1b3Rlcyk7XHJcbn1cclxuY2hhbmdlUXVvdGVzKClcclxuZXhwb3J0IGRlZmF1bHQgY2hhbmdlUXVvdGVzOyIsImNvbnN0IHNldHRpbmdJdGVtVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2V0dGluZ19fdGV4dCcpO1xyXG5jb25zdCB3aWRnZXRJdGVtVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53aWRnZXRfX25hbWUnKTtcclxuY29uc3Qgc2V0dGluZ3NCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MtaW1nJyk7XHJcbmNvbnN0IHNldHRpbmdzQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MnKTtcclxuXHJcbmxldCBsYW5ndWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYW5ndWFnZScpO1xyXG5sYW5ndWFnZSA9IGxhbmd1YWdlLnRleHRDb250ZW50XHJcblxyXG5sZXQgaXNPcGVuID0gJ2ZhbHNlJztcclxuXHJcbmNvbnN0IHdvcmRzRm9yVGl0bGUgPSB7XHJcbiAgICBlbjogWydBcGxsaWNhdGlvbiBMYW5ndWFnZScsICdJbWFnZSBTb3VyY2UnLCAnV2lkZ2V0cyddLFxyXG4gICAgcnU6IFsn0K/Qt9GL0Log0L/RgNC40LvQvtC20LXQvdC40Y8nLCAn0JjRgdGC0L7Rh9C90LjQuiDRhNC+0YLQvtCz0YDQsNGE0LjQuScsICfQktC40LTQttC10YLRiyddLFxyXG59XHJcblxyXG5jb25zdCB3b3Jkc0ZvclRleHQgPSB7XHJcbiAgICBlbjogWydQbGF5ZXInLCAnVGltZScsICdEYXRlJywgJ1dlYXRoZXInLCAnR3JlZXRpbmcnXSxcclxuICAgIHJ1OiBbJ9Cf0LvQtdC10YAnLCAn0JLRgNC10LzRjycsICfQlNCw0YLQsCcsICfQn9C+0LPQvtC00LAnLCAn0J/RgNC40LLQtdGC0YHRgtCy0LjQtSddLFxyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuU2V0dGluZ3MoKSB7XHJcbiAgICBpZiAoaXNPcGVuID09ICdmYWxzZScpe1xyXG4gICAgICAgIHNldHRpbmdzQmxvY2suY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3Mtb3BlbicpXHJcbiAgICAgICAgc2V0dGluZ3NCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdzZXR0aW5ncy1jbG9zZScpXHJcbiAgICAgICAgaXNPcGVuID0gJ3RydWUnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZXR0aW5nc0Jsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ3NldHRpbmdzLW9wZW4nKVxyXG4gICAgICAgIHNldHRpbmdzQmxvY2suY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3MtY2xvc2UnKVxyXG4gICAgICAgIGlzT3BlbiA9ICdmYWxzZSc7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdFBhbmVsKCkge1xyXG4gICAgc2V0dGluZ3NCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuU2V0dGluZ3MpO1xyXG5cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaTxzZXR0aW5nSXRlbVRpdGxlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBzZXR0aW5nSXRlbVRpdGxlW2ldLmlubmVySFRNTCA9IHdvcmRzRm9yVGl0bGVbbGFuZ3VhZ2VdW2ldO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8d2lkZ2V0SXRlbVRleHQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHdpZGdldEl0ZW1UZXh0W2ldLmlubmVySFRNTCA9IHdvcmRzRm9yVGV4dFtsYW5ndWFnZV1baV07XHJcbiAgICB9XHJcbiAgICByZXR1cm5cclxufSIsIlxyXG5sZXQgbGFuZ3VhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGFuZ3VhZ2UnKTtcclxubGFuZ3VhZ2UgPSBsYW5ndWFnZS50ZXh0Q29udGVudFxyXG5cclxuZnVuY3Rpb24gc2V0V2lkamV0cygpIHtcclxuICAgIGxldCBkZWZhdWx0QWN0aXZlV2lkamV0cyA9IFsnUGxheWVyJywgJ1RpbWUnLCAnRGF0ZScsICdXZWF0aGVyJywgJ0dyZWV0aW5nJ107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZmF1bHRBY3RpdmVXaWRqZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShkZWZhdWx0QWN0aXZlV2lkamV0c1tpXSkpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZGVmYXVsdEFjdGl2ZVdpZGpldHNbaV0sICd0cnVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0U2V0dGluZ3MoKSB7XHJcbiAgICBsZXQgaXNPcGVuID0gJ2ZhbHNlJztcclxuICAgIHNldFdpZGpldHMoKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbml0U2V0dGluZ3M7XHJcblxyXG4iLCJcclxubGV0IHJhbmRvbU51bUdsb2JhbCA9IGdldFJhbmRvbU51bSgyMCk7XHJcbmNvbnN0IHByZXZTbGlkZUJ1dHRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZS1wcmV2Jyk7XHJcbmNvbnN0IG5leHRTbGlkZUJ1dHRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZS1uZXh0Jyk7XHJcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbmNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbU51bShtYXgpIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4ICsgMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dQYXJ0T2ZEYXkoKXtcclxuICBjb25zdCB0aW1lT2ZEYXkgPSBbJ25pZ2h0JywgJ21vcm5pbmcnLCAnYWZ0ZXJub29uJywgJ2V2ZW5pbmcnXTtcclxuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlO1xyXG4gIGNvbnN0IGhvdXJzID0gY3VycmVudERhdGUuZ2V0SG91cnMoKTtcclxuICByZXR1cm4gdGltZU9mRGF5W01hdGguZmxvb3IoaG91cnMgLyA2KV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJhY2tncm91bmdTbGFpZGVyKCl7XHJcblxyXG4gIGZ1bmN0aW9uIGdldFNsYWlkZXJOdW1iZXIocmFuZG9tTnVtR2xvYmFsKXtcclxuICAgbGV0IHJhbmRvbU51bSA9IHJhbmRvbU51bUdsb2JhbDtcclxuICAgcmV0dXJuIHJhbmRvbU51bTtcclxuICB9XHJcbiAgXHJcbiAgICBcclxuICBwcmV2U2xpZGVCdXR0b20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXRTbGlkZVByZXYpXHJcbiAgbmV4dFNsaWRlQnV0dG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2V0U2xpZGVOZXh0KVxyXG5cclxuICBmdW5jdGlvbiBnZXRTbGlkZVByZXYoKXtcclxuICAgIChyYW5kb21OdW1HbG9iYWwgPT0gMSkgPyByYW5kb21OdW1HbG9iYWwgPSAyMCA6IHJhbmRvbU51bUdsb2JhbC0tO1xyXG4gICAgZ2V0U2xhaWRlck51bWJlcihyYW5kb21OdW1HbG9iYWwpO1xyXG4gICAgc2V0QkcoKVxyXG4gIH1cclxuICBmdW5jdGlvbiBnZXRTbGlkZU5leHQoKXtcclxuICAgIChyYW5kb21OdW1HbG9iYWwgPT0gMjApID8gcmFuZG9tTnVtR2xvYmFsID0gMSA6IHJhbmRvbU51bUdsb2JhbCsrO1xyXG4gICAgZ2V0U2xhaWRlck51bWJlcihyYW5kb21OdW1HbG9iYWwpO1xyXG4gICAgc2V0QkcoKVxyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHNldEJHKCl7XHJcbiAgICBsZXQgcmFuZG9tID0gKFN0cmluZyhnZXRTbGFpZGVyTnVtYmVyKHJhbmRvbU51bUdsb2JhbCkpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICBpbWcuc3JjID0gYGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9yb2xsaW5nLXNjb3Blcy1zY2hvb2wvc3RhZ2UxLXRhc2tzL2Fzc2V0cy9pbWFnZXMvJHtzaG93UGFydE9mRGF5KCl9LyR7cmFuZG9tfS5qcGdgXHJcbiAgICBpbWcub25sb2FkID0gKCkgPT4geyAgICAgIFxyXG4gICAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWcuc3JjfSlgIFxyXG4gICAgfTsgXHJcbiAgfVxyXG5cclxuLy8gICBhc3luYyBmdW5jdGlvbiBzZXRCZ1Vuc3BsYWgoKSB7XHJcbi8vICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuLy8gICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zL3JhbmRvbT9vcmllbnRhdGlvbj1sYW5kc2NhcGUmcXVlcnk9JHtzaG93UGFydE9mRGF5KCl9JmNsaWVudF9pZD1sRVNweE5WblQyMHpqNE9kamhxNGkyYTVoZG04LUpkZlBHTW1nT1hMR0R3YDtcclxuLy8gICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCk7XHJcbi8vICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuLy8gICAgIGltZy5zcmMgPSBkYXRhLnVybHMucmVndWxhcjtcclxuLy8gICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbi8vICAgICAgICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aW1nLnNyY30pYDtcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBhc3luYyBmdW5jdGlvbiBzZXRCZ1Vuc3BsYWgoKSB7XHJcbi8vICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcbi8vICAgY29uc3QgdXJsID0gYGh0dHBzOi8vd3d3LmZsaWNrci5jb20vc2VydmljZXMvcmVzdC8/bWV0aG9kPWZsaWNrci5waG90b3Muc2VhcmNoJmFwaV9rZXk9YjY5OGIxMzg3ZmY2YzBiZDg5MWUzMGYwMTY5NTliNTUmdGFncz0ke3Nob3dQYXJ0T2ZEYXkoKX0mZXh0cmFzPXVybF9sJmZvcm1hdD1qc29uJm5vanNvbmNhbGxiYWNrPTFgO1xyXG4vLyAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCk7XHJcbi8vICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbi8vICAgaW1nLnNyYyA9IGRhdGEucGhvdG9zLnBob3RvW2dldFJhbmRvbU51bSgxMDApXS51cmxfbDtcclxuLy8gICBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4vLyAgICAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWcuc3JjfSlgO1xyXG4vLyAgIH1cclxuLy8gfVxyXG5cclxuXHJcbi8vICAgbGV0IGxpbmtTZXR0aW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpbmsnKTtcclxuLy8gICBzd2l0Y2gobGlua1NldHRpbmcpIHtcclxuLy8gICAgICAgY2FzZSAnZ2l0aHViJzogXHJcbi8vICAgICAgICAgICBzZXRCZ0Zyb21HaXRIdWIocmFuZG9tKVxyXG4vLyAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgIGNhc2UgJ3Vuc3BsYXNoJzogXHJcbi8vICAgICAgICAgICBzZXRCZ0Zyb21VbnNwbGFoKCk7XHJcbi8vICAgICAgICAgICBicmVhaztcclxuLy8gICAgICAgY2FzZSAnZmxpY2tyJzpcclxuLy8gICAgICAgICAgIHNldEJnRnJvbUZMaWNrUigpXHJcbi8vICAgICAgICAgICBicmVhaztcclxuLy8gICB9XHJcbi8vIH1cclxuc2V0QkcoKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYWNrZ3JvdW5nU2xhaWRlcjtcclxuIiwiXHJcbmNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xyXG5cclxuaW1wb3J0IHNob3dEYXRlIGZyb20gXCIuL2RhdGUuanNcIjtcclxuc2hvd0RhdGUoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNob3dUaW1lKCkge1xyXG4gIGNvbnN0IGRhdGVzID0gbmV3IERhdGU7XHJcbiAgY29uc3QgY3VycmVudFRpbWUgPSBkYXRlcy50b0xvY2FsZVRpbWVTdHJpbmcoKTtcclxuICB0aW1lLmlubmVySFRNTCA9IGN1cnJlbnRUaW1lO1xyXG4gIHNldFRpbWVvdXQoc2hvd1RpbWUsIDEwMDApO1xyXG4gIHNldFRpbWVvdXQoc2hvd0RhdGUsIDEwMDApO1xyXG59IiwiXHJcbmxldCBzZXRpbmdzTGFuZ3VhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2V0dGluZ3MnKTsgXHJcbmltcG9ydCBzaG93R3JlZXRpbmcgZnJvbSBcIi4vZ3JlZXRpbmcuanNcIjtcclxuaW1wb3J0IGluaXRXZWF0aGVyIGZyb20gXCIuL3dlYXRoZXIuanNcIjtcclxuaW1wb3J0IHNob3dEYXRlIGZyb20gXCIuL2RhdGUuanNcIjtcclxuaW1wb3J0IGNoYW5nZVF1b3RlcyBmcm9tIFwiLi9xdW90ZXMuanNcIjtcclxubGV0IGxhbmd1YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxhbmd1YWdlJyk7IFxyXG5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFuZycsIGxhbmd1YWdlLnRleHRDb250ZW50KTtcclxuXHJcbmZ1bmN0aW9uIGluaXRMQW5ndWFnZSgpe1xyXG5sZXQgbmFtZUNpdHkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZycpO1xyXG5jb25zb2xlLmxvZyhuYW1lQ2l0eSlcclxubGV0IGRlZmF1bHRsYW5ndWFnZT0nZW4nO1xyXG5sYW5ndWFnZS50eXBlID0gXCJ0ZXh0XCI7XHJcbmlmIChuYW1lQ2l0eSkge1xyXG4gICAgaWYgKG5hbWVDaXR5ID09IDApIHtcclxuICAgICAgICBsYW5ndWFnZS50ZXh0Q29udGVudCA9IGRlZmF1bHRsYW5ndWFnZTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFuZycsIGxhbmd1YWdlLnRleHRDb250ZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGFuZ3VhZ2UudGV4dENvbnRlbnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZycpO1xyXG4gICAgfVxyXG59IGVsc2Uge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhbmcnLCBsYW5ndWFnZS50ZXh0Q29udGVudCk7XHJcbiAgICBsYW5ndWFnZS50ZXh0Q29udGVudCA9IGRlZmF1bHRsYW5ndWFnZTtcclxufVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMYW5ndWFnZSgpe1xyXG4gICAgaW5pdExBbmd1YWdlKClcclxuICAgIGZvciAobGV0IGkgPSAwOyBpPHNldGluZ3NMYW5ndWFnZS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgc2V0aW5nc0xhbmd1YWdlW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBsZXQgZXYgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIGxhbmd1YWdlLnRleHRDb250ZW50ID0gZXYuaWQ7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYW5nJywgbGFuZ3VhZ2UudGV4dENvbnRlbnQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzaG93R3JlZXRpbmcoKTtcclxuICAgIGluaXRXZWF0aGVyKClcclxuICAgIHNob3dEYXRlKClcclxuICAgIGNoYW5nZVF1b3RlcygpXHJcbn1cclxuY29uc29sZS5sb2cobGFuZ3VhZ2UudGV4dENvbnRlbnQpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRMYW5ndWFnZTtcclxuIiwiY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1pY29uJyk7XHJcbmNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBlcmF0dXJlJyk7XHJcbmNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWRlc2NyaXB0aW9uJyk7XHJcbmNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2l0eScpO1xyXG5jb25zdCB3ZWF0aGVyV2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kJyk7XHJcbmNvbnN0IHdlYXRoZXJIdW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpO1xyXG5jb25zdCB3ZWF0aGVySW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyX19pbmZvJyk7XHJcblxyXG5sZXQgbGFuZ3VhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGFuZ3VhZ2UnKTtcclxubGFuZ3VhZ2UgPSBsYW5ndWFnZS50ZXh0Q29udGVudFxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcigpIHtcclxuICBcclxuICBpZiAoY2l0eS50ZXh0Q29udGVudC5sZW5ndGggIT09IDApe1xyXG4gIHdlYXRoZXJJbmZvLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgbGV0IG5hbWVDaXR5ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NpdHknKTtcclxuICBsZXQgZGVmYXVsdENpdHk9J01pbnNrJztcclxuICBjaXR5LnR5cGUgPSBcInRleHRcIjtcclxuICBjaXR5LmNsYXNzTGlzdC5hZGQoJ2NpdHknKTtcclxuICBpZiAobmFtZUNpdHkpIHtcclxuICAgICAgaWYgKG5hbWVDaXR5ID09IDApIHtcclxuICAgICAgICAgIGNpdHkudGV4dENvbnRlbnQgPSBkZWZhdWx0Q2l0eTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNpdHkudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2l0eScpO1xyXG4gICAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgICAgY2l0eS52YWx1ZSA9IGRlZmF1bHRDaXR5O1xyXG4gIH1cclxuICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHkudGV4dENvbnRlbnR9Jmxhbmc9JHtsYW5ndWFnZX0mYXBwaWQ9YWE1YTRmMTI0NjEyYzQyYmE1NWMzMzdhNjE1MzRlYzcmdW5pdHM9bWV0cmljYDtcclxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG5cclxuICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QuYWRkKGBvd2YtJHtkYXRhLndlYXRoZXJbMF0uaWR9YCk7XHJcbiAgXHJcbiAgbGV0IHRyYW5zbGF0aW9uID0ge1xyXG4gICAgd2luZDoge1xyXG4gICAgICAgIHJ1OiBcItCh0LrQvtGA0L7RgdGC0Ywg0LLQtdGC0YDQsDogXCIsXHJcbiAgICAgICAgZW46IFwiV2luZCBzcGVlZDogXCJcclxuICAgIH0sXHJcbiAgICBodW1pZGl0eToge1xyXG4gICAgICBydTogXCLQktC70LDQttC90L7RgdGC0Yw6IFwiLFxyXG4gICAgICBlbjogXCJIdW1pZGl0eTogXCJcclxuICAgIH0sXHJcbiAgICBzcGVlZDoge1xyXG4gICAgICAgIHJ1OiBcIiDQvC9jXCIsXHJcbiAgICAgICAgZW46IFwiIG0vc1wiXHJcbiAgICB9LFxyXG4gIH0gICAgXHJcbiAgd2VhdGhlckljb24uY2xhc3NOYW1lID0gJ3dlYXRoZXItaWNvbiBvd2YnO1xyXG4gIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5hZGQoYG93Zi0ke2RhdGEud2VhdGhlclswXS5pZH1gKTtcclxuICB0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGAke2RhdGEubWFpbi50ZW1wLnRvRml4ZWQoMCl9wrBDYDtcclxuICB3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XHJcbiAgd2VhdGhlcldpbmQuaW5uZXJIVE1MID0gYCR7dHJhbnNsYXRpb24ud2luZFtsYW5ndWFnZV19ICR7TWF0aC5yb3VuZChkYXRhLndpbmQuc3BlZWQpfSAke3RyYW5zbGF0aW9uLnNwZWVkW2xhbmd1YWdlXX1gO1xyXG4gIHdlYXRoZXJIdW1pZGl0eS5pbm5lckhUTUwgPSBgJHt0cmFuc2xhdGlvbi5odW1pZGl0eVtsYW5ndWFnZV19ICR7ZGF0YS5tYWluLmh1bWlkaXR5LnRvRml4ZWQoMCl9ICVgO1xyXG4gIHdlYXRoZXJEZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XHJcbiAgfVxyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZSgpIHtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2l0eScsIGNpdHkudGV4dENvbnRlbnQpO1xyXG59XHJcbmZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZSgpIHtcclxuICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2l0eScpKSB7XHJcbiAgICBjaXR5LnRleHRDb250ZW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NpdHknKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRDaXR5KCl7XHJcbmZ1bmN0aW9uIHNldENpdHkoZXZlbnQpIHtcclxuICBpZiAoZXZlbnQuY29kZSA9PT0gJ0VudGVyJykge1xyXG4gICAgc2V0TG9jYWxTdG9yYWdlKClcclxuICAgIGdldFdlYXRoZXIoKTtcclxuICAgIGNpdHkuYmx1cigpO1xyXG4gIH1cclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICBjb25zdCB3aXRoaW5Cb25kYXJpZXMgPSBlLmNvbXBvc2VkUGF0aCgpLmluY2x1ZGVzKGNpdHkpO1xyXG4gIGlmICghd2l0aGluQm9uZGFyaWVzKXtcclxuICAgIHNldExvY2FsU3RvcmFnZSgpXHJcbiAgICBnZXRXZWF0aGVyKCk7XHJcbiAgICBjaXR5LmJsdXIoKTtcclxuICB9XHJcbiB9KVxyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBnZXRXZWF0aGVyKTtcclxuY2l0eS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHNldENpdHkpO1xyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRXZWF0aGVyKCl7XHJcbiAgZ2V0V2VhdGhlcigpXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIHNldExvY2FsU3RvcmFnZSk7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBnZXRMb2NhbFN0b3JhZ2UpXHJcbiAgc2VuZENpdHkoKTtcclxuICBnZXRXZWF0aGVyKClcclxuXHJcbn1cclxuXHJcbmdldFdlYXRoZXIoKVxyXG5leHBvcnQgZGVmYXVsdCBpbml0V2VhdGhlcjtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uLy4uL2Nzcy9vd2ZvbnQtcmVndWxhci5jc3MnXHJcbmltcG9ydCAnLi4vLi4vY3NzL3N0eWxlLmNzcydcclxuXHJcblxyXG5pbXBvcnQgaW5pdFBhbmVsIGZyb20gXCIuL3NldHRpbmdsaXN0LmpzXCJcclxuaW5pdFBhbmVsKClcclxuXHJcbmltcG9ydCBpbml0U2V0dGluZ3MgZnJvbSBcIi4vc2V0dGluZ3MuanNcIlxyXG5pbml0U2V0dGluZ3MoKVxyXG5cclxuaW1wb3J0IGdldExhbmd1YWdlIGZyb20gXCIuL3RyYW5zbGF0ZS5qc1wiO1xyXG5nZXRMYW5ndWFnZSgpXHJcblxyXG5pbXBvcnQgc2hvd1RpbWUgZnJvbSBcIi4vdGltZS5qc1wiO1xyXG5zaG93VGltZSgpO1xyXG5cclxuaW1wb3J0IHNob3dEYXRlIGZyb20gXCIuL2RhdGUuanNcIjtcclxuc2hvd0RhdGUoKTtcclxuXHJcbmltcG9ydCBzaG93R3JlZXRpbmcgZnJvbSBcIi4vZ3JlZXRpbmcuanNcIjtcclxuc2hvd0dyZWV0aW5nKCk7XHJcblxyXG5pbXBvcnQgc2V0QkcgZnJvbSBcIi4vc2xpZGVyLmpzXCI7XHJcbnNldEJHKCk7XHJcblxyXG5pbXBvcnQgc3RhcnRQbGF5TGlzdCBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcclxuc3RhcnRQbGF5TGlzdCgpO1xyXG5cclxuaW1wb3J0IGNoYW5nZVF1b3RlcyBmcm9tIFwiLi9xdW90ZXMuanNcIjtcclxuY2hhbmdlUXVvdGVzKClcclxuXHJcbmltcG9ydCBpbml0V2VhdGhlciBmcm9tIFwiLi93ZWF0aGVyLmpzXCI7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=