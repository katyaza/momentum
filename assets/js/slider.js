
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

export default BackgroungSlaider;
