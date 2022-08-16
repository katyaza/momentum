
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

export default BackgroungSlaider;
