import playList from "./playlist.js";


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
    playList.forEach(function (el) {
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
    audio.src = playList[musicNumber].src;
    audio.currentTime = currentTimeGlobal;
    setDurationTime(playList[musicNumber].duration);
    if(isPlay == false) {
        musicTitle.innerHTML = playList[musicNumber].title;
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
        musicNumber = playList.length-1;
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
    if (musicNumber==playList.length-1) {
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

export default startPlayList


