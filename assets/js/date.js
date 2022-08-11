const date = document.querySelector('.date');

let userLang = navigator.language || navigator.userLanguage;

function showDate() {
  const newDate = new Date;
  const options = { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' };
  const currentDate = newDate.toLocaleDateString(userLang, options);
  date.innerHTML = currentDate;
}


export default showDate;
