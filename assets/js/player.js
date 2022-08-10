import playList from "./playlist.js";


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
    playList.forEach(function (el) {
        console.log(playList.length)
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
    audio.src = playList[audioNumber].src;
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

export default startPlayList


