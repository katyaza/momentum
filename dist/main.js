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

let language = localStorage.getItem('lang');

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
/* harmony import */ var _translate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translate.js */ "./assets/js/translate.js");
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');





let language = localStorage.getItem('lang');

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

let language = localStorage.getItem('lang')

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

    let language = localStorage.getItem('lang');

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
    let language = localStorage.getItem('lang');
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
    (0,_greeting_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_weather_js__WEBPACK_IMPORTED_MODULE_1__["default"])()
    ;(0,_date_js__WEBPACK_IMPORTED_MODULE_2__["default"])()
    ;(0,_quotes_js__WEBPACK_IMPORTED_MODULE_3__["default"])()
}

getLanguage()


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

let language = localStorage.getItem('lang')

async function getWeather() {
  
  if (city.textContent.length !== 0){
  weatherInfo.style.display = 'flex';

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
  if (event.code == 'Enter') {
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


document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);


window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage)

getLocalStorage()

}

function initWeather(){
  getWeather()
}


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
(0,_weather_js__WEBPACK_IMPORTED_MODULE_11__["default"])()








})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FDTnFDO0FBQ1Q7QUFDNUI7QUFDd0M7QUFDeEMsMkRBQVM7QUFDVDtBQUNBLENBQXdDO0FBQ3hDLHdEQUFZO0FBQ1o7QUFDQSxDQUF5QztBQUN6Qyx5REFBVztBQUNYO0FBQ0EsQ0FBaUM7QUFDakMsb0RBQVE7QUFDUjtBQUNpQztBQUNqQyxvREFBUTtBQUNSO0FBQ3lDO0FBQ3pDLHdEQUFZO0FBQ1o7QUFDZ0M7QUFDaEMsc0RBQUs7QUFDTDtBQUN3QztBQUN4QyxzREFBYTtBQUNiO0FBQ3VDO0FBQ3ZDLHVEQUFZO0FBQ1o7QUFDQSxDQUF1QztBQUN2Qyx3REFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvZGF0ZS5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9ncmVldGluZy5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvcGxheWxpc3QuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvcXVvdGVzLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3NldHRpbmdsaXN0LmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3NldHRpbmdzLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3NsaWRlci5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy90aW1lLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3RyYW5zbGF0ZS5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy93ZWF0aGVyLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vY3NzL293Zm9udC1yZWd1bGFyLmNzcz9iYzQxIiwid2VicGFjazovL21vbWVudHVtLy4vY3NzL3N0eWxlLmNzcz85MzA2Iiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXRlJyk7XHJcblxyXG5sZXQgbGFuZ3VhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZycpO1xyXG5cclxuZnVuY3Rpb24gc2hvd0RhdGUoKSB7XHJcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlO1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7IHdlZWtkYXk6ICdsb25nJywgZGF5OiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIHRpbWVab25lOiAnVVRDJyB9O1xyXG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3RGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobGFuZ3VhZ2UsIG9wdGlvbnMpO1xyXG4gIGRhdGUuaW5uZXJIVE1MID0gY3VycmVudERhdGU7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaG93RGF0ZTtcclxuIiwiY29uc3QgZ3JlZXRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JlZXRpbmcnKTtcclxuY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lJyk7XHJcblxyXG5cclxuaW1wb3J0IGdldExhbmd1YWdlIGZyb20gXCIuL3RyYW5zbGF0ZS5qc1wiO1xyXG5cclxuXHJcbmxldCBsYW5ndWFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5nJyk7XHJcblxyXG5jb25zb2xlLmxvZyhsYW5ndWFnZSlcclxuXHJcbmNvbnN0IHBsYWNlSG9sZGVyID0geyBcclxuICBlbjogJ1tFbnRlciB5b3VyIG5hbWVdJyxcclxuICBydTogJ1vQktCy0LXQtNC40YLQtSDQstCw0YjQtSDQuNC80Y9dJyxcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGltZU9mRGF5KCkge1xyXG4gIGxldCBwYXJ0T2ZEYXkgPSB7XHJcbiAgICBlbjogWyduaWdodCcsICdtb3JuaW5nJywgJ2FmdGVybm9vbicsICdldmVuaW5nJ10sXHJcbiAgICBydTogWyfQvdC+0YfQuCwnLCAn0YPRgtGA0L4sJywgJ9C00LXQvdGMLCcsICfQstC10YfQtdGALCddXHJcbiAgfTtcclxubGV0IGdyZWV0aW5nRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbmxldCBob3VycyA9IE51bWJlcihncmVldGluZ0RhdGUuZ2V0SG91cnMoKSk7XHJcblxyXG5yZXR1cm4gKHBhcnRPZkRheVtsYW5ndWFnZV1bKE1hdGguZmxvb3IoaG91cnMvNikpXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dHcmVldGluZygpe1xyXG5sZXQgZ3JlZXRpbmdUZXh0ID0nJztcclxuaWYgKGxhbmd1YWdlID09ICdlbicpe1xyXG4gICAgZ3JlZXRpbmdUZXh0ID0gYEdvb2QgJHtnZXRUaW1lT2ZEYXkoKX1gO1xyXG59IGVsc2UgeyBcclxuICAgIGlmKGdldFRpbWVPZkRheSgpID09ICfQvdC+0YfQuCwnKXtcclxuICAgICAgICBncmVldGluZ1RleHQgPSBg0JTQvtCx0YDQvtC5ICR7Z2V0VGltZU9mRGF5KCl9YFxyXG4gICAgfWVsc2UgaWYgKGdldFRpbWVPZkRheSgpID09ICfRg9GC0YDQviwnKXtcclxuICAgICAgICBncmVldGluZ1RleHQgPSBg0JTQvtCx0YDQvtC1ICR7Z2V0VGltZU9mRGF5KCl9YFxyXG4gICAgfSBlbHNlXHJcbiAgICBncmVldGluZ1RleHQgPSBg0JTQvtCx0YDRi9C5ICR7Z2V0VGltZU9mRGF5KCl9YFxyXG59O1xyXG5cclxuICBuYW1lLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwbGFjZUhvbGRlcltsYW5ndWFnZV0pOyBcclxuICByZXR1cm4gZ3JlZXRpbmcuaW5uZXJIVE1MID0gZ3JlZXRpbmdUZXh0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaG93R3JlZXRpbmc7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgc2V0TG9jYWxTdG9yYWdlKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBnZXRMb2NhbFN0b3JhZ2UpXHJcblxyXG5mdW5jdGlvbiBzZXRMb2NhbFN0b3JhZ2UoKSB7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hbWUnLCBuYW1lLnZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKCkge1xyXG4gIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lJykpIHtcclxuICAgIG5hbWUudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpO1xyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHBsYXlMaXN0IGZyb20gXCIuL3BsYXlsaXN0LmpzXCI7XHJcblxyXG5cclxuY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oKTtcclxubGV0IGF1ZGlvVm9sdW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZvbHVtZS1saW5lJyk7XHJcbmxldCBtdXNpY1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm11c2ljX190aXRsZScpO1xyXG5sZXQgYXVkaW9NdXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1ZGlvLW11dGUnKTtcclxubGV0IG11c2ljUGxheUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1saXN0Jyk7XHJcbmxldCBtdXNpY0J1dHRvblBsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheScpO1xyXG5sZXQgbXVzaWNCdXR0b25OZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktbmV4dCcpO1xyXG5sZXQgbXVzaWNCdXR0b25QcmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktcHJldicpO1xyXG5sZXQgdGltZWxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUnKTtcclxubGV0IGN1cnJlbnRCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpXHJcbmxldCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NcIilcclxubGV0IGF1ZGlvTGVuZ3RoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sZW5ndGhcIilcclxubGV0IGN1cnJlbnRWb2x1bWU7XHJcbmxldCBjdXJyZW50VGltZUdsb2JhbCA9IDA7XHJcbmxldCBpc1BsYXkgPSBmYWxzZTtcclxubGV0IG11c2ljTnVtYmVyID0gMDtcclxubGV0IGxpc3RJdGVtO1xyXG5sZXQgbWluaUJ0bjtcclxuXHJcblxyXG5mdW5jdGlvbiBpbml0UGxheUxpc3QoKSB7XHJcbiAgICBwbGF5TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBjb25zdCBtaW5pQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIG1pbmlCdG4uY2xhc3NMaXN0LmFkZCgncGxheS1taW5pJyk7XHJcbiAgICAgICAgbWluaUJ0bi5jbGFzc0xpc3QuYWRkKCdtaW5pLWJ0bicpO1xyXG5cclxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdwbGF5LWl0ZW0nKTtcclxuICAgICAgICBsaS5pbm5lckhUTUwgPSBlbC50aXRsZTtcclxuICAgICAgICBtdXNpY1BsYXlMaXN0LmFwcGVuZChsaSk7XHJcbiAgICAgICAgbGkuYXBwZW5kKG1pbmlCdG4pO1xyXG4gICAgICAgIH1cclxuICAgIClcclxuICAgIGxpc3RJdGVtID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5LWl0ZW0nKTtcclxuICAgIG1pbmlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWluaS1idG4nKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFRpbWVDb2RlRnJvbU51bShudW0pIHtcclxuICAgIGxldCBzZWNvbmRzID0gcGFyc2VJbnQobnVtKTtcclxuICAgIGxldCBtaW51dGVzID0gcGFyc2VJbnQoc2Vjb25kcyAvIDYwKTtcclxuICAgIHNlY29uZHMgLT0gbWludXRlcyAqIDYwO1xyXG4gICAgY29uc3QgaG91cnMgPSBwYXJzZUludChtaW51dGVzIC8gNjApO1xyXG4gICAgbWludXRlcyAtPSBob3VycyAqIDYwO1xyXG4gIFxyXG4gICAgaWYgKGhvdXJzID09PSAwKSByZXR1cm4gYCR7bWludXRlc306JHtTdHJpbmcoc2Vjb25kcyAlIDYwKS5wYWRTdGFydCgyLCAwKX1gO1xyXG4gICAgcmV0dXJuIGAke1N0cmluZyhob3VycykucGFkU3RhcnQoMiwgMCl9OiR7bWludXRlc306JHtTdHJpbmcoc2Vjb25kcyAlIDYwKS5wYWRTdGFydCgyLCAwKX1gO1xyXG4gIH1cclxuXHJcblxyXG5mdW5jdGlvbiBzZXREdXJhdGlvblRpbWUoZHVyYXRpb24pIHtcclxuICAgIGF1ZGlvTGVuZ3RoLmlubmVySFRNTCA9IGdldFRpbWVDb2RlRnJvbU51bShkdXJhdGlvbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEludGVydmFsQXVkaW8oKXtcclxuICAgIHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gYXVkaW8uY3VycmVudFRpbWUgLyBhdWRpby5kdXJhdGlvbiAqIDEwMCArIFwiJVwiO1xyXG4gICAgY3VycmVudFRpbWVHbG9iYWwgPSBhdWRpby5jdXJyZW50VGltZTtcclxuICAgIGN1cnJlbnRCYXIuaW5uZXJIVE1MID0gZ2V0VGltZUNvZGVGcm9tTnVtKGN1cnJlbnRUaW1lR2xvYmFsKTtcclxuICAgIHNldFRpbWVvdXQoc2V0SW50ZXJ2YWxBdWRpbywgNTAwKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldFRpbWUoKSB7XHJcbiAgY3VycmVudFRpbWVHbG9iYWwgPSBhdWRpby5jdXJyZW50VGltZTtcclxuICBjdXJyZW50QmFyLmlubmVySFRNTCA9IGdldFRpbWVDb2RlRnJvbU51bShjdXJyZW50VGltZUdsb2JhbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXlNdXNpYygpe1xyXG4gICAgYXVkaW8uc3JjID0gcGxheUxpc3RbbXVzaWNOdW1iZXJdLnNyYztcclxuICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWVHbG9iYWw7XHJcbiAgICBzZXREdXJhdGlvblRpbWUocGxheUxpc3RbbXVzaWNOdW1iZXJdLmR1cmF0aW9uKTtcclxuICAgIGlmKGlzUGxheSA9PSBmYWxzZSkge1xyXG4gICAgICAgIG11c2ljVGl0bGUuaW5uZXJIVE1MID0gcGxheUxpc3RbbXVzaWNOdW1iZXJdLnRpdGxlO1xyXG4gICAgICAgIGF1ZGlvLnZvbHVtZSA9IGF1ZGlvVm9sdW1lLnZhbHVlLzEwMDtcclxuICAgICAgICBpc1BsYXkgPSB0cnVlO1xyXG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICBtdXNpY0J1dHRvblBsYXkuY2xhc3NMaXN0LmFkZCgncGF1c2UnKTtcclxuICAgICAgICBsaXN0SXRlbVttdXNpY051bWJlcl0uY2xhc3NMaXN0LmFkZCgnaXRlbS1hY3RpdmUnKTtcclxuICAgICAgICBtaW5pQnRuW211c2ljTnVtYmVyXS5jbGFzc0xpc3QuYWRkKCdwYXVzZS1taW5pJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgbXVzaWNCdXR0b25QbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlJyk7XHJcbiAgICAgICAgaXNQbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgbGlzdEl0ZW1bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ2l0ZW0tYWN0aXZlJyk7XHJcbiAgICAgICAgbWluaUJ0blttdXNpY051bWJlcl0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgIHNldFRpbWUoKTtcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VBdWRpbyAoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaTxsaXN0SXRlbS5sZW5ndGg7IGkrKyl7ICAgICAgICBcclxuICAgICAgICBsaXN0SXRlbVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBtdXNpY051bWJlciAmJiBpc1BsYXkpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtW211c2ljTnVtYmVyXS5jbGFzc0xpc3QuYWRkKCdpdGVtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWluaUJ0blttdXNpY051bWJlci0xXS5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZS1taW5pJyk7XHJcbiAgICAgICAgICAgICAgICBpc1BsYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWVHbG9iYWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgcGxheU11c2ljKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtW211c2ljTnVtYmVyXS5jbGFzc0xpc3QucmVtb3ZlKCdpdGVtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWluaUJ0blttdXNpY051bWJlcl0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZScpKVxyXG4gICAgICAgICAgICAgICAgbXVzaWNOdW1iZXIgPSBpO1xyXG4gICAgICAgICAgICAgICAgaXNQbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZUdsb2JhbCA9IDA7XHJcbiAgICAgICAgICAgICAgICBwbGF5TXVzaWMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VBdWRpb09uQnRuKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8bWluaUJ0bi5sZW5ndGg7IGkrKyl7ICAgICAgICBcclxuICAgICAgICBtaW5pQnRuW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lR2xvYmFsID0gYXVkaW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIGlmIChpID09IG11c2ljTnVtYmVyICYmIGlzUGxheSkge1xyXG4gICAgICAgICAgICAgICAgaXNQbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VGltZUdsb2JhbClcclxuICAgICAgICAgICAgICAgIG1pbmlCdG5baV0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgICAgICAgICAgcGxheU11c2ljKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIG1pbmlCdG4uZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZS1taW5pJykpXHJcbiAgICAgICAgICAgICAgICBtaW5pQnRuW2ldLmNsYXNzTGlzdC5hZGQoJ3BhdXNlLW1pbmknKTtcclxuICAgICAgICAgICAgICAgIG11c2ljTnVtYmVyID0gaTtcclxuICAgICAgICAgICAgICAgIGlzUGxheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwbGF5TXVzaWMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vY2xpY2sgdG8gcHJldiBzb25nXHJcbmZ1bmN0aW9uIHBsYXlQcmV2KCl7XHJcbiAgICBjdXJyZW50VGltZUdsb2JhbCA9IDA7XHJcbiAgICBpc1BsYXkgPSBmYWxzZTtcclxuICAgIGxpc3RJdGVtW211c2ljTnVtYmVyXS5jbGFzc0xpc3QucmVtb3ZlKCdpdGVtLWFjdGl2ZScpO1xyXG4gICAgaWYgKG11c2ljTnVtYmVyPT0wKSB7XHJcbiAgICAgICAgbWluaUJ0blttdXNpY051bWJlcl0uY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UtbWluaScpO1xyXG4gICAgICAgIG11c2ljTnVtYmVyID0gcGxheUxpc3QubGVuZ3RoLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pbmlCdG5bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlLW1pbmknKTtcclxuICAgICAgICBtdXNpY051bWJlci0tOyAgICBcclxuICAgIH1cclxuICAgIGlmICghbXVzaWNCdXR0b25QbGF5LmNsYXNzTGlzdC5jb250YWlucygncGF1c2UnKSkge1xyXG4gICAgICAgIG11c2ljQnV0dG9uUGxheS5jbGFzc0xpc3QuYWRkKCdwYXVzZScpO1xyXG4gICAgfVxyXG4gICAgcGxheU11c2ljKCk7XHJcbn1cclxuXHJcbi8vY2xpY2sgdG8gbmV4dCBzb25nXHJcbmZ1bmN0aW9uIHBsYXlOZXh0KCl7XHJcbiAgICBjdXJyZW50VGltZUdsb2JhbCA9IDA7XHJcbiAgICBpc1BsYXkgPSBmYWxzZTtcclxuICAgIGxpc3RJdGVtW211c2ljTnVtYmVyXS5jbGFzc0xpc3QucmVtb3ZlKCdpdGVtLWFjdGl2ZScpO1xyXG4gICAgaWYgKG11c2ljTnVtYmVyPT1wbGF5TGlzdC5sZW5ndGgtMSkge1xyXG4gICAgICAgIG1pbmlCdG5bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlLW1pbmknKTtcclxuICAgICAgICBtdXNpY051bWJlciA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pbmlCdG5bbXVzaWNOdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlLW1pbmknKTtcclxuICAgICAgICBtdXNpY051bWJlcisrOyAgICBcclxuICAgIH1cclxuICAgIGlmICghbXVzaWNCdXR0b25QbGF5LmNsYXNzTGlzdC5jb250YWlucygncGF1c2UnKSkge1xyXG4gICAgICAgIG11c2ljQnV0dG9uUGxheS5jbGFzc0xpc3QuYWRkKCdwYXVzZScpO1xyXG4gICAgfVxyXG4gICAgcGxheU11c2ljKCk7XHJcbn1cclxuXHJcbi8vY2xpY2sgb24gdGltZWxpbmVcclxuZnVuY3Rpb24gbW92ZXRpbWVsaW5lKGUpe1xyXG4gICAgaWYoIWlzRmluaXRlKCkpe1xyXG4gICAgY29uc3QgdGltZWxpbmVXaWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRpbWVsaW5lKS53aWR0aDtcclxuICAgIGNvbnNvbGUubG9nKHRpbWVsaW5lV2lkdGgpXHJcbiAgICBjb25zdCB0aW1lVG9TZWVrID0gZS5vZmZzZXRYIC8gcGFyc2VJbnQodGltZWxpbmVXaWR0aCkgKiBhdWRpby5kdXJhdGlvbjtcclxuICAgIGNvbnNvbGUubG9nKGUub2Zmc2V0WClcclxuICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gdGltZVRvU2VlaztcclxuICB9IGVsc2UgZmFsc2U7XHJcbn1cclxuXHJcblxyXG5cclxuLy92YWx1ZVxyXG5cclxuZnVuY3Rpb24gc2V0VmFsdWUoKSB7XHJcbiAgICBhdWRpby52b2x1bWUgPSBhdWRpb1ZvbHVtZS52YWx1ZS8xMDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG11dGVBdWRpbygpIHtcclxuICAgIGlmIChhdWRpb1ZvbHVtZS52YWx1ZSA+IDApIHtcclxuICAgICAgICBjdXJyZW50Vm9sdW1lID0gYXVkaW9Wb2x1bWUudmFsdWU7XHJcbiAgICAgICAgYXVkaW9Wb2x1bWUudmFsdWUgPSAwO1xyXG4gICAgICAgIHNldFZhbHVlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF1ZGlvVm9sdW1lLnZhbHVlID0gY3VycmVudFZvbHVtZTtcclxuICAgICAgICBzZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc3RhcnRQbGF5TGlzdCgpIHsgIFxyXG4gICAgaW5pdFBsYXlMaXN0KCk7IFxyXG4gICAgbXVzaWNCdXR0b25QbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheU11c2ljKTtcclxuICAgIC8vIG11c2ljLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgcGxheU5leHQpO1xyXG4gICAgbXVzaWNCdXR0b25OZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheU5leHQpO1xyXG4gICAgbXVzaWNCdXR0b25QcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheVByZXYpO1xyXG4gICAgdGltZWxpbmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtb3ZldGltZWxpbmUpXHJcbiAgICBhdWRpb1ZvbHVtZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHNldFZhbHVlKTtcclxuICAgIGF1ZGlvTXV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG11dGVBdWRpbyk7XHJcbiAgICBjaGFuZ2VBdWRpbygpO1xyXG4gICAgY2hhbmdlQXVkaW9PbkJ0bigpXHJcbiAgICBzZXRJbnRlcnZhbEF1ZGlvKClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RhcnRQbGF5TGlzdFxyXG5cclxuXHJcbiIsImNvbnN0IHBsYXlMaXN0ID0gW1xyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiAnQXF1YSBDYWVsZXN0aXMnLFxyXG4gICAgICAgIHNyYzogJy4uL2Fzc2V0cy9zb3VuZHMvQXF1YSBDYWVsZXN0aXMubXAzJyxcclxuICAgICAgICBkdXJhdGlvbjogMzksXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdFbm5pbyBNb3JyaWNvbmUnLFxyXG4gICAgICAgIHNyYzogJy4uL2Fzc2V0cy9zb3VuZHMvRW5uaW8gTW9ycmljb25lLm1wMycsXHJcbiAgICAgICAgZHVyYXRpb246IDk3LFxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgeyAgICAgIFxyXG4gICAgICAgIHRpdGxlOiAnUml2ZXIgRmxvd3MgSW4gWW91JyxcclxuICAgICAgICBzcmM6ICcuLi9hc3NldHMvc291bmRzL1JpdmVyIEZsb3dzIEluIFlvdS5tcDMnLFxyXG4gICAgICAgIGR1cmF0aW9uOiA5N1xyXG4gICAgfSxcclxuXHJcbiAgICB7ICAgICAgXHJcbiAgICAgICAgdGl0bGU6ICdTdW1tZXIgV2luZCcsXHJcbiAgICAgICAgc3JjOiAnLi4vYXNzZXRzL3NvdW5kcy9TdW1tZXIgV2luZC5tcDMnLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzOVxyXG4gICAgfSxcclxuXHJcbl1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYXlMaXN0OyIsImNvbnN0IHRleHRPZlF1b3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1b3RlJyk7XHJcbmNvbnN0IGF1dGhvck9mUXVvdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aG9yJyk7XHJcbmNvbnN0IGJ1dHRvbkNoYW5nZVF1b3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYW5nZS1xdW90ZScpO1xyXG5cclxubGV0IGxhbmd1YWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmcnKVxyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tTnVtKG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRRdW90ZXMoKSB7XHJcbiAgICBjb25zdCBxdW90ZXMgPSAnL21vbWVudHVtL2RhdGEuanNvbic7XHJcbiAgICBmZXRjaChxdW90ZXMpXHJcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAudGhlbihkYXRhID0+IHsgXHJcbiAgICAgICAgdGV4dE9mUXVvdGUuaW5uZXJIVE1MID0gZGF0YVtsYW5ndWFnZV1bZ2V0UmFuZG9tTnVtKGRhdGFbbGFuZ3VhZ2VdLmxlbmd0aCldLnRleHQ7XHJcbiAgICAgICAgYXV0aG9yT2ZRdW90ZS5pbm5lckhUTUwgPSBkYXRhW2xhbmd1YWdlXVtnZXRSYW5kb21OdW0oZGF0YVtsYW5ndWFnZV0ubGVuZ3RoKV0uYXV0aG9yO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVF1b3RlcygpIHtcclxuICBnZXRRdW90ZXMoKVxyXG4gIGJ1dHRvbkNoYW5nZVF1b3RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2V0UXVvdGVzKTtcclxufVxyXG5jaGFuZ2VRdW90ZXMoKVxyXG5leHBvcnQgZGVmYXVsdCBjaGFuZ2VRdW90ZXM7IiwiY29uc3Qgc2V0dGluZ0l0ZW1UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZXR0aW5nX190ZXh0Jyk7XHJcbmNvbnN0IHdpZGdldEl0ZW1UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndpZGdldF9fbmFtZScpO1xyXG5jb25zdCBzZXR0aW5nc0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncy1pbWcnKTtcclxuY29uc3Qgc2V0dGluZ3NCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncycpO1xyXG5cclxubGV0IGlzT3BlbiA9ICdmYWxzZSc7XHJcblxyXG5jb25zdCB3b3Jkc0ZvclRpdGxlID0ge1xyXG4gICAgZW46IFsnQXBsbGljYXRpb24gTGFuZ3VhZ2UnLCAnSW1hZ2UgU291cmNlJywgJ1dpZGdldHMnXSxcclxuICAgIHJ1OiBbJ9Cv0LfRi9C6INC/0YDQuNC70L7QttC10L3QuNGPJywgJ9CY0YHRgtC+0YfQvdC40Log0YTQvtGC0L7Qs9GA0LDRhNC40LknLCAn0JLQuNC00LbQtdGC0YsnXSxcclxufVxyXG5cclxuY29uc3Qgd29yZHNGb3JUZXh0ID0ge1xyXG4gICAgZW46IFsnUGxheWVyJywgJ1RpbWUnLCAnRGF0ZScsICdXZWF0aGVyJywgJ0dyZWV0aW5nJ10sXHJcbiAgICBydTogWyfQn9C70LXQtdGAJywgJ9CS0YDQtdC80Y8nLCAn0JTQsNGC0LAnLCAn0J/QvtCz0L7QtNCwJywgJ9Cf0YDQuNCy0LXRgtGB0YLQstC40LUnXSxcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblNldHRpbmdzKCkge1xyXG4gICAgaWYgKGlzT3BlbiA9PSAnZmFsc2UnKXtcclxuICAgICAgICBzZXR0aW5nc0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLW9wZW4nKVxyXG4gICAgICAgIHNldHRpbmdzQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnc2V0dGluZ3MtY2xvc2UnKVxyXG4gICAgICAgIGlzT3BlbiA9ICd0cnVlJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0dGluZ3NCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdzZXR0aW5ncy1vcGVuJylcclxuICAgICAgICBzZXR0aW5nc0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLWNsb3NlJylcclxuICAgICAgICBpc09wZW4gPSAnZmFsc2UnO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRQYW5lbCgpIHtcclxuICAgIHNldHRpbmdzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblNldHRpbmdzKTtcclxuXHJcbiAgICBsZXQgbGFuZ3VhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZycpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpPHNldHRpbmdJdGVtVGl0bGUubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHNldHRpbmdJdGVtVGl0bGVbaV0uaW5uZXJIVE1MID0gd29yZHNGb3JUaXRsZVtsYW5ndWFnZV1baV07XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaTx3aWRnZXRJdGVtVGV4dC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgd2lkZ2V0SXRlbVRleHRbaV0uaW5uZXJIVE1MID0gd29yZHNGb3JUZXh0W2xhbmd1YWdlXVtpXTtcclxuICAgIH1cclxuICAgIHJldHVyblxyXG59IiwiXHJcbmZ1bmN0aW9uIHNldFdpZGpldHMoKSB7XHJcbiAgICBsZXQgZGVmYXVsdEFjdGl2ZVdpZGpldHMgPSBbJ1BsYXllcicsICdUaW1lJywgJ0RhdGUnLCAnV2VhdGhlcicsICdHcmVldGluZyddO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZhdWx0QWN0aXZlV2lkamV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oZGVmYXVsdEFjdGl2ZVdpZGpldHNbaV0pKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGRlZmF1bHRBY3RpdmVXaWRqZXRzW2ldLCAndHJ1ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFNldHRpbmdzKCkge1xyXG4gICAgbGV0IGlzT3BlbiA9ICdmYWxzZSc7XHJcbiAgICBsZXQgbGFuZ3VhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZycpO1xyXG4gICAgc2V0V2lkamV0cygpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluaXRTZXR0aW5ncztcclxuXHJcbiIsIlxyXG5sZXQgcmFuZG9tTnVtR2xvYmFsID0gZ2V0UmFuZG9tTnVtKDIwKTtcclxuY29uc3QgcHJldlNsaWRlQnV0dG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlLXByZXYnKTtcclxuY29uc3QgbmV4dFNsaWRlQnV0dG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlLW5leHQnKTtcclxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tTnVtKG1heCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXggKyAxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1BhcnRPZkRheSgpe1xyXG4gIGNvbnN0IHRpbWVPZkRheSA9IFsnbmlnaHQnLCAnbW9ybmluZycsICdhZnRlcm5vb24nLCAnZXZlbmluZyddO1xyXG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGU7XHJcbiAgY29uc3QgaG91cnMgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xyXG4gIHJldHVybiB0aW1lT2ZEYXlbTWF0aC5mbG9vcihob3VycyAvIDYpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gQmFja2dyb3VuZ1NsYWlkZXIoKXtcclxuXHJcbiAgZnVuY3Rpb24gZ2V0U2xhaWRlck51bWJlcihyYW5kb21OdW1HbG9iYWwpe1xyXG4gICBsZXQgcmFuZG9tTnVtID0gcmFuZG9tTnVtR2xvYmFsO1xyXG4gICByZXR1cm4gcmFuZG9tTnVtO1xyXG4gIH1cclxuICBcclxuICAgIFxyXG4gIHByZXZTbGlkZUJ1dHRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdldFNsaWRlUHJldilcclxuICBuZXh0U2xpZGVCdXR0b20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXRTbGlkZU5leHQpXHJcblxyXG4gIGZ1bmN0aW9uIGdldFNsaWRlUHJldigpe1xyXG4gICAgKHJhbmRvbU51bUdsb2JhbCA9PSAxKSA/IHJhbmRvbU51bUdsb2JhbCA9IDIwIDogcmFuZG9tTnVtR2xvYmFsLS07XHJcbiAgICBnZXRTbGFpZGVyTnVtYmVyKHJhbmRvbU51bUdsb2JhbCk7XHJcbiAgICBzZXRCRygpXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdldFNsaWRlTmV4dCgpe1xyXG4gICAgKHJhbmRvbU51bUdsb2JhbCA9PSAyMCkgPyByYW5kb21OdW1HbG9iYWwgPSAxIDogcmFuZG9tTnVtR2xvYmFsKys7XHJcbiAgICBnZXRTbGFpZGVyTnVtYmVyKHJhbmRvbU51bUdsb2JhbCk7XHJcbiAgICBzZXRCRygpXHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gc2V0QkcoKXtcclxuICAgIGxldCByYW5kb20gPSAoU3RyaW5nKGdldFNsYWlkZXJOdW1iZXIocmFuZG9tTnVtR2xvYmFsKSkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIGltZy5zcmMgPSBgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3JvbGxpbmctc2NvcGVzLXNjaG9vbC9zdGFnZTEtdGFza3MvYXNzZXRzL2ltYWdlcy8ke3Nob3dQYXJ0T2ZEYXkoKX0vJHtyYW5kb219LmpwZ2BcclxuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7ICAgICAgXHJcbiAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ltZy5zcmN9KWAgXHJcbiAgICB9OyBcclxuICB9XHJcblxyXG4vLyAgIGFzeW5jIGZ1bmN0aW9uIHNldEJnVW5zcGxhaCgpIHtcclxuLy8gICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4vLyAgICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9waG90b3MvcmFuZG9tP29yaWVudGF0aW9uPWxhbmRzY2FwZSZxdWVyeT0ke3Nob3dQYXJ0T2ZEYXkoKX0mY2xpZW50X2lkPWxFU3B4TlZuVDIwemo0T2RqaHE0aTJhNWhkbTgtSmRmUEdNbWdPWExHRHdgO1xyXG4vLyAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcclxuLy8gICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG4vLyAgICAgaW1nLnNyYyA9IGRhdGEudXJscy5yZWd1bGFyO1xyXG4vLyAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuLy8gICAgICAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWcuc3JjfSlgO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGFzeW5jIGZ1bmN0aW9uIHNldEJnVW5zcGxhaCgpIHtcclxuLy8gICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuLy8gICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cuZmxpY2tyLmNvbS9zZXJ2aWNlcy9yZXN0Lz9tZXRob2Q9ZmxpY2tyLnBob3Rvcy5zZWFyY2gmYXBpX2tleT1iNjk4YjEzODdmZjZjMGJkODkxZTMwZjAxNjk1OWI1NSZ0YWdzPSR7c2hvd1BhcnRPZkRheSgpfSZleHRyYXM9dXJsX2wmZm9ybWF0PWpzb24mbm9qc29uY2FsbGJhY2s9MWA7XHJcbi8vICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcclxuLy8gICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuLy8gICBpbWcuc3JjID0gZGF0YS5waG90b3MucGhvdG9bZ2V0UmFuZG9tTnVtKDEwMCldLnVybF9sO1xyXG4vLyAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbi8vICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ltZy5zcmN9KWA7XHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG5cclxuLy8gICBsZXQgbGlua1NldHRpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGluaycpO1xyXG4vLyAgIHN3aXRjaChsaW5rU2V0dGluZykge1xyXG4vLyAgICAgICBjYXNlICdnaXRodWInOiBcclxuLy8gICAgICAgICAgIHNldEJnRnJvbUdpdEh1YihyYW5kb20pXHJcbi8vICAgICAgICAgICBicmVhaztcclxuLy8gICAgICAgY2FzZSAndW5zcGxhc2gnOiBcclxuLy8gICAgICAgICAgIHNldEJnRnJvbVVuc3BsYWgoKTtcclxuLy8gICAgICAgICAgIGJyZWFrO1xyXG4vLyAgICAgICBjYXNlICdmbGlja3InOlxyXG4vLyAgICAgICAgICAgc2V0QmdGcm9tRkxpY2tSKClcclxuLy8gICAgICAgICAgIGJyZWFrO1xyXG4vLyAgIH1cclxuLy8gfVxyXG5zZXRCRygpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhY2tncm91bmdTbGFpZGVyO1xyXG4iLCJcclxuY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lJyk7XHJcblxyXG5pbXBvcnQgc2hvd0RhdGUgZnJvbSBcIi4vZGF0ZS5qc1wiO1xyXG5zaG93RGF0ZSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hvd1RpbWUoKSB7XHJcbiAgY29uc3QgZGF0ZXMgPSBuZXcgRGF0ZTtcclxuICBjb25zdCBjdXJyZW50VGltZSA9IGRhdGVzLnRvTG9jYWxlVGltZVN0cmluZygpO1xyXG4gIHRpbWUuaW5uZXJIVE1MID0gY3VycmVudFRpbWU7XHJcbiAgc2V0VGltZW91dChzaG93VGltZSwgMTAwMCk7XHJcbiAgc2V0VGltZW91dChzaG93RGF0ZSwgMTAwMCk7XHJcbn0iLCJcclxubGV0IHNldGluZ3NMYW5ndWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZXR0aW5ncycpOyBcclxuaW1wb3J0IHNob3dHcmVldGluZyBmcm9tIFwiLi9ncmVldGluZy5qc1wiO1xyXG5pbXBvcnQgaW5pdFdlYXRoZXIgZnJvbSBcIi4vd2VhdGhlci5qc1wiO1xyXG5pbXBvcnQgc2hvd0RhdGUgZnJvbSBcIi4vZGF0ZS5qc1wiO1xyXG5pbXBvcnQgY2hhbmdlUXVvdGVzIGZyb20gXCIuL3F1b3Rlcy5qc1wiO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldExhbmd1YWdlKCl7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFuZycsICdlbicpXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaTxzZXRpbmdzTGFuZ3VhZ2UubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHNldGluZ3NMYW5ndWFnZVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgbGV0IGV2ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICBpZihldi5jbGFzc0xpc3QuaWQgPT0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhbmcnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYW5nJywgZXYuaWQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzaG93R3JlZXRpbmcoKTtcclxuICAgIGluaXRXZWF0aGVyKClcclxuICAgIHNob3dEYXRlKClcclxuICAgIGNoYW5nZVF1b3RlcygpXHJcbn1cclxuXHJcbmdldExhbmd1YWdlKClcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRMYW5ndWFnZTsiLCJjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWljb24nKTtcclxuY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcGVyYXR1cmUnKTtcclxuY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXItZGVzY3JpcHRpb24nKTtcclxuY29uc3QgY2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXR5Jyk7XHJcbmNvbnN0IHdlYXRoZXJXaW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQnKTtcclxuY29uc3Qgd2VhdGhlckh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWlkaXR5Jyk7XHJcbmNvbnN0IHdlYXRoZXJJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJfX2luZm8nKTtcclxuXHJcbmxldCBsYW5ndWFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5nJylcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIoKSB7XHJcbiAgXHJcbiAgaWYgKGNpdHkudGV4dENvbnRlbnQubGVuZ3RoICE9PSAwKXtcclxuICB3ZWF0aGVySW5mby5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cclxuICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHkudGV4dENvbnRlbnR9Jmxhbmc9JHtsYW5ndWFnZX0mYXBwaWQ9YWE1YTRmMTI0NjEyYzQyYmE1NWMzMzdhNjE1MzRlYzcmdW5pdHM9bWV0cmljYDtcclxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG5cclxuICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QuYWRkKGBvd2YtJHtkYXRhLndlYXRoZXJbMF0uaWR9YCk7XHJcbiAgXHJcbiAgbGV0IHRyYW5zbGF0aW9uID0ge1xyXG4gICAgd2luZDoge1xyXG4gICAgICAgIHJ1OiBcItCh0LrQvtGA0L7RgdGC0Ywg0LLQtdGC0YDQsDogXCIsXHJcbiAgICAgICAgZW46IFwiV2luZCBzcGVlZDogXCJcclxuICAgIH0sXHJcbiAgICBodW1pZGl0eToge1xyXG4gICAgICBydTogXCLQktC70LDQttC90L7RgdGC0Yw6IFwiLFxyXG4gICAgICBlbjogXCJIdW1pZGl0eTogXCJcclxuICAgIH0sXHJcbiAgICBzcGVlZDoge1xyXG4gICAgICAgIHJ1OiBcIiDQvC9jXCIsXHJcbiAgICAgICAgZW46IFwiIG0vc1wiXHJcbiAgICB9LFxyXG4gIH0gICAgXHJcbiAgd2VhdGhlckljb24uY2xhc3NOYW1lID0gJ3dlYXRoZXItaWNvbiBvd2YnO1xyXG4gIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5hZGQoYG93Zi0ke2RhdGEud2VhdGhlclswXS5pZH1gKTtcclxuICB0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGAke2RhdGEubWFpbi50ZW1wLnRvRml4ZWQoMCl9wrBDYDtcclxuICB3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XHJcbiAgd2VhdGhlcldpbmQuaW5uZXJIVE1MID0gYCR7dHJhbnNsYXRpb24ud2luZFtsYW5ndWFnZV19ICR7TWF0aC5yb3VuZChkYXRhLndpbmQuc3BlZWQpfSAke3RyYW5zbGF0aW9uLnNwZWVkW2xhbmd1YWdlXX1gO1xyXG4gIHdlYXRoZXJIdW1pZGl0eS5pbm5lckhUTUwgPSBgJHt0cmFuc2xhdGlvbi5odW1pZGl0eVtsYW5ndWFnZV19ICR7ZGF0YS5tYWluLmh1bWlkaXR5LnRvRml4ZWQoMCl9ICVgO1xyXG4gIHdlYXRoZXJEZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2V0TG9jYWxTdG9yYWdlKCkge1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjaXR5JywgY2l0eS50ZXh0Q29udGVudCk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKCkge1xyXG4gIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaXR5JykpIHtcclxuICAgIGNpdHkudGV4dENvbnRlbnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2l0eScpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q2l0eShldmVudCkge1xyXG4gIGlmIChldmVudC5jb2RlID09ICdFbnRlcicpIHtcclxuICAgIHNldExvY2FsU3RvcmFnZSgpXHJcbiAgICBnZXRXZWF0aGVyKCk7XHJcbiAgICBjaXR5LmJsdXIoKTtcclxuICB9XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gIGNvbnN0IHdpdGhpbkJvbmRhcmllcyA9IGUuY29tcG9zZWRQYXRoKCkuaW5jbHVkZXMoY2l0eSk7XHJcbiAgaWYgKCF3aXRoaW5Cb25kYXJpZXMpe1xyXG4gICAgc2V0TG9jYWxTdG9yYWdlKClcclxuICAgIGdldFdlYXRoZXIoKTtcclxuICAgIGNpdHkuYmx1cigpO1xyXG4gIH1cclxuIH0pXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGdldFdlYXRoZXIpO1xyXG5jaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgc2V0Q2l0eSk7XHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIHNldExvY2FsU3RvcmFnZSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZ2V0TG9jYWxTdG9yYWdlKVxyXG5cclxuZ2V0TG9jYWxTdG9yYWdlKClcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRXZWF0aGVyKCl7XHJcbiAgZ2V0V2VhdGhlcigpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbml0V2VhdGhlcjtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uLy4uL2Nzcy9vd2ZvbnQtcmVndWxhci5jc3MnXHJcbmltcG9ydCAnLi4vLi4vY3NzL3N0eWxlLmNzcydcclxuXHJcbmltcG9ydCBpbml0UGFuZWwgZnJvbSBcIi4vc2V0dGluZ2xpc3QuanNcIlxyXG5pbml0UGFuZWwoKVxyXG5cclxuaW1wb3J0IGluaXRTZXR0aW5ncyBmcm9tIFwiLi9zZXR0aW5ncy5qc1wiXHJcbmluaXRTZXR0aW5ncygpXHJcblxyXG5pbXBvcnQgZ2V0TGFuZ3VhZ2UgZnJvbSBcIi4vdHJhbnNsYXRlLmpzXCI7XHJcbmdldExhbmd1YWdlKClcclxuXHJcbmltcG9ydCBzaG93VGltZSBmcm9tIFwiLi90aW1lLmpzXCI7XHJcbnNob3dUaW1lKCk7XHJcblxyXG5pbXBvcnQgc2hvd0RhdGUgZnJvbSBcIi4vZGF0ZS5qc1wiO1xyXG5zaG93RGF0ZSgpO1xyXG5cclxuaW1wb3J0IHNob3dHcmVldGluZyBmcm9tIFwiLi9ncmVldGluZy5qc1wiO1xyXG5zaG93R3JlZXRpbmcoKTtcclxuXHJcbmltcG9ydCBzZXRCRyBmcm9tIFwiLi9zbGlkZXIuanNcIjtcclxuc2V0QkcoKTtcclxuXHJcbmltcG9ydCBzdGFydFBsYXlMaXN0IGZyb20gXCIuL3BsYXllci5qc1wiO1xyXG5zdGFydFBsYXlMaXN0KCk7XHJcblxyXG5pbXBvcnQgY2hhbmdlUXVvdGVzIGZyb20gXCIuL3F1b3Rlcy5qc1wiO1xyXG5jaGFuZ2VRdW90ZXMoKVxyXG5cclxuaW1wb3J0IGluaXRXZWF0aGVyIGZyb20gXCIuL3dlYXRoZXIuanNcIjtcclxuaW5pdFdlYXRoZXIoKVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9