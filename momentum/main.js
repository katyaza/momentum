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

let userLang = navigator.language || navigator.userLanguage;

function showDate() {
  const newDate = new Date;
  const options = { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' };
  const currentDate = newDate.toLocaleDateString(userLang, options);
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
const audioButtonPlay = document.querySelector('.play');
const audioButtonPlayNext = document.querySelector('.play-next');
const audioButtonPlayPrev = document.querySelector('.play-prev');
const audioPlayList = document.querySelector('.play-list');
const audioProgress = document.getElementById('progress__audio');
const audioVolume = document.querySelector('.volume');
const audioCurrentName = document.querySelector('.track__name');
const audioMuteButton = document.querySelector('.audio-mute');
const audioExactTime = document.getElementById('exact-time');
const audioDurationTime = document.getElementById('duration-time');
let currentTimeGlobal = 0;
let currentVolume;
let isPlay = false;
let audioNumber = 0;



function initPlayList() {
    _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(function (el) {
        console.log(_playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"].length)
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.innerHTML = el.title;
        audioPlayList.append(li);

        // const btn = document.createElement('span');
        // btn.classList.add('play');
        // btn.classList.add('play-item-btn');

        // li.append(btn);
        }
    )
}

let playListItem =  document.querySelectorAll('.play-item');
let playListBtn = document.querySelectorAll('.play-item-btn');

function playMusic(){
    audio.src = _playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"][audioNumber].src;
    console.log(audio.src)
    console.log(isPlay)
    if(isPlay == false) {
        isPlay = true;
        audio.play();
        audioButtonPlay.classList.add('pause');
    } else {
        audioButtonPlay.classList.remove('pause');
        audio.pause();
        isPlay = false;
    };
}
  
console.log(isPlay)


function startPlayList() {  
    initPlayList(); 
    audioButtonPlay.addEventListener('click', playMusic);
    audioButtonPlayNext.addEventListener('click', playNext);
    audioButtonPlayPrev.addEventListener('click', playPrev);
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
        src: '/assets/sounds/AquaCaelestis.mp3',
        duration: 39,
    },
    
    {
        title: 'Ennio Morricone',
        src: 'assets/sounds/EnnioMorricone.mp3',
        duration: 97,
    },
    
    {      
        title: 'River Flows In You',
        src: 'assets/sounds/RiverFlowsInYou.mp3',
        duration: 97
    },

    {      
        title: 'Summer Wind',
        src: 'assets/sounds/SummerWind.mp3',
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


function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}


function getQuotes() {
    const quotes = '/data.json';
    fetch(quotes)
      .then(res => res.json())
      .then(data => { 
        textOfQuote.innerHTML = data[getRandomNum(data.length)].text;
        authorOfQuote.innerHTML = data[getRandomNum(data.length)].author;
    });
}

function changeQuotes() {
  getQuotes()
  buttonChangeQuote.addEventListener('click', getQuotes);
}
changeQuotes()
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (changeQuotes);

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
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date */ "./assets/js/date.js");

const time = document.querySelector('.time');


(0,_date__WEBPACK_IMPORTED_MODULE_0__["default"])();

function showTime() {
  const dates = new Date;
  const currentTime = dates.toLocaleTimeString();
  time.innerHTML = currentTime;
  setTimeout(showTime, 1000);
  setTimeout(_date__WEBPACK_IMPORTED_MODULE_0__["default"], 1000);
}



/***/ }),

/***/ "./assets/js/weather.js":
/*!******************************!*\
  !*** ./assets/js/weather.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initWeather)
/* harmony export */ });
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

function initWeather() {
  setCity();
}




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
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./date.js */ "./assets/js/date.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./time.js */ "./assets/js/time.js");
/* harmony import */ var _greeting_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./greeting.js */ "./assets/js/greeting.js");
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./slider.js */ "./assets/js/slider.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./player.js */ "./assets/js/player.js");
/* harmony import */ var _quotes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./quotes.js */ "./assets/js/quotes.js");
/* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./weather.js */ "./assets/js/weather.js");




(0,_date_js__WEBPACK_IMPORTED_MODULE_2__["default"])();


(0,_time_js__WEBPACK_IMPORTED_MODULE_3__["default"])();


(0,_greeting_js__WEBPACK_IMPORTED_MODULE_4__["default"])();


(0,_slider_js__WEBPACK_IMPORTED_MODULE_5__["default"])();


(0,_player_js__WEBPACK_IMPORTED_MODULE_6__["default"])();


(0,_quotes_js__WEBPACK_IMPORTED_MODULE_7__["default"])()

;







})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvZGF0ZS5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9ncmVldGluZy5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvcGxheWxpc3QuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9hc3NldHMvanMvcXVvdGVzLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3NsaWRlci5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy90aW1lLmpzIiwid2VicGFjazovL21vbWVudHVtLy4vYXNzZXRzL2pzL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9jc3Mvb3dmb250LXJlZ3VsYXIuY3NzPzMwYTQiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9jc3Mvc3R5bGUuY3NzP2VhNzgiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL2Fzc2V0cy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhdGUnKTtcclxuXHJcbmxldCB1c2VyTGFuZyA9IG5hdmlnYXRvci5sYW5ndWFnZSB8fCBuYXZpZ2F0b3IudXNlckxhbmd1YWdlO1xyXG5cclxuZnVuY3Rpb24gc2hvd0RhdGUoKSB7XHJcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlO1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7IHdlZWtkYXk6ICdsb25nJywgZGF5OiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIHRpbWVab25lOiAnVVRDJyB9O1xyXG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3RGF0ZS50b0xvY2FsZURhdGVTdHJpbmcodXNlckxhbmcsIG9wdGlvbnMpO1xyXG4gIGRhdGUuaW5uZXJIVE1MID0gY3VycmVudERhdGU7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaG93RGF0ZTtcclxuIiwiY29uc3QgZ3JlZXRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JlZXRpbmcnKTtcclxuY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lJyk7XHJcblxyXG5mdW5jdGlvbiBnZXRMYW5ndWFnZSgpe1xyXG4gICAgbGV0IGxhbmd1YWdlID0gJyc7XHJcbiAgICBpZiAobmF2aWdhdG9yLmxhbmd1YWdlIHx8IG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UgPT0gJ3J1LVJVJyl7XHJcbiAgICAgICAgcmV0dXJuIGxhbmd1YWdlID0gJ3J1JztcclxuICAgIH0gZWxzZSByZXR1cm4gbGFuZ3VhZ2UgPSAnZW4nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUaW1lT2ZEYXkoKSB7XHJcbiAgICBjb25zdCBncmVldGluZ0RhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgaG91cnMgPSBncmVldGluZ0RhdGUuZ2V0SG91cnMoKTtcclxuICAgIGNvbnN0IHBhcnRPZkRheSA9IHtcclxuICAgICAgICAnZW4nOiBbJ25pZ2h0LCcsICdtb3JuaW5nLCcsICdhZnRlcm5vb24sJywgJ2V2ZW5pbmcsJ10sXHJcbiAgICAgICAgJ3J1JzogWyfQvdC+0YfQuCwnLCAn0YPRgtGA0L4sJywgJ9C00LXQvdGMLCcsICfQstC10YfQtdGALCddXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIChwYXJ0T2ZEYXlbZ2V0TGFuZ3VhZ2UoKV1bTWF0aC5mbG9vcihob3VycyAvIDYpXSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0dyZWV0aW5nKCl7XHJcbmxldCBncmVldGluZ1RleHQgPScnO1xyXG5pZiAoZ2V0TGFuZ3VhZ2UoKSA9PSAnZW4nKXtcclxuICAgIGdyZWV0aW5nVGV4dCA9IGBHb29kICR7Z2V0VGltZU9mRGF5KCl9YDtcclxufSBlbHNlIHsgXHJcbiAgICBpZihnZXRUaW1lT2ZEYXkoKSA9PSAn0L3QvtGH0LgsJyl7XHJcbiAgICAgICAgZ3JlZXRpbmdUZXh0ID0gYNCU0L7QsdGA0L7QuSAke2dldFRpbWVPZkRheSgpfWBcclxuICAgIH1lbHNlIGlmIChnZXRUaW1lT2ZEYXkoKSA9PSAn0YPRgtGA0L4sJyl7XHJcbiAgICAgICAgZ3JlZXRpbmdUZXh0ID0gYNCU0L7QsdGA0L7QtSAke2dldFRpbWVPZkRheSgpfWBcclxuICAgIH0gZWxzZVxyXG4gICAgZ3JlZXRpbmdUZXh0ID0gYNCU0L7QsdGA0YvQuSAke2dldFRpbWVPZkRheSgpfWBcclxufTtcclxuICByZXR1cm4gZ3JlZXRpbmcuaW5uZXJIVE1MID0gZ3JlZXRpbmdUZXh0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaG93R3JlZXRpbmc7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgc2V0TG9jYWxTdG9yYWdlKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBnZXRMb2NhbFN0b3JhZ2UpXHJcblxyXG5mdW5jdGlvbiBzZXRMb2NhbFN0b3JhZ2UoKSB7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hbWUnLCBuYW1lLnZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKCkge1xyXG4gIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lJykpIHtcclxuICAgIG5hbWUudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpO1xyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHBsYXlMaXN0IGZyb20gXCIuL3BsYXlsaXN0LmpzXCI7XHJcblxyXG5cclxuY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oKTtcclxuY29uc3QgYXVkaW9CdXR0b25QbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXknKTtcclxuY29uc3QgYXVkaW9CdXR0b25QbGF5TmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LW5leHQnKTtcclxuY29uc3QgYXVkaW9CdXR0b25QbGF5UHJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LXByZXYnKTtcclxuY29uc3QgYXVkaW9QbGF5TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWxpc3QnKTtcclxuY29uc3QgYXVkaW9Qcm9ncmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc19fYXVkaW8nKTtcclxuY29uc3QgYXVkaW9Wb2x1bWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudm9sdW1lJyk7XHJcbmNvbnN0IGF1ZGlvQ3VycmVudE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHJhY2tfX25hbWUnKTtcclxuY29uc3QgYXVkaW9NdXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1ZGlvLW11dGUnKTtcclxuY29uc3QgYXVkaW9FeGFjdFRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhY3QtdGltZScpO1xyXG5jb25zdCBhdWRpb0R1cmF0aW9uVGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdXJhdGlvbi10aW1lJyk7XHJcbmxldCBjdXJyZW50VGltZUdsb2JhbCA9IDA7XHJcbmxldCBjdXJyZW50Vm9sdW1lO1xyXG5sZXQgaXNQbGF5ID0gZmFsc2U7XHJcbmxldCBhdWRpb051bWJlciA9IDA7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRQbGF5TGlzdCgpIHtcclxuICAgIHBsYXlMaXN0LmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGxheUxpc3QubGVuZ3RoKVxyXG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdwbGF5LWl0ZW0nKTtcclxuICAgICAgICBsaS5pbm5lckhUTUwgPSBlbC50aXRsZTtcclxuICAgICAgICBhdWRpb1BsYXlMaXN0LmFwcGVuZChsaSk7XHJcblxyXG4gICAgICAgIC8vIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAvLyBidG4uY2xhc3NMaXN0LmFkZCgncGxheScpO1xyXG4gICAgICAgIC8vIGJ0bi5jbGFzc0xpc3QuYWRkKCdwbGF5LWl0ZW0tYnRuJyk7XHJcblxyXG4gICAgICAgIC8vIGxpLmFwcGVuZChidG4pO1xyXG4gICAgICAgIH1cclxuICAgIClcclxufVxyXG5cclxubGV0IHBsYXlMaXN0SXRlbSA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheS1pdGVtJyk7XHJcbmxldCBwbGF5TGlzdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5LWl0ZW0tYnRuJyk7XHJcblxyXG5mdW5jdGlvbiBwbGF5TXVzaWMoKXtcclxuICAgIGF1ZGlvLnNyYyA9IHBsYXlMaXN0W2F1ZGlvTnVtYmVyXS5zcmM7XHJcbiAgICBjb25zb2xlLmxvZyhhdWRpby5zcmMpXHJcbiAgICBjb25zb2xlLmxvZyhpc1BsYXkpXHJcbiAgICBpZihpc1BsYXkgPT0gZmFsc2UpIHtcclxuICAgICAgICBpc1BsYXkgPSB0cnVlO1xyXG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICBhdWRpb0J1dHRvblBsYXkuY2xhc3NMaXN0LmFkZCgncGF1c2UnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXVkaW9CdXR0b25QbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlJyk7XHJcbiAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICBpc1BsYXkgPSBmYWxzZTtcclxuICAgIH07XHJcbn1cclxuICBcclxuY29uc29sZS5sb2coaXNQbGF5KVxyXG5cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0UGxheUxpc3QoKSB7ICBcclxuICAgIGluaXRQbGF5TGlzdCgpOyBcclxuICAgIGF1ZGlvQnV0dG9uUGxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlNdXNpYyk7XHJcbiAgICBhdWRpb0J1dHRvblBsYXlOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheU5leHQpO1xyXG4gICAgYXVkaW9CdXR0b25QbGF5UHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlQcmV2KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RhcnRQbGF5TGlzdFxyXG5cclxuXHJcbiIsImNvbnN0IHBsYXlMaXN0ID0gW1xyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiAnQXF1YSBDYWVsZXN0aXMnLFxyXG4gICAgICAgIHNyYzogJy9hc3NldHMvc291bmRzL0FxdWFDYWVsZXN0aXMubXAzJyxcclxuICAgICAgICBkdXJhdGlvbjogMzksXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdFbm5pbyBNb3JyaWNvbmUnLFxyXG4gICAgICAgIHNyYzogJ2Fzc2V0cy9zb3VuZHMvRW5uaW9Nb3JyaWNvbmUubXAzJyxcclxuICAgICAgICBkdXJhdGlvbjogOTcsXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB7ICAgICAgXHJcbiAgICAgICAgdGl0bGU6ICdSaXZlciBGbG93cyBJbiBZb3UnLFxyXG4gICAgICAgIHNyYzogJ2Fzc2V0cy9zb3VuZHMvUml2ZXJGbG93c0luWW91Lm1wMycsXHJcbiAgICAgICAgZHVyYXRpb246IDk3XHJcbiAgICB9LFxyXG5cclxuICAgIHsgICAgICBcclxuICAgICAgICB0aXRsZTogJ1N1bW1lciBXaW5kJyxcclxuICAgICAgICBzcmM6ICdhc3NldHMvc291bmRzL1N1bW1lcldpbmQubXAzJyxcclxuICAgICAgICBkdXJhdGlvbjogMzlcclxuICAgIH0sXHJcblxyXG5dXHJcblxyXG5leHBvcnQgZGVmYXVsdCBwbGF5TGlzdDsiLCJjb25zdCB0ZXh0T2ZRdW90ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdW90ZScpO1xyXG5jb25zdCBhdXRob3JPZlF1b3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1dGhvcicpO1xyXG5jb25zdCBidXR0b25DaGFuZ2VRdW90ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFuZ2UtcXVvdGUnKTtcclxuXHJcblxyXG5mdW5jdGlvbiBnZXRSYW5kb21OdW0obWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFF1b3RlcygpIHtcclxuICAgIGNvbnN0IHF1b3RlcyA9ICcvZGF0YS5qc29uJztcclxuICAgIGZldGNoKHF1b3RlcylcclxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgIC50aGVuKGRhdGEgPT4geyBcclxuICAgICAgICB0ZXh0T2ZRdW90ZS5pbm5lckhUTUwgPSBkYXRhW2dldFJhbmRvbU51bShkYXRhLmxlbmd0aCldLnRleHQ7XHJcbiAgICAgICAgYXV0aG9yT2ZRdW90ZS5pbm5lckhUTUwgPSBkYXRhW2dldFJhbmRvbU51bShkYXRhLmxlbmd0aCldLmF1dGhvcjtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VRdW90ZXMoKSB7XHJcbiAgZ2V0UXVvdGVzKClcclxuICBidXR0b25DaGFuZ2VRdW90ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdldFF1b3Rlcyk7XHJcbn1cclxuY2hhbmdlUXVvdGVzKClcclxuZXhwb3J0IGRlZmF1bHQgY2hhbmdlUXVvdGVzOyIsIlxyXG5sZXQgcmFuZG9tTnVtR2xvYmFsID0gZ2V0UmFuZG9tTnVtKDIwKTtcclxuY29uc3QgcHJldlNsaWRlQnV0dG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlLXByZXYnKTtcclxuY29uc3QgbmV4dFNsaWRlQnV0dG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlLW5leHQnKTtcclxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tTnVtKG1heCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXggKyAxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1BhcnRPZkRheSgpe1xyXG4gIGNvbnN0IHRpbWVPZkRheSA9IFsnbmlnaHQnLCAnbW9ybmluZycsICdhZnRlcm5vb24nLCAnZXZlbmluZyddO1xyXG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGU7XHJcbiAgY29uc3QgaG91cnMgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xyXG4gIHJldHVybiB0aW1lT2ZEYXlbTWF0aC5mbG9vcihob3VycyAvIDYpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gQmFja2dyb3VuZ1NsYWlkZXIoKXtcclxuXHJcbiAgZnVuY3Rpb24gZ2V0U2xhaWRlck51bWJlcihyYW5kb21OdW1HbG9iYWwpe1xyXG4gICBsZXQgcmFuZG9tTnVtID0gcmFuZG9tTnVtR2xvYmFsO1xyXG4gICByZXR1cm4gcmFuZG9tTnVtO1xyXG4gIH1cclxuICAgIFxyXG4gIHByZXZTbGlkZUJ1dHRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdldFNsaWRlUHJldilcclxuICBuZXh0U2xpZGVCdXR0b20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXRTbGlkZU5leHQpXHJcblxyXG4gIGZ1bmN0aW9uIGdldFNsaWRlUHJldigpe1xyXG4gICAgKHJhbmRvbU51bUdsb2JhbCA9PSAxKSA/IHJhbmRvbU51bUdsb2JhbCA9IDIwIDogcmFuZG9tTnVtR2xvYmFsLS07XHJcbiAgICBnZXRTbGFpZGVyTnVtYmVyKHJhbmRvbU51bUdsb2JhbCk7XHJcbiAgICBzZXRCRygpXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdldFNsaWRlTmV4dCgpe1xyXG4gICAgKHJhbmRvbU51bUdsb2JhbCA9PSAyMCkgPyByYW5kb21OdW1HbG9iYWwgPSAxIDogcmFuZG9tTnVtR2xvYmFsKys7XHJcbiAgICBnZXRTbGFpZGVyTnVtYmVyKHJhbmRvbU51bUdsb2JhbCk7XHJcbiAgICBzZXRCRygpXHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gc2V0QkcoKXtcclxuICAgIGxldCByYW5kb20gPSAoU3RyaW5nKGdldFNsYWlkZXJOdW1iZXIocmFuZG9tTnVtR2xvYmFsKSkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgIGltZy5zcmMgPSBgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3JvbGxpbmctc2NvcGVzLXNjaG9vbC9zdGFnZTEtdGFza3MvYXNzZXRzL2ltYWdlcy8ke3Nob3dQYXJ0T2ZEYXkoKX0vJHtyYW5kb219LmpwZ2BcclxuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7ICAgICAgXHJcbiAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ltZy5zcmN9KWAgXHJcbiAgICB9OyBcclxuICB9XHJcbnNldEJHKClcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhY2tncm91bmdTbGFpZGVyO1xyXG4iLCJcclxuY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lJyk7XHJcblxyXG5pbXBvcnQgc2hvd0RhdGUgZnJvbSBcIi4vZGF0ZVwiO1xyXG5zaG93RGF0ZSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hvd1RpbWUoKSB7XHJcbiAgY29uc3QgZGF0ZXMgPSBuZXcgRGF0ZTtcclxuICBjb25zdCBjdXJyZW50VGltZSA9IGRhdGVzLnRvTG9jYWxlVGltZVN0cmluZygpO1xyXG4gIHRpbWUuaW5uZXJIVE1MID0gY3VycmVudFRpbWU7XHJcbiAgc2V0VGltZW91dChzaG93VGltZSwgMTAwMCk7XHJcbiAgc2V0VGltZW91dChzaG93RGF0ZSwgMTAwMCk7XHJcbn1cclxuXHJcbiIsImNvbnN0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXItaWNvbicpO1xyXG5jb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wZXJhdHVyZScpO1xyXG5jb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1kZXNjcmlwdGlvbicpO1xyXG5jb25zdCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdHknKTtcclxuY29uc3Qgd2VhdGhlcldpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2luZCcpO1xyXG5jb25zdCB3ZWF0aGVySHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHknKTtcclxuY29uc3Qgd2VhdGhlckluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlcl9faW5mbycpO1xyXG5cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKCkge1xyXG4gIFxyXG4gIGlmIChjaXR5LnRleHRDb250ZW50Lmxlbmd0aCAhPT0gMCl7XHJcbiAgd2VhdGhlckluZm8uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHJcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5LnRleHRDb250ZW50fSZsYW5nPXJ1JmFwcGlkPWFhNWE0ZjEyNDYxMmM0MmJhNTVjMzM3YTYxNTM0ZWM3JnVuaXRzPW1ldHJpY2A7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuXHJcbiAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChgb3dmLSR7ZGF0YS53ZWF0aGVyWzBdLmlkfWApO1xyXG4gIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7ZGF0YS5tYWluLnRlbXB9wrBDYDtcclxuICB3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XHJcblxyXG4gICAgICBcclxuICB3ZWF0aGVySWNvbi5jbGFzc05hbWUgPSAnd2VhdGhlci1pY29uIG93Zic7XHJcbiAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChgb3dmLSR7ZGF0YS53ZWF0aGVyWzBdLmlkfWApO1xyXG4gIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7ZGF0YS5tYWluLnRlbXAudG9GaXhlZCgwKX3CsENgO1xyXG4gIHdlYXRoZXJEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcclxuXHJcbiAgd2VhdGhlcldpbmQuaW5uZXJIVE1MID0gYNCh0LrQvtGA0L7RgdGC0Ywg0LLQtdGC0YDQsDogJHtkYXRhLndpbmQuc3BlZWQudG9GaXhlZCgwKX0g0LwvY2A7XHJcbiAgd2VhdGhlckh1bWlkaXR5LmlubmVySFRNTCA9IGDQktC70LDQttC90L7RgdGC0Yw6ICR7ZGF0YS5tYWluLmh1bWlkaXR5LnRvRml4ZWQoMCl9ICVgO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3ZWF0aGVySW5mby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgYWxlcnQoXCLQktCy0LXQtNC40YLQtSDRgdCy0L7QuSDQs9C+0YDQvtC0XCIpXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0TG9jYWxTdG9yYWdlKCkge1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjaXR5JywgY2l0eS50ZXh0Q29udGVudCk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKCkge1xyXG4gIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaXR5JykpIHtcclxuICAgIGNpdHkudGV4dENvbnRlbnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2l0eScpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q2l0eShldmVudCkge1xyXG4gIGlmIChldmVudC5jb2RlID09PSAnRW50ZXInKSB7XHJcbiAgICBzZXRMb2NhbFN0b3JhZ2UoKVxyXG4gICAgZ2V0V2VhdGhlcigpO1xyXG4gICAgY2l0eS5ibHVyKCk7XHJcbn1cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICBjb25zdCB3aXRoaW5Cb25kYXJpZXMgPSBlLmNvbXBvc2VkUGF0aCgpLmluY2x1ZGVzKGNpdHkpO1xyXG4gIGlmICghd2l0aGluQm9uZGFyaWVzKXtcclxuICAgIHNldExvY2FsU3RvcmFnZSgpXHJcbiAgICBnZXRXZWF0aGVyKCk7XHJcbiAgICBjaXR5LmJsdXIoKTtcclxuICB9XHJcbiB9KVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZ2V0V2VhdGhlcik7XHJcbmNpdHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBzZXRDaXR5KTtcclxuXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgc2V0TG9jYWxTdG9yYWdlKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBnZXRMb2NhbFN0b3JhZ2UpXHJcblxyXG5nZXRMb2NhbFN0b3JhZ2UoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdFdlYXRoZXIoKSB7XHJcbiAgc2V0Q2l0eSgpO1xyXG59XHJcblxyXG5cclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uLy4uL2Nzcy9vd2ZvbnQtcmVndWxhci5jc3MnXHJcbmltcG9ydCAnLi4vLi4vY3NzL3N0eWxlLmNzcydcclxuXHJcbmltcG9ydCBzaG93RGF0ZSBmcm9tIFwiLi9kYXRlLmpzXCI7XHJcbnNob3dEYXRlKCk7XHJcblxyXG5pbXBvcnQgc2hvd1RpbWUgZnJvbSBcIi4vdGltZS5qc1wiO1xyXG5zaG93VGltZSgpO1xyXG5cclxuaW1wb3J0IHNob3dHcmVldGluZyBmcm9tIFwiLi9ncmVldGluZy5qc1wiO1xyXG5zaG93R3JlZXRpbmcoKTtcclxuXHJcbmltcG9ydCBCYWNrZ3JvdW5nU2xhaWRlciBmcm9tIFwiLi9zbGlkZXIuanNcIjtcclxuQmFja2dyb3VuZ1NsYWlkZXIoKTtcclxuXHJcbmltcG9ydCBzdGFydFBsYXlMaXN0IGZyb20gXCIuL3BsYXllci5qc1wiO1xyXG5zdGFydFBsYXlMaXN0KCk7XHJcblxyXG5pbXBvcnQgY2hhbmdlUXVvdGVzIGZyb20gXCIuL3F1b3Rlcy5qc1wiO1xyXG5jaGFuZ2VRdW90ZXMoKVxyXG5cclxuaW1wb3J0IGluaXRXZWF0aGVyIGZyb20gXCIuL3dlYXRoZXIuanNcIjtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9