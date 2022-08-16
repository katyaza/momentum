const date = document.querySelector('.date');
let languages = document.querySelector('.language');


function showDate() {
  let language = languages.textContent
  const newDate = new Date;
  const options = { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' };
  const currentDate = newDate.toLocaleDateString(language, options);
  date.innerHTML = currentDate;
}


export default showDate;
